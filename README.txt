requiered for the bot
	Pidgin -> sudo apt install node-xmpp-client
		logging needs to be enabled (html)
	nodejs ->  sudo apt-get install -y nodejs
	npm -> should be installed with nodejs and need to be inizialized -> npm ci
		(go in bot directory before)
	
some more dependencies
	chokidar -> npm install chokidar
	line-reader-> npm install line-reader

Discord:
	create new app and bot -> https://discord.com/developers/applications
		(on bot page every option unchecked)
	on oauth2 create
		scopes -> bot
		permissions -> send messages, read history, mention everyone, embed links
	copy generated link and invite to server

run the bot -> node ./index.js



trouble:
	maybe jabber needs an older certification
		sudo nano /etc/ssl/openssl.cnf 
		-> MinProtocol = TLSv1.0


	