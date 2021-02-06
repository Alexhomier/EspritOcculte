const Discord = require('discord.js');
const DisTube = require('distube');

module.exports.run = (client, message, args) => {

    const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });
    
    distube.skip(message);

    message.delete();
    
}

module.exports.help = {
    name: "skip",
    aliases: ['skip', 'passer', 'Skip', 'Passer'],
    description: "Passer la chanson",
    cooldown: 10,
    usage: '',
    permissions: false,
    isUserAdmin: false,
}