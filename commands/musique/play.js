const Discord = require('discord.js');
const distube = require('distube');

const { PREFIX } = require('../../config');

module.exports.run = (client, message, args) => {
    if(!message.member.voice.channel) return message.reply("Je ne peux pas chanter pour toi si tu n'est pas à une table...");


    if(!message.guild.voiceConnection)
        message.member.voice.channel.join();

    if(!args.join(" ") == "")
        client.distube.play(message, args.join(" "));
    else
        message.reply("Tu dois me dire la chanson...");

    message.delete();
}

module.exports.help = {
    name: "play",
    aliases: ['play', 'jouer', 'p'],
    description: "Joue la chanson demandé",
    cooldown: 5,
    usage: '',
    permissions: false,
    isUserAdmin: false,
}