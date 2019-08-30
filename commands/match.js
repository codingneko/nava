const { RichEmbed } = require('./loadGeneralDependencies');

module.exports = (message) => {
    let embed = new RichEmbed();

    let percentages = [
        '|          | 0%  ',
        '|█         | 10% ',
        '|██        | 20% ',
        '|███       | 30% ',
        '|████      | 40% ',
        '|█████     | 50% ',
        '|██████    | 60% ',
        '|███████   | 70% ',
        '|████████  | 80% ',
        '|█████████ | 90% ',
        '|██████████| 100%',
    ]; // please don't chew me out for doing it this way it's just simpler for my tiny brain ok

    let randNum = Math.floor(Math.random() * 10);

    let mentioned;
    if (message.mentions.users.first()) mentioned = message.mentions.users.first().id;
    embed.setTitle(`Do you match?`);
    embed.setDescription(`Your match with <@${mentioned}>: ` + percentages[randNum]);
    embed.setColor(0xFF77AA);
    message.channel.send(embed);
}