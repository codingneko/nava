const {RichEmbed, db} = require('./loadGeneralDependencies');

module.exports = (message) => {
    var embed = new RichEmbed();
    let images = db.get('images').filter({tags: ['hug']}).value();
    if(images.length != 0){
        let generatedImage = images[Math.floor(Math.random() * images.length)];
        embed.setImage(`${generatedImage.url}`);
    }
    embed.setTitle('Hug sent!');
    embed.setDescription(`Aww <@${message.author.id}> hugged <@${message.mentions.users.first().id}> :blue_heart:`);
    embed.setColor(0x00AAFF);
    message.channel.send(embed);
}