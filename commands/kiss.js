const {RichEmbed, db} = require('./loadGeneralDependencies');

module.exports = (message) => {
    var embed = new RichEmbed();
    let images = db.get('images').filter({tags: ['kiss']}).value();
    if(images.length != 0){
        let generatedImage = images[Math.floor(Math.random() * images.length)];
        embed.setImage(`${generatedImage.url}`);
    }
    embed.setTitle('Kiss sent!');
    embed.setDescription(`Aww :heart: <@${message.author.id}> kissed <@${message.mentions.users.first().id}>`);
    embed.setColor(0xFF77AA);
    message.channel.send(embed);
}