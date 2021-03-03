const Discord           = require('discord.js');
const client            = new Discord.Client();
const auth              = require('./auth.json');
const roasts            = require('./roasts.json');
const featuresList      = require('./featuresList.json');
const apiTokens         = require('./apiTokens.json');
const cfUserData        = require('./cfUserData.json');
const cf                = require('codeforces-api');
const fs                = require('fs');
const readline          = require('readline');
const {google}          = require('googleapis');
const to_human          = require('seconds-to-human');
const moment            = require('moment');
const SCOPES            = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const NewsAPI           = require('newsapi');
const newsapi           = new NewsAPI(apiTokens.newsApi);

const Contest = require('./contest');
const CFUser = require('./cfUser');

const TOKEN_PATH = 'token.json';
cf.setApis(apiTokens.cfTokenOne, apiTokens.cfTokenTwo);
let newsi = 0;


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


//----------------------------INTRO--------------------------------------------------------
client.on('message', message => {
    message.content = message.content.toLowerCase();

  if (message.content === '!intro') {
    let introReply = getIntroReply();
    message.reply(introReply);
  }

});

//----------------------------NEW CONTEST--------------------------------------------------------


client.on('message', message => {
    if (message.content === '!newcontest') {
        var ff = cf.contest.list({ gym: 'false' },function (err, data) {
            
            if (err) {
                console.log("Error bruh")
                return;
            }
            let contestList = getContestsData(data);
            let latestContest = contestList[contestList.length - 1]
            let messageBox = createEmbed(latestContest);
            message.reply(messageBox);
        });
    }
});


//-------------------------------CF Rating Leaderboard-----------------------------------------

//ADD NEW USERNAME IN cfUserData.json


client.on('message', message => {
    if (message.content === '!cfboard') {
        let cfUsers = getCfUserIds();
        cf.user.info({ handles: cfUsers } , function (err, data) {
            
            if (err) {
                message.channel.send("Error fetching the handle");
                console.log("Error");
                return;
            }
            let ratingsData = getRatings(data);
            let leaderBoard = getLeaderBoard(ratingsData); 
            message.channel.send(leaderBoard);
        });
    }
});

//-------------------------------------CF Problem Generator-------------------------------------------------
client.on('message', message => {

    message.content=message.content.toLowerCase();

    if (message.content.startsWith('!newproblem')) {
        let arg = message.content.split(' ');
        let replyMsg = getProblemLink(arg[1]);
        message.channel.send(replyMsg);    
    }    

    //-----------------------------------------Get a specific problem------------------------------------------------------------

    else if (message.content.startsWith('!getproblem')) {
        prefix = '!getproblem'
        const arg = message.content.slice(prefix.length).split(' ');
        let finalmsg = ''; 
        if((arg[1] > '1' || arg[1] < '1159') && ['a','b','c','d','e'].includes(arg[2]))
            message.channel.send(`\nHere's the link to the problem you requested. Happy Solving!\nhttp://codeforces.com/problemset/problem/${arg[1]}/${arg[2].toUpperCase()}/`);
        else
            message.channel.send("Such problem does not exist. WTH, is u drunk? Try again.");    
    }
    //else if(message.content.startsWith('!xdd')){
    //    var role = message.guild.roles.find(role => role.name === "team-alpha");
    //    message.member.addRole(role);
    //    console.log("alpha added")

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
                newsBox = getNewsBox(response);
                message.channel.send(newsBox);
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

    else if (message.content === '!insult') {
        let insults = roasts.list;
        let max = roasts.list.length;
        randint = Math.floor(Math.random()*(max+1));
        message.reply("\n" + insults[randint]);
  }
});


//==============================Misc========================================================



client.on('message', message => {

    message.content=message.content.toLowerCase();

    if (message.content === '!myavatar')
        message.channel.send("\n" + message.author.avatarURL);

    else if (message.content === '!enlargepp')
        if(message.channel.name !== 'random' )
            message.channel.send("Um, I'm sorry. But kindly refrain such stuff to #random");
        else
            message.channel.send("8=============D");
    

    else if (message.content === '!cum')
        if(message.channel.name !== 'random')
            message.channel.send("Um, I'm sorry. But kindly refrain such stuff to #random");
        else
            message.channel.send("8=============D :sweat_drops: ");

    else if (message.content === '!yay')
        message.channel.send("Yayyy, you did it! :beers: ");

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
  if (!message.guild) return;
  if (message.content.startsWith('!roast')) {
    let randi = Math.floor(Math.random()*(roasts.list.length));
    const user = message.mentions.users.first();
    if(message.channel.name !== 'random' && message.channel.name !== 'gb-senior-sdes'){
        message.channel.send("Um, I'm sorry. But kindly refrain such stuff to #random");
    }

    if (user == '<@590805821445898260>'){
            message.reply("Nice try, but I'm smart.");
    }
    else if (user) {
      
      const member = message.guild.member(user);
      
      if (member) {
        console.log(user);
        message.channel.send(` ${user} `+ roasts.list[randi]).catch(err => {
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

//========================================= MEMES ==================================================================

client.on('message', message => {
    if (!message.guild) return;
    const user = message.mentions.users.first();
    // Mock text without mentioning user.
    if (user === undefined) {
        if (message.content.startsWith('!mock')) {
            var msg = message.content;
            msg = msg.slice(6);
            const mock = new Discord.RichEmbed()
                .setColor('#eb2fde')
                .setTitle('Mock Machine')
                .setDescription(textMocker(msg))
                .setImage('https://i.imgur.com/pukl0DL.gif')
            message.channel.send(mock);
        }
    }
    else if (user.username) {
        const member = message.guild.member(user);
        // Mock text of mentioned user's last message.
        if (member) {
            if (message.content.startsWith('!mock')) {
                message.channel.fetchMessages({ limit: 10 }).then(messages => {
                    msg = Array.from(messages);
                    for (var i = 0; i < 10; i++) {
                        if (msg[i][1].author.username == user.username && !msg[i][1].content.startsWith("!")) {
                            message.channel.send(`${user}`);
                            const userMock = new Discord.RichEmbed()
                                .setColor('#eb2fde')
                                .setTitle('Mock Machine')
                                .setDescription(textMocker(msg[i][1].content))
                                .setImage('https://i.imgur.com/pukl0DL.gif')
                            message.channel.send(userMock);
                            break;
                        }
                    }
                })
            }
        }
    }
});

//=========================================Conversation===========================================

client.on('message', message=> {
    message.content=message.content.toLowerCase();
    let prefix = message.content;
    var argm = ["No","Yes"];
    if (message.isMentioned(client.user)) {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

    if(message.isMentioned(client.user) && message.content.includes('love you'))
        message.reply('No homo broski');

    else if(
        message.content.includes('how are you') ||
        message.content.includes('how r u') ||
        message.content.includes('how\'re you') ||
        message.content.includes('how\'re u')
    )
        message.reply(', Perfectly coded, badly indentated. :(');

    else if(message.content.includes('who\'re you') || message.content.includes('who are you')){
        message.reply(' I\'m a perfectly coded, badly indentated bot');}


    else if(message.content.includes('?')){
        iter=Math.floor(Math.random()*2);
        if(iter==0)
            message.reply(argm[0]);
        else 
            message.reply(argm[1]);
    }

    else if(insultedBot(message.content))
        if(message.channel.name !== 'random')
            message.channel.send("Um, I'm sorry. But kindly refrain such stuff to #random");
        else
            message.reply('don\'t insult ass, I\'m more productive than you');


    else if(message.content.includes('sup')){
        message.reply('fan');}
    else if(message.content.includes('hi')){
        message.reply('Hi nibba');}
    else if(message.content.includes('hey')){
        message.reply('Heyy!!');}
    else if(message.content.includes('hello')){
        message.reply('Hello!!');}
    else if(message.content.includes('hai')){
        message.reply('Haai!!');}
    else if(message.content.includes('hoi')){
        message.reply('Hola!');}
    else if(message.content.includes('what\'s up')){
        message.reply('ceiling');}
    else if(message.content.includes('wassup')){
        message.reply('sky');}
    else message.channel.send("...", {files: ["https://imgur.com/8s1YEfH.jpg"]});
    }
});

//-----------------------------------functions--------------------------------------------------------------
getIntroReply = () => {
    let reply = "Hey there! I\'m the Bot for coding.Studio(); \n----------------------------------------------------\n**Ver: v1.5.1**\n----------------------------------------------------\n" 
    for(let i =0; i<featuresList.length; i++) {
        feature = featuresList[i]
        reply = reply + `\`${feature.name}\`    :   \`${feature.description}\`\n`
    }
    return reply + '\nCreators:\ngithub.com/Saravanan-Jodavula\ngithub.com/akylus\n';
}

createEmbed = (contest) => {
    return exampleEmbed = new Discord.RichEmbed()
        .setColor('#eb2fde')
        .setTitle(`${contest.name}`)
        .setURL(`http://codeforces.com/contests/${contest.id}`)
        .addField('Starts in', `${contest.date}`, true)
        .addField('Duration', `${contest.duration}`, true)
}

getContestsData = (data) => {
    let flag = true;
    let i = 0;
    let contestList = [];
    
    while(flag){
        var contest = new Contest("","","","");
        if(data[i].phase === 'BEFORE'){

            let today = new Date();
            let epoch = moment(today).unix();
            startDate = to_human(data[i].startTimeSeconds - epoch);
            duration = to_human(data[i].durationSeconds);
            
            contest.name = data[i].name;
            contest.id = data[i].id;
            contest.date = startDate
            contest.duration = duration
            contestList.push(contest);

        }
        else flag = false;
        i++;
    }
    return contestList;
}

getCfUserIds = () => {
    let cfuser = [];
    for(let i =0; i<cfUserData.length; i++) {
        cfuser.push(cfUserData[i].id)
    }
    cfuser = cfuser.join(';')
    return cfuser
}

getRatings = (data) => {
    let ratings = [];
    let cfucount = cfUserData.length; 

    for(i=0;i<cfucount;i++){
        let user = new CFUser("", "") 
        if (typeof data[i].rating === "undefined")
            user.rating = 0;
        else 
            user.rating = data[i].rating;
        user.handle = data[i].handle;
        ratings.push(user);
    }
    ratings.sort((a, b) => (a.rating < b.rating) ? 1 : -1)
    return ratings;
}

getLeaderBoard = (ratingsData) => {
    let reply = `\`\`\`\n`;
    reply = reply + "Pos\tRating\t\tName\n";
    for(i=0; i < cfUserData.length; i++) {
        reply = reply + `\n${i+1}\t\t${ratingsData[i].rating}\t\t\t${ratingsData[i].handle}\n`;
    }
    reply += `\n\`\`\``
    return reply;
}

getProblemLink  = (arg) => {
    let probmax = 1159;
    let probmin = 1;
    let difficulties = ['a','b','c','d','e']
    let randint = 0;
    randint = Math.floor(Math.random()*(probmax-probmin+1)+probmin);
    randomLetter = randint % 5
    if(difficulties.includes(arg))
        replyMsg = createCFEmbed(
            `${randint}/${arg.toUpperCase()}`,
            `http://codeforces.com/problemset/problem/${randint}/${arg.toUpperCase()}/`,
            ""
        );
    else
        replyMsg = createCFEmbed(
            `${randint}/${difficulties[randomLetter].toUpperCase()}`,
            `http://codeforces.com/problemset/problem/${randint}/${difficulties[randomLetter].toUpperCase()}/`,
            "You may enter a desired difficulty"
        );
    return replyMsg
}


createCFEmbed = (title, link, footer) => {
    return exampleEmbed = new Discord.RichEmbed()
    .setColor('#000')
    .setTitle(`${title}`)
    .setURL(`${link}`)
    .setDescription("⬆ Here's a problem for you to try")
    .setFooter(footer);
}

getNewsBox = (response) => {
    news = []
    news.push(response.articles[newsi].title);
    if(response.articles[newsi].description)
    news.push(response.articles[newsi].description);
    if(response.articles[newsi].url)
    news.push(response.articles[newsi].url);
    return(createNewsEmbed(news))

}
createNewsEmbed = (news) => {
    return exampleEmbed = new Discord.RichEmbed()
        .setColor('#00ff00')
        .setTitle(`${news[0]}`)
        .setURL(`${news[2]}`)
        .setDescription(`${news[1]}`)
}

insultedBot = (msgContent) => {
    var botInsults = ['bich', 'FU', 'bitch', 'bhadve', 'bhadwe', 'lanje', 'useless', 'fuck', 'lame', 'gay bot', 'retard', 'stupid', 'idiot', 'frick']
    for(let i = 0; i<botInsults.length; i++) {
        if(msgContent.includes(botInsults[i])) return true
    }
    return false
}

// Function that returns a mockified version of the input string passed to it.
textMocker = (message) => {
    let newWord = '';
    const word = message;
    let upperNum = 0;
    const mid = 0.5;
    for (var i = 0; i < word.length; i++) {
        if (word[i] === ' ') {
            newWord += word[i];
            continue;
        }
        let diff = Math.pow(mid, Math.abs(upperNum));
        let num = mid;
        if (upperNum >= 0) {
            num = 1 - diff;
        } else {
            num = diff;
        }
        const rand = Math.random();
        const isUpper = rand > num;
        upperNum += isUpper ? 1 : -1;
        newWord += (isUpper) ? word[i].toUpperCase() : word[i].toLowerCase();
    }
    return newWord;
}

// Function that returns a random number from 0 to max-1 (both inclusive)
getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

client.login(auth.token);
