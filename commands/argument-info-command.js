module.exports = {
    name: 'args-info',
    description: 'Information about the arguments provided.',
    args: true,
    execute(message, args) {
        // No arguments
        if (!args[0]) return message.channel.send(`You didn\'t provide any arguments`);

        message.channel.send(`Argument info:\n`).then(r => {});
        for (let i = 0; i < args.length; i++) {
            message.channel.send(`${i}: \'${args[i]}\'`).then(r => {});
        }
    },
};