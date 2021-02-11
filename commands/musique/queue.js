const { MessageEmbed } = require('discord.js');
const distube = require('distube');

const { PREFIX } = require('../../config');

module.exports.run = (client, message, args) => {
    if(!message.member.voice.channel) return message.reply("Je ne peux pas chanter pour toi si tu n'est pas à une table...");

    let queue = client.distube.getQueue(message);

    if(queue){
        client.embed = new MessageEmbed()

        queue.songs.map((song, id) =>
            client.embed.addFields({ name: `**${id+1}**. [${song.name}] - \`${song.formattedDuration}\``, value: `${song.url}`, inline: false }));

        client.embed
            .setAuthor("𝕷'𝖊𝖘𝖕𝖗𝖎𝖙 𝖔𝖈𝖈𝖚𝖑𝖙𝖊", 'https://i.imgur.com/uAhHvYf.png')
            .setTitle("Liste de lecture actuelle")
            .setColor('#03fc84')
            .setTimestamp(),
        message.channel.send(client.embed)
    } else {
        message.reply("Il n'y a aucune chanson ensuite...");
    }

}

module.exports.help = {
    name: "queue",
    aliases: ['queue', 'q', 'list'],
    description: "Liste la playlist demandé",
    cooldown: 5,
    usage: '',
    permissions: false,
    isUserAdmin: false,
}