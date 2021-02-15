const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
    const user = message.mentions.users.first();
    const reason = args.splice(1).join(' ');

    user ? kickTrue() : message.reply("Votre sort d'exclusion n'a atteint personne.");

    if(!reason) return message.reply("Vous devez mentionner une raison...");

    function kickTrue() {
        const Embed = new MessageEmbed()
                .setColor('#db930d')
                .setTitle('Un sort divain a été utilisé!')
                .setDescription('L\'ennemi divain @' + user.tag + ' a été exclue de la Taverne!')
                .setThumbnail(user.defaultAvatarURL)
        message.channel.send(Embed);

        message.guild.member(user).kick(reason);
    }

    message.delete();
};

module.exports.help = {
    name: 'kick',
    aliases: ['kick', 'exclure'],
    description: "Exclure un utilisateur",
    cooldown: 10,
    usage: '',
    isUserAdmin: true,
    permissions: true,
    args: true,
};