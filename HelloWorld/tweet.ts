import Twit from 'twit'
import { Article } from './article'
import { Context } from 'azure-functions-ts-essentials'

// Thank you to Omar Sinan for assistance with Tweeting! https://dev.to/omarhashimoto/how-to-build-a-simple-twitter-bot-in-17-lines-ofcode-2aan
export class Tweet {
  private t: Twit
  private context: Context
  private recentTweets?: any[]

  constructor(context: Context) {
    this.context = context
    this.t = new Twit({
      consumer_key: <string>process.env.twitter_consumer_key,
      consumer_secret: <string>process.env.twitter_consumer_secret,
      access_token: <string>process.env.twitter_access_token,
      access_token_secret: <string>process.env.twitter_access_token_secret
    })
  }

  async tweetArticleIfNotYetTweeted(article: Article) {
    if (await this.articleTweetExists(article.link)) {
      return
    }
    // Construct article tweet
    const tweetContent = `${article.title}

{ ${article.twitterHandle || article.authorName} }
${article.link}`
    await this.sendTweet(tweetContent)
  }

  private async articleTweetExists(articleLink: string): Promise<boolean> {
    if (this.recentTweets == null) {
      // Get recent tweets
      const res = await this.t.get('statuses/user_timeline', {
        screen_name: process.env.twitter_bot_screen_name
      })
      this.recentTweets = <any[]>res.data
    }
    return (
      this.recentTweets.find(x =>
        x.entities.urls.find((u: any) => u.expanded_url === articleLink)
      ) != null
    )
  }

  private async sendTweet(tweetContent: string) {
    const res = await this.t.post('statuses/update', { status: tweetContent })
    this.context.log &&
      this.context.log.info(
        `Successfully sent tweet: ${(<any>res.data).id} with text: ${
          (<any>res.data).text
        }`
      )
  }
}
