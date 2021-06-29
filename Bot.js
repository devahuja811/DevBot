const Dotenv = require("dotenv")
Dotenv.config()
const Discord = require("discord.js")
const ytdl = require("ytdl-core")
const client = new Discord.Client()

client.login(process.env.TOKEN)
// client.on("guildMemberAdd", function(Member){
//     client
// })
client.on('message', async message => {
    let connection;
    if (message.author.bot) return;
    if(message.content == "Bruh"){
        return message.channel.send("Bruh to you too")
    }
    if(message.content.toLowerCase() == "join"){
        if(message.member.voice.channel){
            connection = await message.member.voice.channel.join()
        }
    }
    if(message.content.toLowerCase().startsWith("play")){
        if(!connection){
            connection = await message.member.voice.channel.join()
            
        }
        connection.play(ytdl(message.content.slice(5)))
        
    }
    if(message.content.toLowerCase() == "disconnect"){
        connection.dispatcher.destroy()
        connection.disconnect()
    }
});
client.on('ready', () => {
    console.log("Bot is ready");
});

