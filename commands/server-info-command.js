module.exports = {
    name: 'server-info',
    description: 'Gives Info on Current Server',
    execute(message) {
        message.channel.send(`Some info about this server:\nName: ${message.guild}\nServer ID: ${message.guild.id}`).then(r => {});
    },
};