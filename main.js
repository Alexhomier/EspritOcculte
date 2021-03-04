const { Client, Collection, MessageEmbed } = require('discord.js');
const { TOKEN, PREFIX } = require('./config');
const { readdirSync } = require("fs");
const DisTube = require('distube');

const client = new Client();
client.EmbedMusic = new MessageEmbed();

client.distube = new DisTube(client, {
    searchSongs: false,
    emitNewSongOnly: false 
});

["commands", "cooldowns"].forEach(x => client[x] = new Collection());

const loadCommands = (dir = "./commands/") => {
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
        
        for (const file of commands) {
            const getFileName = require(`${dir}/${dirs}/${file}`);
            client.commands.set(getFileName.help.name, getFileName);  
        };  
    });
};

loadCommands();

client.on('guildMemberAdd', (member) =>{
    const channel = client.channels.cache.get('803338172317696000'); 

    channel.send(`Bienvenue dans la taverne ${member.user.tag}, prenez vos aises combattant!`);
    member.send("Bonjour jeune âme! Je suis l'entité qui s'occupe de la sécurité de la Taverne, si tu as une question n'hésite pas à contacter un Tavernier!!");
    member.roles.add(client.role).catch(console.error);
});

client.on('guildMemberRemove', (member) =>{
    let channel = client.channels.cache.get('803338172317696000');
    channel.send(`Vous aussi vous trouvez que l'odeur de mort est disparu? C'est ${member.user.tag} qui est parti.`);
});


client.on('message', (message) => {
    // 1. don't spam with client command 2. take args after command 3. Take command
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;
    const args = message.content.slice(PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.
    commands.find(cmd => cmd.help.aliases && cmd.help.aliases.
    includes(commandName));
    if (!command) return;

    if(command.help.isUserAdmin && message.guild.member(message.mentions.users.first()).hasPermission('BAN_MEMBERS')) 
    return message.reply("Tu manque d'expérience et de force pour utiliser ce sort contre ton ennemi...");

    if(command.help.permissions && !message.member.hasPermission('BAN_MEMBERS')) 
    return message.reply("Tu n'as pas la puissance pour utiliser ce sort...");

    if (!client.cooldowns.has(command.help.name)) {
        client.cooldowns.set(command.help.name, new Collection());
    }

    const timeNow = Date.now();
    const tStamps = client.cooldowns.get(command.help.name);
    const cdAmount = (command.help.cooldown || 5) * 1000;

    if(tStamps.has(message.author.id)) {
        const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

        if (timeNow < cdExpirationTime) 
            return message.reply(`WAOWWW on se calme, je ne suis pas un esclave!`);
    }

    tStamps.set(message.author.id, timeNow);
    setTimeout(() => tStamps.delete(message.author.id), cdAmount);

    command.run(client, message, args);
});



client.distube
    .on("playSong", (message, queue, song) => (
        client.embedPlay = null,
        client.embedPlay = new MessageEmbed()
            .setAuthor("𝕷'𝖊𝖘𝖕𝖗𝖎𝖙 𝖔𝖈𝖈𝖚𝖑𝖙𝖊", 'https://i.imgur.com/uAhHvYf.png')
            .setTitle(`${song.name}`)
            .setDescription('Musique en cours')
            .setColor('#751aff')
            .addFields(
                { name: 'Auteur', value: `${song.user}`, inline: true},
                { name: 'Durée', value: `${song.formattedDuration}`, inline: true },
                { name: 'Commandes', value: `${PREFIX}play {URL}, ${PREFIX}stop, ${PREFIX}skip`, inline: true },
                { name: 'URL', value: `${song.url}`, inline: true },
            )
            .setImage(`${song.thumbnail}`)
            .setTimestamp(),
        message.channel.send(client.embedPlay)
    ))
    .on("error", (message, err) => {
        message.channel.send("Tu ne me tueras jamais!" + err);
    })
    .on("initQueue", (queue) => {
        queue.autoplay = false;
        queue.volume = 50;
    })
    .on("addSong", (message, queue, song) => (
        client.embedAdd = null,
        client.embedAdd = new MessageEmbed()
            .setTitle(`Musique ajouté à la liste`)
            .setColor('#3333ff')
            .addFields(
                { name: 'Ajouté par', value: `${song.user}`, inline: true},
                { name: 'Durée', value: `${song.formattedDuration}`, inline: true },
                { name: 'Commandes', value: `${PREFIX}play {URL}, ${PREFIX}stop, ${PREFIX}skip`, inline: true },
                { name: 'URL', value: `${song.url}`, inline: true },
            )
            .setImage(`${song.thumbnail}`)
            .setTimestamp(),
        message.channel.send(client.embedAdd)
     ));

function CreateEmbedMusic() {
    const channel = client.channels.cache.get('808392233102606346');
    channel.bulkDelete(99);

    client.EmbedMusic 
        .setAuthor("𝕷'𝖊𝖘𝖕𝖗𝖎𝖙 𝖔𝖈𝖈𝖚𝖑𝖙𝖊", 'https://i.imgur.com/uAhHvYf.png')
        .setDescription("Tapez le nom ou l'url de la chanson.")
        .setColor('#3333ff')
        .setImage('https://i.imgur.com/uAhHvYf.png')
        .setTimestamp()
    channel.send(client.EmbedMusic);

    RemoveAddReact(client.EmbedMusic);
}

function RemoveAddReact(message) {
    message.reactions.removeAll().catch(error => console.error('Impossible de supprimer les réactions: ', error));

    client.EmbedMusic.react(':stop_button:')
        .then(() => message.react(':track_previous:'))
        .then(() => message.react(':play_pause:'))
        .then(() => message.react(':track_next:'))
        .then(() => message.react(':twisted_rightwards_arrows:'))
        .then(() => message.react(':repeat_one:'))
        .then(() => message.react(':repeat:'))
        .then(() => message.react(':star:'))
        .catch(() => channel.send("Une erreur s'est produite veuillez contacter un tavernier."));
    
}

client.on('ready', () => { 
    CreateEmbedMusic();
    console.log(`${client.user.tag} Online`);
    client.user.setActivity('tout ce que tu dis.', { type: 'LISTENING' });
    client.myGuild = client.guilds.cache.get('802951727783346176');
    client.role = client.myGuild.roles.cache.get("803335454866538506");
});
client.login(TOKEN);