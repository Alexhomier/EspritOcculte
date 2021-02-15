const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
    const user = message.mentions.members.first();
    const userName = user.displayName;
    const reason = args.splice(1).join(' ');

    if(user == undefined) return message.reply("Le sort n'a atteint personne...");

    if(message.author.id === user.id) return message.reply("c'est toi même");

    if(!reason) return message.reply("Aucune raison defini");

    const EmbedAll = new MessageEmbed()
        .setColor('#e6cf22')
        .setTitle('Un sort divain a été utilisé!')
        .setDescription('L\'ennemi divain @' + userName + ' a été averti par ' + message.author.tag + '!')
        .setThumbnail(user.defaultAvatarURL)
    message.channel.send(EmbedAll);

    let channel = client.channels.cache.get('810938039080976392');

    const EmbedLog = new MessageEmbed()
        .setColor('#e6cf22')
        .setTitle('Avertissement \`@' + userName + '\`')
        .setDescription('@' + userName + ' a été averti pour \`' + reason + '\`, par ' + message.author.tag)
        .setTimestamp()
    channel.send(EmbedLog);
}

module.exports.help = {
    name: 'warn',
    aliases: ['warn', 'warning', 'avertissement'],
    description: "Averti un utilisateur",
    cooldown: 10,
    usage: '',
    isUserAdmin: false,
    permissions: false,
    args: true,
};