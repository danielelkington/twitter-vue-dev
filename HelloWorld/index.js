"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Xray = require('x-ray');
const Article_1 = require("./Article");
exports.index = async (context, req) => {
    // Thanks to Sarthak Sharma, particularly https://github.com/sarthology/devtocli/blob/master/src/util/crawler.js
    // for assistance with web scraping!
    const xray = Xray();
    const objects = await xray('https://dev.to/t/vue/latest', '#substories .single-article', [{
            title: '.index-article-link .content h3',
            author: 'h4 a',
            link: '.index-article-link@href',
            tags: ['.tags .tag'] // need the tags so we can strip them out of the title
        }]);
    const articles = objects.filter((x) => x.title && x.author && x.link).map((x) => new Article_1.Article(x.title, x.author, x.link, x.tags));
    // TODO get Twitter profile (parse URL to get username)
    context.res = {
        body: JSON.stringify(articles)
    };
};
//# sourceMappingURL=index.js.map