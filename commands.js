const {RichEmbed} = require('discord.js');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db/bot.json');
const db = lowdb(adapter);

db.defaults({
    images: [],
    admins: []
}).write();

module.exports.reply = (message) => {
    switch (message.content.split(' ')[0]) {
        case 'ping':
            message.reply('pong');
            break;
    
        case 'hug':
            commands.hug(message);
            break;
        
        case 'kiss':
            commands.kiss(message);
            break;
        case 'addPic':
            commands.addPic(message);
            break;
        
        case 'addMin':
            commands.addAdmin(message);

        case 'whois':
            commands.whois(message);

        default:
            break;
    }
}

var commands = {
    hug: require('./commands/hug'),
    kiss: require('./commands/kiss'),
    addPic: require('./commands/addPic'),
    addAdmin: require('./commands/addAdmin'),
    whois: require('./commands/whois')
}