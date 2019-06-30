const {RichEmbed, db} = require('./loadGeneralDependencies');
const https = require('https');

module.exports = (message) => {
    let embed = new RichEmbed();
    let args = message.content.substring(5);
    https.get(`https://osu.ppy.sh/api/get_user?k=${process.env.OSUTOKEN}&u=${args}`, (res) => {
        let results = '';
        res.on('data', (data) => results += data);
        res.on('end', () => {
            embed.addField('https get results:', results);
            message.channel.send(embed);
        });
    }).on('error', (err) => console.error(err))
}