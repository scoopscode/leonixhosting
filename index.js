const Discord = require('discord.js');
const {Client, Attachment, MessageEmbed} =
require('discord.js');
const bot = new Discord.Client();

const Canvas = require('canvas');

const PREFIX = '^';

const cheerio = require('cheerio')

const request = require('request')

bot.on('ready', () =>{
    console.log(`We back in business ;)`)
    bot.user.setActivity('my prefix is ^', {
        type: "PLAYING"
    }).catch(console.log);

    setInterval(() => {
        const statuses = [
            `Shaky's Bot`,
            `Sheesh`,
            `made by Scoopy`
        ]

        const status = statuses[Math.floor(Math.random() * 3)]
        bot.user.setActivity(status, {
            type: "PLAYING"
        });
    }, 10000)
})

//Basics
bot.on('message', message=>{

    let args = message.content.substring(PREFIX.length).split(/ +/);

    switch(args[0]){
        case 'hello':
            message.channel.send('Sup, made by Scoopy');
            break;
        case 'clear':
            if(!args[1]) return message.reply('Oof, you need to define the second argument')
            message.channel.bulkDelete(args[1]);
            break;
    }
})

//Embeds and User Info
bot.on('message', message=>{

    let args = message.content.substring(PREFIX.length).split(/ +/);

    switch(args[0]){
        case 'avatar':
        if(message.content === 'This is your avatar');
            message.reply(message.author.displayAvatarURL());
            break;
        case 'userinfo':
            const embed = new Discord.MessageEmbed()
            .setTitle('User information')
            .setThumbnail(message.author.displayAvatarURL)
            .setColor(0x0AF711)
            .setDescription('Your information!')
            .setAuthor(message.author.username)
            .addField('Username:', message.author.username)
            .addField('Current server:', message.guild.name)
            .addField('Users Account Birthday🎂', message.author.createdAt)
            .addField('Users tag', message.author.tag)
            .addField('Account ID', message.author.id)
            .setFooter('Made by Scoopy')
            .setTimestamp()
            message.channel.send(embed);
            break;
        case 'croissant':
            const embed1 = new Discord.MessageEmbed()
            .setTitle('Here is your Croissant...')
            .setImage('https://i.imgur.com/CjRz23o.jpg')
            .setColor(0xC99314)
            message.channel.send(embed1);
            break;
        case 'help':
            const embed3 = new Discord.MessageEmbed()
            .setTitle('Help is here!')
            .setColor(0x4D0C8A)
            .setDescription('``These are my commands! Please make sure to use the prefix, ```^``` for every command!``\n **Simple Commands**\n hello: Bot will greet you\n clear: Will clear a certain amount of messages\n joke: A joke that is updated daily\n kill: Well oops...\n $coronavirus: Something a little positive\n $info version: My current version!\n \n**Server and User Info**\n $serverinfo: Displays server information\n $userinfo: Displays user information\n \n **Extras**\n $youtube: My creators YouTube!\n $croissant: My favorrite food! :yum:\n \n ``Moderation and Music is still in development.``\n \n *Shaky\'s Bot made by Scoopy himself | ver 3.0.0*')
            message.author.send(embed3)
            message.reply("```Check your DMs!```")
            break;
        case 'serverinfo':
            message.channel.send(`**Server name**: ${message.guild.name}\n**Total members**: ${message.guild.memberCount}\n**Server created on**: ${message.guild.createdAt}\n**Server Region**: ${message.guild.region}`);
            const embed10 = new Discord.MessageEmbed()
            .setTitle('*Server Information')
            .setDescription(`*Display server information for ${message.guild.name}`)
            .setColor(0x0AF711)
            .addField('Server Name:', message.guild.name)
            .addField('Member Count:', message.guild.memberCount)
            .addField('Server creation date:', message.guild.createdAt)
            .addField('Region', messgae.guild.region)
            .setFooter('Made by Scoopy')
            .setTimestamp()
            message.channel.send(embed10)
            break;
    }
})



//Images with search engine
bot.on('message', message=>{

    let args = message.content.substring(PREFIX.length).split(/ +/);
    
    switch(args[0]){
        case 'image':
            image(message)
    }
})

function image(message){
    var parts = message.content.split(/ +/);

    var search = parts.slice(1).join(" ");

    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + search,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    }

    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
 
 
        $ = cheerio.load(responseBody);
 
 
        var links = $(".image a.link");
 
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
       
        console.log(urls);
 
        if (!urls.length) {
           
            return;
        }
 
        // Send result
        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    });
}

//Music

//Fun
bot.on('message', message=>{

    let args = message.content.substring(PREFIX.length).split(/ +/);
    
    switch(args[0]){
        case 'react':   
            message.channel.send('Press the thumbs up if you agree').then(message.react('👍'));
            break;
        case 'kill':
            let user = message.mentions.users.first();
            if (!user){
                return message.channel.send('Please @ at the end who you are wishing to kill')
            }
            return message.channel.send(message.author.username + ' killed ' + user.username)
            break;
        case 'slap':
            let user2 = message.mentions.users.first();
            if (!user2){
                return message.channel.send('Please @ at the end who you are wishing to slap')
            }
            return message.channel.send(message.author.username + ' **slapped the shit out of** ' + user2.username)
            break;
        case 'rps':
            if (!args[1]){
                return message.channel.send('Please type your choice as well')
            }

            let choices = ['rock','paper','scissors'];
            if (choices.includes((args[1].toLowerCase()))){
                let number = Math.floor(Math.random() * 3);
                if (number == 0){
                    return message.channel.send('__**It was a tie, smh...**__,')
                }
                if (number == 2){
                    return message.channel.send('__**Lmao I won**__, you just lost to a bot😂')
                }
                if (number == 1){
                    return message.channel.send('__**You won**__, big oof for me')
                }
            } else {
                return message.channel.send("Please use the following choices: Rock, Paper, Scissors")
            }
        case '8ball':
            if(args[0]){
            let number = Math.floor(Math.random() * 6);
            if (number == 0){
                return message.reply('Yes, I believe so')
            }
            if (number == 4){
                return message.reply('Hell no')
            }
            if (number == 2){
                return message.reply('Ask later...')
            }
            if (number == 1){
                return message.reply('It is uncertain at this time')
            }
            if (number == 2){
                return message.reply('The odds are not in your favor')
            }
            if (number == 5){
                return message.reply('The odds are in your favor')
            }
        }
        case 'peen':
            if(args[0]){
            let number = Math.floor(Math.random() * 10);
            if (number == 8){
                return message.reply('8D, mans will never get a girl with that lollll')
            }
            if (number == 5){
                return message.reply('8=D, still short lol')
            }
            if (number == 2){
                return message.reply('8==D, ok still short but at least you have something lmao')
            }
            if (number == 1){
                return message.reply("8===D, hey at least you aren't that small lol")
            }
            if (number == 0){
                return message.reply('8====D, looks like your packing a bit but not too much')
            }
            if (number == 4){
                return message.reply('8=====D, I SEE YOU, WELCOME TO THE BIG LEAGUES BROTHER!')
            }
            if (number == 6) {
                return message.reply('8======D, HOLY SHIT YOU ARE GURTHY AF')
            } 
            if (number == 9) {
                return message.reply('8=======D, GOD DAMN, YOUR GETTING ALL THEM GIRLS')
            }
            if (number == 3) {
                return message.reply('8========D, GOD DAMN, YOUR GETTING ALL THEM GIRLS')
            }
            if (number == 10) {
                return message.reply('8=========D, **MANS IS AT THE MAX!**')
            }
        }
        case 'cuteness':
            let number = Math.floor(Math.random() * 101);
            return message.reply('I would rate your cuteness a '+number+' out of 100')
            break;
        case 'simprate':
            let number1 = Math.floor(Math.random() * 101);
            return message.reply('I would rate your *simpness* at '+number1+' out of 100')
        case 'die':
            let number2 = Math.floor(Math.random() * 6);
            return message.reply('You rolled a dice and got a '+number2)
        
    }
})

//Server greeting
bot.on('guildMemberAdd', async member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === '┋entrance');
    if (!channel) return;
    
    
	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');


    const background = await Canvas.loadImage('./canvastest.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Welcome to the server, ${member}!`, attachment);
})

//Event Listeners

bot.on('message', message=>{
    if(message.content === 'Gm'){
        message.reply('Good Morning!');

    }
})

bot.on('message', message=>{
    if(message.content === 'Gn'){
        message.reply('Good night chief, have a good sleep😴');

    }
})

bot.on('message', message=>{
    if(message.content === 'Bye'){
        message.reply('See you later alligator👋');

    }
})

bot.on('message', message=>{
    if(message.content === 'Hello'){
        message.reply('Hi, my names Team Leonix. Nice to meet you!');

    }
})

bot.on('message', message=>{
    if(message.content === 'Did I ask'){
        message.reply('Yes, yes the fuck I did')

    }
})

bot.on('message', message=>{
    if(message.content === 'Abuse'){
        message.channel.send('https://cdn.discordapp.com/attachments/718537248253018173/719949949479157780/video0.mp4')
    }
})

bot.on('message', message=>{
    if(message.content === 'Stonks'){
        message.channel.send('https://cdn.discordapp.com/attachments/723640833928069120/725110085977899168/image0.jpg')

    }
})

bot.on('message', message=>{
    if(message.content === 'Healing'){
        message.channel.send('https://cdn.discordapp.com/attachments/723640833928069120/725111279362244638/i_need_healing_by_aestheticman-dbbh82h.png')

    }
})




bot.login(process.env.token)