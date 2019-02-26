"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const x_ray_1 = __importDefault(require("x-ray"));
const Article_1 = require("./Article");
const tweet_1 = require("./tweet");
exports.index = async (context, req) => {
    // Thanks to Sarthak Sharma, particularly https://github.com/sarthology/devtocli/blob/master/src/util/crawler.js
    // for assistance with web scraping!
    const xray = x_ray_1.default();
    const articleScrapeData = await xray(`https://dev.to/t/${process.env.dev_tag}/latest`, '#substories .single-article', [
        {
            title: '.index-article-link .content h3',
            author: 'h4 a',
            link: '.index-article-link@href',
            tags: ['.tags .tag'],
            authorLink: '.small-pic-link-wrapper@href'
        }
    ]);
    const articles = articleScrapeData
        .filter((x) => x.title && x.author && x.link)
        .map((x) => new Article_1.Article(x.title, x.author, x.link, x.tags, x.authorLink))
        .reverse(); // will ensure articles get tweeted in the correct order.
    const tweet = new tweet_1.Tweet(context);
    // Scrape author Twitter handles
    for (let article of articles) {
        const socialLinks = await xray(article.authorLink, [
            '.profile-details .social a@href'
        ]);
        article.setTwitterHandleFromSocialLinks(socialLinks);
        // Tweet articles if they're not yet tweeted!
        await tweet.tweetArticleIfNotYetTweeted(article);
    }
};
//# sourceMappingURL=index.js.map