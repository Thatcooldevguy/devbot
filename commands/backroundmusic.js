var Discord = require('discord.js');
const ytdl = require('ytdl-core');
exports.run = async (client, message, args) => {
var voiceChannel = message.member.voiceChannel;
if (message.member.voice.channel) {
    const connection = await message.member.voice.channel.join();
    const dispatcher = await connection.play(ytdl('https://www.youtube.com/watch?v=ZlAU_w7-Xp8', { filter: 'audioonly' }));
    dispatcher.setVolume(0.5);
    dispatcher.on('finish', () => {
        message.channel.send('Finished playing!');
        dispatcher.destroy();
      });
  } else {
    message.reply('You need to join a voice channel first!');
  }

}