const Discord = require('discord.js');
const DisTube = require('distube');

module.exports.run = (client, message, args) => {

    const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });

    try{
        if(!message.guild.voiceConnection)
            message.member.voice.channel.join();

        try{
            distube.play(message, args.join(" "));
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