module.exports = {
    name: 'ping',
    description: 'Ping Pong Game',
    execute(message) {
        message.channel.send('Pong!').then(r => {});
    },
};