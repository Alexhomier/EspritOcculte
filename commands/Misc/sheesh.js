module.exports.run = (client, message, args) => {
    const nbOfE = Math.floor(Math.random() * 50);
    let answer = "";

    for(let i = 0; i < nbOfE; i++){
        answer += "e";
    }
    
    message.reply("Shee" + answer + "sh"); 
}

module.exports.help = {
    name: "givemeasheesh",
    aliases: ['sheesh', 'giveasheesh', 'givesheesh'],
    description: "Réponds sheesh avec un nombre aléatoire de e",
    cooldown: 0,
    usage: '',
    permissions: false,
    isUserAdmin: false,
}