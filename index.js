var Twit = require('twit');
var Config = require('./config');
const fs = require('fs');
const prompt = require('prompt-sync')();

var T = new Twit(Config);

//Getting Input for username and number of tweets.
const name = prompt('Whose tweets do you want to read?');
const num = prompt('How many tweets do you want to read?');
console.log(`Reading ${num} tweets from ${name}`);

let params = {
    q: `from: ${name}`,
    count: num
};

T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
    let tweets = data.statuses;
    console.log(tweets.length);
    for (let i = 0; i < tweets.length; i++) {
        console.log(`Tweet #${ i + 1 }\n `)
        console.log(tweets[i].text, '\n');
        //Writing the text of the tweets into a file. 
        fs.appendFile('tweetText.txt', tweets[i].text + '\n', (error) => {
            if (error) throw err;
        });

    }
}