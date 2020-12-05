var Discord = require('discord.js');
const ytdl = require('ytdl-core');
const fs = require('fs');
const { getInfo } = require('ytdl-getinfo')
isplaying = false;
exports.run = async (client, message, args) => {
var voiceChannel = message.member.voiceChannel;
if (message.member.voice.channel) {
    const connection = await message.member.voice.channel.join();
    if(isplaying === true){
       return message.channel.send("Sorry, I'm playing a song right now. Please wait until I say I'm done!")
    }
    const dispatcher = await connection.play(ytdl(args.toString(), { filter: 'audioonly' }));
    message.reply("Now Playing - Requested URL")
    isplaying = true;
    dispatcher.setVolume(0.3);
    dispatcher.on('finish', () => {
        message.channel.send('Finished playing - Now takeing new songs.');
        dispatcher.destroy();
        isplaying = false;
      });
  } else {
    message.reply('You need to join a voice channel first!');
  }
  const getLink = () => {
    return args.toString();
  };
  const getPlayingState = () => {
    return isplaying;
  }
  exports.getLink = getLink;
  exports.getPlayingState = getPlayingState;
}