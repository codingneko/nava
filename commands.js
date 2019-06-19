module.exports.reply = (message) => {
    switch (message.content.split(' ')[0]) {
        case 'ping':
            message.reply('pong');
            break;
    
        case 'hug':
            commands.hug(message);
            break;
        
        default:
            break;
    }
}

var commands = {
    hug: (message) => {
        let mentions = message.mentions.users;
        let reply = `Aww <@${message.author.id}> hugged <@${message.mentions.users.first().id}> :heart:`;
        message.channel.send(reply);
    }
}