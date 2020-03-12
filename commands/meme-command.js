const randomPuppy = require('random-puppy');
const Discord = require('discord.js');

module.exports = {
    name: 'meme',
    description: 'Provides memes',
    async execute(message, args) {

        if (!args[0]) {
            await noParams()
        } else if (args[0].length > 1) {
            await oneParam(args[0])
        }

        async function noParams() {
            const subReddits = ['memes', 'dankmemes'];
            const random = subReddits[Math.floor(Math.random() * subReddits.length)];
            const image = await randomPuppy(random);

            const msg = new Discord.MessageEmbed()
                .setColor('#640e09')
                .setImage(image)
                .setFooter(`From /r/${random}`)
                .setURL(`https://www.reddit.com/r/${random}`)
                .setTimestamp();
            message.channel.send(msg);
        }

        async function oneParam(subReddit) {
            const image = await randomPuppy(subReddit);

            const msg = new Discord.MessageEmbed()
                .setColor('#640e09')
                .setImage(image)
                .setFooter(`From /r/${subReddit}`)
                .setURL(`https://www.reddit.com/r/${subReddit}`)
                .setTimestamp();
            message.channel.send(msg);
        }
    },
};