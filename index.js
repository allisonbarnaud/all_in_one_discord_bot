const Discord = require("discord.js");
const config = require("./config.json");
const _ = require('underscore');

const fact = require("facts-generator");


const client = new Discord.Client();

const prefix = "$";

// executes on startup
client.on("ready", () => {
  console.log(`Bot ready, logged in as ${client.user.tag}`)
})

// executes on message detection
client.on("message", message => { 
    if (message.author.bot) {return} ; 
    if (!message.content.startsWith(prefix)) {return};  

    const messageContent = message.content.slice(prefix.length);
    const arrayCommands = messageContent.split(' ');
    var command = 0

    if (isNaN(parseInt(arrayCommands[1]))) {
      command = arrayCommands.join(" ")
    } else {
      command = arrayCommands.shift().toLowerCase();
    }
    
    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
      }
    else if (command === "add") {
      const numArgs = arrayCommands.map(num => parseInt(num))
      const sum = numArgs.reduce((accum, num) => accum += num)
      message.reply(`the sum of ${numArgs[0]} and ${numArgs[1]} is ${sum}, you're welcome.`)
    }

    else if (command === "multiply") {
      const numArgs = arrayCommands.map(num => parseInt(num))
      const sum = numArgs.reduce((accum, num) => accum *= num)
      message.reply(`${numArgs[0]} times ${numArgs[1]} is equal to ${sum}, you're welcome.`)
    }
    else if (command == "tell me a fact") {
      const fetchFact = fact.getFact()
      message.reply(fetchFact.fact + " - " + fetchFact.category);
    }
    else if (command == "doodley") {
      
      message.reply(`hello Damien, it's ${message.createdTimestamp}, where I am.`);
    }
    console.log(message)
});

client.on("guildMemberAdd", member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === "general")

  var randomGreetings = [`Well if it isn't ${member}`, `Glad to have you here ${member}`, `INSERT SINCERE AND HEARTWARMING GREETING, ${member}`]

  channel.send(_.sample(randomGreetings))
})

client.login(config.BOT_TOKEN);