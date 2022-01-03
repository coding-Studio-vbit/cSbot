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
        
    else if(message.content.startsWith('!startt'))
    {
        console.log('daily news starts from now!!')
        message.reply("daily news start from now")
    dayt = 1000 * 6
    var mynews = setInterval(dailynews, dayt);

    // setInterval( 
        function dailynews(){ 
            
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
              if(message.content.startsWith('!stopdailynews'))
              {
                  clearInterval();
                  message.reply("daily news stopped")
              }
            }
            else{
                newsi = 0;
                message.channel.send("For more news, check from your browser OOF. Stop spamming the channel.")
            }
            newstime = 0;

        }); 
        }
    }
    else if(message.content.startsWith('!stopn'))
    {
        clearInterval(mynews)
    }
    if(message.content.startsWith('!startdailynews'))
        {
            console.log('daily news starts from now!!')
            message.reply("daily news start from now")
        dayt = 1000 * 60 * 60 * 24
        var mynews = setInterval(dailynews, dayt);
        if(message.content.startsWith('!stopnews'))
        {
            clearInterval(mynews)
        }
        // setInterval( 
            function dailynews(){ 
                
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
                if(message.content.startsWith('!stopdailynews'))
                {
                    clearInterval();
                    message.reply("daily news stopped")
                }
                }
                else{
                    newsi = 0;
                    message.channel.send("For more news, check from your browser OOF. Stop spamming the channel.")
                }
                newstime = 0;

            }); 
            }
        }
        else if (message.content.startsWith('!setnews')) {
            prefixk = '!setnews';
            const argn = message.content.slice(prefixk.length).split(' ');   
        let newstime = 0;
        argn.shift();
        if(argn[1] == 'hour' || argn[1] == 'hours')
                newstime = newstime + (Number(argn[0]) * 3600000);
            else if(argn[1] == 'minute' || argn[1] == 'minutes')
                newstime = newstime + (Number(argn[0]) * 60000);
                else{
                    message.reply("I'm sorry, I didn't quite get that. Here's the syntax:\n\n !setnews `<number>` `<hours/minutes>` \n\n Example: `!setnews 1 hour `");
                    return;
                }
              setTimeout(function(){ newsi = 0; }, 600000);
              
              setTimeout(function(){ 
              
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
                    newstime = 0;
        
                }); 
                }, newstime);
             }
});
