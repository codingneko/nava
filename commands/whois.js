const { RichEmbed } = require('./loadGeneralDependencies');

module.exports = (message) => {
    let now = new Date();
    let roleList = [];
    let memberRole = message.author.lastMessage.member.roles;

    let randomColor = () => {
        let letters = '0123456789abcdef';
        let color = '';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    memberRole.forEach((role) => {
        roleList.push(role.name);
    });

    let embed = new RichEmbed()
    .setColor(0x00AE86)
    .setAuthor('User info')
    .addField('Name', message.author.username, true)
    .addField('Nickname', message.author.lastMessage.member.nickname, true)
    .addField('Discriminator', message.author.discriminator, true)
    .addField('User ID', message.author.id, true)
    .addField('Last message received', message.author.lastMessage.content, true)
    .addField('Joined', message.author.lastMessage.member.joinedAt.toUTCString(), true)
    .addField('Roles', roleList, true)
    .setThumbnail(message.author.avatarURL)
    .setFooter(`maware - ${now.toUTCString()}`)

    message.channel.send(embed);
}