const Discord = require('discord.js');
const distube = require('distube');

const { PREFIX } = require('../../config');

module.exports.run = async (client, message, args) => {
    if(!message.member.voice.channel) return message.channel.send('Vous devez être connecté à un salon vocal pour faire cette commande !')

    let queue = await client.distube.getQueue(message);

    if(queue) {
        if(client.distube.isPlaying(message)){
            client.distube.stop(message);
            message.reply("Déjà la fin de la fête? Bon... ok on arrête tout...");
        } else {
            message.reply("Tu entends des sons qui n'existent pas, il n'y a aucune chanson en cours...");
        }

    } else if (!queue) {
        message.reply("Tu entends des sons qui n'existent pas, il n'y a aucune chanson en cours...");
    };
}

module.exports.help = {
    name: "stop",
    aliases: ['stop', 'arret', 'arrêt'],
    description: "Arrête la chanson en cours",
    cooldown: 1,
    usage: '',
    permissions: false,
    isUserAdmin: false,
}