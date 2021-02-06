const Discord = require('discord.js');
const DisTube = require('distube');
const { MessageEmbed } = require("discord.js");
const { PREFIX } = require('../../config');


module.exports.run = (client, message, args) => {
    const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });

    try{
        if(!message.guild.voiceConnection)
            message.member.voice.channel.join();

        try{
            const url = args.join(" ");

            distube.play(message, args.join(" "));
            
            const embed = new MessageEmbed()
                .setTitle('Nouvelle chanson en cours!')
                .setColor('#751aff')
                .addField('Auteur', message.member.user.tag, true)
                .addField('Chanson', url, true)
                .addField('Commandes', `${PREFIX}play {URL}, ${PREFIX}stop`)
                .setThumbnail(message.member.user.avatarURL())
            message.channel.send(embed);
        }catch{
            message.reply("Tu dois me dire la chanson...");
        }
        message.delete();
    }catch{
        message.reply("Tu dois être à une table pour que je te chante une chanson...");
    }
}

module.exports.help = {
    name: "play",
    aliases: ['play', 'jouer', 'p'],
    description: "Joue l'URL demandé",
    cooldown: 10,
    usage: '',
    permissions: false,
    isUserAdmin: false,
}