/*
⚠️⚠️ ATENÇÃO ⚠️⚠️
Essa versão de software é paga. Peço que não divulgue ela
*
Caso divulgue algum comando deixe os créditos, fazer ele foi desgaste. 
*
Agradeço pela compreensão. 

📝 NOTAS:
  * Algumas cases criada por Dark 
  * Total agradecimento e créditos a ele <3
*/

// API DO ZIP ZOP
require('./config')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const { exec, spawn, execSync } = require("child_process")
const axios = require('axios')
const path = require('path')
const os = require('os')
const moment = require('moment-timezone')
const speed = require('performance-now')
const { performance } = require('perf_hooks')
const { Primbon } = require('scrape-primbon')
const primbon = new Primbon()
const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom } = require('./lib/myfunc')

// CARREGANDO DATABESES
global.db = JSON.parse(fs.readFileSync('./src/database.json'))
if (global.db) global.db = {
    sticker: {},
    database: {},
    game: {},
    others: {},
    ...(global.db || {})
}
let tebaklagu = db.game.tebaklagu = []
let _family100 = db.game.family100 = []
let kuismath = db.game.math = []
let tebakgambar = db.game.tebakgambar = []
let tebakkata = db.game.tebakkata = []
let caklontong = db.game.lontong = []
let caklontong_desk = db.game.lontong_desk = []
let tebakkalimat = db.game.kalimat = []
let tebaklirik = db.game.lirik = []
let tebaktebakan = db.game.tebakan = []
let vote = db.others.vote = []

// SISTEMA PREMIUM
let prem2 = [`559491423691@s.whatsapp.net`, `coloque o numero @s.whatsapp.net`, `nao tire o @s.whatsapp.net`, `adicione quantos vips vc quiser@s.whatsapp.net`]
// O NÚMERO DA PESSOA DEVE FICAR TODO JUNTO ANTES DO "@s.whatsapp.net"

var Puxada = true


// ALGUMAS DEFINIÇÕES
module.exports = bat = async (bat, m, chatUpdate, store) => {
    try {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        var prefix = global.prefa;
        const isCmd = body.startsWith(prefix)
        const command = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null
        //const isCmd = body.startsWith(prefix)
        //const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const pushname = m.pushName || "No Name"
        const ownerNumber = await bat.decodeJid(global.owner)
        const botNumber = await bat.decodeJid(bat.user.id)
        const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const itsMe = m.sender == botNumber ? true : false
        const text = q = args.join(" ")
        const quoted = m.quoted ? m.quoted : m
	const isPremium2 = prem2.includes(m.sender)
	const premm2 = isPremium2 ? 's' : 'n' 
        const mime = (quoted.msg || quoted).mimetype || ''
	    const isMedia = /image|video|sticker|audio/.test(mime)
	
        // GRUPOS
        const groupMetadata = m.isGroup ? await bat.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
        const groupOwner = m.isGroup ? groupMetadata.owner : ''
    	const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    	const batdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        

	 //----------------------------- MENSAGENS PARA USAR EX: mess.only.admins ------------------------------------\\
    
		mess = {
			wait: 'Por favor, aguarde um pouco.',
			success: 'Sucesso!',
			wrongFormat: 'Formato incorreto!! Por favor, leia o menu!',
			error: {
				stick: 'Isso não é uma figurinha',
				url: 'Erro no url',
			},
			only: {
				group: 'Somente em grupos!',
				owner: 'Somente para o meu dono!',
				gcadmin: 'Somente para Adms!',
                botadm: 'Eu preciso ter adm pra executar esse comando.',
			}
		}

        msg = {
            espera: 'Aguarde um pouco pfv',
            gp: 'Eu so posso executar esse comando em grupos.',
            dono: 'Somente meu dono pode usar esse comando.',
            adm: 'Esse comando é so para adms',
            botadm: 'Eu preciso ter adm pra executar esse comando :)'
        }

        // PÚBLICO E PRIVADO
        if (!bat.public) {
            if (!m.key.fromMe) return
        }

        // Enviar mensagem para console && leitura automática
        if (m.message) {
            bat.sendReadReceipt(m.chat, m.sender, [m.key.id])
            console.log(chalk.black(chalk.bgWhite('[ PESAN ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> Dari'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> Di'), chalk.green(m.isGroup ? pushname : 'Private Chat', m.chat))
        }
	
	// ESCREVER NA DATABASE A CADA 1 MINUTO
	setInterval(() => {
            fs.writeFileSync('./src/database.json', JSON.stringify(global.db, null, 2))
            //console.log('Updating Database...') // ATIVE ISSO CASO QUEIRA (manda msg no console a cada 1 minuto)
        }, 60 * 1000)

        // RESPOSTA DO COMANDO COM MÍDIA 
        if (isMedia && m.msg.fileSha256 && (m.msg.fileSha256.toString('base64') in global.db.sticker)) {
        let hash = global.db.sticker[m.msg.fileSha256.toString('base64')]
        let { text, mentionedJid } = hash
        let messages = await generateWAMessage(m.chat, { text: text, mentions: mentionedJid }, {
            userJid: bat.user.id,
            quoted: m.quoted && m.quoted.fakeObj
        })
        messages.key.fromMe = areJidsSameUser(m.sender, bat.user.id)
        messages.key.id = m.key.id
        messages.pushName = m.pushName
        if (m.isGroup) messages.participant = m.sender
        let msg = {
            ...chatUpdate,
            messages: [proto.WebMessageInfo.fromObject(messages)],
            type: 'append'
        }
        bat.ev.emit('messages.upsert', msg)
        }

        // APAGUE O /* E O */ SE QUISER QUE O BOT FAÇA FIGURINHAS AUTOMÁTICO
	    /*if (/image/.test(mime)) {
            let media = await quoted.download()
            let encmedia = await bat.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
            await fs.unlinkSync(encmedia)
        }
        if (/video/.test(mime)) {
            if ((quoted.msg || quoted).seconds > 11) return// m.reply('Marque um video de até 10 segundos!')
            let media = await quoted.download()
            let encmedia = await bat.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
            await fs.unlinkSync(encmedia)
        }*/
        switch(command) {


//------------------------- CASES DO GRUPO IRIS BOT -------------------------------\\

case 'sticker': case 's': case 'f': case 'sgif': {
    if (!m.isGroup) throw `esse tipo de comando é exclusivo do grupo iris:\n\nhttps://chat.whatsapp.com/DUP9VTCuRin2NHFjYqYbZN`
    if (!quoted) throw `Marque um video ou imagem com o comando ${prefix + command}`
    m.reply(mess.wait)
            if (/image/.test(mime)) {
        let media = await quoted.download()
        let encmedia = await bat.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
        await fs.unlinkSync(encmedia)
    } else if (/video/.test(mime)) {
        if ((quoted.msg || quoted).seconds > 11) return m.reply('Marque um video de até 10 segundos!')
        let media = await quoted.download()
        let encmedia = await bat.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
        await fs.unlinkSync(encmedia)
    } else {
        throw `Hmmm possivel erro, marque um video ou foto com o comando ${prefix + command}\nO video tem que durar 9 segundos`
        }
    }
    break

case 'play': case 'ytplay': {
    if (!m.isGroup) throw `esse tipo de comando é exclusivo do grupo iris:\n\nhttps://chat.whatsapp.com/DUP9VTCuRin2NHFjYqYbZN`
    if (!text) throw `Example : ${prefix + command} pablo vitar seu amor me pegou`
    let yts = require("yt-search")
    let search = await yts(text)
    let dow = search.videos[Math.floor(Math.random() * search.videos.length)]
    let buttons = [
        {buttonId: `${prefix}ytmp3 ${dow.url}`, buttonText: {displayText: '♫ Audio'}, type: 1},
        {buttonId: `${prefix}ytmp4 ${dow.url}`, buttonText: {displayText: '► Video'}, type: 1}
    ]
    let buttonMessage = {
        image: { url: dow.thumbnail },
        caption: `
✏️ Título: ${dow.title}
⌛ Duração: ${dow.timestamp}
👁‍🗨 Visualizações : ${dow.views}
📅 Data De Envio: ${dow.ago}
🎭 Autor : ${dow.author.name}
👤 Canal: ${dow.author.url}
🎶 Descrição : ${dow.description}
🔗 Url : ${dow.url}`,
        footer: `🎶 Usuario: ${m.pushName}`,
        buttons: buttons,
        headerType: 4
    }
    bat.sendMessage(m.chat, buttonMessage, { quoted: m })
}
break
case 'ytmp3': case 'ytaudio': {
    if (!m.isGroup) throw `esse tipo de comando é exclusivo do grupo iris:\n\nhttps://chat.whatsapp.com/DUP9VTCuRin2NHFjYqYbZN`
    let { yta } = require('./lib/y2mate')
    if (!text) throw `Example : ${prefix + command} https://youtube.com/watch?v=PtFMh6Tccag%27 128kbps`
    let quality = args[1] ? args[1] : '128kbps'
    let media = await yta(text, quality)
    if (media.filesize >= 100000) return m.reply('Arquivo acima do limite '+util.format(media))
    bat.sendImage(m.chat, media.thumb, `⭔ Titulo : ${media.title}\n⭔ File Size : ${media.filesizeF}\n⭔ Url : ${isUrl(text)}\n⭔ Ext : MP3\n⭔ Resolução : ${args[1] || '128kbps'}`, m)
    bat.sendMessage(m.chat, { audio: { url: media.dl_link }, mimetype: 'audio/mpeg', fileName: `${media.title}.mp3` }, { quoted: m })
}
break
case 'ytmp4': case 'ytvideo': {
    if (!m.isGroup) throw `esse tipo de comando é exclusivo do grupo iris:\n\nhttps://chat.whatsapp.com/DUP9VTCuRin2NHFjYqYbZN`
    let { ytv } = require('./lib/y2mate')
    if (!text) throw `Exemplo : ${prefix + command} https://youtube.com/watch?v=PtFMh6Tccag%27 360p`
    let quality = args[1] ? args[1] : '360p'
    let media = await ytv(text, quality)
    if (media.filesize >= 100000) return m.reply('Arquivo acima do limite '+util.format(media))
    bat.sendMessage(m.chat, { video: { url: media.dl_link }, mimetype: 'video/mp4', fileName: `${media.title}.mp4`, caption: `⭔ Titulo : ${media.title}\n⭔ File Size : ${media.filesizeF}\n⭔ Url : ${isUrl(text)}\n⭔ Ext : MP3\n⭔ Resolução : ${args[1] || '360p'}` }, { quoted: m })
}
break


//----------------------------- FIM ------------------------------\\


		// menu2 de comandos extras
            case 'menu2':
                m.reply('┏━「🚀 *TODOS*」━┓\n*┃ •* /planos\n*┃ •* /ping\n*┃ •* /delete\n┗━━━━━━━━━━━━━━┛\n\n\n┏━「💬 *GRUPOS*」━┓\n*┃ •* /Marcar \n*┃ •* /Hide \n*┃ •* /Ban \n*┃ •* /TempBan \n*┃ •* /Add \n*┃ •* /Promote \n*┃ •* /demote \n┗━━━━━━━━━━━━━━┛\n\n\n┏━「🔎 *CONSULTAS*」━┓\n*┃ •* /tel (1, 2 e 3)\n*┃ •* /placa\n*┃ •* /nome\n*┃ •* /cpf (1, 2 e 3)\n*┃ •* /cep\n*┃ •* /ip\n┗━━━━━━━━━━━━━━┛\n\n\n┏━「👤 *DONO*」━┓\n*┃ •* /join\n*┃ •* /unblock\n┗━━━━━━━━━━━━━━┛')
                break
			
	

			
//----------------------------- COMANDOS DE ADMNISTRAÇÃO ------------------------------\\
			
			
            case 'marcar': {
                if (!m.isGroup) throw (mess.only.group)
                if (!isBotAdmins) throw (mess.only.botadm)
                if (!batdmins) throw (mess.only.gcadmin)
let teks = `══✪〘 *👥 Marquei geral* 〙✪══
 
 ➲ *frase do ~mamaco adm~ : ${q ? q : 'eu sou só um bot ;-;'}*\n\n`
                for (let mem of participants) {
                teks += `⭔ @${mem.id.split('@')[0]}\n`
                }
                bat.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
                }
                break
                case 'hide': {
                    if (!m.isGroup) throw (mess.only.group)
                    if (!isBotAdmins) throw (mess.only.botadm)
                    if (!batdmins) throw (mess.only.gcadmin)
            bat.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: m })
            }
            break
            case 'tempban': {
                    if (!m.isGroup) throw (mess.only.group)
                    if (!isBotAdmins) throw (mess.only.botadm)
                    if (!batdmins) throw (mess.only.gcadmin)
                    let users4 = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                await bat.groupParticipantsUpdate(m.chat, [users4], 'remove').then((res) => console.log(jsonformat(res))).catch((err) => console.log(jsonformat(err)))
           m.reply(`Pronto, em 5 minutos eu ja adiciono essa pessoa de volta ao grupo, isso se ela não tiver privado...`)
                await sleep(300000)
           await bat.groupParticipantsUpdate(m.chat, [users4], 'add').then((res) => console.log(jsonformat(res))).catch((err) => console.log(jsonformat(err)))
            }
            break


	case 'kick': case 'ban': {
        //if (!isCreator) throw 'comando exclusivo para meu dono'
		if (!m.isGroup) throw (mess.only.group)
        if (!isBotAdmins) throw ("como  vou fzr isso se eu nem sou adm?")
        if (!batdmins) throw (mess.only.gcadmin)
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		if (botNumber.includes(users)) return m.reply('Por quê está tentando me banir???')
        //if (ownerNumber.includes(users)) return m.reply('Banindo meu dono?')
        await bat.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => console.log(jsonformat(res))).catch((err) => console.log(jsonformat(err)))
	}
	break
    case 'donate': case 'contratar': case 'criador': case 'owner': case '1234aaaaadonate': {
        bat.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/39f83106b3cfe2125c39a.jpg' }, caption: `🔆 - *Olá ${m.pushName}*,\nDesde já obriado por querer me contratar!\n\n✅ - *Para contratar um dos meus planos fale com meu dono:*\n\nhttps://wa.me/559491423691` }, { quoted: m })
    }
    break
	case 'add': {
		if (!m.isGroup) throw (mess.only.group)
                if (!isBotAdmins) throw (mess.only.botadm)
                if (!batdmins) throw (mess.only.gcadmin)
		let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await bat.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => console.log(jsonformat(res))).catch((err) => console.log(jsonformat(err)))
	}
	break
	case 'promote': {
		if (!m.isGroup) throw (mess.only.group)
                if (!isBotAdmins) throw (mess.only.botadm)
                if (!batdmins && !isCreator) throw (mess.only.gcadmin)
		let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace('👮‍♂️ Mais um com poderes administrativos admnistrativos')
		await bat.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => console.log(jsonformat(res))).catch((err) => console.log(jsonformat(err)))
	}
	break
	case 'demote': {
		if (!m.isGroup) throw (mess.only.group)
                if (!isBotAdmins) throw (mess.only.botadm)
                if (!batdmins) throw (mess.only.gcadmin)
		let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await bat.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => console.log(jsonformat(res))).catch((err) => console.log(jsonformat(err)))
	}
	break
        case 'unblock': {
		if (!isCreator) throw ("comando exclusivo para meu dono")
		let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await bat.updateBlockStatus(users, 'unblock').then((res) => console.log(jsonformat(res))).catch((err) => console.log(jsonformat(err)))
	}
	break
	case 'delete': case 'del': case 'd': case 'apagar': {
                if (!m.quoted) throw false
                let { chat, fromMe, id, isBaileys } = m.quoted
                if (!isBaileys) throw 'Mencione uma mensagem do bot para ser deletada!'
                bat.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: true, id: m.quoted.id, participant: m.quoted.sender } })
            }
            break
			
	
			
 	// faz o bot entrar no grupo pelo link q você mandar
	case 'join': {
                if (!isCreator) throw 'comando exclusivo para meu dono'
                if (!text) throw 'falta o link do grupo!'
                if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) throw 'Link Invalido!'
                m.reply('espere meu nobre')
                let result = args[0].split('https://chat.whatsapp.com/')[1]
                await bat.groupAcceptInvite(result).then((res) => console.log(jsonformat(res))).catch((err) => console.log(jsonformat(err)))
            }
            break


            case 'bcgc': case 'bcgroup': {
                if (!isCreator) throw mess.owner
                if (!text) throw `Cadê o testo? kkkk\n\nExemplo : ${prefix + command} adm está com fimose ainda😢`
                let getGroups = await bat.groupFetchAllParticipating()
                let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
                let maw = groups.map(v => v.id)
                m.reply(`Enviando transmissão para ${maw.length} Chat\nTempo de conclusão ${maw.length} segundos`)
                for (let i of maw) {
                    await sleep(1500)
                    let btn = [{
                        urlButton: {
                            displayText: 'Meu grupo 🔆',
                            url: 'https://chat.whatsapp.com/FeBFBymIjuj39NWD94i5Ob'
                        }
                    }, {
                        quickReplyButton: {
                            displayText: 'CONSULTAS 🔎',
                            id: `${prefix}consultas`
                        }
                    }]
                      let txt = `「 TRANSMISSÃO - KARMA 」\n\n${text}`
                      bat.send5ButImg(i, txt, bat.user.name, global.thumb, btn)
                    }
                m.reply(`Transmissão enviada para o grupo ${anu.length}`)
            }
            break
            case 'bc': case 'transmitir': case 'send': {
                if (!isCreator) throw mess.owner
                if (!text) throw `Cadê o testo? kkkk\n\nExemplo : ${prefix + command} adm está com fimose ainda😢`
                let maw = await store.chats.all().map(v => v.id)
               m.reply(`Enviando transmissão para ${maw.length} Chat\nTempo de conclusão ${maw.length} segundos`)

		for (let yoi of maw) {
		    await sleep(1500)
		    let btn = [{
                    urlButton: {
                        displayText: 'Meu grupo 🔆',
                        url: 'https://chat.whatsapp.com/FeBFBymIjuj39NWD94i5Ob'
                    }
                }, {
                    quickReplyButton: {
                        displayText: 'CONSULTAS 🔎',
                        id: `${prefix}consultas`
                    }
                }]
                      let txt = `「 TRANSMISSÃO - KARMA 」\n\n${text}`
                      bat.send5ButImg(yoi, txt, bat.user.name, global.thumb, btn)
		}
		m.reply('BroadCast concluida🥱')
            }
            break

//----------------------------- FIM ------------------------------\\
// este comando está em manutenção 👇
            case 'puxada':
                if (!isCreator) throw (`meu dono kkk`)
				if(Puxada){
					Puxada = false;
					m.reply("Puxadas desativadas com sucesso!");
				} else {
					Puxada = true;
					m.reply("Puxadas ativadas com sucesso!");
				}
			break

//----------------------------- CONSULTAS E MENU's ------------------------------\\
case 'consultas':
const sections = [
    {
	title: "CONSULTAS DE TELFONE:",
	rows: [
	    {title: "Tel", rowId: `${prefix}tel`, description: "Puxada de telefone basica ☕"},
	    {title: "Tel2", rowId: `${prefix}tel2`, description: "Puxada mais detalhada 🔥"},
        {title: "Tel3", rowId: `${prefix}tel3`, description: "Puxada por marcação 🆕"}
	]
    },
   {
	title: "CONSULTAS DE NOME E PLACA",
	rows: [
	    {title: "Placa", rowId: `${prefix}placa`, description: "Puxada completa de placas 🔥"},
	    {title: "Nome", rowId: `${prefix}nome`, description: "Puxada simples - em manutenção 🛠"}
	]
    },
   {
	title: "CONSULTAS DE CPF:",
	rows: [
	    {title: "Cpf1", rowId: `${prefix}cpf1`, description: "Puxada de cpf comum ☕"},
	    {title: "Cpf2", rowId: `${prefix}cpf2`, description: "puxada de cpf detalhada 🔎"},
	    {title: "Cpf3", rowId: `${prefix}cpf3`, description: "puxada de cpf avançada 🔥"}
	]
    },
    {
	title: "CONSULTAS GRÁTIS:",
	rows: [
	    {title: "Cep", rowId: `${prefix}cep`, description: "Puxada de cep 🏡"},
	    {title: "Ip", rowId: `${prefix}ip`, description: "Puxada de ip ℹ"},
	    {title: "Bin", rowId: `${prefix}bin`, description: "Puxada de bin 💳"}
	]
    },
]

const listMessage = {
  text: "Esse é o menu em lista feito para facilitar a sua vida!\nPara o comando funcionar, selecione e envie o menu que quer abrir!",
  footer: "_*© By: Markos*_",
  title: "CLIQUE NO MENU E SELECIONE SUA CONSULTA 🚀",
  buttonText: "ᴄᴏɴꜱᴜʟᴛᴀꜱ ᴅɪꜱᴘᴏɴɪᴠᴇɪꜱ",
  sections
}

const sendMsg = await bat.sendMessage(m.chat, listMessage)
break
            case 'plano': case 'planos': {
                let buttonse = [
                    {buttonId: `${prefix}contratar`, buttonText: {displayText: 'CONTRATAR PLANOS 💲'}, type: 1}
                ]
                let buttonMessagee = {
                    text: `☑️ 𝗣𝗟𝗔𝗡𝗢𝗦 𝗘 𝗩𝗔𝗟𝗢𝗥𝗘𝗦

(✅) Estou equipado com checkers
(✅) Consultas
(✅) Comandos para grupos
(✅) E conversões

🔘 Escolha um plano e selecione uma forma de pagamento abaixo.

👤 PLANOS  INDIVIDUAIS

🟢 07 DIAS = R$ 10,00
🟢 30 DIAS = R$ 20,00

👥 PLANOS PARA GRUPOS

🟢 07 DIAS = R$ 20,00
🟢 15 DIAS = R$ 30,00
🟢 30 DIAS = R$ 45,00

💰 FORMAS DE PAGAMENTO

🟢 MERCADO PAGO
🟢 PAYPAL
🟢 PIC PAY
🟢 PIX`,
                    footer: '~ Bot by Markos',
                    buttons: buttonse,
                    headerType: 2
                }
                bat.sendMessage(m.chat, buttonMessagee)
            }
            break

    
       case 'placa':
    case 'plac':
     
    if(!isPremium2) throw ("👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar")
    if(!text) throw (`Digite uma placa. | Exemplo: /placa JYE9708`)
    var query = text
    if(query.length < 7 || query.length > 11) return m.reply('ERRO\nA placa deve conter 7 dígitos!\nUso: /placa JYE9708');
    m.reply(`Ei ${pushname} já estou consultando...* Enquanto isso tome um café☕`)
    xx = await fetchJson(`${global.apidados}/placa/${text}/${global.apiToken}`)
if (xx.Nome != undefined) {



retorno = `═════════════════════\n🕵️  CONSULTA REALIZADA  🕵️\n═════════════════════\n\n• PLACA: ${xx.Placa}\n• SITUAÇÃO: ${xx.Situação}\n\n• MARCA: ${xx.MarcaModelo}\n• COR: ${xx.Cor}\n• DATA DE FABRICAÇÃO: ${xx.AnoFabricação}\n\n• MUNICIPIO: ${xx.Cor}\n• ESTADO: ${xx.Cor}\n• CHASSI: ${xx.Chassi}\n\n• RENAVAM: ${xx.Renavam}\n• UF FATURADO: ${xx.UfFaturado}\n\n• TIPO VEICULO: ${xx.TipoVeiculo}\n• ESPECIE: ${xx.Especie}\n• CATEGORIA: ${xx.Categoria}\n• COMBUSTIVEL: ${xx.Combustivel}\n\n• POTENCIA: ${xx.Potencia}\n• CILINDRADAS: ${xx.Cilindradas}\n• NACIONALIDADE: ${xx.Nacionalidade}\n• CAPACIDADE MAXIMA: ${xx.QuantidadeDePassageiros}\n• QUANTIDADE EIXOS: ${xx.QuantidadeEixos}\n\n• ATUALIZAÇÃO: ${xx.AtualizaçãoVeiculo}\n• ROUBO/FURTO: ${xx.RouboFurto}\n• REMARCAÇÃO CHASSI: ${xx.RemarcaçãoChassi}\n\n• LICENCIAMENTO: ${xx.Licenciamento}\n• EMISSÃO CRV: ${xx.EmissãoUltimoCrv}\n\n• NOME: ${xx.Nome}\n• CPF/CNPJ: ${xx.CpfCnpj}\n\n• Usuario: ${pushname}\n\n🔛 BY: KARMA BOT\n\n━━━━━━━━━━━━━━━━━━`

m.reply(retorno)

} else {

m.reply(`⚠️ PLACA NÃO ENCONTRADA!`)
}
break
case 'nome2':
             
                if (premm2 != 'n') {
                if(!text) return m.reply (`Digite um nome. | Exemplo: /nome2 Jair Messias Bolsonaro`)
                m.reply(`Aguarde ${pushname}, estou consultando os dados...`)
                api = await axios.get(`https://api.i-find.dev/?token=b4ded580-a8a6-4d66-9f03-93a26426391d&nome=${text}`)


let teks = `═════════════════════
🕵️  *CONSULTA REALIZADA*  🕵️
═════════════════════`
for (let v of api.data) {
                teks += `NOME: ${v.Nome}\n`
                teks += `CPF: ${v.Cpf}\n`
                teks += `SEXO: ${v.Genero}\n`
                teks += `DATA DE NASCIMENTO: ${v.Nascimento}\n`
                teks += `━━━━━━━━━━━━━━━━━━\n\n`
               
}
bat.sendMessage(m.chat, { text: teks }, { quoted: m })
                          
            }
                if (premm2 != 's') {
                    txt2 = `Ei, para você usar esse comando, você precisa ser vip! Adquira um de meus planos e se divirta com diversas consultas ilimitadas.`
                    let message22 = await prepareWAMessageMedia({ image: fs.readFileSync('https://telegra.ph/file/ccfc85bcf8741183d7eb3.png') }, { upload: bat.waUploadToServer })
                    const template22 = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
                        templateMessage: {
                            hydratedTemplate: {
                                imageMessage: message22.imageMessage,
                                hydratedContentText: txt2,
                                hydratedButtons: [{
                                    quickReplyButton: {
                                        displayText: '💸 Planos',
                                        id: `${prefix}planos`
                                    }  
                                }]
                            }
                        }
                    }), { userJid: m.chat, quoted: m })
                    bat.relayMessage(m.chat, template22.message, { messageId: template22.key.id })
                }
                break
case 'nome':
             
    if(!isPremium2) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
    if(args.length < 1) return m.reply('✅ Para usar esse comando use /nome + o nome da pessoa.');
		  
    m.reply(`Ei ${pushname} já estou consultando...* Enquanto isso tome um café☕\nCaso não retorne nada, nao foi encontrado.`);
    try {
    api = await axios.get(`${global.apidados}/nome/${q}/${global.apiToken}`)

    if (api.data.Nome != undefined) {
retorno = `═════════════════════
🕵️  *CONSULTA REALIZADA*  🕵️
═════════════════════

*NOME*: ${api.data.Nome}
*CPF*: ${api.data.Cpf}
*SEXO*: ${api.data.Sexo}
*DATA DE NASCIMENTO*: ${api.data.Nascimento}

*Usuario:* ${pushname}

🔛 BY: KARMA BOT

━━━━━━━━━━━━━━━━━━`
    
m.reply(retorno)
} else {
m.reply(`⚠️ NOME NÃO ENCONTRADO!`)
}
    
if (api.image === 'false') throw (`Encontrei mais de uma pessoa com esse nome, porem não sou capaz de enviar, te digitar o nome completo da pessoa.`)
} catch (err) {

m.reply('Encontrei mais de uma pessoa com esse nome, porem não sou capaz de enviar, tente digitar o nome completo da pessoa.')
}           
break
                    /*case 'nome':
                    
   		            if(!isPremium2) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
                    if(args.length < 1) return m.reply('✅ Para usar esse comando use /nome + o nome da pessoa.');
		    m.reply(`Ei ${pushname} já estou consultando...* Enquanto isso tome um café☕\nCaso não retorne nada, nao foi encontrado.`);
                    xx = await fetchJson(`${global.apidados}/nome/${text}/${global.apiToken}`)
                    if (xx.Cpf != undefined) {
                        consulta = `═════════════════════
🕵️  CONSULTA REALIZADA  🕵️
═════════════════════

INFORMAÇÕES:
                    
• NOME: ${xx.Nome}
• CPF: ${xx.Cpf} 
• SEXO: ${xx.Sexo} 
• NASCIMENTO: ${xx.Nascimento} 

_(somente 1 resultado pois estou em manutenção)_

para apagar esta consulta digite /d
━━━━━━━━━━━━━━━━━━`
                    m.reply(consulta)
} else {
    m.reply(`⚠️ NOME NÃO ENCONTRADO!`)
}
                      break*/

                           case 'ip':
    if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗜𝗣\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta o número de IP, obtém dados do IP, como qual é o provedor, ip reverso, país, estado, cidade e as coordenadas de onde ele está localizado.\n\nFormato:\n204.152.203.157\n\n/ip 204.152.203.157\n\n━━━━━━━━━━━━━━━━━━━━━`)
    var query = text
    .split('.').join('')
    .split('-').join('')
    .split(' ').join('');
    if(query.length < 6) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗜𝗣\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta o número de IP, obtém dados do IP, como qual é o provedor, ip reverso, país, estado, cidade e as coordenadas de onde ele está localizado.\n\nFormato:\n204.152.203.157\n\n/ip 204.152.203.157\n\n━━━━━━━━━━━━━━━━━━━━━');
    if(isNaN(query)) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗜𝗣\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta o número de IP, obtém dados do IP, como qual é o provedor, ip reverso, país, estado, cidade e as coordenadas de onde ele está localizado.\n\nFormato:\n204.152.203.157\n\n/ip 204.152.203.157\n\n━━━━━━━━━━━━━━━━━━━━━');
                m.reply(`*Ei ${pushname} já estou consultando...* Enquanto isso tome um café☕\nCaso não retorne nada, nao foi encontrado.`)
                hehe = await fetchJson(`http://ip-api.com/json/${text}`)
 
        if (hehe.country != undefined) {
    consulta = `═════════════════════
🔍 *CONSULTA DE IP* 🔍
═════════════════════

• *País:* ${hehe.country}
• *Sigla:* ${hehe.countryCode}
• *Região:* ${hehe.regionName}
• *Sigla Região:* ${hehe.regionName}
• *Cidade:* ${hehe.city}
• *Cep:* ${hehe.zip}
• *Lat:* ${hehe.lat}
• *Lon:* ${hehe.lon}
• *Fuso Horário:* ${hehe.timezone}
• *Net:* ${hehe.isp}

• *Usuario:* ${pushname}

🔛 BY: KARMA BOT

━━━━━━━━━━━━━━━━━━`
m.reply(consulta)
await sleep(1500)
await bat.sendMessage(m.chat, { location: { degreesLatitude: hehe.lat, degreesLongitude: hehe.lon }, })
} else {
    m.reply(`⚠️ IP NÃO ENCONTRADO`)
}

  break
     case 'cep':
    if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗘𝗣\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta de CEP, obtém informações sobre os logradouros (como nome de rua, avenida, alameda, beco, travessa, praça etc), nome de bairro, cidade e estado onde ele está localizado.\n\nFormato:\n70040010\nou\n70040-010\n\n/cep 70040010\n\n━━━━━━━━━━━━━━━━━━━━━`)
    var query = text
    .split('.').join('')
    .split('-').join('')
    .split(' ').join('');
    if(query.length < 4 || query.length > 11) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗘𝗣\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta de CEP, obtém informações sobre os logradouros (como nome de rua, avenida, alameda, beco, travessa, praça etc), nome de bairro, cidade e estado onde ele está localizado.\n\nFormato:\n70040010\nou\n70040-010\n\n/cep 70040010\n\n━━━━━━━━━━━━━━━━━━━━━');
    if(isNaN(query)) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗘𝗣\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta de CEP, obtém informações sobre os logradouros (como nome de rua, avenida, alameda, beco, travessa, praça etc), nome de bairro, cidade e estado onde ele está localizado.\n\nFormato:\n70040010\nou\n70040-010\n\n/cep 70040010\n\n━━━━━━━━━━━━━━━━━━━━━');
                m.reply(`*Ei ${pushname} já estou consultando...* Enquanto isso tome um café☕\nCaso não retorne nada, nao foi encontrado.`)
                hehee = await fetchJson(`https://cep.awesomeapi.com.br/json/${text}`)
 
if (hehee.cep != undefined) {
    consulta = `═════════════════════
🔍 *CONSULTA DE CEP* 🔍
═════════════════════

• *Cep:* ${hehee.cep}
• *DDD:* ${hehee.ddd}
• *Estado:* ${hehee.state}
• *Tipo de logradouro:* ${hehee.address_type}
• *Nome do logradouro:* ${hehee.address_name}
• *Rua:* ${hehee.address}
• *Bairro:* ${hehee.district}
• *Cidade:* ${hehee.city}
• *Latitude:* ${hehee.lat} 
• *Longitude:* ${hehee.lng} 

• *Usuario:* ${pushname}

🔛 BY: KARMA BOT

━━━━━━━━━━━━━━━━━━`
m.reply(consulta)
await sleep(2000)
await bat.sendMessage(m.chat, { location: { degreesLatitude: hehee.lat, degreesLongitude: hehee.lng }, })
} else {
    m.reply(`⚠️ CEP NÃO ENCONTRADO`)
}
  break
  case 'bin':
    if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗕𝗜𝗡\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta de BIN, obtém os detalhes do emissor (como qual banco ou instituição financeira emitiu o cartão e onde ele está localizado), o tipo, a bandeira e a categoria do cartão.\n\nFormato:\n498408\n\n/bin 498408\n\n━━━━━━━━━━━━━━━━━━━━━`)
    var query = text
    .split('.').join('')
    .split('-').join('')
    .split(' ').join('');
    if(query.length < 5 || query.length > 11) return m.reply(`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗕𝗜𝗡\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta de BIN, obtém os detalhes do emissor (como qual banco ou instituição financeira emitiu o cartão e onde ele está localizado), o tipo, a bandeira e a categoria do cartão.\n\nFormato:\n498408\n\n/bin 498408\n\n━━━━━━━━━━━━━━━━━━━━━`);
    if(isNaN(query)) return m.reply(`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗕𝗜𝗡\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta de BIN, obtém os detalhes do emissor (como qual banco ou instituição financeira emitiu o cartão e onde ele está localizado), o tipo, a bandeira e a categoria do cartão.\n\nFormato:\n498408\n\n/bin 498408\n\n━━━━━━━━━━━━━━━━━━━━━`);
                m.reply(`*Ei ${pushname} já estou consultando...* Enquanto isso tome um café☕\nCaso não retorne nada, nao foi encontrado.`)
                heheeq = await fetchJson(`https://dubcheckers.gq/search/?bin=${text}`)
 
if (heheeq.bin != undefined) {
    consulta = `═════════════════════
🔍 *CONSULTA DE BIN* 🔍
═════════════════════

• *BIN:* ${heheeq.bin}
• *PÁIS:* ${heheeq.pais}
• *BANDEIRA:* ${heheeq.bandeira}
• *TIPO* ${heheeq.type}
• *NIVEL* ${heheeq.nivel}
• *BANCO:* ${heheeq.banco}

🔛 BY: KARMA BOT

━━━━━━━━━━━━━━━━━━`
m.reply(consulta)
//await sleep(2000)
//await bat.sendMessage(m.chat, { location: { degreesLatitude: hehee.lat, degreesLongitude: hehee.lng }, })
} else {
    m.reply(`⚠️ BIN NÃO ENCONTRADA`)
}
  break

                      case 'cpf':
                      case 'cpf1':
    if(!Puxada) throw (`⚠ - Puxadas foram desativadas pelo meu dono ou estou em manutenção.`)
    if(!isPremium2 && !m.isGroup) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
    if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 𝟭\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta simples de CPF, retorna os dados do portador.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf1 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━`)
    var query = text
    .split('.').join('')
    .split('-').join('')
    .split(' ').join('');
    if(query.length < 11 || query.length > 11) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 𝟭\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta simples de CPF, retorna os dados do portador.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf1 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━');
    if(isNaN(query)) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 𝟭\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta simples de CPF, retorna os dados do portador.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf1 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━');
                m.reply(`*Ei ${pushname} já estou consultando...* Enquanto isso tome um café☕\nCaso não retorne nada, nao foi encontrado.`)
                apii = await fetchJson(`${global.apidados}/cpf3/${text}/${global.apiToken}`)
 
if (apii.Cpf != undefined) {
    consulta = `═════════════════════
🕵️  CONSULTA REALIZADA  🕵️
═════════════════════

 INFORMAÇÕES DO CPF (base 1):    

• CPF: ${apii.Cpf}
• NOME: ${apii.Nome}
• DATA DE NASCIMENTO: ${apii.Nascimento}
• IDADE: ${apii.Idade}
• SIGNO: ${apii.Signo}
• SEXO: ${apii.Sexo}

• Usuario: ${pushname}

🔛 BY: KARMA BOT

━━━━━━━━━━━━━━━━━━`
m.reply(consulta)
} else {
    
    m.reply(`⚠️ CPF NÃO ENCONTRADO!`)
}
  break


case 'cpf2':
    if(!Puxada) throw (`⚠ - Puxadas foram desativadas pelo meu dono ou estou em manutenção.`)
    if(!isPremium2) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
    if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 𝟮\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de CPF, retorna os dados do portador. Incluindo dados Tipo 1 + número de RG, nome do pai e local de nascimento.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf2 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━`)
    var query = text
    .split('.').join('')
    .split('-').join('')
    .split(' ').join('');
    if(query.length < 11 || query.length > 11) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 𝟮\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de CPF, retorna os dados do portador. Incluindo dados Tipo 1 + número de RG, nome do pai e local de nascimento.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf2 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━');
    if(isNaN(query)) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 𝟮\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de CPF, retorna os dados do portador. Incluindo dados Tipo 1 + número de RG, nome do pai e local de nascimento.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf2 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━');
                m.reply(`*Ei ${pushname} já estou consultando...* Enquanto isso tome um café☕\nCaso não retorne nada, nao foi encontrado.`)
                apii = await fetchJson(`${global.apidados}/cpf2/${text}/${global.apiToken}`)
 
              if (apii.Cpf != undefined) {
    consulta = `═════════════════════
🕵️  CONSULTA REALIZADA  🕵️
═════════════════════

 INFORMAÇÕES DO CPF (base 2): 

 • *CPF:* ${apii.Cpf}
 • *CNS:* ${apii.Cns}
 • *RG:* ${apii.Rg}
 • *DATA DE EXPEDIÇÃO:* ${apii.DataDeExpedição}
 • *ORGÃO EXPEDIDOR:* ${apii.OrgãoExpedidor}
 • *UF - RG:* ${apii. UfRg}

 • *TÍTULO ELEITORAL:* ${apii. TítuloEleitoral}

 • *NOME:* ${apii.Nome}
 • *DATA DE NASCIMENTO:* ${apii.Nascimento}
 • *IDADE:* ${apii.Idade}
 • *SIGNO:* ${apii.Signo}

 • *SEXO:* ${apii.Sexo}
 • *COR:* ${apii.Cor}
 • *TIPO SANGUÍNEO:* ${apii.TipoSanguíneo}

 • *MÃE:* ${apii.Mãe}
 • *PAI:* ${apii.Pai}

 • *PAÍS DE NASCIMENTO:* ${apii.PaísDeNascimento}
 • *CIDADE DE NASCIMENTO:* ${apii.CidadeDeNascimento}
 • *ESTADO DE NASCIMENTO:* ${apii.EstadoDeNascimento}

 • *LOGRADOURO:* ${apii.Logradouro}
 • *NÚMERO:* ${apii.Número}
 • *COMPLEMENTO:* ${apii.Complemento}
 • *BAIRRO:* ${apii.Bairro}
 • *CIDADE:* ${apii.Cidade}
 • *ESTADO:* ${apii.Estado}
 • *PAÍS:* ${apii.País}
 • *CEP:* ${apii.Cep}

 • *E-MAIL:* ${apii.Email}

 • *TELEFONE:* ${apii.Telefone}


 • *Usuario:* ${pushname}

🔛 BY: KARMA BOT

━━━━━━━━━━━━━━━━━━`
m.reply(consulta)
} else {
    m.reply(`⚠️ CPF NÃO ENCONTRADO!`)
}
  break

    case 'cpf3':
    
    if(!isPremium2) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
    if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 𝟯\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta simples de CPF, retorna os dados do portador.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf3 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━`)
    var query = text
    .split('.').join('')
    .split('-').join('')
    .split(' ').join('');
    if(query.length < 11 || query.length > 11) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 𝟯\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta simples de CPF, retorna os dados do portador.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf3 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━');
    if(isNaN(query)) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗖𝗣𝗙 - 𝗧𝗜𝗣𝗢 𝟯\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta simples de CPF, retorna os dados do portador.\n\nFormato:\n01441452001\nou\n014.414.520-01\n\n/cpf3 01441452001\n\n━━━━━━━━━━━━━━━━━━━━━');
                m.reply(`*Ei ${pushname} já estou consultando...* Enquanto isso tome um café☕\nCaso não retorne nada, nao foi encontrado.`)
                apii = await fetchJson(`${global.apidados}/cpf3/${text}/${global.apiToken}`)
 
if (apii.Cpf != undefined) {
    consulta = `═════════════════════
🕵️  CONSULTA REALIZADA  🕵️
═════════════════════

 INFORMAÇÕES DO CPF:

• CPF: ${apii.Cpf}
• CNS: ${apii.Cns}
• RG: ${apii.Rg}
• CNS: ${apii.Cns}
• EXPEDIÇÃO: ${apii.DataDeExpedição}
• ORGÃO EXPEDIDOR: ${apii.OrgãoExpedidor}
• RG UF: ${apii.UfRg}

 INFORMAÇÕES DA PESSOA:

• NOME: ${apii.Nome}
• SEXO: ${apii.Sexo}
• NASCIMENTO: ${apii.Nascimento}
• IDADE: ${apii.Idade}
• COR: ${apii.Cor}
• SIGNO: ${apii.Signo}
• TIPO SANGUÍNEO: ${apii.TipoSanguíneo}
• EMAIL: ${apii.Email}
• TELEFONE: ${apii.Telefone}

 PARENTES:

 • MÃE: ${apii.Mãe}
 • PAI: ${apii.Pai}

 ENDEREÇO:

 • ESTADO: ${apii.Estado}
 • CIDADE: ${apii.Cidade}
 • BAIRRO: ${apii.Bairro}
 • CEP: ${apii.Cep}
 • RUA: ${apii.Logradouro}
 • NUMERO: ${apii.Número}

 • Usuario: ${pushname}

🔛 BY: KARMA BOT
 ━━━━━━━━━━━━━━━━━━`
m.reply(consulta)
} else {
    m.reply(`⚠️ CPF NÃO ENCONTRADO!`)
}
                break


    case 'tel':
    case 'telefone':
    if(!isPremium2 && !m.isGroup) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
    if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\n51995379721\n\n/telefone 51995379721\n\n━━━━━━━━━━━━━━━━━━━━━`)
    var query = text
    .split('+').join('')
    .split('-').join('')
    .split(' ').join('')
    .split('(').join('')
    .split(')').join('');
    if(query.length < 10) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\n51995379721\n\n/telefone 51995379721\n\n━━━━━━━━━━━━━━━━━━━━━');
    if(query.length == 10) {
        var resultado3 = query.replace(/(\d{2})/, "$19")
         return m.reply(`Identifiquei que esse número marcado tem um 9 a menos tente colocar mais ou menos assim:\n\n❌ - ERRADO: ${query}\n✅ - CERTO (ou não): ${resultado3}\n\n Caso eu tenha configurado errado, ajuste manualmente e puxe usando o /tel`);
     }
    if(query.length > 11) return m.reply('❌ - Isso é um telefone ou um cpf?');
    if(isNaN(query)) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\n51995379721\n\n/telefone 51995379721\n\n━━━━━━━━━━━━━━━━━━━━━');
                m.reply(`*Ei ${pushname} já estou consultando...*`)
                xx = await fetchJson(`${global.apidados}/telefone/${text}/${global.apiToken}`)
 
if (xx.Nome != undefined) {
    let buttons6 = [
        {buttonId: `${prefix}tel1 ${text}`, buttonText: {displayText: 'consulta comum 🚀'}, type: 1},
        {buttonId: `${prefix}tel2 ${text}`, buttonText: {displayText: 'consulta completa 👑'}, type: 1},
        ]
    let buttonMessage6 = {
        text: `Ebaa ${pushname}, Este número foi encontrado 🥳\n\nNúmero: _~${text}~_\nNome da pessoa: _~${xx.Nome}~_`,
        footer: 'escolha abaixo qual o tipo de consulta você deseja:',
        buttons: buttons6,
        headerType: 2
    }
    bat.sendMessage(m.chat, buttonMessage6)
} else {
    
    m.reply(`⚠️ TELEFONE NÃO ENCONTRADO!`)
}

                break

    case 'tel1':
    case 'telefone1':
    if(!isPremium2 && !m.isGroup) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
    if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\n51995379721\n\n/telefone 51995379721\n\n━━━━━━━━━━━━━━━━━━━━━`)
    var query = text
    .split('+').join('')
    .split('-').join('')
    .split(' ').join('')
    .split('(').join('')
    .split(')').join('');
    if(query.length < 10) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\n51995379721\n\n/telefone 51995379721\n\n━━━━━━━━━━━━━━━━━━━━━');
    if(query.length == 10) {
        var resultado3 = query.replace(/(\d{2})/, "$19")
         return m.reply(`Identifiquei que esse número marcado tem um 9 a menos tente colocar mais ou menos assim:\n\n❌ - ERRADO: ${query}\n✅ - CERTO (ou não): ${resultado3}\n\n Caso eu tenha configurado errado, ajuste manualmente e puxe usando o /tel`);
     }
    if(query.length > 11) return m.reply('❌ - Isso é um telefone ou um cpf?');
    if(isNaN(query)) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\n51995379721\n\n/telefone 51995379721\n\n━━━━━━━━━━━━━━━━━━━━━');
                m.reply(`*Ei ${pushname} já estou consultando...* Enquanto isso tome um café☕\nCaso não retorne nada, nao foi encontrado.`)
                xx = await fetchJson(`${global.apidados}/telefone/${text}/${global.apiToken}`)
 
if (xx.Nome != undefined) {
    consulta = `═════════════════════
🕵️  CONSULTA REALIZADA  🕵️
═════════════════════
            
 INFORMAÇÕES:

• *NOME:* ${xx.Nome}
• *CPF:* ${xx.CpfCnpj} 

 ENDEREÇO:

 • *ESTADO:* ${xx.Estado}
 • *CIDADE:* ${xx.Cidade}
 • *BAIRRO:* ${xx.Bairro}
 • *COMPLEMENTO:* ${xx.Complemento}
 • *RUA:* ${xx.Logradouro}
 • *NUMERO:* ${xx.Número}


 • *Usuario:* ${pushname}

 🔛 BY: KARMA BOT

━━━━━━━━━━━━━━━━━━`
m.reply(consulta)
  
} else {
    
    m.reply(`⚠️ TELEFONE NÃO ENCONTRADO!`)
}

                break

                case 'tel2':
                 
                if(!isPremium2) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
                if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\n51995379721\n\n/tel2 51995379721\n\n━━━━━━━━━━━━━━━━━━━━━`)
                var query = text
    .split('+').join('')
    .split('-').join('')
    .split(' ').join('')
    .split('(').join('')
    .split(')').join('');
    if(query.length < 9) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\n51995379721\n\n/tel2 51995379721\n\n━━━━━━━━━━━━━━━━━━━━━');
    if(query.length == 10) {
        var resultado3 = query.replace(/(\d{2})/, "$19")
         return m.reply(`Identifiquei que esse número marcado tem um 9 a menos tente colocar mais ou menos assim:\n\n❌ - ERRADO: ${query}\n✅ - CERTO (ou não): ${resultado3}\n\n Caso eu tenha configurado errado, ajuste manualmente e puxe usando o /tel`);
     }
    if(query.length > 11) return m.reply('❌ - Isso é um telefone ou um cpf?');
    if(isNaN(query)) return m.reply('☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\n51995379721\n\n/tel2 51995379721\n\n━━━━━━━━━━━━━━━━━━━━━');
                m.reply(`*Ei ${pushname} já estou consultando...* Enquanto isso tome um café☕\nCaso não retorne nada, nao foi encontrado.`)
                xx = await fetchJson(`${global.apidados}/telefone/${text}/${global.apiToken}`)
                if(xx.CpfCnpj.length > 11) return m.reply('O cpf localizado neste númrto era maior que 11 logo n vou conseguir encontrar (suspeito q seja um cnpj)');
                if (xx.CpfCnpj != undefined) {
                apii = await fetchJson(`${global.apidados}/cpf3/${xx.CpfCnpj}/${global.apiToken}`)


                  consulta = `═════════════════════
🕵️  CONSULTA REALIZADA  🕵️
═════════════════════

 INFORMAÇÕES DO CPF:

• *CPF:* ${apii.Cpf}
• *CNS:* ${apii.Cns}
• *RG:* ${apii.Rg}
• *CNS:* ${apii.Cns}
• *EXPEDIÇÃO:* ${apii.DataDeExpedição}
• *ORGÃO EXPEDIDOR:* ${apii.OrgãoExpedidor}
• *RG UF:* ${apii.UfRg}

 INFORMAÇÕES DA PESSOA:

• *NOME:* ${apii.Nome}
• *SEXO:* ${apii.Sexo}
• *NASCIMENTO:* ${apii.Nascimento}
• *IDADE:* ${apii.Idade}
• *COR:* ${apii.Cor}
• *SIGNO:* ${apii.Signo}
• *TIPO SANGUÍNEO:* ${apii.TipoSanguíneo}
• *EMAIL:* ${apii.Email}
• *TELEFONE:* ${apii.Telefone}

 PARENTES:

 • *MÃE:* ${apii.Mãe}
 • *PAI:* ${apii.Pai}

 ENDEREÇO:

 • *ESTADO:* ${apii.Estado}
 • *CIDADE:* ${apii.Cidade}
 • *BAIRRO:* ${apii.Bairro}
 • *CEP:* ${apii.Cep}
 • *RUA:* ${apii.Logradouro}
 • *NUMERO:* ${apii.Número}

 • *Usuario:* ${pushname}

🔛 BY: KARMA BOT

 ━━━━━━━━━━━━━━━━━━`
m.reply(consulta)
} else {
    m.reply(`⚠️ TELEFONE NÃO ENCONTRADO!`)
}
                break

                case 'tel3':
                    case 'telefone3':
                     
                    if(!isPremium2) throw (`👑 *ESSE COMANDO SÓ PODE SER USADO SE FOR VIP*\n\n💰 PARA COMPRAR VIP DIGITE:\n\n/planos\n/contratar`)
                    if(!text) throw (`☑️ 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗧𝗘𝗟𝗘𝗙𝗢𝗡𝗘\n\n━━━━━━━━━━━━━━━━━━━━━\nConsulta completa de Número de Telefone, retorna todos \nos dados do dono do Telefone.\n\nFormato:\nmarque uma mensagem ou marque uma pessoa\n\n/tel3 @usuáro\n\n━━━━━━━━━━━━━━━━━━━━━`)
                    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+''
    var resultado = users.replace("@s.whatsapp.net", "");
    var resultado2 = resultado.replace(/(\d{2})/, "");
    if(resultado2.length == 10) {
        var resultado3 = resultado2.replace(/(\d{2})/, "$19")
        m.reply(`Estou consultando, mas nota-se que seu numero só tem *10 digitos*, então fiz uma pequena mudança *adicionando* um 9.\n\nEra assim: ${resultado2}\nDeixei assim: ${resultado3}\n\n Caso eu tenha configurado errado, ajuste manualmente e puxe usando o /tel`);
        xxa = await fetchJson(`${global.apidados}/telefone/${resultado3}/${global.apiToken}`)
        if (xxa.Nome != undefined) {
        consultaa = `═════════════════════
🕵️  CONSULTA REALIZADA  🕵️
═════════════════════

INFORMAÇÕES:
        
 • *NOME:* ${xxa.Nome}
 • *CPF:* ${xxa.CpfCnpj} 
        
ENDEREÇO:
        
 • *ESTADO:* ${xxa.Estado}
 • *CIDADE:* ${xxa.Cidade}
 • *BAIRRO:* ${xxa.Bairro}
 • *COMPLEMENTO:* ${xxa.Complemento}
 • *RUA:* ${xxa.Logradouro}
 • *NUMERO:* ${xxa.Número}

 • *Usuario:* ${pushname}

🔛 BY: KARMA BOT

━━━━━━━━━━━━━━━━━━`
        m.reply(consultaa) 
    } else {
    
            m.reply(`⚠️ TELEFONE NÃO ENCONTRADO!`)
        }
    }

    if(resultado2.length == 11) {
                m.reply(`Aguarde ${pushname}, estou consultando os dados dessa pessoa...`)
    xx = await fetchJson(`${global.apidados}/telefone/${resultado2}/${global.apiToken}`)
   if (xx.Nome != undefined) {
    consulta = `═════════════════════
🕵️  CONSULTA REALIZADA  🕵️
═════════════════════
            
 INFORMAÇÕES:

• *NOME:* ${xx.Nome}
• *CPF:* ${xx.CpfCnpj} 

 ENDEREÇO:

 • *ESTADO:* ${xx.Estado}
 • *CIDADE:* ${xx.Cidade}
 • *BAIRRO:* ${xx.Bairro}
 • *COMPLEMENTO:* ${xx.Complemento}
 • *RUA:* ${xx.Logradouro}
 • *NUMERO:* ${xx.Número}

━━━━━━━━━━━━━━━━━━`
m.reply(consulta)
  
} else {
    
    m.reply(`⚠️ TELEFONE NÃO ENCONTRADO!`)
}
} 
break

case 'ping': case 'botstatus': case 'statusbot': {
    const used = process.memoryUsage()
    const cpus = os.cpus().map(cpu => {
        cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
        return cpu
    })
    const cpu = cpus.reduce((last, cpu, _, { length }) => {
        last.total += cpu.total
        last.speed += cpu.speed / length
        last.times.user += cpu.times.user
        last.times.nice += cpu.times.nice
        last.times.sys += cpu.times.sys
        last.times.idle += cpu.times.idle
        last.times.irq += cpu.times.irq
        return last
    }, {
        speed: 0,
        total: 0,
        times: {
            user: 0,
            nice: 0,
            sys: 0,
            idle: 0,
            irq: 0
    }
    })
    let timestamp = speed()
    let latensi = speed() - timestamp
    neww = performance.now()
    oldd = performance.now()
    respon = `💻 Info do Bot

🚀 Tempo de resposta ${latensi.toFixed(4)} _Segundos_ \n\n⏳ Tempo ativo : ${runtime(process.uptime())}`.trim()
    m.reply(respon)
}
break

		// caso queira um menu de template button com imagem, basta apagar o /* do começo e o */ do final do comando.
			
            /*case 'start': case 'menu': case 'iniciar': case 'help': {
                anu = `OLÁ!!\nIREI FACILITAR MUITO SUA VIDA FAZENDO CONSULTAS!\n\n_selecione uma opção_`
                let message = await prepareWAMessageMedia({ image: fs.readFileSync('./lib/bat.jpg') }, { upload: bat.waUploadToServer })
                const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
                    templateMessage: {
                        hydratedTemplate: {
                            imageMessage: message.imageMessage,
                            hydratedContentText: anu,
                            hydratedButtons: [{
                                urlButton: {
                                    displayText: 'Meu grupo 🔆',
                                    url: 'https://chat.whatsapp.com/FeBFBymIjuj39NWD94i5Ob'
                                }
                            }, {
                                callButton: {
                                    displayText: 'Meu criador 👨‍💻',
                                    phoneNumber: '+55 94 9142-4691'
                                }
                            }, {
                                quickReplyButton: {
                                    displayText: 'CONSULTAS 🔎',
                                    id: `${prefix}consultas`
                                }
                            }, {
                                quickReplyButton: {
                                    displayText: 'PLANOS 💰',
                                    id: `${prefix}planos`
                                }  
                            }]
                        }
                    }
                }), { userJid: m.chat, quoted: m })
                bat.relayMessage(m.chat, template.message, { messageId: template.key.id })
                //bat.relayMessage(template.message)
            }
            break*/
//------------------------ CASES DO DARK -----------------------\\

case 'check':
    if(!isPremium2) {
      m.reply(`Não, você não tem Premium.`)
    } else {
        m.reply(`Sim, você tem premium!`)
    }
    break
    case 'onlines': case 'liston': {
        let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
        let online = [...Object.keys(store.presences[id]), botNumber]
        bat.sendText(m.chat, 'Lista de Onlines:\n\n' + online.map(v => '⭔ @' + v.replace(/@.+/, '')).join`\n`, m, { mentions: online })
 }
 break
			// teste para enviar mensagem na id q vc colocar (para ver uma id basta dar /getid)
        case 'testsend':
            bat.sendMessage(`120363022980336151@g.us`, {text: 'a'}, m)
            break
        case 'getid':
            m.reply(m.chat)
            break
			
                case 'linkgp': case 'linkgc': {
                    if (!m.isGroup) return m.reply (mess.group)
                    let response = await bat.groupInviteCode(m.chat)
                    bat.sendText(m.chat, `https://chat.whatsapp.com/${response}\n\nLink do grupo: ${groupMetadata.subject}`, m, { detectLink: true })
                }
                break


//-------------------- FIM DAS CASES -----------------------\\
    case 'start': case 'menu': case 'iniciar': case 'help':
	const templateButtons = [
    {index: 1, urlButton: {displayText: '🔆 Meu grupo', url: 'https://chat.whatsapp.com/FeBFBymIjuj39NWD94i5Ob'}},
    {index: 2, urlButton: {displayText: '👨‍💻 Meu criador', url: 'https://wa.me/559491423691'}},
    //{index: 6, urlButton: {displayText: '📼 Canal do meu dono', url: 'https://www.youtube.com/MawyDev'}},
    {index: 3, quickReplyButton: {displayText: '🔎 BUSCAS', id: `${prefix}consultas`}},
    {index: 4, quickReplyButton: {displayText: '💰 PLANOS', id: `${prefix}planos`}},
    {index: 6, quickReplyButton: {displayText: '🟣 MENU COMPLETO', id: `${prefix}menu2`}},
]

const templateMessage = {
    text: `*MENU*\nOLÁ ${pushname}!!\nSOU UM BOT DE CONSULTAS!`,
    footer: 'SELECIONE UMA OPÇÃO:',
    templateButtons: templateButtons
}

const sendMsg1 = await bat.sendMessage(m.chat, templateMessage)
break
            default:
                if (budy.startsWith('=>')) {
                    if (!isCreator) return m.reply(mess.owner)
                    function Return(sul) {
                        sat = JSON.stringify(sul, null, 2)
                        bang = util.format(sat)
                            if (sat == undefined) {
                                bang = util.format(sul)
                            }
                            return m.reply(bang)
                    }
                    try {
                        m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
                    } catch (e) {
                        m.reply(String(e))
                    }
                }

                if (budy.startsWith('>')) {
                    if (!isCreator) return m.reply(mess.owner)
                    try {
                        let evaled = await eval(budy.slice(2))
                        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                        await m.reply(evaled)
                    } catch (err) {
                        await m.reply(String(err))
                    }
                }

                if (budy.startsWith('$')) {
                    if (!isCreator) return m.reply(mess.owner)
                    exec(budy.slice(2), (err, stdout) => {
                        if(err) return m.reply(err)
                        if (stdout) return m.reply(stdout)
                    })
                }
			
		if (m.chat.endsWith('@s.whatsapp.net') && isCmd) {
                    this.anonymous = this.anonymous ? this.anonymous : {}
                    let room = Object.values(this.anonymous).find(room => [room.a, room.b].includes(m.sender) && room.state === 'CHATTING')
                    if (room) {
                        if (/^.*(next|leave|start)/.test(m.text)) return
                        if (['.next', '.leave', '.stop', '.start', 'Cari Partner', 'Keluar', 'Lanjut', 'Stop'].includes(m.text)) return
                        let other = [room.a, room.b].find(user => user !== m.sender)
                        m.copyNForward(other, true, m.quoted && m.quoted.fromMe ? {
                            contextInfo: {
                                ...m.msg.contextInfo,
                                forwardingScore: 0,
                                isForwarded: true,
                                participant: other
                            }
                        } : {})
                    }
                    return !0
                }
			
		if (isCmd && budy.toLowerCase() != undefined) {
		    if (m.chat.endsWith('broadcast')) return
		    if (m.isBaileys) return
		    let msgs = global.db.database
		    if (!(budy.toLowerCase() in msgs)) return
		    bat.copyNForward(m.chat, msgs[budy.toLowerCase()], true)
		}
        }
        

    } catch (err) {
        m.reply(util.format(err))
    }
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
