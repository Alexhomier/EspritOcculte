const { Client, Collection } = require('discord.js');
const { MessageEmbed } = require("discord.js");
const { TOKEN, PREFIX } = require('./config');
const { readdirSync } = require("fs");
const DisTube = require('distube');

const client = new Client();

client.distube = new DisTube(client, {
    searchSongs: false,
    emitNewSongOnly: false 
});


//https://stackoverflow.com/questions/63513312/discord-js-v12-how-to-get-the-id-of-a-person-who-reacted-on-a-specific-message

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
    let channel = client.channels.cache.get('803338172317696000');
    channel.send(`Bienvenue dans la taverne ${member.user.tag}, prenez vos aises combattant!`);
    member.send("Bonjour jeune âme! Je suis l'entité qui s'occupe de la sécurité de la Taverne, si tu as une question n'hésite pas à contacter un Tavernier!!");
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

client.on('ready', () => { 
    console.log(`${client.user.tag} Online`);
    client.user.setActivity('tout ce que tu dis.', { type: 'LISTENING' })
});
client.login(TOKEN);