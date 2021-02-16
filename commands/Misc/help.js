const { MessageEmbed } = require('discord.js');
const { PREFIX } = require('../../config');

module.exports.run = (client, message, args) => {
    const embed = new MessageEmbed()
        .setTitle("Voici les sorts disponibles")
        .setColor('#000000')
        .addField('*Prefix*', `\`${PREFIX}\``)
        .addField('*help*', '\`Renvoie tous les commandes disponibles\`')
        .addField('*toctoc*', '\`Obtenir le status de l\'esprit occulte\`')
        .addField('*sheesh*', '\`Renvoie Sheesh avec un nombre aléatoire de e\`')
        .addField('\u200B', '__**Musique**__')
        .addField('*join*', '\`Demander à l\'esprit Occulte de rejoindre votre table\`')
        .addField('*play*', '\`Joue la musique demandée, ajoute une musique à la liste\`' )
        .addField('*stop*', '\`Arrête la musique\`' )
        .addField('*queue*', '\`Affiche la liste de lecture\`' )
        .addField('*skip*', '\`Passe la chanson actuelle\`' )
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