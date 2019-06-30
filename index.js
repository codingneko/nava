require('dotenv').config();
var Discord = require('discord.js');
var client = new Discord.Client();
const utility = require('./utility');
const commands = require('./commands');
const { db } = require('./commands/loadGeneralDependencies');
// pointMessageLimit so that we're not calling the db every single message, just a little stopgap
var coinsMessageLimit = 0;


//Ready listener (triggers when the bot is connected)
client.on('ready', message => {
    console.log(`
    Logged in as ${client.user.username}
    Tag: ${client.user.tag}
    Discord ID: ${client.user.id}
    Invite link: https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8
    `);
});

//Message listener (triggers when a message is received)
client.on('message', message => {
    if(message.content[0] == process.env.PREFIX){
        commands.reply(message);
    }

    // A small little coin system for use in commands that can cost, etc
    let userId = db.get('users').find({ id: message.author.id }).value();
    if (userId === undefined) {
        db.get('users').push({ id: message.author.id, coins: 0 }).write();
    } else {
        coinsMessageLimit++;
        if (coinsMessageLimit >= 5) {
            db.get('users').find({ id: userId.id }).assign({ coins: userId.coins + 1 }).write();
            coinsMessageLimit = 0;
        }
    }
});

//guildCreate listener (triggers when the bot joins a new guild)
client.on("guildCreate", guild => {
    let channel = utility.findDefaultChannel(client, guild);
    channel.send(`Hey! This is ${client.user.username}, nice to meet you! ^^ use my prefix and type help, like this: \`${process.env.PREFIX}help\` to get a list of commands.`);
});

//log-in to Discord
client.login(process.env.TOKEN);