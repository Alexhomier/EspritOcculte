module.exports.run = (client, message, args) => {
    if (message.member.voice.channel) {
        message.member.voice.channel.join();
    } else {
        message.reply('Tu dois être à une table pour que je chante pour toi...');
    }
}

module.exports.help = {
    name: "join",
    aliases: ['join', 'rejoint'],
    description: "Rejoint le salon vocal de l'utilisateur",
    cooldown: 10,
    usage: '',
    permissions: false,
    isUserAdmin: false,
}