export class Article {
  title: string;
  authorName: string;
  link: string;
  tags: string[];

  constructor(title: string,
    authorName: string,
    link: string,
    tags: string[]) {
      this.title = this.trim(title)
      this.authorName = this.trim(authorName).split('・')[0]
      this.link = link;
      this.tags = tags;
      this.cleanTagsOutOfTitle()
    }

  trim(x: string): string {
    return typeof x === 'string' ? x.trim() : x;
  }

  // Sometimes tags appear at the start of the title
  cleanTagsOutOfTitle() : void {
    this.tags.forEach(tag => {
      if (this.title.indexOf(tag) > -1) {
        this.title = this.title.split(tag)[1]
      }
    })
  }
}
