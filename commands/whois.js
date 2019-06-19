const { RichEmbed } = require('./loadGeneralDependencies');

module.exports = (message) => {
    let now = new Date();
    let roleList = [];
    let user = message.mentions.users.array().length > 0 ? message.mentions.users.first() : message.author;
    let memberRole = message.guild.member(user).roles;

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
    .setColor(randomColor())
    .setAuthor('User info')
    .addField('Name', user.username, true)
    .addField('Nickname', message.guild.member(user).nickname, true)
    .addField('Discriminator', user.discriminator, true)
    .addField('User ID', user.id, true)
    .addField('Joined', message.guild.member(user).joinedAt.toUTCString(), true)
    .addField('Roles', roleList, true)
    .addField('Last message', message.guild.member(user).lastMessage, true)
    .setThumbnail(user.avatarURL)
    .setFooter(`Nava - ${now.toUTCString()}`)

    message.channel.send(embed);
}