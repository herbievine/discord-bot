// .env tokens
require('dotenv').config({path: __dirname + '/.env'});
const prefix = process.env.COMMAND_PREFIX;

// config.json file
const config = require('./commands.json');

// File System
const fs = require('fs');

// discord.js stuff
const Discord = require('discord.js');
const client = new Discord.Client();
client.extraCommands = new Discord.Collection();

// Gets all JS files in /commands/
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Looping through the command and getting their names
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.extraCommands.set(command.name, command);
}

// Getting those names and making them into a String
// This is for the !help command
let keys = Array.from(client.extraCommands.keys());
let helpKeys = keys.join(', ');

// Checks for errors when connecting
client.once('error', (e) => {
    console.log(`Oh no! There\'s been an error :(\nError: ${e}`);
});

// Checks for success when connecting
client.once('ready', () => {
    console.log('It looks like I\'m up and running :)');
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({ activity: { name: '!help' }, status: 'online' })
});

// Listening for messages
client.on('message', message => {
    // Does the message start with the prefix?
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Getting the arguments from the command
    // Gets the command name
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Error handlers:
    if (!commandName.length) {
        message.channel.send(`You need stuff after the ${prefix} to execute commands\n${config.HELP}`);
        return;
    } else if (commandName === 'help') {
        message.channel.send(`__List of Commands:__\n${helpKeys}`);
        message.channel.send(`__Get a full detailed list of commands here:__\n${config.GIT_REPO.README}`);
        return;
    } else if (!client.extraCommands.has(commandName)) {
        message.channel.send(`**${commandName}** is not recognized as an internal command\n${config.HELP}`);
        return;
    }

    // Command name
    let command = client.extraCommands.get(commandName);

    // Tries to execute the commands in the /commands/ folder
    try {
        command.execute(message, args);
    } catch (e) {
        console.error(e);
        message.channel.send('There was an error trying to execute that command!').then(r => {});
    }
});

// Login
if (!process.env.BOT_TOKEN) {
    throw `Not a valid token`;
} else {
    client.login(process.env.BOT_TOKEN);
}