const Command = require("../Structures/Command")
const Discord = require('discord.js')

module.exports = new Command({
    name: "추방",
    description: "멤버를 서버에서 내보냅니다.",
    run: async (client, message, args) => {
        if(!message.member.permissions.has(Discord.Permissions.FLAGS.KICK_MEMBERS)) {
            const embed = new Discord.MessageEmbed()
            .setTitle("⚠️ㅣ오류")
            .setDescription("당신을 이 봇을 사용하기 위한\n충분한 권한이 없습니다!")
            .setColor(0x10f20f)
            .setTimestamp()

            return message.channel.send({ embeds: [embed]})
        }

        const MentionedMember = message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) || 
        message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || 
        message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase() === args[0].toLocaleLowerCase())

        

        if(!MentionedMember) {
            const embed = new Discord.MessageEmbed()
            .setTitle("⚠️ㅣ오류")
            .setDescription("해당 멤버는 여기 서버에 없습니다!")
            .setColor(0x10f20f)
            .setTimestamp()

            return message.channel.send({ embeds: [embed] })
        }

        if(MentionedMember.id === message.member.id) {
            const embed = new Discord.MessageEmbed()
            .setTitle("⛔ㅣ접근 거부!")
            .setDescription("자기 자신을 추방할 수 없습니다!")
            .setColor(0x10f20f)
            .setTimestamp()

            return message.channel.send({ embeds: [embed] })
        }

        if(!MentionedMember.kickable) {
            const embed = new Discord.MessageEmbed()
            .setTitle("⚠️ㅣ오류")
            .setDescription("해당 사용자를 추방할 수 없습니다!")
            .setColor(0x10f20f)
            .setTimestamp()

            return message.channel.send({ embeds: [embed] })
        }

        if(MentionedMember.user.bot) {
            const embed = new Discord.MessageEmbed()
            .setTitle("⚠️ㅣ오류")
            .setDescription("봇을 추방할 수 없습니다!")
            .setColor(0x10f20f)
            .setTimestamp()

            return message.channel.send({ embeds: [embed] })
        }

        let reason = args.slice(2).join(" ")
        if(!reason) reason = "사유가 지정되지 않았습니다!"
        const kickembed = new Discord.MessageEmbed()
        .setTitle(`${message.guild.name}에서 강퇴당하였습니다!`)
        .setDescription(`사유: ${reason}\n본인이 억울하게 킥을 당하였다면 동이#2021로 문의해주세요!`)
        .setColor(0x10f20f)
        .setTimestamp()

        try {
            await MentionedMember.send({ embeds: [kickembed]})
        } catch (err) {
            const embed = new Discord.MessageEmbed()
            .setTitle("⚠️ㅣ전송 오류")
            .setDescription("해당 사용자가 서버 멤버가 보내는 개인 메시지 허용하기를\n키지 않아서 전송을 하지 못했어요!")
            .setColor(0x10f20f)
            .setTimestamp()

            return message.channel.send({ embeds: [embed] })
        }

        try {
            await MentionedMember.kick(reason)
        } catch (err) {
            const embed = new Discord.MessageEmbed()
            .setTitle("⚠️ㅣ오류")
            .setDescription(`해당 멤버를 내보는 과정에서 오류가 발생했어요!\n오류: ${err}`)
            .setColor(0x10f20f)
            .setTimestamp()

            return message.channel.send({ embeds: [embed] })
        }

        const kickembed2 = new Discord.MessageEmbed()
        .setTitle("✅ㅣ추방 완료!")
        .setDescription(`${MentionedMember}님을 성공적으로 내보냈습니다!\n사유: ${reason}`)
        .setColor(0x10f20f)
        .setTimestamp()

        return message.channel.send({ embeds: [kickembed2] })
    }

})