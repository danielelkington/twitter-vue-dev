"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twit_1 = __importDefault(require("twit"));
// Thank you to Omar Sinan for assistance with Tweeting! https://dev.to/omarhashimoto/how-to-build-a-simple-twitter-bot-in-17-lines-ofcode-2aan
class Tweet {
    constructor(context) {
        this.context = context;
        this.t = new twit_1.default({
            consumer_key: process.env.twitter_consumer_key,
            consumer_secret: process.env.twitter_consumer_secret,
            access_token: process.env.twitter_access_token,
            access_token_secret: process.env.twitter_access_token_secret
        });
    }
    async tweetArticleIfNotYetTweeted(article) {
        if (await this.articleTweetExists(article.link)) {
            return;
        }
        // Construct article tweet
        const tweetContent = `${article.title}

{ ${article.twitterHandle || article.authorName} }
${article.link}`;
        await this.sendTweet(tweetContent);
    }
    async articleTweetExists(articleLink) {
        if (this.recentTweets == null) {
            // Get recent tweets
            const res = await this.t.get('statuses/user_timeline', {
                screen_name: process.env.twitter_bot_screen_name
            });
            this.recentTweets = res.data;
        }
        return (this.recentTweets.find(x => x.entities.urls.find((u) => u.expanded_url === articleLink)) != null);
    }
    async sendTweet(tweetContent) {
        const res = await this.t.post('statuses/update', { status: tweetContent });
        this.context.log &&
            this.context.log.info(`Successfully sent tweet: ${res.data.id} with text: ${res.data.text}`);
    }
}
exports.Tweet = Tweet;
//# sourceMappingURL=tweet.js.map