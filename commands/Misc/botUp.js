module.exports.run = (client, message, args) => {
    message.reply('Qui est là?');
}

module.exports.help = {
    name: "toctoc",
    aliases: ['ping', 'up'],
    description: "Réponse si le bot fonctionne",
    cooldown: 10,
    usage: '',
    permissions: false,
    isUserAdmin: false,
}