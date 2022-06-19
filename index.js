'use strict'

require('dotenv').config();
const { default: axios } = require('axios');
const { writeFileSync, readFileSync } = require('fs');
const { TwitterApi } = require("twitter-api-v2");
const cron = require("node-cron")

const APP_KEY = process.env.TWITTER_API_KEY
const APP_SECRET = process.env.TWITTER_API_KEY_SECRET
const ACCESS_KEY = process.env.TWITTER_ABECKENT_ACCESS_TOKEN
const ACCESS_SECRET = process.env.TWITTER_ABECKENT_ACCESS_TOKEN_SECRET

const userid = 'discarded_past'
const url = 'https://discord.com/api/webhooks/988132197288534026/5pUbeO2atp1qaUHF2jDsWCqdRIvxl2OXV_aZHxvdqDrw_KZP0xT_Cv1VLjGH7sY0Uj4q';

const client = new TwitterApi({
    appKey: APP_KEY,
    appSecret: APP_SECRET,
    accessToken: ACCESS_KEY,
    accessSecret: ACCESS_SECRET
});

async function main() {
    const search_result = await client.v1.searchUsers('@' + userid);
    const num = parseInt(readFileSync('count.txt'))
    const friends_count = search_result.users[0].friends_count
    if (friends_count > num) {
        const data = {content: userid + ' の現在のフォロー数は ' + String(friends_count) + ' です。'}
        axios.post(url, data)
        writeFileSync('count.txt', String(num+1))
    }
}

cron.schedule('*/5 * * * *', () => main())