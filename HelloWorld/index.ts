const Xray = require('x-ray')
import {Article} from './Article'
export const index = async (context: any, req: any) => {
  // Thanks to Sarthak Sharma, particularly https://github.com/sarthology/devtocli/blob/master/src/util/crawler.js
  // for assistance with web scraping!
  const xray = Xray()
  const objects = await xray('https://dev.to/t/vue/latest', '#substories .single-article', [{
    title: '.index-article-link .content h3',
    author: 'h4 a',
    link: '.index-article-link@href',
    tags: ['.tags .tag'] // need the tags so we can strip them out of the title
  }])
  const articles = objects.filter((x:any) => x.title && x.author && x.link).map((x: any) => new Article(x.title, x.author, x.link, x.tags))
  // TODO get Twitter profile (parse URL to get username)
  context.res = {
    body: JSON.stringify(articles)
  }
}
