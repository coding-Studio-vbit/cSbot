const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const cf = require('codeforces-api');
var to_human = require ('seconds-to-human');
var moment = require('moment');
cf.setApis('77de4c265de80e74972746be6cdb6043ba288645', '002774217bc19a46df37586287ecb0c015e3cb75');


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

//----------------------------INTRO--------------------------------------------------------
client.on('message', msg => {
  if (msg.content === '!intro') {
    msg.reply('Hey there! I\'m the Bot for coding.Studio();\n' 
            + "intro : Gives an intro\n"
            + "insult : basic insult on cS\n"
            + "myavatar : Image of your avatar (why do you even need this?)\n"
            + "roast : roast a friend\n"
            + "newcontest : Gives info about the latest codeforces contest\n");
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

//----------------------------AVATAR--------------------------------------------------------

client.on('message', message => {
  // If the message is "what is my avatar"
  if (message.content === '!myavatar') {
    // Send the user's avatar URL
    message.channel.send("\n" + message.author.avatarURL);
  }
});

//==============================Roast========================================================



client.on('message', message => {
  // If the message is "what is my avatar"
  if (message.content === '!enlargePP') {
    // Send the user's avatar URL
    message.channel.send("=============D");
  }
});

client.on('message', message => {
  // If the message is "what is my avatar"
  if (message.content === '!cum') {
    // Send the user's avatar URL
    message.channel.send("=============D :sweat_drops: ");
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
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // If the message content starts with "!kick"
  if (message.content.startsWith('!roast')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        message.channel.send(` ${user} `+ roasts[randi]).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to kick the member,
          // either due to missing permissions or role hierarchy
          message.channel.send('I was unable to roast the member');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.channel.send('That user isn\'t in this guild!');
      }
    // Otherwise, if no user was mentioned
    } else {
      message.channel.send('You didn\'t mention the user to roast!');
    }
  }
});
//=========================================ROAST===========================================



//----------------------------NEW CONTEST--------------------------------------------------------


client.on('message', msg => {
  if (msg.content === '!newcontest') {
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
            msg.reply("\nHere's the information on the latest contest on CodeForces." 
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

//-------------------------------------CF Contest Auto-checker-------------------------------------------------
setInterval(
  function(){
    console.log("Hello");
    return;


  }, 1000);

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
            msg.reply("\nHere's the information on the latest contest on CodeForces." 
                + "\nContest: " + finalarr[finalarr.length-1][0] 
                + "\nStarts in: " + finalarr[finalarr.length-1][1] 
                + "\nDuration: " + finalarr[finalarr.length-1][2] 
                + `\nRegister here: http://codeforces.com/contests/${finalarr[finalarr.length-1][3]}`);

    });


client.login(auth.token);