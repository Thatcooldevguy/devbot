const Discord = require("discord.js");
exports.run = async (client, message, args) => {
    const Member = message.author;
    const out = new Discord.MessageEmbed() 
        .setTitle("Help")
        .setColor(0x00AE86)
        .setDescription('Help for DevBot, Created by sticks')
        .addFields(
            { name: 'backroundmusic', value: `Joins the VC and plays some backround music` },
            { name: 'think', value: `Joins the VC and plays some thinking music` },
            { name: 'dc', value: `Makes the bot leave vc` },
            { name: 'Help', value: `This message` },
            { name: 'Play (url)', value: `Joins the VC and plays requested url` },
            { name: 'runpy (code or codeblock)', value: `Run's python code` },
            { name: 'runjs (code or codeblock)', value: `Run's javascript code` },

        )
        .setTimestamp() 
        message.channel.send("Check your DMS!")
        Member.send(out)
}