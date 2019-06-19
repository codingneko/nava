require('dotenv').config();
var Discord = require('discord.js');
var client = new Discord.Client();
const utility = require('./utility');
const commands = require('./commands');


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
        message.content = message.content.slice(1, message.content.length);
        commands.reply(message);
    }
});

//guildCreate listener (triggers when the bot joins a new guild)
client.on("guildCreate", guild => {
    let channel = utility.findDefaultChannel(client, guild);
    channel.send(`Hey! This is ${client.user.username}, nice to meet you! ^^ use my prefix and type help, like this: \`${process.env.PREFIX}help\` to get a list of commands.`);
});

//log-in to Discord
client.login(process.env.TOKEN);