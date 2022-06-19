'use strict'

require('dotenv').config();
const { default: axios } = require('axios');
const { mainModule } = require("process");
const { TwitterApi } = require("twitter-api-v2");

const APP_KEY = process.env.TWITTER_API_KEY
const APP_SECRET = process.env.TWITTER_API_KEY_SECRET
const ACCESS_KEY = process.env.TWITTER_ABECKENT_ACCESS_TOKEN
const ACCESS_SECRET = process.env.TWITTER_ABECKENT_ACCESS_TOKEN_SECRET

const userid = 'discarded_past'
const url = 'https://discord.com/api/webhooks/988064655136149545/fz7dnRpaRx3my2X0mhx9xGi_Pk3bF23vMymIsxjZLGJmoTr-q2JbxdMdTNkvgC2y1Ka3';
const data = {content: userid + ' に新しい登録者です。'}

const client = new TwitterApi({
    appKey: APP_KEY,
    appSecret: APP_SECRET,
    accessToken: ACCESS_KEY,
    accessSecret: ACCESS_SECRET
});

async function main() {
    const search_result = await client.v1.searchUsers('@' + userid);
    if (search_result.users[0].friends_count > 1) {
        
        axios.post(url, data)
    }
}

main()