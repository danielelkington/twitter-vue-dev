import { URL } from 'url'

export class Article {
  title: string
  authorName: string
  link: string
  authorLink: string
  twitterHandle?: string

  constructor(
    title: string,
    authorName: string,
    link: string,
    tags: string[],
    authorLink: string
  ) {
    this.title = this.trim(title)
    this.authorName = this.trim(authorName).split('・')[0]
    this.link = link
    this.cleanTagsOutOfTitle(tags)
    this.authorLink = authorLink
  }

  trim(x: string): string {
    return typeof x === 'string' ? x.trim() : x
  }

  // Sometimes tags appear at the start of the title
  cleanTagsOutOfTitle(tags: string[]): void {
    tags.forEach(tag => {
      if (this.title.indexOf(tag) > -1) {
        this.title = this.title.split(tag)[1]
      }
    })
  }

  setTwitterHandleFromSocialLinks(socialLinks: string[]): void {
    const twitterLink = socialLinks.find(x => x.includes('twitter.com/'))
    if (twitterLink == null) {
      return
    }
    // twitterLink is in the form https://twitter.com/{blah}
    const twitterURL = new URL(twitterLink)
    this.twitterHandle = '@' + twitterURL.pathname.substring(1)
  }
}
