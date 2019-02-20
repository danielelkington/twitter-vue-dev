"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Article {
    constructor(title, authorName, link, tags) {
        this.title = this.trim(title);
        this.authorName = this.trim(authorName).split('・')[0];
        this.link = link;
        this.tags = tags;
        this.cleanTagsOutOfTitle();
    }
    trim(x) {
        return typeof x === 'string' ? x.trim() : x;
    }
    // Sometimes tags appear at the start of the title
    cleanTagsOutOfTitle() {
        this.tags.forEach(tag => {
            if (this.title.indexOf(tag) > -1) {
                this.title = this.title.split(tag)[1];
            }
        });
    }
}
exports.Article = Article;
//# sourceMappingURL=article.js.map