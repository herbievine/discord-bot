require('dotenv').config({path: __dirname + '../.env'});
const { getWeather } = require('../functions.js');
const Discord = require('discord.js');

module.exports = {
    name: 'weather',
    description: 'Gets Weather',
    execute(message, args) {
        let open_key = process.env.OPEN_WEATHER_MAP_WEATHER_TOKEN;
        let dark_key = process.env.DARK_SKY_WEATHER_TOKEN;
        let city;
        let cityName = args;

        if (!args[0]) {
            return message.channel.send(`You need to provide a city`);
        } else if (!args[1]) {
            city = args[0]
        } else if (!args[2]) {
            city = `${args[0]}%20${args[1]}`
        } else if (!args[3]) {
            city = `${args[0]}%20${args[1]}%20${args[2]}`
        }

        const values = getWeather(open_key, dark_key, city);

        values.then(function (results) {
            if (results === '401') {
                return message.channel.send(`API error`);
            } else if (results === '404') {
                return message.channel.send(`Couldn\'t find that city!`);
            } else if (results === '429') {
                return message.channel.send(`Something went wrong... Please try again`);
            } else {
                const msgResults = new Discord.MessageEmbed()
                    .setColor('#640e09')
                    .setTitle(`Weather in ${cityName}`)
                    .addField(`Summary:`, results[0], true)
                    .addField(`Temperature:`, `${results[1]}°C`, true)
                    .addField(`Wind Speed:`, `${results[2]} metres/sec`, true)
                    .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`)
                    .setTimestamp();
                return message.channel.send(msgResults);
            }
        });
    },
};