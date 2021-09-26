const { MessageEmbed } = require('discord.js')
const Command = require('../Structures/Command')
const color = require('../color')
module.exports = new Command({
    name: "핑",
    description: "지연시간를 표시해줘요!",
    run: async (client, message, args)  => {
        const embed = new MessageEmbed()
        .setTitle("🏓ㅣ핑 측정중...")
        .setDescription("핑 측정중입니다...\n잠시만 기다려 주세요!")
        .setColor(color.하늘)
        .setTimestamp()

        message.channel.send({embeds: [embed]}).then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp;

            const resultmessageembed = new MessageEmbed()
            .setTitle("🏓ㅣ퐁!")
            .setDescription(`봇 지연시간: ${ping}ms\nAPI 지연시간: ${client.ws.ping}ms`)
            .setColor(color.하늘)
            .setTimestamp()

            resultMessage.edit({embeds: [resultmessageembed]})
        })
    }
})