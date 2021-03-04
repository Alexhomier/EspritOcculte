In the README.MD file of ffmpeg-static it say you need to purge node_module.
So get your file by any way on your new server and 
> rm -r node_module
> rm -f package.json
> rm -f package-lock.json
after you need to reinstall everything so 
> npm install ffmpeg-static
> npm install @discordjs/opus
> npm install distube
I actually needed to reinstall node
> npm install node
After you need to add your bot to the pacckage.json file I like nano for an editing platform on linux so install it but not in your bot repository 
> npm install nano
> nano package.json
add this code above "dependencies": 
  "name": "yourBotName",
  "version": "versionOfYourBot",
  "description": "",
  "main": "yourMainFileOrIndex",
After this it should work