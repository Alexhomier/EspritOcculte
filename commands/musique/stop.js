const Discord = require('discord.js');
const DisTube = require('distube');

module.exports.run = (client, message, args) => {

    const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });
    
    try{
        distube.play(message, 'https://youtu.be/dRQaT1SYJek');
    }
    catch{
        message.reply("Une erreur c'est produite...")
    }

    message.delete();
    //https://youtu.be/gZ8gY0LXXnQ
}

module.exports.help = {
    name: "stop",
    aliases: ['stop', 'arret', 'arreter', 'arreté'],
    description: "Arrête la musique du bot",
    cooldown: 5,
    usage: '',
    permissions: false,
    isUserAdmin: false,
}