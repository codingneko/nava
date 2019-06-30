const {RichEmbed, db} = require('./loadGeneralDependencies');
const https = require('https');

module.exports = (message) => {
    let embed = new RichEmbed();
    let args = message.content.substring(5);
    if (!args) return message.channel.send(embed.setTitle('You must specify a user.').setColor(0xff0000));
    https.get(`https://osu.ppy.sh/api/get_user?k=${process.env.OSUTOKEN}&u=${args}`, (res) => {
        let results = '';
        res.on('data', (data) => results += data);
        res.on('end', () => {
            console.log(results);
            if (results == '[]') { message.channel.send(embed.setTitle('User not found.').setColor(0xff0000)); }
            else {
                let jres = JSON.parse(results); let e = jres[0];
                message.channel.send(
                    embed
                    .setTitle(e.username)
                    .setThumbnail(`https://a.ppy.sh/${e.user_id}?1551305616.jpeg`)
                    .addField('Rank', `#${e.pp_rank} (#${e.pp_country_rank} ${e.country})`, true)
                    .addField('PP', `${Math.floor(parseInt(e.pp_raw))}pp`, true)
                    .addField('Play Count', `${e.playcount} plays`, true)
                    .addField('Accuracy', `${e.accuracy.substring(0, 5)}%`, true)
                    .addField('Level', `lvl ${Math.floor(parseInt(e.level))}`)
                );
            }
        });
    }).on('error', (err) => console.error(err))
}