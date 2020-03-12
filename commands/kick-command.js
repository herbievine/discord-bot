const Discord = require('discord.js');
const client = new Discord.Client();
const { promptMessage } = require('../functions.js');
const markdownEscape = function(text) {
    return text.replace(/([^\\]|^|\*|_|`|~)([*_`~])/g, '$1\\$2');
};

const agree = '✅';
const disagree = '❎';

module.exports = {
    name: 'kick',
    description: 'Kick a User',
    guildOnly: true,
    async execute(message, args) {

        message.delete();

        if (!message.mentions.users || !args[0]) {
            return message.channel.send(`You need to tag a user after the *!kick* command`)
        } else if (!args[1]) {
            return message.channel.send(`Please provide a reason for this ban`)
        } else if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.channel.send(`You don\'t have access to this command!\nPlease contact your Administrator for help`)
        } else if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.channel.send(`You don\'t have access to this command!\nPlease contact your Administrator for help`)
        }

        let userTagged = message.mentions.users.first();

        if (!userTagged || !message.guild.member(userTagged)) {
            return message.channel.send(`Couldn't find that user`)
        } else if (message.author.id === userTagged.id) {
            return message.channel.send(`Unfortunately, we don\'t want you to leave`)
        } else if (userTagged.id === '685870422717104131') {
            return message.channel.send(`Are you trying to kick me with my command? How rude...`)
        }

        console.log(userTagged.username);

        const memberToKick = message.guild.member(userTagged);

        const msgConfirmation = new Discord.MessageEmbed()
            .setColor('#36ba1b')
            .setTitle(`Are you sure you want to kick ${userTagged.username}?`)
            .setThumbnail(userTagged.avatarURL())
            .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`)
            .setTimestamp();

        const msgKick = new Discord.MessageEmbed()
            .setColor('#ba131f')
            .setDescription(`** > Kicked member: ** ${userTagged.username} (${userTagged.id})`)
            .setFooter(`Kicked by ${message.author.username}#${message.author.discriminator}`)
            .setTimestamp();

        message.channel.send(msgConfirmation).then(async (msg) => {
            const emoji = await promptMessage(msg, message.author, 30, [agree, disagree]);

            if (emoji === agree) {
                message.delete();
                memberToKick
                    .kick(args[1])
                    .catch(e => {
                        message.channel.send(`Sorry, something went wrong...`)
                    });
                await message.channel.send(msgKick);
            } else if (emoji === disagree) {
                message.delete();
                await message.channel.send(`${userTagged.username} was not kicked`)
            } else {
                await message.channel.send(`Sorry, something went wrong...`)
            }
        })
    }
};