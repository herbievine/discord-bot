const Discord = require('discord.js');
const markdownEscape = function(text) {
    return text.replace(/([^\\]|^|\*|_|`|~)([*_`~])/g, '$1\\$2');
};

module.exports = {
    name: 'user-info',
    description: 'Gives Info on User',
    guildOnly: true,
    execute(message, args) {

        // TODO add presence

        let multiMention;
        let userStatus;
        Date.now();

        function userInfoOnAuthor() {

            if (message.author.presence.status === 'online') {
                userStatus = 'is online';
            } else if (message.author.presence.status === 'away') {
                userStatus = 'is away';
            } else if (message.author.presence.status === 'offline') {
                userStatus = 'is offline';
            } else if (message.author.presence.status === 'dnd') {
                userStatus = 'doens\'t want to be disturbed';
            } else {
                userStatus = 'is currently available';
            }

            let now = new Date();
            let createdAt = new Date(message.author.createdAt);

            let diffTime = now.getTime() - createdAt.getTime();
            let diffDays = diffTime / (1000 * 3600 * 24);

            const userInfoOnAuthorEmbed = new Discord.MessageEmbed()
                .setColor('#640e09')
                .setTitle(`Some info about ${message.author.username}`)
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setThumbnail(message.author.avatarURL())
                .addField(`ID:`, markdownEscape(message.author.id), true)
                .addField(`Account created:`, markdownEscape(`${Math.floor(diffDays)} days ago...`))
                .addField(`Status:`, markdownEscape(`${message.author.username} ${userStatus}`))
                .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`)
                .setTimestamp();
            message.channel.send(userInfoOnAuthorEmbed).then(r => {});
        }

        function userInfoOnMember(member, multiMention) {

            if (member.presence.status === 'online') {
                userStatus = 'is online';
            } else if (member.presence.status === 'away') {
                userStatus = 'is away';
            } else if (member.presence.status === 'offline') {
                userStatus = 'is offline';
            } else if (member.presence.status === 'dnd') {
                userStatus = 'doens\'t want to be disturbed';
            } else {
                userStatus = 'is currently available';
            }

            let now = new Date();
            let createdAt = new Date(member.createdAt);

            let diffTime = now.getTime() - createdAt.getTime();
            let diffDays = diffTime / (1000 * 3600 * 24);

            const userInfoOnMemberEmbed = new Discord.MessageEmbed()
                .setColor('#640e09')
                .setTitle(`Some info about ${member.username}`)
                .setAuthor(member.tag, member.avatarURL())
                .setThumbnail(member.avatarURL())
                .addField(`ID:`, markdownEscape(member.id), true)
                .addField(`Account created:`, markdownEscape(`${Math.floor(diffDays)} days ago...`))
                .addField(`Status:`, markdownEscape(`${member.username} ${userStatus}`))
                .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`)
                .setTimestamp();
            message.channel.send(userInfoOnMemberEmbed).then(r => {});
            if (multiMention) {
                return message.channel.send(`Only the first user can be done at a time`)
            }
        }

        if (message.mentions.users > 1 || args[1]) {
            multiMention = true;
        }

        if (!message.mentions.users || !args[0]) {
            return userInfoOnAuthor(multiMention)
        }

        let memberUserInfo = message.mentions.users.first();

        if (!memberUserInfo || !message.guild.member(memberUserInfo)) {
            return message.channel.send(`Couldn't find that user`)
        } else if (message.author.id === memberUserInfo.id) {
            return message.channel.send(`Type the command without mentioning anyone to get your info`)
        }

        userInfoOnMember(memberUserInfo, multiMention);
    },
};