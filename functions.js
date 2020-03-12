const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    /**
     * Emoji Listener (Not my code)
     * @param message {message to listen to}
     * @param author {author of that message}
     * @param time {time to listen for emoji}
     * @param validReaction {checks if emojis are correct}
     * @returns {Promise<string>}
     */
    promptMessage: async function(message, author, time, validReaction) {
        time *= 1000;

        for (let reaction of validReaction) await message.react(reaction);

        const filter = (reaction, user) => validReaction.includes(reaction.emoji.name) && user.id === author.id;

        return message
            .awaitReactions(filter, {max: 1, time: time})
            .then(collected => collected.first() && collected.first().emoji.name);
    },

    /**
     * Getting weather info
     * @param open_key {TOKEN for Open Weather Map}
     * @param dark_key {TOKEN for Dark Sky}
     * @param city {city we want to look for}
     * @returns {Promise<(string|*)[]|*>}
     */
    getWeather: async function(open_key, dark_key, city) {
        let linkGetLonLat = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${open_key}`;

        const responseLonLat = await fetch(linkGetLonLat);
        const jsonLonLat = await responseLonLat.json();

        if (jsonLonLat.cod === '404' || jsonLonLat.cod === '401' || jsonLonLat.cod === '429') {
            return jsonLonLat.cod;
        }

        let lon = jsonLonLat.coord.lon;
        let lat = jsonLonLat.coord.lat;

        let link = `https://api.darksky.net/forecast/${dark_key}/${lat},${lon}?units=si&exclude=minutely,hourly,daily,alerts,flags`;

        const response = await fetch(link);
        const json = await response.json();

        return [
            overall = json.currently.summary,
            temp = json.currently.temperature,
            windSpeed = json.currently.windSpeed
        ];
    }

};