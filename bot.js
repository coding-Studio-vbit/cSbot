const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const cf = require('codeforces-api');
var to_human = require ('seconds-to-human');
var moment = require('moment');



client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

//----------------------------INTRO--------------------------------------------------------
client.on('message', message => {
  if (message.content === '!intro') {
    message.reply('Hey there! I\'m the Bot for coding.Studio();\n' 
            + "`intro` : Gives an intro\n"
            + "`insult` : basic insult on cS\n"
            + "`myavatar` : Image of your avatar (why do you even need this?)\n"
            + "`roast` : roast a friend\n"
            + "`payrespects` : Tag a member to pay him respects\n-------------------------------\n"
            + "`cfboard` : Codeforces Rating Leaderboard\n"
            + "`getproblem` : Can be used to get the CF link to a problem (Ex: !getproblem 122 A)\n"
            + "`newproblem` : Can be used to get the CF link to a random problem of chosen difficulty (Ex: !newproblem B)\n"
            + "`newcontest` : Gives info about the latest codeforces contest\n");
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

    else if (message.content === '!enlargePP')
        message.channel.send("8=============D");

    else if (message.content === '!cum')
        message.channel.send("8=============D :sweat_drops: ");

    else if (message.content === '!yay')
        message.channel.send("Yayyy, you did it! :dab:");

    else if (message.content.startsWith('!payrespects')) {
        let user = message.mentions.users.first();
        message.channel.send(` ${user}, here's an F for you \n _____ _ __ _ __ _ __ __ ___ _ _ _ _ ___\n|\n|\n|\n| _____ _ __ _ __ _ __ __ ___ _ _ _ _ \n|\n|\n|\n|  `);
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
    if (message.author.bot){
        message.channel.send('Won\'t roast myself, fool. Goteeeeeem :dab:');
        return;
    }

    const user = message.mentions.users.first();
    if (user) {
      
      const member = message.guild.member(user);
      
      if (member) {
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

//hiiii


client.on('message', message=> {
    message.content=message.content.toLowerCase();
    let prefix = message.content;
    if (message.isMentioned(client.user)) {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

    if(message.content.includes('love you')){
        message.reply('No homo nigga');
    }
    else  if(message.content.includes('bich'))
    {
        message.reply('don\'t insult bhadwe, I\'m more productive than you');
    }
    else  if(message.content.includes('useless'))
    {
        message.reply('don\'t insult bhadwe, I\'m more productive than you');
    }
    else  if(message.content.includes('FU'))
    {
        message.reply('don\'t insult bhadwe, I\'m more productive than you');
    }
    else  if(message.content.includes('fuck'))
    {
        message.reply('don\'t insult bhadwe, I\'m more productive than you');
    }
    else  if(message.content.includes('retard'))
    {
        message.reply('don\'t insult bhadwe, I\'m more productive than you');
    }
    else  if(message.content.includes('stupid bot'))
    {
        message.reply('don\'t insult bhadwe, I\'m more productive than you');
    }
    else if(message.content.includes('stupid'))
    {
        message.reply('don\'t insult bhadwe, I\'m more productive than you');
    }
    else if(message.content.includes('frick'))
    {
        message.reply('don\'t insult bhadwe, I\'m more productive than you');
    } 
    else if(message.content.includes('hi'))
    {
    message.reply('Hi niBBa');
    }
    else if(message.content.includes('hello'))
    {
    message.reply('Hello brah');
    }
    else if(message.content.includes('Hello'))
    {
    message.reply('Hello brah');
    }
    else if(message.content.includes('hii')){
       message.reply('how you doin?');
    }
else if(message.content.includes('hiii')){
    message.reply('btw, you\'re texting a bot :expressionless: get a gf newb');
    }
else if(message.content.includes("hiiii")){
    message.reply('what are you? a cringy 14 YO?');}
else if(message.content.includes('sup')){
    message.reply('fan');}
else if(message.content.includes('what\'s up')){
    message.reply('ceiling');}
else if(message.content.includes('wassup')){
    message.reply('sky');}
else if(message.content.includes('lame')){
    message.reply('not lamer than you');}
 else  if(message.content.includes('gay bot')){
    message.reply('no u');}
 else if(message.content.includes('how are you')){
    message.reply('perfectly coded,badly indentated');}
  else if(message.content.includes('how\'re you')){
    message.reply('perfectly coded, badly indentated');}
     else if(message.content.includes('who\'re you')){
    message.reply('I\'m a perfectly coded, badly indentated bot');}
    else if(message.content.includes('who are you')){
    message.reply('I\'m a perfectly coded, badly indentated bot');}
   else {
    message.reply('I\'m a bot, You\'d think I\'d get that?');

   }
}
});


//----------------------------NEW CONTEST--------------------------------------------------------


client.on('message', message => {
  if (message.content === '!newcontest') {
    var ff = cf.contest.list({ gym: 'false' },function (err, data) {
     
        if (err) {
            console.log("Error bruh"); 
        } 
        var flag = 1;
        var i = 0;
        var fff;
        var finalarr = [];
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
let cfuser = 'chaitanya735;akshayrajp;akylus;themohan;sookah.bliyat;mohith_ciga;eyeam_kd';
let cfucount = 7;  //INCREMENT CFUCOUNT WHENEVER A NEW USERNAME ADDED TO ABOVE LIST

client.on('message', message => {

    if (message.content === '!cfboard') {
        let finalmsg = `\n-------------------------------------------------------\n`;
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

            finalmsg = finalmsg + `-------------------------------------------------------`;
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

    //-----------------------------------------Get a specific problem------------------------------------------------------------

    if (message.content.startsWith('!getproblem')) {
        prefix = '!getproblem'
        const arg = message.content.slice(prefix.length).split(' ');
        let finalmsg = '';
        if((arg[1] > '1' || arg[1] < '1159') && (arg[2] === 'a' || arg[2] === 'b' || arg[2] === 'c' || arg[2] === 'd' || arg[2] === 'e'))
            message.channel.send(`\nHere's the link to the problem you requested. Happy Solving!\nhttp://codeforces.com/problemset/problem/${arg[1]}/${arg[2].toUpperCase()}/`);
        else
            message.channel.send("Such problem does not exist. WTH, is u drunk? Try again.");    
    }

});


client.login(auth.token);
