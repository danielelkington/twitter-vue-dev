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
    async sendTweet(tweetContent) {
        try {
            const res = await this.t.post('statuses/update', { status: tweetContent });
            this.context.log &&
                this.context.log.info(`Successfully sent tweet: ${res.data.id} with text: ${res.data.text}`);
        }
        catch (e) {
            this.context.log && this.context.log.error(e);
            throw e;
        }
    }
}
exports.Tweet = Tweet;
//# sourceMappingURL=tweet.js.map