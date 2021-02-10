

const Discord = require('./lib/RemDiscord.js'),
    debug = require('debug'),
    config = require('./config.json')
    
;

new App().run();

function App() {
    const
        remDiscord = new Discord(config.discord.token),
        discord = remDiscord.getClient(),
        reconnectTimeoutSec = 10
    ;
    let
        
        isConnecting = false
        
    ;

	var lineReader = require('line-reader');
	const chokidar = require("chokidar");
	var fs = require('fs');
		

    this.run = () => {
		
		var oldping = "";
		var ping = '';
		

        remDiscord.connect()
            .then(() => {
                chokidar.watch(config.filesys.FilePath).on('change', (event, path) => {
					
					lineReader.eachLine(event, function(line, last) {
					// do whatever you want with line...
      			 		if(last){
							// or check if it's the last one
							ping = line;
							if (ping === oldping) {
								console.log("block double posting");
							} else {
								oldping = ping;
								ping = ping.substring(ping.lastIndexOf(config.filesys.Sender)+config.filesys.Sender.length);
								ping = ping.replace((/<br\/>/g), '\n');  
								ping = ping.replace((/<\/b>/g), '\n');
								ping = ping.replace((/<\/font>/g), ''); 
								ping = ping.replace((/&gt;/g), '>'); 
								ping = ping.replace((/&lt;/g), '<'); 
								console.log(`Bot will post the new message`);
								console.log(config.discord.mention+ping);
								remDiscord.send(config.discord.ChannelID, config.discord.mention+ping).catch(err => console.log(err));
							
							}
			
						}
					});
				});
            })
            .catch((e) => {
                console.log(e);
                process.kill(process.pid, 'SIGTERM');
            });

        discord.on('ready', () => {
            console.log('Connected to discord as ' + discord.user.username + " - (" + discord.user.id + ")");
        });

        discord.on('disconnect', (closeEvent) => {
            remDiscord.logError(closeEvent);
            console.log(`Trying to reconnect to Discord after ${reconnectTimeoutSec} sec`);

            setTimeout(remDiscord.connect, reconnectTimeoutSec * 1000)
        });

        // debug all Discord events
        discord.on('debug', remDiscord.logDebug);

        discord.on('message', (message) => {
            
            let commandName = '',
                text = message.content
            ;
			
            const isCommand = text.startsWith(config.prefix);
            if (isCommand) {
                commandName = message.content.slice(config.prefix.length).split(/\s+/,1).pop().toLowerCase();
                text = message.content.slice(config.prefix.length + commandName.length + 1);
            }

            if ('status' === commandName) {
                message.channel.send(discord.status + ' (0 = running)');
            }
            
            
        });

        discord.on('error', (error) => {
		console.log(error);            

        });
	};
	    
}

