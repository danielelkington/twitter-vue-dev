import Twit from 'twit'
import { Context } from 'azure-functions-ts-essentials'

// Thank you to Omar Sinan for assistance with Tweeting! https://dev.to/omarhashimoto/how-to-build-a-simple-twitter-bot-in-17-lines-ofcode-2aan
export class Tweet {
  private t: Twit
  private context: Context

  constructor(context: Context) {
    this.context = context
    this.t = new Twit({
      consumer_key: <string>process.env.twitter_consumer_key,
      consumer_secret: <string>process.env.twitter_consumer_secret,
      access_token: <string>process.env.twitter_access_token,
      access_token_secret: <string>process.env.twitter_access_token_secret
    })
  }

  async sendTweet(tweetContent: string) {
    try {
      const res = await this.t.post('statuses/update', { status: tweetContent })
      this.context.log &&
        this.context.log.info(
          `Successfully sent tweet: ${(<any>res.data).id} with text: ${
            (<any>res.data).text
          }`
        )
    } catch (e) {
      this.context.log && this.context.log.error(e)
      throw e
    }
  }
}
