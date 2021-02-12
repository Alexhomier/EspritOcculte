const { MessageEmbed } = require("discord.js");
const Punishements = require('../../models/warnSys');

module.exports.run = (client, message, args) => {
    const user = message.mentions.members.first();
    const userID = user.id;
    const reason = args.splice(1).join(' ');

    if(message.author.id === user.id) return message.reply("c'est toi même");

    if(!reason) return message.reply("Aucune raison defini");

    let data = Punishements.findOne({
        GuildID: message.guild.id,
        UserID: userID
    });

   /* if(data){
        data.Punishements.unshift({
            PunishType: 'Warn',
            Moderator: message.author.id,
            Reason: reason,
        });
        data.save();
        message.reply("yes");
    }else if(!data){*/
        let newData = new Punishements({
            GuildID: message.guild.id,
            UserID: userID,
            Punishements: [{
                PunishType: 'Warn',
                Moderator: message.author.id,
                Reason: reason,
            }, ],
        });
        newData.save();

        message.reply("yes");
    //}

    message.delete();
};

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