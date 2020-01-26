const Discord = require('discord.js');
const config = require('./config');
giconst bot = new Discord.Client();
const token = config.token;

const randomInteger = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
};


let users = [];
bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.users.forEach((user) => {
        const { id, username, discriminator, avatar } = user;
        users.push({id, username, discriminator, avatar});
    });
    console.log('users',users);
});


bot.on('message', (msg) => {
    if (msg.content === '!start') {
        const id = setInterval(() => {
            const randUserId = randomInteger(0, users.length-1);
            const user = users[randUserId];
            const avatarImage = user.avatar === null ? new Discord.Attachment('https://sun9-19.userapi.com/c852128/v852128589/135ccb/cbCttFaT2eE.jpg') : new Discord.Attachment(user.avatar);
            msg.channel.send ( `Сегодня у нас * дня ${user.username}. Поздравляем!` );
            msg.channel.send(avatarImage)

        }, 1000);
    }
});


bot.login(token);