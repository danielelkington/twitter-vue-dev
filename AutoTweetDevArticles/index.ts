import Xray from 'x-ray'
import { Article } from './Article'
import { Tweet } from './tweet'
import { Context } from 'azure-functions-ts-essentials'

export const index = async (context: Context, req: any) => {
  // Thanks to Sarthak Sharma, particularly https://github.com/sarthology/devtocli/blob/master/src/util/crawler.js
  // for assistance with web scraping!
  const xray = Xray()
  const articleScrapeData = await xray(
    `https://dev.to/t/${process.env.dev_tag}/latest`,
    '#substories .single-article',
    [
      {
        title: '.index-article-link .content h3',
        author: 'h4 a',
        link: '.index-article-link@href',
        tags: ['.tags .tag'], // need the tags so we can strip them out of the title
        authorLink: '.small-pic-link-wrapper@href'
      }
    ]
  )
  const articles: Article[] = articleScrapeData
    .filter((x: any) => x.title && x.author && x.link)
    .map(
      (x: any) => new Article(x.title, x.author, x.link, x.tags, x.authorLink)
    )
  const tweet = new Tweet(context)
  // Scrape author Twitter handles
  for (let article of articles) {
    const socialLinks: string[] = await xray(article.authorLink, [
      '.profile-details .social a@href'
    ])
    article.setTwitterHandleFromSocialLinks(socialLinks)

    // Tweet articles if they're not yet tweeted!
    await tweet.tweetArticleIfNotYetTweeted(article)
  }
}
