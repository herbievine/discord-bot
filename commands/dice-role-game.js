const Discord = require('discord.js');

module.exports = {
    name: 'role-dice',
    description: 'Dice Role Game',
    execute(message, args) {
        function getRandNumberWithTwoParams(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function getRandNumberWithOneParam(max) {
            max = Math.floor(max);
            return Math.floor(Math.random() * max) + 1;
        }

        function getRandNumberWithNoParams() {
            return Math.floor(Math.random() * 6) + 1;
        }

        if (args[0] < 0 || args[1] < 0) {
            return message.channel.send(`Sorry, the numbers have to be positive`);
        } else if (isNaN(args[0]) || isNaN(args[1])) {
            return message.channel.send(`Sorry, I only accept numbers!`);
        } else if (!args[0]) {
            const numberNoParamsEmbed = new Discord.MessageEmbed()
                .setColor('#640e09')
                .setTitle(`Dice Role Game`)
                .setDescription(`Requested a number between 0 and 6`)
                .addField(`You rolled a `, getRandNumberWithNoParams(), true)
                .setTimestamp();
            return message.channel.send(numberNoParamsEmbed).then(r => {});
        } else if (!args[1]) {
            const numberOneParamEmbed = new Discord.MessageEmbed()
                .setColor('#640e09')
                .setTitle(`Dice Role Game`)
                .setDescription(`Requested a number between 0 and ${args[0]}`)
                .addField(`You rolled a `, getRandNumberWithOneParam(args[0]), true)
                .setTimestamp();
            return message.channel.send(numberOneParamEmbed).then(r => {});
        } else if (args[0] > 1 && args[1] > 1) {
            const numberTwoParamsEmbed = new Discord.MessageEmbed()
                .setColor('#640e09')
                .setTitle(`Dice Role Game`)
                .setDescription(`Requested a number between ${args[0]} and ${args[1]}`)
                .addField(`You rolled a `, getRandNumberWithTwoParams(args[0], args[1]), true)
                .setTimestamp();
            return message.channel.send(numberTwoParamsEmbed).then(r => {});
        } else {
            return message.channel.send(`Sorry... There was an error :(`).then(r => {});
        }
    }
};