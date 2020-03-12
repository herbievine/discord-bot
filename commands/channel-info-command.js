module.exports = {
    name: 'channel-info',
    description: 'Gives Info on Current Channel',
    execute(message, args) {
        message.channel.send(`Some info about this channel:\nName: ${message.channel}\nChannel ID: ${message.channel.id}`).then(r => {});
    },
};