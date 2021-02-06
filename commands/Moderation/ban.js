const { MessageEmbed } = require("discord.js");
const { GuildMember } = require('discord.js');

module.exports.run = (client, message, args) => {
    const user = message.mentions.users.first();
    const userBan = new GuildMember(client, message.guild.member(message.
    mentions.users.first()), message.guild);

    const reason = args.splice(1).join(' ');

    user ? banTrue() : message.reply("Votre sort d'exclusion n'a atteint personne.");

    function banTrue() {
        const Embed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Un sort divain a été utilisé!')
                .setDescription('L\'ennemi divain @' + user.tag + ' a été bannis définitivement de la Taverne!')
                .setThumbnail(user.defaultAvatarURL)
        message.channel.send(Embed);

        userBan.ban({days: 7, reason: `${reason}`});
    }

    message.delete();
};

module.exports.help = {
    name: 'ban',
    aliases: ['ban', 'bannissement', 'bannir'],
    description: "bannir un utilisateur",
    cooldown: 10,
    usage: '',
    isUserAdmin: true,
    permissions: true,
    args: true,
};