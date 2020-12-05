const {spawn, exec} = require('child_process');
const Discord = require("discord.js");
const { exit } = require('process');
const fs = require('fs')


exports.run = (client, message, args) => {
    if(!args){
        message.channel.send("Please input code to run")
    }
     message.channel.send("Starting compiler thread....").then((msg) => {
         dataToSend = 0;
         exitedCode = 0;
         str = args.toString()
         .split(",").join(" ")
         .split("```").join("")
         .split("token").join("warning: token word found, replaced with this.")
         .replace("python", "")
         .trim()
        fs.writeFile('tmp.py', str , function (err) {
        if (err) throw err;
            console.log('[PYEXE] TmpFile is created successfully.');
        });  
        message.channel.send("Attempting to run. If no output is sent, please, check  your code.")
        const python = spawn('python', ['tmp.py']);
        python.stdout.on('data', function (data) {
                dataToSend = data.toString();
                try{
                    const out = new Discord.MessageEmbed() 
                    .setTitle("Output: Compiler")
                    .setColor(0x00AE86)
                    .setDescription('Compiler Said:')
                    .addFields(
                    { name: 'Output', value: `${dataToSend}` }
                    )
                    .setTimestamp() 
                    msg.edit(out)
                    try {
                        fs.unlinkSync("tmp.py")
                        return console.log('[PYEXE] TmpFile is deleted successfully.');
                      } catch(err) {
                        console.error(err)
                        return message.channel.send("Warning: temp file was NOT deleted. Please contact support ASAP!")
                      }
                }catch{
                    message.channel.send("Warning: No perms to send embed, or there was an error while sending data to the compiler. If there is no output, please contact support.")
                    message.channel.send(dataToSend)
                    try {
                        fs.unlinkSync("tmp.py")
                        return console.log('[PYEXE] TmpFile is deleted successfully.');
                      } catch(err) {
                        console.error(err)
                        message.channel.send("Warning: temp file was NOT deleted. Please contact support ASAP!")
                      }
                }
        python.on('close', (code) => {
            return message.channel.send(`**Exit Code: ${code}**`)
        })
       
        })
    });
}
