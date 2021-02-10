const Discord = require("discord.js");
const chokidar = require("chokidar");
var lineReader = require("line-reader"); 
const Debug = require("debug");

const config = require("./config.json");
const prefix = "!";
var oldping = "";


console.log('Bot has started');
chokidar.watch(config.FilePath).on('change', (event, path) => {
  
  lineReader.eachLine(event, function(line, last) { 
     // do whatever you want with line... 
     	merke = line;
     if(last){ 
     // or check if it's the last one 
     } 
    }); 

const client = new Discord.Client();

client.on('error', error => {
    console.log(error);
});

client.on("ready", async () => {
	try {
  		client.user.setActivity(`jabber relay`).catch(err => console.log(err));
		const channel = client.channels.get(config.ChannelID);

		var ping = merke;
		ping = ping.substring(ping.lastIndexOf(config.Sender)+config.Sender.length);
		ping = ping.replace((/<br\/>/g), '\n');  
		ping = ping.replace((/<\/b>/g), '\n');
		ping = ping.replace((/<\/font>/g), ''); 
		ping = ping.replace((/&gt;/g), '>'); 
		ping = ping.replace((/&lt;/g), '<'); 
	
		if (ping === oldping) {
    			console.log("block double posting");
	  	} else {
			console.log(`Bot will post the new message`);
			channel.send(config.mention+ping).catch(err => console.log(err));
			oldping = ping;
			console.log(config.mention+ping);
		}
	} catch (error) {
			console.log(error);
	};
 });
	
try {
	client.login(config.BOT_TOKEN);
} catch (error) {
	console.log(error);
	};

try {
	client.destroy();
} catch (error) {
	console.log(error);
	};

});


 
  