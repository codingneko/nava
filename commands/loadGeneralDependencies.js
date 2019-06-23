const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db/bot.json');
const users = new FileSync('db/users.json');
module.exports.db = lowdb(adapter);
module.exports.RichEmbed = require('discord.js').RichEmbed;
module.exports.usersdb = lowdb(users);