const Discord = require('discord.js');
const distube = require('distube');

const { PREFIX } = require('../../config');

module.exports.run = (client, message, args) => {
    if(!message.member.voice.channel) return message.reply("Je ne peux pas chanter pour toi si tu n'est pas à une table...");

    let queue = client.distube.getQueue(message);
    if(queue)
        client.distube.skip(message);
    else
        message.reply("Il n'y a aucune autre chanson en liste, tu peux en ajouter si tu veux...");

}

module.exports.help = {
    name: "skip",
    aliases: ['skip', 'passe', 'passer'],
    description: "Passe la chanson actuel pour la prochaine de la queue",
    cooldown: 5,
    usage: '',
    permissions: false,
    isUserAdmin: false,
}