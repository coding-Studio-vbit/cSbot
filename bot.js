const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const cf = require('codeforces-api');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
var to_human = require ('seconds-to-human');
var moment = require('moment');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';
cf.setApis('ce94dd676da629401f639a69c9b027e4bdd9ce8b', 'b3dc63006c8192c707d46542fd27a5b81c6a05d3');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('96694c14f44e4ceda4574ff16e0fa081');
let newsi = 0;
var chkrcontest;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});




//----------------------------INTRO--------------------------------------------------------
client.on('message', message => {
    message.content = message.content.toLowerCase();
  if (message.content === '!intro') {
    console.log(message.channel.id);
    message.reply('Hey there! I\'m the Bot for coding.Studio(); \n----------------------------------------------------\n**Ver: v2.3.5**\n----------------------------------------------------\n' 
            + "`intro`   : Gives an intro\n"
            + "`insult` : basic insult on yourself\n"
            + "`myavatar` : Image of your avatar (why do you even need this?)\n"
            + "`roast` : roast a friend\n"
            + "`payrespects` : Tag a member to pay him respects\n----------------------------------------------------\n"
            + "`techtoday` : Top news in the Tech world today (beta)\n"
            + "`progboard` : Solved Problems Leaderboard\n"
            + "`cfboard` : Codeforces Rating Leaderboard\n"
            + "`getproblem` : Can be used to get the CF link to a problem (Ex: !getproblem 122 A)\n"
            + "`newproblem` : Can be used to get a random problem of chosen difficulty (Ex: !newproblem B)\n"
            + "`xtreme` : Can be used to give a random problem of chosen difficulty to a random person (Ex: !xtreme B)\n"
            + "`newcontest` : Gives info about the latest codeforces contest\n"
            + "`remindme` : Gives you a reminder after the said time. (Ex: !remindme 2 hours Eat food)\n");
  }
});




//--------------------------------Sheets API Setup--------------------------------------------

client.on('message', message => {

    message.content=message.content.toLowerCase();

    if (message.content === '!progboard'){
        excel = "\`\`\`------------------------------------------------------\n";
        fs.readFile('credentials.json', (err, content) => {
          if (err) return console.log('Error loading client secret file:', err);
          // Authorize a client with credentials, then call the Google Sheets API.
          authorize(JSON.parse(content), listMajors);
        });


        function authorize(credentials, callback) {
          const {client_secret, client_id, redirect_uris} = credentials.installed;
          const oAuth2Client = new google.auth.OAuth2(
              client_id, client_secret, redirect_uris[0]);

          // Check if we have previously stored a token.
          fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) return getNewToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client);
          });
        }

        /**
         * Get and store new token after prompting for user authorization, and then
         * execute the given callback with the authorized OAuth2 client.
         * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
         * @param {getEventsCallback} callback The callback for the authorized client.
         */
        function getNewToken(oAuth2Client, callback) {
          const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
          });
          console.log('Authorize this app by visiting this url:', authUrl);
          const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
          });
          rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
              if (err) return console.error('Error while trying to retrieve access token', err);
              oAuth2Client.setCredentials(token);
              // Store the token to disk for later program executions
              fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
              });
              callback(oAuth2Client);
            });
          });
        }

        /**
         * Prints the names and majors of students in a sample spreadsheet:
         * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
         * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
         */
        function listMajors(auth) {
          const sheets = google.sheets({version: 'v4', auth});
          sheets.spreadsheets.values.get({
            spreadsheetId: '18k3bTwGYTroEGj0lqs6sb0ld_UdHrPM1B9EdnGMD9Fs',
            range: 'Leaderboard(main)!A3:D',
          }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const rows = res.data.values;
            if (rows.length) {
              // Print columns A and E, which correspond to indices 0 and 4.

              excel = excel + "Pos\tSolved\t\tName\n";
              let i = 1;
              rows.map((row) => {
                console.log(`${row[3]}, ${row[0]}`);
                excel = excel + `\n${i}\t\t${row[3]}\t\t\t${row[0]}`;
                i++;
              });

            excel = excel + `\n------------------------------------------------------\`\`\``;
            message.channel.send(excel);
            //message.channel.send(`Veri naise, ${rows[0][0]}! Keep it up.`)
            }
            else {
              console.log('No data found.');
            }
          });
        }

    }
        





//----------------------------NEW CONTEST--------------------------------------------------------



  else if (message.content === '!newcontest') {
    var ff = cf.contest.list({ gym: 'false' },function (err, data) {
     
        if (err) {
            console.log("Error bruh"); 
        } 
        var flag = 1;
        var i = 0;
        var fff;
        var finalarr = [];
        console.log(data[i].startTimeSeconds);
        // if(data.phase)
        while(flag){
            var chillar = [];
            if(data[i].phase === 'BEFORE'){
                chillar.push(data[i].name);

                let today = new Date();
                var epoch = moment(today).unix();
                fff = data[i].startTimeSeconds - epoch;
                startDate = to_human(fff);
                chillar.push(startDate);

                duration = to_human(data[i].durationSeconds);
                chillar.push(duration);
                chillar.push(data[i].id);

                finalarr.push(chillar);
            }
            else
                flag = 0;
            i++;
        }
        console.log(finalarr);
            message.reply("\nHere's the information on the latest contest on CodeForces." 
                + "\nContest: " + finalarr[finalarr.length-1][0] 
                + "\nStarts in: " + finalarr[finalarr.length-1][1] 
                + "\nDuration: " + finalarr[finalarr.length-1][2] 
                + `\nRegister here: http://codeforces.com/contests/${finalarr[finalarr.length-1][3]}`);

    });
}
});


//-------------------------------CF Rating Leaderboard-----------------------------------------

//ADD NEW USERNAME SEPERATED BY ';'
let cfuser = 'chaitanya735;akshayrajp;akylus;themohan;sookah.bliyat;mohith_ciga;eyeam_kd;saravanan_jodavula';
let cfucount = 8;  //INCREMENT CFUCOUNT WHENEVER A NEW USERNAME ADDED TO ABOVE LIST

client.on('message', message => {

    if (message.content === '!cfboard') {
        let finalmsg = `\`\`\`\n-------------------------------------------------------\n`;
        let ratings = [];
        let chillar = [];
        var kk = cf.user.info({ handles: cfuser } , function (err, data) {

            if (err) {
                message.channel.send("Error fetching the handle");
                console.log("Error");
                //break;
                //handle error and return
            }

            for(i=0;i<cfucount;i++){
                if (typeof data[i].rating === "undefined") {
                    chillar.push('0\t');
                } 
                else          
                    chillar.push(data[i].rating);
                chillar.push(data[i].handle);
                ratings.push(chillar);
                chillar = []
            }

            
            //console.log(ratings);
            let newr = ratings.sort(function(a,b) {
                return a[0] - b[0];
            });
            //console.log(newr);
            finalmsg = finalmsg + "Pos\tRating\t\tName\n";
            for(i=cfucount-1; i>-1; i--) {
                finalmsg = finalmsg + `\n${cfucount-i}\t\t${ratings[i][0]}\t\t\t${ratings[i][1]}\n`;
            }

            finalmsg = finalmsg + `-------------------------------------------------------\`\`\``;
            message.channel.send(finalmsg);
            return 0;
        });
    }
});

//-------------------------------------CF Problem Generator-------------------------------------------------
client.on('message', message => {

    message.content=message.content.toLowerCase();

    if (message.content.startsWith('!newproblem')) {
        prefix = '!what'
        let probmax = 1159;
        let probmin = 1;
        const arg = message.content.slice(prefix.length).split(' ');
        let finalmsg = '';
        let randi = 0;
        if(arg.length < 3)
            if(arg.length < 2)
                finalmsg = "\nEnter a difficulty level you want to try and try again.";
            else
                finalmsg = "\nHere's a problem for you to try:";
        else
            finalmsg = "\nHere's a few problems for you to try:";
        for(i=1;i<arg.length;i++){
            arg[i] = arg[i].toLowerCase();
            //console.log(arg[i]);
            randi = Math.floor(Math.random()*(probmax-probmin+1)+probmin);
            if(arg[i] === 'a' || arg[i] === 'b' || arg[i] === 'c' || arg[i] === 'd' || arg[i] === 'e')
                finalmsg = finalmsg + `\nhttp://codeforces.com/problemset/problem/${randi}/${arg[i].toUpperCase()}/`;
            else
                finalmsg = finalmsg + `\nhttp://codeforces.com/problemset/problem/${randi}/E/\n(What did you even type?)`;

        }

        message.channel.send(finalmsg);    
    }

    //-----------------------------------------XTREME Prep-----------------------------------------------------------------------

    else if (message.content.startsWith('!xtreme')) {
        prefix = '!xtreme'
        let probmax = 1159;
        let probmin = 1;
        let  membarray = [];
        const arg = message.content.slice(prefix.length).split(' ');
        let finalmsg = '';
        let members = message.guild.members;
        members.forEach((member, key) => {
            if(member.id != '590805821445898260' || member.id != '537554206899437579')      //This is ALAN, hence skip
                membarray.push(member.id)
        });
        // console.log(membarray);
        var probsolver = membarray[Math.floor(Math.random()*membarray.length)];

        let randi = 0;
        if(arg.length < 3)
            if(arg.length < 2)
                finalmsg = "\nEnter a difficulty level you want to try and try again.";

            else{
                message.channel.send(`<@${probsolver}> , \`\`\`You have been (randomly) selected as the solver for this problem.\nYou have exactly 20 minutes. All the best!\n\`\`\``);    
                finalmsg = "\nHere's the problem for you to try:";
            }

        else
            finalmsg = "\nHere's a few problems for you to try:";
        for(i=1;i<arg.length;i++){
            arg[i] = arg[i].toLowerCase();
            //console.log(arg[i]);
            randi = Math.floor(Math.random()*(probmax-probmin+1)+probmin);
            if(arg[i] === 'a' || arg[i] === 'b' || arg[i] === 'c' || arg[i] === 'd' || arg[i] === 'e')
                finalmsg = finalmsg + `\nhttp://codeforces.com/problemset/problem/${randi}/${arg[i].toUpperCase()}/`;
            else
                finalmsg = finalmsg + `\nhttp://codeforces.com/problemset/problem/${randi}/E/\n(What did you even type?)`;

        }
  
        message.channel.send(finalmsg);    
    }    

    //-----------------------------------------Get a specific problem------------------------------------------------------------

    else if (message.content.startsWith('!getproblem')) {
        prefix = '!getproblem'
        const arg = message.content.slice(prefix.length).split(' ');
        let finalmsg = '';
        if((arg[1] > '1' || arg[1] < '1159') && (arg[2] === 'a' || arg[2] === 'b' || arg[2] === 'c' || arg[2] === 'd' || arg[2] === 'e'))
            message.channel.send(`\nHere's the link to the problem you requested. Happy Solving!\nhttp://codeforces.com/problemset/problem/${arg[1]}/${arg[2].toUpperCase()}/`);
        else
            message.channel.send("Such problem does not exist. WTH, is u drunk? Try again.");    
    }


//---------------------------------------------------Tech News-----------------------------------------------------------

    else if (message.content.startsWith('!techtoday')) {

    setTimeout(function(){ newsi = 0; }, 600000);
        newsapi.v2.topHeadlines({
          category: 'technology',
          language: 'en',
          country: 'in'
        }).then(response => {
            newsi++;
            if(newsi < 5){
              console.log(newsi)
              news = `.\n \`${response.articles[newsi].title} \` \n`;
              console.log(response.articles[newsi].description);
              if(response.articles[newsi].description)
                  news = news + "\`\`\`\n" + response.articles[newsi].description + "\`\`\`\n";
              if(response.articles[newsi].url)
                  news = news + response.articles[newsi].url + "\n";
              message.channel.send(news);
            }
            else{
                newsi = 0;
                message.channel.send("For more news, check from your browser OOF. Stop spamming the channel.")
            }

        }); 
    }


//----------------------------------------------Set Reminder-------------------------------------------------


    else if (message.content.startsWith('!remindme')) {
        prefix = '!remindme'
        const arg = message.content.slice(prefix.length).split(' ');
        let time = 0;
        arg.shift();
        console.log(arg);
        if(arg[1] == 'hour' || arg[1] == 'hours')
            time = time + (Number(arg[0]) * 3600000);
        else if(arg[1] == 'minute' || arg[1] == 'minutes')
            time = time + (Number(arg[0]) * 60000);
        else{
            message.reply("I'm sorry, I didn't quite get that. Here's the syntax:\n\n !remindme `<number>` `<hours/minutes>` `<Text to remind>`\n\n Example: `!remindme 1 hour I am dumb`");
            return;
        }

        let msg = "";
        for(i=2; i<arg.length; i++){
            msg = msg + arg[i] + " ";
        }

        message.channel.send("Reminder set successfully.")
        setTimeout(function(){ message.reply(`Here's your reminder: ${msg}`); }, time);    
    }

});









//----------------------------INSULT--------------------------------------------------------
let roasts = ["You're so Ugly, hello kitty said goodbye to you",
                "You're so fat, the only letters of alphabet you know are K,F,C",
                "Why don't you check up on VBIT Marketplace and see if they have life for a sale",
                "You are as useless as a semicolon in Python.",
                "why can't you npm uninstall life? cuz you don't have one",
                "As an outsider, what do you think of the human race?"];

let insults = ["public void youTryToGetGirlfriend()\n{\n    throw new TooUglyException()\n}",
                "Bool SadAndAlone=1;\nwhile (SadAndAlone==1)\n{\n\tFap();\n\tCry();\n\tAge();\n}",
                "I bet the number of text editors you have is greater than the number of girls that crush on you.",
                "You are as useless as a semicolon in Python.",
                "Maybe you should write a program once in a while rather than wasting your time with a BOT. OOF.",
                "I would rate your effort in wasting time a C++",
                "I rather not give any insult, your face is doing that for you on a daily basis."];

let min = 0;
let max = 7;
let counter = 0;
let visited = []
for(i=0; i<max; i++){
    visited.push(0);
}


client.on('message', msg => {
  if (msg.content === '!insult') {
    while(1) {
        randi = Math.floor(Math.random()*(max-min+1)+min);
        if(visited[randi] === 0){
            visited[randi] = 1;
            counter ++;
            break
        }
        if ((counter) > 6) {
            visited = []
            for(i=0; i<max; i++){
                visited.push(0);
            }
        }
    }
// console.log("CHEkc");
    msg.reply("\n" + insults[randi]);
  }
});


//==============================Roast========================================================



client.on('message', message => {

    message.content=message.content.toLowerCase();

    if (message.content === '!myavatar')
        message.channel.send("\n" + message.author.avatarURL);

    else if (message.content === '!enlargePP'){
        if(message.channel.name !== 'random')
            message.channel.send("Um, I'm sorry. But kindly refrain such stuff to #random");
        else
            message.channel.send("8=============D");
    }

    else if (message.content === '!cum')
        if(message.channel.name !== 'random')
            message.channel.send("Um, I'm sorry. But kindly refrain such stuff to #random");
        else
            message.channel.send("8=============D :sweat_drops: ");

    else if (message.content === '!yay')
        message.channel.send("Yayyy, you did it! :dab:");

    else if (message.content.startsWith('!payrespects')) {
        let user = message.mentions.users.first();
        if (user != '<@590805821445898260>'){
            console.log(` ${user}`);
            message.channel.send(` ${user}, here's an F for you \n _____ _ __ _ __ _ __ __ ___ _ _ _ _ ___\n|\n|\n|\n| _____ _ __ _ __ _ __ __ ___ _ _ _ _ \n|\n|\n|\n|  `);
        }
        else{
            console.log(` ${user}`);
            message.channel.send(` Here's an F for me :pensive: \n _____ _ __ _ __ _ __ __ ___ _ _ _ _ ___\n|\n|\n|\n| _____ _ __ _ __ _ __ __ ___ _ _ _ _ \n|\n|\n|\n|  `);
        }
        return;
    }
});




//================================ROAST===================================================

client.on('message', message => {

 while(1) {
        randi = Math.floor(Math.random()*(max-min+1)+min);
        if(visited[randi] === 0){
            visited[randi] = 1;
            counter ++;
            break
        }
        if ((counter) > 6) {
            visited = []
            for(i=0; i<max; i++){
                visited.push(0);
            }
        }
    }

  if (!message.guild) return;


  if (message.content.startsWith('!roast')) {
    const user = message.mentions.users.first();

    if (user == '<@590805821445898260>'){
            message.reply("Nice try, but I'm smarter now.");
    }
    else if (user) {
      
      const member = message.guild.member(user);
      
      if (member) {
        console.log(user);
        message.channel.send(` ${user} `+ roasts[randi]).catch(err => {
          message.channel.send('I was unable to roast the member');
          console.error(err);
        });
      } else {
        message.channel.send('That user isn\'t in this guild!');
      }
    } else {
      message.channel.send('You didn\'t mention the user to roast!');
    }
  }
});
//=========================================ROAST===========================================




client.on('message', message=> {
    message.content=message.content.toLowerCase();
    let prefix = message.content;
    if (message.isMentioned(client.user)) {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

    if(message.isMentioned(client.user) && message.content.includes('love you'))
        message.reply('No homo');

    else  if(message.content.includes('useless') ||
            message.content.includes('lame') ||
            message.content.includes('retard') ||
            message.content.includes('stupid') ||
            message.content.includes('idiot') ||
            message.content.includes('waste bot'))
        if(message.channel.name !== 'random')
            message.channel.send("Um, I'm sorry. But kindly refrain such stuff to #random");
        else
            message.reply('don\'t insult, I\'m more productive than you');

else if(message.content.includes('sup')){
    message.reply('fan');}
else if(message.content.includes('hi')){
    message.reply('Hi nibba');}
else if(message.content.includes('what\'s up')){
    message.reply('ceiling');}
else if(message.content.includes('wassup')){
    message.reply('sky');}
else if(message.content.includes('!payrespects')){
    return;}
else if(message.content.includes('!roast')){
    return;}
else if(message.content.includes('how are you') ||
        message.content.includes('how r u') ||
        message.content.includes('how\'re you') ||
        message.content.includes('how\'re u'))
    message.reply('perfectly coded,badly indentated');

else if(message.content.includes('who\'re you') || message.content.includes('who are you')){
    message.reply('I\'m a perfectly coded, badly indentated bot');}
else {
    message.channel.send("...", {files: ["https://imgur.com/8s1YEfH.jpg"]});

   }
}
});




client.login(auth.token);
