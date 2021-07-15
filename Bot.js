const Dotenv = require("dotenv");
const fetch = require("node-fetch");
Dotenv.config();
const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const client = new Discord.Client();

client.login(process.env.TOKEN);

client.on("message", async (message) => {
  let connection;
  if (message.author.bot) return;
  if (message.content.toLowerCase() == "bruh" ) {
    return message.channel.send("Bruh to you too");
  }
  if (message.content.toLowerCase() == "join") {
    if (message.member.voice.channel) {
      connection = await message.member.voice.channel.join();
    }
  }
  if (message.content.toLowerCase().startsWith("play")) {
    if (!connection) {
      connection = await message.member.voice.channel.join();
    }
    connection.play(ytdl(message.content.slice(5)));
  }
  if (message.content.toLowerCase() == "disconnect") {
    client.voiceclient.on('disconnect', (event) => {
      console.log(event);
    });
    if(connection.dispatcher){
        connection.dispatcher.destroy();
    };
    connection.disconnect();
  }
  if (message.content.toLowerCase().startsWith("find")) {
    let name = message.content.slice(5);
    fetch(process.env.PEOPLE_FINDER, {
      method: "POST",
      body: new URLSearchParams({
        q: name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.Results.length > 0) {
          let embed = new Discord.MessageEmbed()
            .setTitle(`Search: ${name}`)
            .setDescription("From UMass People Finder")
            .setColor("#FF0000")
            .addFields(
              data.Results.map((result) => {
                if (!result.Major) {
                  result.Major = ["Faculty/Staff"];
                }
                return {
                  name: result.Name,
                  value: `                  
                  Major: ${result.Major.join("/")}
                  Email: ${result.Email}
                  `,
                };
              })
            );
          return message.channel.send(embed);
        } else {
          return message.channel.send("No ID found");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } //!info
});
client.on("ready", () => {
  console.log("Bot is ready");
});
