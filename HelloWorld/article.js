"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
class Article {
    constructor(title, authorName, link, tags, authorLink) {
        this.title = this.trim(title);
        this.authorName = this.trim(authorName).split('・')[0];
        this.link = link;
        this.cleanTagsOutOfTitle(tags);
        this.authorLink = authorLink;
    }
    trim(x) {
        return typeof x === 'string' ? x.trim() : x;
    }
    // Sometimes tags appear at the start of the title
    cleanTagsOutOfTitle(tags) {
        tags.forEach(tag => {
            if (this.title.indexOf(tag) > -1) {
                this.title = this.title.split(tag)[1];
            }
        });
    }
    setTwitterHandleFromSocialLinks(socialLinks) {
        const twitterLink = socialLinks.find(x => x.includes('twitter.com/'));
        if (twitterLink == null) {
            return;
        }
        // twitterLink is in the form https://twitter.com/{blah}
        const twitterURL = new url_1.URL(twitterLink);
        this.twitterHandle = '@' + twitterURL.pathname.substring(1);
    }
}
exports.Article = Article;
//# sourceMappingURL=article.js.map