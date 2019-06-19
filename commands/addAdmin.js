const {RichEmbed, db} = require('./loadGeneralDependencies');

module.exports = (message) => {
    console.log(`${message.author.id} added an administrator, owner verified against id ${process.env.OWNER}`);
    if(message.author.id == process.env.OWNER){
        db.get('admins').push(message.mentions.users.first().id).write();
        message.reply(message.mentions.users.first().tag + ' was added to the admin array.');
    }
}