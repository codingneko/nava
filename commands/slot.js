const { RichEmbed } = require('./loadGeneralDependencies');

module.exports = (message) => {
    let embed = new RichEmbed();
    let status = false;

    let randomEmoji = () => {
        let emojis = ['🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍'];
        let randNum = Math.floor(Math.random() * emojis.length);
        return emojis[randNum];
    }

    let slotMachine = [];

    for (let i = 0; i < 3; i++) {
        slotMachine.push([randomEmoji(), randomEmoji(), randomEmoji()]);
    }

    if (slotMachine[1][0] == slotMachine[1][1] &&
        slotMachine[1][0] == slotMachine[1][2] &&
        slotMachine[1][1] == slotMachine[1][2]) {
        status = true;
    }

    embed
    .addField(
        'Slots',
        `${slotMachine[0][0]} ${slotMachine[0][1]} ${slotMachine[0][2]}
        ${slotMachine[1][0]} ${slotMachine[1][1]} ${slotMachine[1][2]} ⬅
        ${slotMachine[2][0]} ${slotMachine[2][1]} ${slotMachine[2][2]}`
        )
        .addField((status ? 'You won!' : 'You lost..'), (status ? 'Nice job!' : 'Better luck next time..'));

    message.channel.send(embed);
}