const {RichEmbed, db} = require('./loadGeneralDependencies');

module.exports = (message) => {
    var command = message.content.split(' ');

    if(message.author.id == process.env.OWNER || db.get("admins").value().includes(message.author.id)){
        if((command[1].startsWith('http://') || command[1].startsWith('https://') &&
        (command[1].endsWith('jpeg') || command[1].endsWith('png') || command[1].endsWith('gif') || command[1].endsWith('jpg')))){
            db.get('images').push({url: command[1], tags: command.slice(2)}).write();
            message.reply("Done!");
        }else{
            message.reply('Whoops, looks like that is not an image... You must specify a url to an image (with png, jpeg, gif or jpg format) as the second parameter, and your tags (if any) as the third parameter.');
        }
    }else{
        message.reply('Sorry, you don\'t have the necessary permissions to add images');
    }
}