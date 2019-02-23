"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Xray = require('x-ray');
const Article_1 = require("./Article");
exports.index = async (context, req) => {
    // Thanks to Sarthak Sharma, particularly https://github.com/sarthology/devtocli/blob/master/src/util/crawler.js
    // for assistance with web scraping!
    const xray = Xray();
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
        .map((x) => new Article_1.Article(x.title, x.author, x.link, x.tags, x.authorLink));
    // Scrape author Twitter handles
    for (let article of articles) {
        const socialLinks = await xray(article.authorLink, [
            '.profile-details .social a@href'
        ]);
        article.setTwitterHandleFromSocialLinks(socialLinks);
    }
    context.res = {
        body: JSON.stringify(articles, null, 2)
    };
};
//# sourceMappingURL=index.js.map