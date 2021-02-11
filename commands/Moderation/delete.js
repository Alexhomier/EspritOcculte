module.exports.run = (client, message, args) => {
    message.delete();
    const nbToD = args.join(" ");

    if(nbToD >= 100 || nbToD <= 0)
        message.reply("Il est physiquement impossible de supprimer ces paroles.");
    else{
        message.channel.bulkDelete(nbToD);
        message.reply("Groupe Qualinet pour un travail sans retouche!");
    }
}

module.exports.help = {
    name: "delete",
    aliases: ['delete', 'd', 'purge', 'clear', 'cls'],
    description: "Efface x nombre de messages",
    cooldown: 10,
    usage: '',
    permissions: false,
    isUserAdmin: false,
}