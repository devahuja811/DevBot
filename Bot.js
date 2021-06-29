const Dotenv = require("dotenv")
Dotenv.config()
const Discord = require("discord.js")
const client = new Discord.Client()

client.login(process.env.TOKEN)
// client.on("guildMemberAdd", function(Member){
//     client
// })
client.on('message', message => {
    if(message.content == "Bruh"){
        return message.channel.send("Bruh to you too")
    }
});
client.on('ready', () => {
    console.log("Bot is ready");
});