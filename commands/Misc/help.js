const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args) => {
    const embed = new MessageEmbed()
        .setTitle("Voici les sorts disponible")
        .setColor('#000000')
        .addField(
            { name: 'help', value: 'Renvoie tous les commandes disponible', inline: true },
            { name: 'toctoc', value: 'Obtenir le status de l\'esprit occulte', inline: true},
            { name: 'sheesh', value: 'Renvoie Sheesh avec un nombre aléatoire de **e**', inline: true },
            { name: 'Musique', value: '', inline: false },
            { name: 'join', value: 'Demander à l\'esprit Occulte de rejoindre votre table', inline: true },
            { name: 'play', value: 'Joue la musique demandée, ajoute une musique à la liste', inline: true },
            { name: 'stop', value: 'Arrête la musique', inline: true },
            { name: 'queue', value: 'Affiche la liste de lecture', inline: true },
            { name: 'skip', value: 'Passe la chanson actuelle', inline: true },
        )
        .setTimestamp()
    message.channel.send(embed);
}

module.exports.help = {
    name: "help",
    aliases: ['help', 'h', 'aide', 'a'],
    description: "Affiche tous les commandes disponible pour les utilisateurs.",
    cooldown: 10,
    usage: '',
    permissions: false,
    isUserAdmin: false,
}