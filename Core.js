process.on("uncaughtException", console.error);
require("./config");

const fs = require('fs');
const pm2 = require('pm2');
const util = require("util");
const { promisify } = require('util');
const setTimeoutPromise = promisify(setTimeout);
const chalk = require("chalk");
const axios = require('axios');
const sharp = require('sharp');
const { spawn, exec, execSync } = require("child_process");
const moment = require("moment-timezone");
const { EmojiAPI } = require("emoji-api");
const { addBalance } = require("./lib/limit.js");
const { smsg, formatp, tanggal, GIFBufferToVideoBuffer, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, fetchBuffer } = require('./lib/myfunc')
const _ = require("lodash");
const yargs = require("yargs/yargs");
const kaitime = moment.tz('Asia/Kolkata').format('HH:mm:ss');
const kaidate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY');
const time2 = moment().tz('Asia/Kolkata').format('HH:mm:ss');
const currentDate = new Date();
const options = { weekday: 'long' }; // Specify 'long' to get the full day name
const currentDay = new Intl.DateTimeFormat('en-US', options).format(currentDate);

const speed = require('performance-now');
const eco = require('discord-mongoose-economy');
// const thiccysapi = require('textmaker-thiccy');
const ffmpeg = require('fluent-ffmpeg');
// const ffmpegPath = require('@ffmpeg-static/ffmpeg');
 const ffmpegPath = require('ffmpeg-static').path;
 ffmpeg.setFfmpegPath(ffmpegPath);
const Jimp = require('jimp');  // for full dp etc.
const modapk = require("tod-api");
const { hentai } = require('./lib/scraper2.js');
const { instadl } = require('./lib/instadl');
const ty = eco.connect('mongodb+srv://Arch:1t6l2G0r6nagLlOb@cluster0.gedh4.mongodb.net/?retryWrites=true&w=majority');
const { isLimit, limitAdd, getLimit, giveLimit, kurangBalance, getBalance, isGame, gameAdd, givegame, cekGLimit } = require('./lib/limit.js');
const githubstalk = require('./lib/githubstalk');
let { covid } = require('./lib/covid.js');
const { Gempa } = require("./lib/gempa.js");
//-------- TEST START
const {
	downloadContentFromMessage,
    BufferJSON,
    WA_DEFAULT_EPHEMERAL,
    generateWAMessageFromContent,
    proto,
    generateWAMessageContent,
    generateWAMessage,
    prepareWAMessageMedia,
    areJidsSameUser,
    getContentType
} = require('@whiskeysockets/baileys')
//-------- END OF TEST
const spaceemojis = ["🌌", "🌠", "🚀", "🪐", "🌟"];     // list of emojis for Space CMDs.
const manyemojis = ["😄", "👍", "👏", "👌", "🥇", "🌟", "🎉", "🙌", "🤩", "💯", "🔥", "✨", "🚀", "💖", "🌈", "🌞", "🌠", "🌼", "💪", "😎", "💫", "💓", "🎈", "🎁", "🍾", "🎊", "🥳", "👑", "🌺", "🌻", "🌸"];
const os = require('os');       // for os info

const gis = require("g-i-s");
const { MessageType } = require('@whiskeysockets/baileys');
//"parse-ms": "^1.1.0",


//
let nowtime = '';

if (time2 < "05:00:00") {
  nowtime = 'Good night 🏙';
} else if (time2 < "11:00:00") {
  nowtime = 'Good morning 🌅';
} else if (time2 < "15:00:00") {
  nowtime = 'Good afternoon 🏞';
} else if (time2 < "18:00:00") {
  nowtime = 'Good evening 🌇';
} else if (time2 < "19:00:00") {
  nowtime = 'Good evening 🌆';
} else {
  nowtime = 'Good night 🌌';
}




//
const timestampe = speed();
const latensie = speed() - timestampe

var low;
try {
  low = require("lowdb");
} catch (e) {
  low = require("./lib/lowdb");
}

const { Low, JSONFile } = low;
const mongoDB = require("./lib/mongoDB");

global.opts = new Object(
  yargs(process.argv.slice(2)).exitProcess(false).parse()
);
global.db = new Low(
  /https?:\/\//.test(opts["db"] || "")
    ? new cloudDBAdapter(opts["db"])
    : /mongodb/.test(opts["db"])
      ? new mongoDB(opts["db"])
      : new JSONFile(`src/database.json`)
);
global.DATABASE = global.db; // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ)
    return new Promise((resolve) =>
      setInterval(function () {
        !global.db.READ
          ? (clearInterval(this),
            resolve(
              global.db.data == null ? global.loadDatabase() : global.db.data
            ))
          : null;
      }, 1 * 1000)
    );
  if (global.db.data !== null) return;
  global.db.READ = true;
  await global.db.read();
  global.db.READ = false;
  global.db.data = {
    users: {},
    chats: {},
    database: {},
    game: {},
    settings: {},
    others: {},
    sticker: {},
    ...(global.db.data || {}),
  };
  global.db.chain = _.chain(global.db.data);
};
loadDatabase();
global.db = JSON.parse(fs.readFileSync("./src/database.json"));
if (global.db)
  global.db = {
    sticker: {},
    database: {},
    game: {},
    others: {},
    users: {},
    ...(global.db || {}),
  };



//
let isSleeping = false; // Move the declaration here.
let banUser = JSON.parse(fs.readFileSync('./database/banUser.json'));
let banchat = JSON.parse(fs.readFileSync('./database/banChat.json'));
let kaiaudio = JSON.parse(fs.readFileSync('./Media-Database/audio.json'));
let _limit = JSON.parse(fs.readFileSync('./storage/user/limit.json'));
let _buruan = JSON.parse(fs.readFileSync('./storage/user/bounty.json'));
let _darahOrg = JSON.parse(fs.readFileSync('./storage/user/blood.json'))
let ntnsfw = JSON.parse(fs.readFileSync('./database/nsfw.json')); //
let pendaftar = JSON.parse(fs.readFileSync('./storage/user/user.json'))
let balance = JSON.parse(fs.readFileSync('./database/balance.json'))
let ssewa = JSON.parse(fs.readFileSync('./database/sewa.json'))
let ban = JSON.parse(fs.readFileSync('./database/ban.json'))
let autosticker = JSON.parse(fs.readFileSync('./database/autosticker.json'))
const _autostick = JSON.parse(fs.readFileSync('./database/autostickpc.json'))
let limit = JSON.parse(fs.readFileSync('./database/limit.json'))
let setik = JSON.parse(fs.readFileSync('./src/sticker.json'))
let vien = JSON.parse(fs.readFileSync('./src/audio.json'))
let imagi = JSON.parse(fs.readFileSync('./src/image.json'))
let videox = JSON.parse(fs.readFileSync('./src/video.json'))
global.db = JSON.parse(fs.readFileSync('./src/database.json'))
let _sewa = require("./lib/sewa");
const sewa = JSON.parse(fs.readFileSync('./database/sewa.json'))
const time = moment.tz('Asia/Kolkata').format('DD/MM HH:mm:ss')
const ucap = moment(Date.now()).tz('Asia/Kolkata').locale('id').format('a')
var buln = ['/01/', '/02/', '/03/', '/04/', '/05/', '/06/', '/07/', '/08/', '/09/', '/10/', '/11/', '/12/'];
var myHari = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var tgel = new Date();
var hri = tgel.getDate();
var bulnh = tgel.getMonth();
var thisHari = tgel.getDay(),
  thisDaye = myHari[thisHari];
var yye = tgel.getYear();
var syear = (yye < 1000) ? yye + 1900 : yye;
const jangwak = (hri + '' + buln[bulnh] + '' + syear)
const janghar = (thisDaye)
var myHari = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var tgel = new Date();
var thisHari = tgel.getDay(),
  thisDaye = myHari[thisHari];
var yye = tgel.getYear();



//
module.exports = A17 = async (A17, m, chatUpdate, store) => {
  try {
    var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
    var budy = (typeof m.text == 'string' ? m.text : '')
    const prefix = global.prefa
    const isCmd = body.startsWith(prefix)
    const notCmd = body.startsWith('')
    const command = isCmd ? body.slice(1).trim().split(' ')[0].toLowerCase() : ''
    const args = body.trim().split(/ +/).slice(1)
    const pushname = m.pushName || "No Name"
    const botNumber = await A17.decodeJid(A17.user.id)
    const isCreator = [botNumber, ...global.Owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isAli = [botNumber, ...global.sora].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isShaq = [botNumber, ...global.shaq].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isTawfik = [botNumber, ...global.tawfik].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isJoan = [botNumber, ...global.eisa].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isBayome = [botNumber, ...global.bayome].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isHamid = [botNumber, ...global.hamid].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isEgo = [botNumber, ...global.ego].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isKaze = [botNumber, ...global.kaze].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const islucas = [botNumber, ...global.lucas].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isTori = [botNumber, ...global.tori].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isAsir = [botNumber, ...global.asir].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isDabi = [botNumber, ...global.dabi].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isAwad = [botNumber, ...global.awad].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isAbd = [botNumber, ...global.coomer].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isAdam = [botNumber, ...global.adam].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isMob = [botNumber, ...global.mob].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isHkl = [botNumber, ...global.hkl].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) 
    const isIssam = [botNumber, ...global.issam].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isIssamm = [botNumber, ...global.issamm].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isIssammm = [botNumber, ...global.issammm].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const itsMe = m.sender == botNumber ? true : false 
    const tagg = (m.mentionedJid.includes(botNumber) || (m.quoted && m.quoted.sender === botNumber)) ? botNumber : null;
    const text = args.join(" ")
    const from = m.chat
    const quoted = m.quoted ? m.quoted : m
    const mime = (quoted.msg || quoted).mimetype || ''
    const isMedia = /image|video|sticker|audio/.test(mime)
    const messagesD = body.slice(0).trim().split(/ +/).shift().toLowerCase()
    const groupMetadata = m.isGroup ? await A17.groupMetadata(m.chat).catch(e => { }) : ''
    const groupName = m.isGroup ? groupMetadata.subject : ''
    const participants = m.isGroup ? await groupMetadata.participants : ''
    const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
    const groupOwner = m.isGroup ? groupMetadata.owner : ''
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    const isUser = pendaftar.includes(m.sender)
    const isBan = banUser.includes(m.sender)
    const welcm = m.isGroup ? wlcm.includes(from) : false
    const isBanChat = m.isGroup ? banchat.includes(from) : false
    const isRakyat = isCreator || global.rkyt.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || false
    const AntiLink = m.isGroup ? ntilink.includes(from) : false
    const AntiLinkYoutubeVid = m.isGroup ? ntilinkytvid.includes(from) : false
    const AntiLinkYoutubeChannel = m.isGroup ? ntilinkytch.includes(from) : false
    const AntiLinkInstagram = m.isGroup ? ntilinkig.includes(from) : false
    const AntiLinkFacebook = m.isGroup ? ntilinkfb.includes(from) : false
    const AntiLinkTiktok = m.isGroup ? ntilinktt.includes(from) : false
    const AntiLinkTelegram = m.isGroup ? ntilinktg.includes(from) : false
    const AntiLinkTwitter = m.isGroup ? ntilinktwt.includes(from) : false
    const AntiLinkAll = m.isGroup ? ntilinkall.includes(from) : false
    const antiWame = m.isGroup ? ntwame.includes(from) : false
    const antiVirtex = m.isGroup ? ntvirtex.includes(from) : false
    const AntiNsfw = m.isGroup ? ntnsfw.includes(from) : false
    autoreadsw = true
    const AntiBadWord = m.isGroup ? ntword.includes(from) : false
    const content = JSON.stringify(m.message)
    const q = args.join(' ')

    const isQuotedVideo = m.mtype === 'extendedTextMessage' && content.includes('videoMessage')
    const isQuotedAudio = m.mtype === 'extendedTextMessage' && content.includes('audioMessage')



    autoreadsw = true;
    _sewa.expiredCheck(A17, sewa);

    const reply = (teks) => {
      A17.sendMessage(m.chat, { text: teks }, { quoted: m })
    }


    /* const reply = (teks) => {
      A17.sendMessage(m.chat, { text: teks }, { quoted: m }); 
    }; */


    const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
    const senderNumber = sender.split('@')[0]

    function randomNomor(angka) {
      return Math.floor(Math.random() * angka) + 1;
    }

    if (m.message) {
      addBalance(m.sender, randomNomor(574), balance);
      console.log(
        chalk.black(chalk.bgWhite("[ MESSAGE ]")),
        chalk.black(chalk.bgGreen(new Date())),
        chalk.black(chalk.bgBlue(budy || m.mtype)) +
        "\n" +
        chalk.magenta("=> From"),
        chalk.green(pushname),
        chalk.yellow(m.sender) + "\n" + chalk.blueBright("=> In"),
        chalk.green(m.isGroup ? pushname : "Private Chat", m.chat)
      );
    }

    if (isCmd && !isUser) {
      pendaftar.push(m.sender);
      fs.writeFileSync("./storage/user/user.json", JSON.stringify(pendaftar));
    }

    //----------------------------------------------------------------------------------------------------------//



    // if (global.autoreadpmngc) {
    //   if (command) {
    //     await A17.sendPresenceUpdate("composing", m.chat);
    //     A17.sendReadReceipt(from, m.sender, [m.key.id]);
    //   }
    // }


    //
    //   if (global.autoReadGc) {
    //   if (m.isGroup) { 
    //       A17.sendReadReceipt(m.chat, m.sender, [m.key.id]);
    //   }
    // }


    // if (global.autoReadAll) {
    //   if (m.chat) {
    //     A17.sendReadReceipt(m.chat, m.sender, [m.key.id]);
    //   }
    // }


    if (global.autoreadgc) {
      if (command) {
        await A17.sendPresenceUpdate('composing', m.chat);

        // Create an array of message keys to mark as read
        const keysToMarkAsRead = [
          {
            remoteJid: m.chat,
            id: m.key.id,
            participant: m.sender,
          },
          // You can add more message keys to mark multiple messages as red
        ];

        // Use the sock object to read the specified messages
        await A17.readMessages(keysToMarkAsRead);
      }
    }


    if (global.autoRecord) {
      if (m.chat) {
        A17.sendPresenceUpdate("recording", m.chat);
      }
    }

    if (global.autoTyping) {
      if (m.chat) {
        A17.sendPresenceUpdate("composing", m.chat);
      }
    }

    if (global.available) {
      if (m.chat) {
        A17.sendPresenceUpdate("available", m.chat);
      }
    }



    //Dm and Groups Autoreply/Bot chat
	  
// Function to get or create a session for a user 
  const userId = m.sender;  
function getOrCreateSessionId(userId) {
  let userSessions = {};
  try {
    const data = fs.readFileSync('./database/user_sessions.json', 'utf-8');
    userSessions = JSON.parse(data); 
  } catch (error) {
    console.log("No session data found, creating a new file.");
  }

  return userSessions[userId] || null; // Return the session ID if it exists, otherwise null
}

// Function to store the session ID for a user
function storeSessionId(userId, sessionId) {
  let userSessions = {};
  try {
    const data = fs.readFileSync('./database/user_sessions.json', 'utf-8');
    userSessions = JSON.parse(data); 
  } catch (error) {
    console.log("No session data found, creating a new file.");
  }

  userSessions[userId] = sessionId;
  fs.writeFileSync('./database/user_sessions.json', JSON.stringify(userSessions));
}

if (!isCmd && isCreator && !m.isGroup){
  const existingSessionId = getOrCreateSessionId(userId);

  const typ = ['plana', 'arona', 'adamxion'];
  const api = typ[Math.floor(Math.random() * typ.length)];

  let apiUrl = `https://skizo.tech/api/cai/chat?apikey=${api}&characterId=uA9-mMrcQav6iD0MyITij-twdhlqZ4Alemv79iKcO_c&token=529e24b4173b29dbc3054fef02a380e1e5b41949&text=${encodeURIComponent(budy)}`;

  // Add existing sessionId to the API URL if it exists
  if (existingSessionId) {
    apiUrl += `&sessionId=${existingSessionId}`;
  }

  try {
    const botreply = await axios.get(apiUrl);
    const sessionId = botreply.data.result.sessionId; // Get session ID from API response 
    storeSessionId(userId, sessionId); // Store the session ID for future use

    const menggoda = botreply.data.result.text;
    m.reply(menggoda);
  } catch (error) {
    console.error("Error fetching response from Character AI:", error);
    m.reply("Sorry, there was an error processing your reply.");
  }
}  
    
      if (!isCmd && !islucas && !isTawfik && !isAdam && !isCreator && !isAli && !isAwad && !isEgo && !isDabi && !isKaze && !isJoan && !isHkl && !m.isGroup){
         const typ = ['plana', 'arona', 'adamxion'];
        const api = typ[Math.floor(Math.random() * typ.length)];
        const botreply = await axios.get(`https://skizo.tech/api/cai/chat?apikey=${api}&characterId=RAj3vm_xQVvcApJ4BFosLkOQ8O6osGz5E-K5dn9l2xE&sessionId=9J5UUbRdp3OqpSaikXmivn9_tWcm9JAE3qcRLSth_H0&token=529e24b4173b29dbc3054fef02a380e1e5b41949&text=${encodeURIComponent(budy)}`)
        menggoda = `${botreply.data.result.text}`
        m.reply(menggoda)
        } 


     if (!isCmd && islucas && !m.isGroup){
       const typ = ['plana', 'arona', 'adamxion'];
        const api = typ[Math.floor(Math.random() * typ.length)];
        const botreply = await axios.get(`https://skizo.tech/api/cai/chat?apikey=${api}&characterId=Dvm_7p9ea1uPKtENq18-tjJqHpFkdmP-nFreeGx00s0&sessionId=Vc8LYfrj8siOpn8y42EoTb8PO6FtWhmUnuJReoiKjyI&token=1bee43f257d163058fdac76cf253b5a0eafdb5c8&text=${encodeURIComponent(budy)}`)
        menggoda = `${botreply.data.result.text}`
        m.reply(menggoda)
     }


    if (!isCmd && isTawfik && !m.isGroup){
      const typ = ['plana', 'arona', 'adamxion'];
        const api = typ[Math.floor(Math.random() * typ.length)];
        const botreply = await axios.get(`https://skizo.tech/api/cai/chat?apikey=${api}&characterId=XX3c9hBaUxR2qsF9VfbhojEsdrtYCSWZj4ZiuWeXaeI&sessionId=1u-66beykntXvPGVUws6CD09zxy0m4nX5VIabzIzo98&token=1bee43f257d163058fdac76cf253b5a0eafdb5c8&text=${encodeURIComponent(budy)}`)
        menggoda = `${botreply.data.result.text}`
        m.reply(menggoda)
    }


    if (!isCmd && isAdam && !m.isGroup){
      const typ = ['plana', 'arona', 'adamxion'];
        const api = typ[Math.floor(Math.random() * typ.length)];
        
        const botreply = await axios.get(`https://skizo.tech/api/cai/chat?apikey=${api}&characterId=JmfEuTkX9oGCDIpbvLUWocnVrm8-mtXJttnumQizXoI&sessionId=wKDKr86xnHcIB8igZr7Jip6gUZYyStNHpOvwd449FG4&token=1bee43f257d163058fdac76cf253b5a0eafdb5c8&text=${encodeURIComponent(budy)}`)
        menggoda = `${botreply.data.result.text}`
        m.reply(menggoda)
    }


  /*  if (!isCmd && isCreator && !m.isGroup){
      const typ = ['plana', 'arona', 'adamxion'];
        const api = typ[Math.floor(Math.random() * typ.length)];
        const botreply = await axios.get(`https://skizo.tech/api/cai/chat?apikey=${api}&characterId=uA9-mMrcQav6iD0MyITij-twdhlqZ4Alemv79iKcO_c&sessionId=hRYPx44-XJR8REiz_p_bPJHXeiFGzVtCR1Aec7cIg9E&token=529e24b4173b29dbc3054fef02a380e1e5b41949&text=${encodeURIComponent(budy)}`)
        menggoda = `${botreply.data.result.text}`
        m.reply(menggoda)
    } */


    if (!isCmd && isAli && !m.isGroup){
      const typ = ['plana', 'arona', 'adamxion'];
        const api = typ[Math.floor(Math.random() * typ.length)];
        
        const botreply = await axios.get(`https://skizo.tech/api/cai/chat?apikey=${api}&characterId=Pn2NO1mzCsmgCaZ6Eocxqg2bOnlPUv2sk7qwHWgEYWo&sessionId=Y9WOS2dfBmOvFwNAzPIl0_v_iNzg_HNFFkE2bzxGYE4&token=529e24b4173b29dbc3054fef02a380e1e5b41949&text=${encodeURIComponent(budy)}`)
        menggoda = `${botreply.data.result.text}`
        m.reply(menggoda)
          }


    if (!isCmd && isAwad && !m.isGroup){
      const typ = ['plana', 'arona', 'adamxion'];
        const api = typ[Math.floor(Math.random() * typ.length)];
        
        const botreply = await axios.get(`https://skizo.tech/api/cai/chat?apikey=${api}&characterId=U3dJdreV9rrvUiAnILMauI-oNH838a8E_kEYfOFPalE&sessionId=WN8Kmu9Zh3jHMAIG3J3xaZa8GXZZwHOeJ9-1LQpoEdA&token=529e24b4173b29dbc3054fef02a380e1e5b41949&text=${encodeURIComponent(budy)}`)
        menggoda = `${botreply.data.result.text}`
        m.reply(menggoda)
    }


    if (!isCmd && isEgo && !m.isGroup){
      const typ = ['plana', 'arona', 'adamxion'];
        const api = typ[Math.floor(Math.random() * typ.length)];
        
        const botreply = await axios.get(`https://skizo.tech/api/cai/chat?apikey=${api}&characterId=scsnOOq2jDNHqRpA9Inuckrb5HHqyQZgtxPFQyPJ-eQ&sessionId=uJiiBbwGUs4dDLYf768T2qvm83pz8NeKVS99R-efWPI&token=529e24b4173b29dbc3054fef02a380e1e5b41949&text=${encodeURIComponent(budy)}`)
        menggoda = `${botreply.data.result.text}`
        m.reply(menggoda)
    }


    if (!isCmd && isDabi && !m.isGroup){
      const typ = ['plana', 'arona', 'adamxion'];
        const api = typ[Math.floor(Math.random() * typ.length)];
        const botreply = await axios.get(`https://skizo.tech/api/cai/chat?apikey=${api}&characterId=QZmU2FJxM1vDzFxufgcgk7KDBVBHBpA98ma5hu7PNVc&sessionId=bDtHBp4PQ9E58ja8DfuVWkbjDUh5fCFJnaNQtIJ54Rg&token=1bee43f257d163058fdac76cf253b5a0eafdb5c8&text=${encodeURIComponent(budy)}`)
        menggoda = `${botreply.data.result.text}`
        m.reply(menggoda)
    }


    if (!isCmd && isKaze && !m.isGroup){
      const typ = ['plana', 'arona', 'adamxion'];
        const api = typ[Math.floor(Math.random() * typ.length)];
        
        const botreply = await axios.get(`https://skizo.tech/api/cai/chat?apikey=${api}&characterId=QZmU2FJxM1vDzFxufgcgk7KDBVBHBpA98ma5hu7PNVc&sessionId=Q2lM-zMJTtq52KQfHjokb4gDx1_fbWahjim8ET8HfOM&token=1bee43f257d163058fdac76cf253b5a0eafdb5c8&text=${encodeURIComponent(budy)}`)
        menggoda = `${botreply.data.result.text}`
        m.reply(menggoda)
    }


    if (!isCmd && isJoan && !m.isGroup){
      const typ = ['plana', 'arona', 'adamxion'];
        const api = typ[Math.floor(Math.random() * typ.length)];
        
        const botreply = await axios.get(`https://skizo.tech/api/cai/chat?apikey=${api}&characterId=J4XwSJQWf8sUTSlsyAsdHgnG2JrUpPY77XdWtGgqEnw&sessionId=pW8FCoyftHdOug1c2mLwAqkwld9zmTKni4RpyaiQNKs&token=529e24b4173b29dbc3054fef02a380e1e5b41949&text=${encodeURIComponent(budy)}`)
        menggoda = `${botreply.data.result.text}`
        m.reply(menggoda)
    }


    if (!isCmd && isHkl && !m.isGroup){
      const typ = ['plana', 'arona', 'adamxion'];
        const api = typ[Math.floor(Math.random() * typ.length)];
        
        const botreply = await axios.get(`https://skizo.tech/api/cai/chat?apikey=${api}&characterId=uA9-mMrcQav6iD0MyITij-twdhlqZ4Alemv79iKcO_c&sessionId=sS652w4JLzJ_mthbNrXKevxN0n6MGxfjcA5EZqogR2Y&token=529e24b4173b29dbc3054fef02a380e1e5b41949&text=${encodeURIComponent(budy)}`)
        menggoda = `${botreply.data.result.text}`
        m.reply(menggoda)
    }


/*    if (!isCmd && tagg && m.isGroup){
     const typ = ['plana', 'arona', 'adamxion'];
        const api = typ[Math.floor(Math.random() * typ.length)];
        
        const botreply = await axios.get(`https://skizo.tech/api/cai/chat?apikey=${api}&characterId=RAj3vm_xQVvcApJ4BFosLkOQ8O6osGz5E-K5dn9l2xE&sessionId=HZzrX3peZbMcshoJi0xV68nP-f9-OPzFcYIZFKt-zqs&token=529e24b4173b29dbc3054fef02a380e1e5b41949&text=${encodeURIComponent(budy)}`)
        menggoda = `${botreply.data.result.text}`
        m.reply(menggoda)
        } */


    /* if (isMedia && m.isGroup) {
let { GraphOrg } = require("./lib/uploader");
       
let media = await A17.downloadAndSaveMediaMessage
        let anu = await GraphOrg(media);
  let serika = await axios.get(`https://nsfw-categorize.it/api/upload?url=${util.format(anu)}`)
        const sensei = serika.data.data;
  if (serika.nsfw === true && serika.porn === true) {
    let { chat, fromMe, id } = m;
    
    const key = {
        remoteJid: chat,
        fromMe: fromMe,
        id: id,
        participant: m.sender
    };
        await A17.sendMessage(chat, { delete: key });
      if (isBotAdmins) await A17.sendMessage(from, { text: '*nudity detected message deleted*' });
  }

} */


    //----------------------------------------------------------------------------------------------------//



    //
    for (let anju of kaiaudio) {
      if(budy.includes(anju)) {
        result = fs.readFileSync(`./Assets/audio/${anju}.mp3`)
        A17.sendMessage(m.chat, { audio: result, mimetype: 'audio/mp4', ptt: true }, { quoted: m })
      }
    }


    //
    // const hariRaya = new Date("6 1, 2022 00:00:00");
    // const sekarang = new Date().getTime();
    // const Selisih = hariRaya - sekarang;
    // const jhari = Math.floor(Selisih / (1000 * 60 * 60 * 24));
    // const jjam = Math.floor(
    //   (Selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    // );
    // const mmmenit = Math.floor((Selisih % (1000 * 60 * 60)) / (1000 * 60));
    // const ddetik = Math.floor((Selisih % (1000 * 60)) / 1000);
    // const ultah = `${jhari}Day ${jjam}Hour ${mmmenit}Minute ${ddetik}Second`;

    // async function hitungmundur(bulan, tanggal) {
    //   let from = new Date(`${bulan} ${tanggal}, 2022 00:00:00`).getTime();
    //   let now = Date.now();
    //   let distance = from - now;
    //   let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //   let hours = Math.floor(
    //     (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    //   );
    //   let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //   let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    //   return (
    //     days +
    //     "Day " +
    //     hours +
    //     "Hour " +
    //     minutes +
    //     "Minute " +
    //     seconds +
    //     "Second"
    //   );
    // }



    //-----------------------------------------------------------------------------------------------------------------------------------//


    //don't edit this part.
    const formatTime = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    function updateStatus() {
      const uptimeInSeconds = Math.floor(process.uptime());
      const uptimeFormatted = formatTime(uptimeInSeconds);

    //    const status = `
     //  ㅤㅤ〄ㅤㅤ〘 akane710 sensei Personal Edition 〙ㅤㅤ〄ㅤㅤㅤㅤ
       //ㅤㅤㅤ〘ㅤ Auto Uptime: ${uptimeFormatted}ㅤ〙`;

      function _0x582b(_0xabb6f8, _0x12cdd8) { const _0x58e890 = _0x58e8(); return _0x582b = function (_0x582b90, _0x4387b3) { _0x582b90 = _0x582b90 - 0x189; let _0x932613 = _0x58e890[_0x582b90]; return _0x932613; }, _0x582b(_0xabb6f8, _0x12cdd8); } function _0x58e8() { const _0x109554 = ['12896370RDSmnX', '3BgvPel', '189HbmdoW', '18854HvEPNh', '11TZHUID', '9125326EcyeIg', '464328lPaAMf', '3400722cbWEOK', '2263175KIczdo', '12TaHNqM', '2521564eqJRHK']; _0x58e8 = function () { return _0x109554; }; return _0x58e8(); } (function (_0x429d7b, _0x532ab5) { const _0x527567 = _0x582b, _0x130eb4 = _0x429d7b(); while (!![]) { try { const _0x75c57a = -parseInt(_0x527567(0x18b)) / 0x1 + -parseInt(_0x527567(0x192)) / 0x2 * (-parseInt(_0x527567(0x189)) / 0x3) + parseInt(_0x527567(0x191)) / 0x4 * (-parseInt(_0x527567(0x190)) / 0x5) + -parseInt(_0x527567(0x18f)) / 0x6 + parseInt(_0x527567(0x18d)) / 0x7 + parseInt(_0x527567(0x18e)) / 0x8 * (-parseInt(_0x527567(0x18a)) / 0x9) + parseInt(_0x527567(0x193)) / 0xa * (parseInt(_0x527567(0x18c)) / 0xb); if (_0x75c57a === _0x532ab5) break; else _0x130eb4['push'](_0x130eb4['shift']()); } catch (_0x19ea04) { _0x130eb4['push'](_0x130eb4['shift']()); } } }(_0x58e8, 0xa8dae)); const status = '\x0a\x20\x20ㅤㅤ〄ㅤㅤ〘\x20plana\x20of\x20the\x20shittim\x20chest\x20〙ㅤㅤ〄ㅤㅤㅤㅤ\x0a\x20\x20ㅤㅤㅤ〘ㅤ\x20Auto\x20Uptime:\x20' + uptimeFormatted + 'ㅤ〙';

      A17.setStatus(status); // Set the status using A17.setStatus or your equivalent method

      // Update the status randomly within 5 minutes (300000 milliseconds)
      const randomTime = Math.floor(Math.random() * 300000) + 1000; // don't edit.
      setTimeout(updateStatus, randomTime);
    }

    // Initial call to start the random status updates
    updateStatus();



    //-----------------------------------------------------------------------------------------------------------------------------------//



    //
    // if (AntiLinkAll)
    //   var rondonxk = '[-a-zA-Z0-9@:%._+~#=].[-a-zA-Z0-9@:%._+~#=].[-a-zA-Z0-9()@:%_+.~#?&/=]'
    //   if (budy.includes("https://")) {
    //     if (!isBotAdmins) return
    //     bvl = `\`\`\`「  Antilink System  」\`\`\`\n\nLink sent by Admin so no action will be taken!`
    //     if (isAdmins) return reply(bvl)
    //     if (m.key.fromMe) return reply(bvl)
    //     if (isCreator) return reply(bvl)
    //     kice = m.sender
    //     await A17.sendMessage(
    //       from,
    //       {
    //         delete: {
    //           remoteJid: from,
    //           fromMe: false,
    //           id: m.id,
    //           participant: m.sender,
    //         },
    //       },
    //       {
    //         quoted: m,
    //       }
    //     );
    //   //  await A17.groupParticipantsUpdate(m.chat, [kice], 'remove')
    //     A17.sendMessage(from, { text: `\`\`\`「  Antilink System  」\`\`\`\n\n*⚠️ Group link detected !*\n\n*🚫@${kice.split("@")[0]} You are not allowed to send any links in this group !*\n`, contextInfo: { mentionedJid: [kice] } }, { quoted: m })
    //   } else {
    //   }

    // if (budy.includes("http://")) {
    //     if (!isBotAdmins) return
    //     bvl = `\`\`\`「  Antilink System  」\`\`\`\n\nLink sent by Admin so no action will be taken!`
    //     if (isAdmins) return reply(bvl)
    //     if (m.key.fromMe) return reply(bvl)
    //     if (isCreator) return reply(bvl)
    //     kice = m.sender
    //     await A17.sendMessage(
    //       from,
    //       {
    //         delete: {
    //           remoteJid: from,
    //           fromMe: false,
    //           id: m.id,
    //           participant: m.sender,
    //         },
    //       },
    //       {
    //         quoted: m,
    //       }
    //     );
    //   //  await A17.groupParticipantsUpdate(m.chat, [kice], 'remove')
    //     A17.sendMessage(from, { text: `\`\`\`「  Antilink System  」\`\`\`\n\n*⚠️ Group link detected !*\n\n*🚫@${kice.split("@")[0]} You are not allowed to send any links in this group !*\n`, contextInfo: { mentionedJid: [kice] } }, { quoted: m })
    //   } else {
    //   }


    //     const menulist = `
    //     Konichiwa ${pushname} dear . I am ${global.BotName}, a boot developed by: Kai to take your WhatsApp usage into next level.

    //        「 System Info 」

    //     Speed : ${latensie.toFixed(4)} miliseconds
    //     Up Time : ${runtime(process.uptime())}
    //     Bot Name : ${global.BotName}
    //     Owner Name : ${global.OwnerName}
    //     𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺 : Amazon AWS
    //     𝗧𝗼𝘁𝗮𝗹 𝗨𝘀𝗲𝗿 : ${Object.keys(global.db.users).length}


    //        「 User Info 」

    //     User Level: ${levelMenu}
    //     User XP : ${xpMenu} \ ${reqXp}
    //     User Role : ${role}


    //        「 User Bank 」

    //     User Balance : ${uangku}
    //    //Iron : ${getBesi(m.sender)}
    //     Gold : ${getEmas(m.sender)}
    //     Emarald : ${getEmerald(m.sender)}
    //     Potion : ${getPotion(m.sender)}


    //     Type *-menu* or press any button below to start using *${global.BotName}*

    //     ©️ *${global.BotName}* All Rights Reserved by: *Kai*
    //     `
    //         const qtod = m.quoted? "true":"false"



    // function pickRandom(list) {
    // return list[Math.floor(list.length * Math.random())]
    // 



    //-------------------------------------------------------------- tictactoe ----------------------------------------------------------------//


    //
    this.game = this.game ? this.game : {}
    let room = Object.values(this.game).find(room => room.id && room.game && room.state && room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender) && room.state == 'PLAYING')
    if (room) {
      let ok
      let isWin = !1
      let isTie = !1
      let isSurrender = !1
      //reply(`[DEBUG]\n${parseInt(m.text)}`)
      if (!/^([1-9]|(me)?give up|surr?ender|off|skip)$/i.test(m.text)) return
      isSurrender = !/^[1-9]$/.test(m.text)
      if (m.sender !== room.game.currentTurn) {
        if (!isSurrender) return !0
      }
      if (!isSurrender && 1 > (ok = room.game.turn(m.sender === room.game.playerO, parseInt(m.text) - 1))) {
        reply({
          '-3': 'Game Has Ended',
          '-2': 'Invalid',
          '-1': 'Invalid Position',
          0: 'Invalid Position',
        }[ok])
        return !0
      }
      if (m.sender === room.game.winner) isWin = true
      else if (room.game.board === 511) isTie = true
      let arr = room.game.render().map(v => {
        return {
          X: '❌',
          O: '⭕',
          1: '1️⃣',
          2: '2️⃣',
          3: '3️⃣',
          4: '4️⃣',
          5: '5️⃣',
          6: '6️⃣',
          7: '7️⃣',
          8: '8️⃣',
          9: '9️⃣',
        }[v]
      })
      if (isSurrender) {
        room.game._currentTurn = m.sender === room.game.playerX
        isWin = true
      }
      let winner = isSurrender ? room.game.currentTurn : room.game.winner
      let str = `Room ID: ${room.id}
${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}
${isWin ? `@${winner.split('@')[0]} Won!` : isTie ? `Game Over` : `Turn ${['❌', '⭕'][1 * room.game._currentTurn]} (@${room.game.currentTurn.split('@')[0]})`}
❌: @${room.game.playerX.split('@')[0]}
⭕: @${room.game.playerO.split('@')[0]}
Typed *surrender* to surrender and admited defeat`
      if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== m.chat)
        room[room.game._currentTurn ^ isSurrender ? 'x' : 'o'] = m.chat
      if (room.x !== room.o) await A17.sendText(room.x, str, m, { mentions: parseMention(str) })
      await A17.sendText(room.o, str, m, { mentions: parseMention(str) })
      if (isTie || isWin) {
        delete this.game[room.id]
      }
    }


    //-----------------------------------------------------------------------------------------------------------------------------------//


    //
   /* const pickRandom = (arr) => {
      return arr[Math.floor(Math.random() * arr.length)]
    }

    
  let smallinput = budy.toLowerCase()
  if (smallinput.includes('hello')) {
    reply (`Hello ${pushname}, I am ${BotName}. How can i help you?`);
  } 
  
  if (smallinput.includes('لييغ')) {
  
     reply (`اوووفوو امشي استحم يا خوريحتك والاني هنا🤮`);
  
  // } 
  
  if (smallinput=='kai') {
      reply (`My Boss is lost in another Multiverse, and I lost the connection with him...`)
  }
  
  
  if (smallinput=='ايها') {
    reply (`خدتكككك عليه`)
  }
  
  
  
  if( smallinput.includes('ايه') || smallinput.includes('إيه') || smallinput.includes('أيه') || smallinput.includes('اييه')){
    reply (`خدتكك عليه`);
  }
  
  
  if (smallinput=='a17') {
      reply ('Yes I am Alive')
  }
  
  if (smallinput=='sasha') {
    reply ('Only you...🫶🏻')
  }
  
  if (smallinput=='ping') {
      reply (`Hey ${pushname} Png ${latensie.toFixed(4)} ms`)
  }
  
  
  if (smallinput.includes('good morning') || smallinput.includes('ohayo')) {
    reply (`Good morning to you too ${pushname} ☺️. Have a great day 😇.`);
  }
  
  if (smallinput.includes('good afternoon') || smallinput.includes('konnichiwa')) {
  
    reply (`Good afthernoo to you too ${pushname} ✨. Wishing you an enjoyable afternoon too 😇🤞🏻.`);
  
  }
  
  
  //if (smallinput.includes('good afthernoon')) {
   // reply (`Huh ${pushname} 😇. Wishing you an enjoyable afternoon too.`);
  //   }
  
  
  if (smallinput.includes('good night')) {
    reply (`Good night to you too ${pushname} 😇. Sleep well and sweet dreams.`);
  }
  
  if (smallinput.includes('ليج')|| smallinput.includes('ليغ') || smallinput.includes('حد يكريني')) {
    reply (`اوووفووو امشي استحمى يا خو رحك واصلاني هنا🤮`);
 } */


    const responses = {


      hello: `Hello ${pushname}, I am ${BotName}. My current prefix is "${prefix}". How can I help you?`,
 //     البراء: `My Boss is lost in another Multiverse, and I lost connection with him...`,
      runtime: `Hey ${pushname}\n${nowtime}\n\nMy runtime:${runtime(process.uptime())}\n\nPrefix is: *${prefix}*\n\nTime: ${kaitime}\n\nDate: ${kaidate}\n\nToday is ${currentDay}`,
      konichiwa: `Konichiwa ${pushname}, I am ${BotName}. How can I help you?`,
    //  sasha: 'Only you...🫶🏻',
  //    اح: 'دا راسو بس',
      ping: `Hey ${pushname}, Pong ${latensie.toFixed(4)} ms`,
      'good morning': `Good morning to you too ${pushname} ☺️. Have a great day 😇.`,
      ohayo: `Good morning to you too ${pushname} ☺️. Have a great day 😇.`,
      'good afternoon': `Good afternoon to you too ${pushname} ✨. Wishing you an enjoyable afternoon too 😇🤞🏻.`,
      'good night': `Good night to you too ${pushname} 😇. Sleep well and sweet dreams.`,
    //  'سمعة': `اب لمعة`,
  //    'شوفونا': `يشوفك الزب قول آميين`,
      'جلا': `كلامك شين`,
      'ايه': `خدتك عليه `,
  //    'زبي': `صغير `,
     // 'بلانا': `شنو يا عسل`,
    //  'و انا': `انت على زبي' `,
 //     'انا': `انت على زبي' `,
//      'و أنا': `انت على زبي' `,
//      'وأنا': `انت على زبي' `,
  //    'ايه': `ارقعك واحد امبليه`,
    };

    const smallinput = budy.toLowerCase();

    if (responses.hasOwnProperty(smallinput)) {
      reply(responses[smallinput]);
    }
   // ...

   if (smallinput.includes('شوفونا') || smallinput.includes('شوفنا')) {
  const media = await getBuffer("https://media1.tenor.com/m/L4QUJbE-Zc8AAAAC/cat-cat-side-eye.gif");
  // Convert to WebP using sharp
  const webpBuffer = await sharp(media)
    .webp()
    .toBuffer();
  // Send sticker using A17 library (replace with your actual function)
  A17.sendMessage(from, { sticker: webpBuffer, animated: true }, { quoted: m });
}
 
	  
if (smallinput.includes('loli')) {
  let media = await getBuffer("https://graph.org/file/bcdc1bb1091a9e006bd53.mp4");
  const webpBuffer = await ffmpeg(media)
    .inputFormat('mp4')
    .outputFormat('webp')
    .videoCodec('libwebp')
    .audioCodec('none')
    .fps(30)
    .size('512x512')
    .loop(0)
    .toFormat('webp') // Use toFormat instead of outputFormat
    .outputOptions('-lossless 1') // Add this option for lossless conversion
    .outputOptions('-preset default') // Add this option for better quality
    .outputOptions('-loop 0') // Add this option to loop the animation indefinitely
    .save('output.webp'); // Save the output to a file

  // Now you can send the sticker using A17 library (replace with your actual function)
  A17.sendMessage(from, { sticker: webpBuffer }, { quoted: m });
}






  /*  if (smallinput.includes('يعني ايه') || smallinput.includes('ولا ايه') || smallinput.includes('في ايه')) {
    let media = await getBuffer("https://graph.org/file/1ffa4ac8f20ecb203b96d.mp4");
          let encmedia = await A17.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
          await fs.unlinkSync(encmedia);
    } */


    if (smallinput.includes('kiss') || smallinput.includes('بوسة')) {
    let media = await getBuffer("https://gifdb.com/images/thumbnail/ghost-hug-virtual-kiss-anime-girl-menhera-chan-c3fvyxsyb034zqbt.gif");
          const webpBuffer = await sharp(media)
         .webp({ animated: true }) // Set animated to true for animated stickers
         .toBuffer();
       // Send sticker using A17 library (replace with your actual function)
       A17.sendMessage(from, { sticker: webpBuffer }, { quoted: m });  
   }


    if (smallinput.includes('hug') || smallinput.includes('حضن')) {
    const sx = await axios.get("https://api.waifu.pics/sfw/hug");
     const gg = sx.data.url
      let media = await getBuffer(gg)
    let media2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXqQY6a2n4uFVN0GYSwSDNovD5skQv7Ky5Ag&usqp=CAU"); 
    let media3 = await getBuffer("https://i.pinimg.com/originals/ff/63/04/ff6304df8b82e3b924ae5369d8f0b340.gif");
       if (isIssam) { let encmedia3 = await A17.sendVideoAsSticker(m.chat, media3, m, { packname: global.packname, author: global.author })
                      await fs.unlinkSync(encmedia3); } 
      if (isAdam)  { let encmedia2 = await A17.sendImageAsSticker(m.chat, media2, m, { packname: global.packname, author: global.author })
                      await fs.unlinkSync(encmedia2); } else {
    let encmedia = await A17.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
          await fs.unlinkSync(encmedia); } 
    }


    if (smallinput.includes('براه') || smallinput.includes('bruh')) {
     if (isTawfik) return reply('تشسن')
      if (isAdam) return reply('تشسن')
      if (isIssam) return reply('تشسن')
      if (isCreator) return reply('حرفيا انت') 
    }


    if (smallinput.includes('مسا') || smallinput.includes('مثا')) {
    let media = await getBuffer("https://i.pinimg.com/originals/4d/89/d7/4d89d7f963b41a416ec8a55230dab31b.gif");
      if (isIssam) return reply('احلى مسا على احلى عصام🌹') 
    }


    if (smallinput.includes('صباح') || smallinput.includes('ثباح')) {
    let media = await getBuffer("https://i.pinimg.com/originals/4d/89/d7/4d89d7f963b41a416ec8a55230dab31b.gif");
      if (isIssam) return reply('احلى صباح على احلى عصام🌹') 
    }


    if (smallinput.includes('i love you') || smallinput.includes('بحبك') || smallinput.includes('love plana')) {
    // تحميل الصورة
 buffer = await getBuffer("https://mallucampaign.in/images/img_1710652882.jpg");
    // إرسال الصورة
    A17.sendMessage(from, { image: buffer, caption: `plana loves you too ${pushname}` }, { quoted: m });
}


    if (smallinput.includes('بلانا اطرديه') || smallinput.includes('حد يطرده') || smallinput.includes('اطلع برا')) {
        if (!isAdmins && !isCreator) return reply('🤏')
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        await A17.groupParticipantsUpdate(m.chat, [users], 'remove')
        if (isAdmins && isCreator) return reply('تم') 
        }


    if (smallinput.includes('امسح العار') || smallinput.includes('بلانا احذفي') || smallinput.includes('بلانا امسحي')) {
        if (!isCreator) return reply('نو')
        let { chat, fromMe, id } = m.quoted

        const key = {
          remoteJid: m.chat,
          fromMe: false,
          id: m.quoted.id,
          participant: m.quoted.sender
        }

        await A17.sendMessage(m.chat, { delete: key })
        if (isAdmins && isCreator) return reply('تم') 
     }


    if (smallinput.includes('يا نجم البحر')) {
    let media = await getBuffer("https://mallucampaign.in/images/img_1710704094.jpg");
          const webpBuffer = await sharp(media)
         .webp({ animated: true }) // Set animated to true for animated stickers
         .toBuffer();
       // Send sticker using A17 library (replace with your actual function)
       A17.sendMessage(from, { sticker: webpBuffer }, { quoted: m });  
   }
    

    if (smallinput.includes('plana') || smallinput.includes('بلانا') || smallinput.includes('البوت')) {
      const tt = ['شاك يا زولي', 'خليل يا خليل اختو ليك بالجنزبيل', 'مالك يا اروالي'];
    const gg = tt[Math.floor(Math.random() * tt.length)];
    if (isShaq) reply (gg) 
    // قائمة بروابط الصور المختلفة
   const imageUrls = [
 'https://graph.org/file/f8ffca497c6fc0ebc2370.png',
 'https://graph.org/file/8cb96154ceca2e3a7c559.png',
 'https://graph.org/file/86c444642b5768dc7d2d5.png',
 'https://graph.org/file/67186665580c88684c847.png',
 'https://graph.org/file/9d93b8c642147c0e0fda1.png',
 'https://graph.org/file/9d93b8c642147c0e0fda1.png',
 'https://graph.org/file/cf53ec7f3817161f70e04.png',
 'https://graph.org/file/06b1384e5851cb8df6453.png',
 'https://graph.org/file/fea1df2cb9c3cbd74208a.png',
 'https://graph.org/file/d8348cba6f9caa492f528.png',
 'https://graph.org/file/044205e05040b25ae18c0.png',
 'https://graph.org/file/3d639c81211176b676c7b.png',
 'https://graph.org/file/deaf54cca4d7e8c1645ac.png',
 'https://graph.org/file/554aba4cddf27e0cebe10.png',
 'https://graph.org/file/643187ff668a557512b66.png',
 'https://graph.org/file/9d88ea96e7c88decc3c26.png',
 'https://graph.org/file/605d62c22f3b3057124da.png',
 'https://graph.org/file/1d26e9d151405e99878e7.png',
 'https://graph.org/file/a38ed9f19170b07a235d9.png',
 'https://graph.org/file/ae225ecf4eea605fa167b.png',
 'https://graph.org/file/da7f5dcaf673f12be8a6d.png',
 'https://graph.org/file/6f8872058c39134e0fbfa.png',
 'https://graph.org/file/fd3ba2812b12cf5c3609a.png',
 'https://graph.org/file/73865e2cf9159393c7542.png',
 'https://graph.org/file/eced2b8043793bb27c203.png',
 'https://graph.org/file/586ef4516dac781fe9fe7.png',
 'https://graph.org/file/c637016bdc9c6bd801b16.png',
 'https://graph.org/file/eb52990a6ad3b167cdda2.png',
 'https://graph.org/file/36668cd71370d782724a6.png',
 'https://graph.org/file/ef59a99caa789d2d5fdf8.png',
 'https://graph.org/file/0c2f50ee0cb70aaeecb18.png',
 'https://graph.org/file/800513365a66b012cabb8.png',
 'https://graph.org/file/d267aec0acafe5f43f815.png',
 'https://graph.org/file/241eed3339a4cf3b48972.png',
 'https://graph.org/file/c75ddf11f60cdf8c84aa3.png',
 'https://graph.org/file/d2be0eb890ffafd60fbcc.png',
 'https://graph.org/file/b3358420cd2879e69ed89.png',
 'https://graph.org/file/752b1574303ae17d4d4d2.png',
 'https://graph.org/file/3ce710fb2bb70ff8fc9fc.png',
 'https://graph.org/file/fafaa870311201cb56ee8.png',
 'https://graph.org/file/752b1574303ae17d4d4d2.png',
 'https://graph.org/file/734c560402d38bbe48b31.png',
 'https://graph.org/file/7f758dcff3c9cb07b3960.png',
 'https://graph.org/file/eb9add667e4be99de2904.png',
 'https://graph.org/file/f98193c69a00ad41380d2.png',
 'https://graph.org/file/924d38ab4352f06f61764.png', 
 'https://graph.org/file/8898ed3a2d2c46a4a7507.png', 
 'https://graph.org/file/fb78830d527887d33fdd1.png',
 'https://graph.org/file/f6d00a4f0ebd25ebf81bc.png',
 'https://graph.org/file/962c95267780957222ca5.png',
 'https://graph.org/file/d2ec04d03177c8d7404f7.png',
 'https://graph.org/file/0144366acc19a0bddea17.png', 
 'https://graph.org/file/cd7e1b1b76f4392fa7404.png', 
 'https://graph.org/file/1e356202857f132ef8cd4.png',
 'https://graph.org/file/aa85fe7a2bd5b98d87261.png', 
 'https://graph.org/file/d5c33b6d5580e03f6fbae.png',
 'https://graph.org/file/4b4f4f569e732174d0194.png',
 'https://graph.org/file/fbd1e69c5a77e8055a794.png ', 
 'https://graph.org/file/56215d800f35648b84f32.png', 
 'https://graph.org/file/3be7b8bee2ca19e482ff5.png', 
 'https://graph.org/file/f41a859d4e4f5acae6218.png', 
 'https://graph.org/file/3514be8ab57da25f1c35e.png',
 'https://graph.org/file/4462adbed72f299a7dbff.png', 
 'https://graph.org/file/e1c185a32658c5ae13900.png',
 'https://graph.org/file/69034a1ce62ae64adb45b.png',
 'https://graph.org/file/970d05f46d2f3547d2e19.png',
 'https://graph.org/file/a13ad747a8e5fc7763cbe.png', 
 'https://graph.org/file/7dcbac9271c1184834e91.png', 
    ];

    // اختيار رابط عشوائي
    const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
        let media = await getBuffer(randomImageUrl);
        const webpBuffer = await sharp(media)
         .webp() 
         .toBuffer();
       // Send sticker using A17 library (replace with your actual function)
       A17.sendMessage(from, { sticker: webpBuffer }, { quoted: m });   
   } 

    if (smallinput.includes('كسم') || smallinput.includes('لوطي') || smallinput.includes('خول')) {
    const typ = ['شنو لكن', 'اتلفظ يا سمين', 'عيب يا زولي'];
    const random = typ[Math.floor(Math.random() * typ.length)];
      if (isAsir) return reply('اتلفظ يا شاب..ما هو ما ممكن تكون عطواني و فوقها قليل ادب') 
      if (isBayome) await A17.sendMessage(from, { text: 'الدعامة جوا لي بيومي في بيتهم اطلع من البيت توااا(هسع) قال ليهم معليش يا جماعة انا antisocial' });
      if (isAbd) await A17.sendMessage(from, { text: 'قال ليك مرة الدعامة رفعوا عبد الله في البوكسي اتقلب بيهم😹😹😹' });
      if (isAbd) return reply (random) 
      if (AntiBadWord) {
       let { chat, fromMe, id } = m;
    
    const key = {
        remoteJid: chat,
        fromMe: fromMe,
        id: id,
        participant: m.sender
    };
        await A17.sendMessage(chat, { delete: key });
      if (isBotAdmins && !isTawfik && !isIssam && !isAdam) await A17.sendMessage(from, { text: '*bad words detected..message deleted*' });
      if (isBotAdmins && isTawfik) await A17.sendMessage(from, { text: 'ياخي مجنون هذا التوفيق 😅' });
      if (isBotAdmins && isAdam) await A17.sendMessage(from, { text: 'لول آدم' });
      if (isBotAdmins && isIssam) await A17.sendMessage(from, { text: 'عصام قليل ادب؟ ' });
}
     } 
    

    if (smallinput.includes('زرقو') || smallinput.includes('زبي') || smallinput.includes('قنيط')) {
    const typ = ['زولي السمين مالك ههه', 'اتلفظ يا سمين', 'درعتها يا زولي'];
    const random = typ[Math.floor(Math.random() * typ.length)];
      if (isAsir) return reply('هوي يا عراقي') 
      if (isBayome) await A17.sendMessage(from, { text: 'الدعامة جوا لي بيومي في بيتهم اطلع من البيت توااا(هسع) قال ليهم معليش يا جماعة انا antisocial' });
      if (isAbd) return reply (random) 
      if (AntiBadWord) {
      let { chat, fromMe, id } = m;
    
    const key = {
        remoteJid: chat,
        fromMe: fromMe,
        id: id,
        participant: m.sender
    };
        await A17.sendMessage(chat, { delete: key });
      if (isBotAdmins && !isTawfik && !isIssam && !isAdam) await A17.sendMessage(from, { text: '*bad words detected..message deleted*' });
      if (isBotAdmins && isTawfik) await A17.sendMessage(from, { text: 'ياخي مجنون هذا التوفيق 😅' });
      if (isBotAdmins && isAdam) await A17.sendMessage(from, { text: 'لول آدم' });
      if (isBotAdmins && isIssam) await A17.sendMessage(from, { text: 'عصام قليل ادب؟ ' });
}
    } 
    
    if (smallinput.includes('شرموط') || smallinput.includes('بتتشرمط') || smallinput.includes('انيك')) {
      const typ = ['كلام شنو', 'زولي السمين فكت منو', 'عيب يا زولي'];
    const random = typ[Math.floor(Math.random() * typ.length)];
      if (isAsir) return reply('العطواني فكت منو') 
      if (isBayome) await A17.sendMessage(from, { text: 'الدعامة جوا لي بيومي في بيتهم اطلع من البيت توااا(هسع) قال ليهم معليش يا جماعة انا antisocial' });
      if (isAbd) return reply (random) 
      if (AntiBadWord) {
      let { chat, fromMe, id } = m;
    
    const key = {
        remoteJid: chat,
        fromMe: fromMe,
        id: id,
        participant: m.sender
    };
        await A17.sendMessage(chat, { delete: key });
      if (isBotAdmins && !isTawfik && !isIssam && !isAdam) await A17.sendMessage(from, { text: '*bad words detected..message deleted*' });
      if (isBotAdmins && isTawfik) await A17.sendMessage(from, { text: 'ياخي مجنون هذا التوفيق 😅' });
      if (isBotAdmins && isAdam) await A17.sendMessage(from, { text: 'لول آدم' });
      if (isBotAdmins && isIssam) await A17.sendMessage(from, { text: 'عصام قليل ادب؟ ' });
}
  }  


    if (smallinput.includes('احش') || smallinput.includes('بنيك') || smallinput.includes('متناك')) {
    if (isAli) await A17.sendMessage(from, { text: 'الدعامة جوا لي علي في بيتهم قالوا ليهو اطلع من البيت توااا(هسع) قال ليهم معليش يا جماعة انا antisocial' });
    if (isAbd) await A17.sendMessage(from, { text: 'قال ليك مرة الدعامة رفعوا عبد الله في البوكسي اتقلب بيهم😹😹😹' });
     if (AntiBadWord) {
    let { chat, fromMe, id } = m;
    
    const key = {
        remoteJid: chat,
        fromMe: fromMe,
        id: id,
        participant: m.sender
    };
        await A17.sendMessage(chat, { delete: key });
      if (isBotAdmins && !isTawfik && !isIssam && !isAdam) await A17.sendMessage(from, { text: '*bad words detected..message deleted*' });
      if (isBotAdmins && isTawfik) await A17.sendMessage(from, { text: 'ياخي مجنون هذا التوفيق 😅' });
      if (isBotAdmins && isAdam) await A17.sendMessage(from, { text: 'لول آدم' });
      if (isBotAdmins && isIssam) await A17.sendMessage(from, { text: 'عصام قليل ادب؟ ' });
}
  }  


  
    if (smallinput.includes('fuck') || smallinput.includes('shit') || smallinput.includes('gay')) {
     if (isAli) await A17.sendMessage(from, { text: 'الدعامة جوا لي علي في بيتهم قالوا ليهو اطلع من البيت توااا(هسع) قال ليهم معليش يا جماعة انا antisocial' });
      if (isAbd) await A17.sendMessage(from, { text: 'قال ليك مرة الدعامة رفعوا عبد الله في البوكسي اتقلب بيهم😹😹😹' });
     if (AntiBadWord) {
      let { chat, fromMe, id } = m;
    
    const key = {
        remoteJid: chat,
        fromMe: fromMe,
        id: id,
        participant: m.sender
    };
        await A17.sendMessage(chat, { delete: key });
      if (isBotAdmins && !isTawfik && !isIssam && !isAdam) await A17.sendMessage(from, { text: '*bad words detected..message deleted*' });
      if (isBotAdmins && isTawfik) await A17.sendMessage(from, { text: 'ياخي مجنون هذا التوفيق 😅' });
      if (isBotAdmins && isAdam) await A17.sendMessage(from, { text: 'لول آدم' });
      if (isBotAdmins && isIssam) await A17.sendMessage(from, { text: 'عصام قليل ادب؟ ' });
}
}     


    if (smallinput.includes('زعاط') || smallinput.includes('سسسم') || smallinput.includes('عرص')) {
     if (isAli) await A17.sendMessage(from, { text: 'الدعامة جوا لي علي في بيتهم قالوا ليهو اطلع من البيت توااا(هسع) قال ليهم معليش يا جماعة انا antisocial' });
     if (isAbd) await A17.sendMessage(from, { text: 'قال ليك مرة الدعامة رفعوا عبد الله في البوكسي اتقلب بيهم😹😹😹' });
      if (AntiBadWord) {
      let { chat, fromMe, id } = m;
    
    const key = {
        remoteJid: chat,
        fromMe: fromMe,
        id: id,
        participant: m.sender
    };
        await A17.sendMessage(chat, { delete: key });
      if (isBotAdmins && !isTawfik && !isIssam && !isAdam) await A17.sendMessage(from, { text: '*bad words detected..message deleted*' });
      if (isBotAdmins && isTawfik) await A17.sendMessage(from, { text: 'ياخي مجنون هذا التوفيق 😅' });
      if (isBotAdmins && isAdam) await A17.sendMessage(from, { text: 'لول آدم' });
      if (isBotAdmins && isIssam) await A17.sendMessage(from, { text: 'عصام قليل ادب؟ ' });
}
 }   


    if (smallinput.includes('cock') || smallinput.includes('pussy') || smallinput.includes('sex')) {
      if (AntiBadWord) {
    let { chat, fromMe, id } = m;
    
    const key = {
        remoteJid: chat,
        fromMe: fromMe,
        id: id,
        participant: m.sender
    };
        await A17.sendMessage(chat, { delete: key });
      if (isBotAdmins && !isTawfik && !isIssam && !isAdam) await A17.sendMessage(from, { text: '*bad words detected..message deleted*' });
      if (isBotAdmins && isTawfik) await A17.sendMessage(from, { text: 'ياخي مجنون هذا التوفيق 😅' });
      if (isBotAdmins && isAdam) await A17.sendMessage(from, { text: 'لول آدم' });
      if (isBotAdmins && isIssam) await A17.sendMessage(from, { text: 'عصام قليل ادب؟ ' });
}
}    


    if (smallinput.includes('lesbian') || smallinput.includes('ass') || smallinput.includes('boobs')) {
     if (AntiBadWord) {
    let { chat, fromMe, id } = m;
    
    const key = {
        remoteJid: chat,
        fromMe: fromMe,
        id: id,
        participant: m.sender
    };
        await A17.sendMessage(chat, { delete: key });
      if (isBotAdmins && !isTawfik && !isIssam && !isAdam) await A17.sendMessage(from, { text: '*bad words detected..message deleted*' });
      if (isBotAdmins && isTawfik) await A17.sendMessage(from, { text: 'ياخي مجنون هذا التوفيق 😅' });
      if (isBotAdmins && isAdam) await A17.sendMessage(from, { text: 'لول آدم' });
      if (isBotAdmins && isIssam) await A17.sendMessage(from, { text: 'عصام قليل ادب؟ ' });
}
    }     

    if (smallinput.includes('bitch') || smallinput.includes('قنط') || smallinput.includes('طيز')) {
    if (AntiBadWord) {
    let { chat, fromMe, id } = m;
    
    const key = {
        remoteJid: chat,
        fromMe: fromMe,
        id: id,
        participant: m.sender
    };
        await A17.sendMessage(chat, { delete: key });
      if (isBotAdmins && !isTawfik && !isIssam && !isAdam) await A17.sendMessage(from, { text: '*bad words detected..message deleted*' });
      if (isBotAdmins && isTawfik) await A17.sendMessage(from, { text: 'ياخي مجنون هذا التوفيق 😅' });
      if (isBotAdmins && isAdam) await A17.sendMessage(from, { text: 'لول آدم' });
      if (isBotAdmins && isIssam) await A17.sendMessage(from, { text: 'عصام قليل ادب؟ ' });
}
    }


 
    
   if (smallinput.includes('فرنس') || smallinput.includes('france') || smallinput.includes('french') || smallinput.includes('🇫🇷')) {
    let { chat, fromMe, id } = m;
    
    const key = {
        remoteJid: chat,
        fromMe: fromMe,
        id: id,
        participant: m.sender
    };
        await A17.sendMessage(chat, { delete: key });
      if (isBotAdmins && !isTawfik && !isIssam && !isAdam) await A17.sendMessage(from, { text: '*no France allowed*' });
      if (isBotAdmins && isTawfik) await A17.sendMessage(from, { text: 'خخخخخ توفيق يتكلم فرنسي' });
      if (isBotAdmins && isAdam) await A17.sendMessage(from, { text: 'يعني مش كفاية انك آدم كمان عايز تتكلم فرنسي' });
      if (isBotAdmins && isIssam) await A17.sendMessage(from, { text: 'عصام اتجنن ' });
}

    if (smallinput.includes('مينغودا') || smallinput.includes('مينقودا') || smallinput.includes('menggoda')) {
    if (isTawfik) reply (`توفيق يا توفيق اختو ليك بي الابريق عيب الدنيا رمضان`);
           }


    if (smallinput.includes('🦍') || smallinput.includes('nigga') || smallinput.includes('shit')) {
    if (isHamid) reply (`🤭🤏`);
    }


    if (smallinput.includes('كسم بلانا') || smallinput.includes('كسمك يا بلانا') || smallinput.includes('كسم البوت')) {
    let userToKick = m.sender;
    await A17.groupParticipantsUpdate(m.chat, [userToKick], 'remove');
    if (isBotAdmins) await A17.sendMessage(from, { text: 'كدي الرااجل يرجعه' });
}


    if (smallinput.includes('ىم')) {
    let userToKick = m.sender;
    await A17.groupParticipantsUpdate(m.chat, [userToKick], 'remove');
    if (isBotAdmins) await A17.sendMessage(from, { text: 'هههههههه قايل لو شفرها ما حأفهم يعني' });
    if (isBotAdmins) await A17.sendMessage(from, { text: 'اطلع برا يلا يا مضحك' });
    } 


       if (smallinput.includes('america ya')) {
        for (let i = 0; i < 25; i++) {
            await A17.sendMessage(from, { text: 'HELLO :D' });
    }
}



   if (smallinput.includes('كصم') || smallinput.includes('شطور') || smallinput.includes('كثم')) {
   if (AntiBadWord) {
    let { chat, fromMe, id } = m;
    
    const key = {
        remoteJid: chat,
        fromMe: fromMe,
        id: id,
        participant: m.sender
    };
        await A17.sendMessage(chat, { delete: key });
      if (isBotAdmins && !isTawfik && !isIssam && !isAdam) await A17.sendMessage(from, { text: '*bad words detected..message deleted*' });
      if (isBotAdmins && isTawfik) await A17.sendMessage(from, { text: 'ياخي مجنون هذا التوفيق 😅' });
      if (isBotAdmins && isAdam) await A17.sendMessage(from, { text: 'لول آدم' });
      if (isBotAdmins && isIssam) await A17.sendMessage(from, { text: 'عصام قليل ادب؟ ' });
}
   } 


   if (smallinput.includes('فكيو') || smallinput.includes('فك يو') || smallinput.includes('شتفكب')) {
   if (isTawfik) return reply('توفيق تشان..عيب')
     reply (`🤓`);
          }


    if (smallinput.includes('براه يعبرن')) {
   if (isJoan) return reply('تعال ظوبري يعبرك🍆')
    }


    if (smallinput.includes('رد خاص')) {
   if (isJoan) return reply('رد على دا اول🍆')
    }


    if (smallinput.includes('براه بحياتي')) {
   if (isJoan) return reply('وانا')
    }


if (smallinput.includes('ثباح')) {
  const typ = ['ثبااااحوو', 'ثباحو يا عسل', 'احلى ثباحو على احلى جوعان🥰'];
   const random = typ[Math.floor(Math.random() * typ.length)];
   if (isJoan) return reply(random)
}


if (smallinput.includes('مثا')) {
  const typ = ['مثاااااؤ يا جميل', 'مثااؤ يا عسل', 'احلى مثاؤ على احلى جوعان🥰'];
   const random = typ[Math.floor(Math.random() * typ.length)];
   if (isJoan) return reply(random)
}
          

   if (smallinput.includes('دا اول') || smallinput.includes('ذا اول') || smallinput.includes('ده اول') || smallinput.includes('زاتو شين')) {
   reply (`🤏`);
          }


    if (smallinput.includes('pedo') || smallinput.includes('بيدو') || smallinput.includes('شفع')) {
   const imageUrls = [
        'https://graph.org/file/52c0d08cd7f69f682f0ac.jpg', 
         'https://graph.org/file/6908739acfc4d729a156b.jpg', 
                ]; 
      const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
        let media = await getBuffer(randomImageUrl);
   if (isTori) await A17.sendMessage(from, { image : mediaa });
    }


    if (smallinput.includes('كلامك شين')) {
   reply (`دا زاتو شين`);
    }


    if (smallinput.includes('كسم')) {
   if (isMob) return reply(`موب كلامك كتير و شراميطك حبة`);
     } 


    if (smallinput.includes('لوطي')) {
      const imageUrls = [
        'https://graph.org/file/e580fc2585c0abb435263.jpg', 
         'https://graph.org/file/0eb13a900d0f5689806a5.jpg', 
                ]; 
      const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
        let media = await getBuffer(randomImageUrl);
   if (isMob) await A17.sendMessage(from, { image : media });
      const imageUrlss = [
        'https://graph.org/file/eab639f031486fbee4f73.jpg', 
         'https://graph.org/file/02120b09baa569fb82fae.jpg', 
                ]; 
      const randomImageUrll = imageUrlss[Math.floor(Math.random() * imageUrlss.length)];
        let mediaa = await getBuffer(randomImageUrll);
   if (isTori) await A17.sendMessage(from, { image : mediaa });
    }
    

    if (smallinput.includes('تذكر')) {
 if (isAbd) reply (`عقبال ظوبري يتذكر جعبتك هههاي`);
 if (isAbd) await A17.sendMessage(from, { text: 'معليش' });
   
    }


   /*  if (smallinput.includes('قطع')) {
 if (isAbd) reply (`يقطعه فيك واحد من دار زغاوة لا ناك لا جلد حلاوة`);
 if (isAbd) await A17.sendMessage(from, { text: 'معليش' });
   
     } */


   if (smallinput.includes('زولتي') || smallinput.includes('مرتي') || smallinput.includes('حبيبتي')) {
   const typ = ['زولي السمين..الخبر', 'وين الناس', 'اخبار السكس شنو يا زولي'];
   const random = typ[Math.floor(Math.random() * typ.length)];
    if (isAbd) reply (random);
  }


    if (smallinput.includes('sex') || smallinput.includes('انيك') || smallinput.includes('كس')) {
    if (!m.isGroup) {
    await A17.sendMessage(from, { text: 'خخخخخخ من بين كل الناس ما عرفت تتحرش الا مع بوت؟' });
    await A17.sendMessage(from, { text: 'بلوك' });
    await A17.sendContact(m.chat, global.Owner, m)
        let users = m.sender
        await A17.updateBlockStatus(users, 'block').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
      const txtmsg = `*تم الجغم*`
        for (let mod of global.Owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != '6297175943@s.whatsapp.net'))
          await A17.sendMessage(`${mod}`, { text: `${txtmsg}` }, { quoted: m })
          await A17.sendMessage(`120363026915700516@g.us`, { text: `${txtmsg}`, mentions: groupAdmins }, { quoted: m })
      }    }

                                                                                                              
    if (smallinput.includes('سكس') || smallinput.includes('قضيب') || smallinput.includes('زبي')) {
    if (!m.isGroup) {
    await A17.sendMessage(from, { text: 'خخخخخخ من بين كل الناس ما عرفت تتحرش الا مع بوت؟' });
    await A17.sendMessage(from, { text: 'بلوك' });
    await A17.sendContact(m.chat, global.Owner, m)
        let users = m.sender
        await A17.updateBlockStatus(users, 'block').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
        const txtmsg = `*تم الجغم*`
        for (let mod of global.Owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != '6297175943@s.whatsapp.net'))
          await A17.sendMessage(`${mod}`, { text: `${txtmsg}` }, { quoted: m })
          await A17.sendMessage(`120363026915700516@g.us`, { text: `${txtmsg}`, mentions: groupAdmins }, { quoted: m })
        
        
      }    }


    if (smallinput.includes('cock') || smallinput.includes('dick') || smallinput.includes('ass')) {
    if (!m.isGroup) {
    await A17.sendMessage(from, { text: 'خخخخخخ من بين كل الناس ما عرفت تتحرش الا مع بوت؟' });
    await A17.sendMessage(from, { text: 'بلوك' });
    await A17.sendContact(m.chat, global.Owner, m)
        let users = m.sender
        await A17.updateBlockStatus(users, 'block').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
      const txtmsg = `*تم الجغم*`
        for (let mod of global.Owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != '6297175943@s.whatsapp.net'))
          await A17.sendMessage(`${mod}`, { text: `${txtmsg}` }, { quoted: m })
          await A17.sendMessage(`120363026915700516@g.us`, { text: `${txtmsg}`, mentions: groupAdmins }, { quoted: m })
      }    }


    if (smallinput.includes('boobs') || smallinput.includes('زب') || smallinput.includes('fuck')) {
    if (!m.isGroup) {
    await A17.sendMessage(from, { text: 'خخخخخخ من بين كل الناس ما عرفت تتحرش الا مع بوت؟' });
    await A17.sendMessage(from, { text: 'بلوك' });
    await A17.sendContact(m.chat, global.Owner, m)
        let users = m.sender
        await A17.updateBlockStatus(users, 'block').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
    const txtmsg = `*تم الجغم*`
        for (let mod of global.Owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != '6297175943@s.whatsapp.net'))
          await A17.sendMessage(`${mod}`, { text: `${txtmsg}` }, { quoted: m })
          await A17.sendMessage(`120363026915700516@g.us`, { text: `${txtmsg}`, mentions: groupAdmins }, { quoted: m })
      }    }


    if (smallinput.includes('naked') || smallinput.includes('hentai') || smallinput.includes('suck')) {
    if (!m.isGroup) {
    await A17.sendMessage(from, { text: 'خخخخخخ من بين كل الناس ما عرفت تتحرش الا مع بوت؟' });
    await A17.sendMessage(from, { text: 'بلوك' });
    await A17.sendContact(m.chat, global.Owner, m)
        let users = m.sender
        await A17.updateBlockStatus(users, 'block').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
    const txtmsg = `*تم الجغم*`
        for (let mod of global.Owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != '6297175943@s.whatsapp.net'))
          await A17.sendMessage(`${mod}`, { text: `${txtmsg}` }, { quoted: m })
          await A17.sendMessage(`120363026915700516@g.us`, { text: `${txtmsg}`, mentions: groupAdmins }, { quoted: m })
      }    }




    if (smallinput.includes('ارونا احسن') || smallinput.includes('ارونا افضل') || smallinput.includes('ارونا فوء')) {
   reply (`منطقية.. 
بس يا ترى ارونا تگدر تسوي كدا 👇
*starts twerking*`);
  }


  if (smallinput=== 'بلانا' || smallinput=== 'plana' || smallinput.includes('201100224155')) {
    const typ = ['عيون بلانا', 'احكي', 'شنو يا عسل', 'شنو يا زوووو999لي'];
    const random = typ[Math.floor(Math.random() * typ.length)];
     if (!isAli && !isTawfik && !isCreator && !isAbd && !isShaq) return reply (random)
     if (isAli) return reply (`مالك يا بوت`)
     if (isTawfik) return reply (`توفيق يا عسل`)
     if (isCreator) return reply (`عيون بلانا 🥰`) 
     if (isAbd) return reply (`زووولي السمين 🥰`) 
    const tt = ['شاك يا زولي', 'خليل يا خليل اختو ليك بالجنزبيل', 'مالك يا اروالي'];
    const gg = tt[Math.floor(Math.random() * tt.length)];
    if (isShaq) return reply (gg) 

      }

/*
   if (smallinput.includes('ياسر')) {
    reply (`ياسر؟ قصدك المعللما عارف طيزوو من بطنو`);
          }


   if (smallinput.includes('ونو')) {
    reply (`اوريك ما تزعل😂`);
          }


    if (smallinput.includes('قنيط')) {
    reply (`الفاك لو سمحت`);
          }


    if (smallinput.includes('سبارككل')) {
    reply (`The gift of seed is on the way to Hanabis womb
I'm gonna make aventurine and Sunday watch us have steaming hot passionate sex
Then if I got any juice left I'm gonna get Sunday too`);
          }


    if (smallinput.includes('@201100224155')) {
    reply (`عاييز شنو`);
  }


    if (smallinput.includes('ناشفة')) {
    reply (`رجعونا لأيام الحنك كان ببدا بي ممكن نتعرف لأنو بالطريقةة ديزوي دا ما ح يعرس`);
    }


    if (smallinput.includes('نيك بلانا')) {
    reply ('تنيكني كيف لكن انا حرفيا برنامج..الا لو قصدك تخت زبك الما تامي 5 نتي دا في الشاشة');
    }


    if (smallinput.includes('سولز')) {
    reply (`يخسيييييييي في فان سولز هنا🤢🤮`);
    }


    if (smallinput.includes('i love you')) {
    reply (`plana loves you too ${pushname}`);
      }


    if (smallinput.includes('بحبك')) {
    reply (`الحب افعال ما اقوال`);
  }


    if (smallinput.includes('بنيكك')|| smallinput.includes('ببلك') || smallinput.includes('بحشك')) {
    reply (`كام بدون افعال🤏🤭`);
    }


    if (smallinput.includes('نيك امك')|| smallinput.includes('نيك ابوك') || smallinput.includes('عايز كسك')) {
    reply (`كلام بدون أفعال يا عديم الزب`);
    }


    if (smallinput.includes('عايز انيكك')|| smallinput.includes('بحشر ليك') || smallinput.includes('كسم ابوك')) {
    reply (`بي زبك دا الا لو داير تكلكلني`);
    }
  

    if (smallinput.includes('ما شغال')) {
    reply (`جربببتو؟🤭`);
  }


    if (smallinput.includes('احشك')) {
    reply (`قلل كلامك و كتر أفعالك يا عديم الزب`);
   }


    if (smallinput.includes('سلام عليكم ')) {
    reply (`و عليكم السلام ورحمة الله وبركاته`);
    }


    if (smallinput.includes('ممتع')) {
    reply (`دا زاتو ممتع`);
    }


    if (smallinput.includes('لباسك ناصل')) {
    reply (`ايوا نااصل عشان مستنيك تمص لي`);
    }


    if (smallinput.includes('متناك')) {
    reply (`☹️`);
    }


    if (smallinput.includes('كبير')) {
    reply (`الله يكرمك`);
    }


    if (smallinput.includes('15072734883')) {
    reply (`حي انا من جايرو صقرك دا🤭`);
  }


    if (smallinput.includes('زلطة')) {
    reply (`زلطه ؟ قصدك الحلبي الصبجه البلعب طيزعين فري وبلع بوكساات من هندي`);
  }


    if (smallinput.includes('سم السيسي')) {
    reply (`انت راجل محترم و متربي احسن تربية`);
    }


    if (smallinput.includes('ااااي')) {
    reply (`دخل جااااب سخل؟ `);
    }


    if (smallinput.includes('genshin could never')) {
    reply (`🍆`);
    }


    if (smallinput.includes('حد يكريني')) {
    reply (`تعال كري دا اول🍆`);
    }


    if (smallinput.includes('عبد الله')) {
    reply (`عبد الله؟ قصدك عب قنشن السميين داك؟ `);
    }


    if (smallinput.includes('يا نجم البحر')) {
    reply (`توفيق يا توفيق اختو ليك بالابريق`);
    }


    if (smallinput.includes('كلامك شين')) {
    reply (`دا زاتووو شين`);
    }


    if (smallinput.includes('لباسك ناص.ل')) {
    reply (`حي انا كان تتمها`);
    }


   if (smallinput.includes('دا زاتو')) {
    reply (`هوي ياا بوت`);
}
*/


    //-----------------------------------------------------------------------------------------------------------------------------------//


    //
    switch (command) {

     case 'hssr': case 'tesbtn':
  if (isBanChat) return reply(mess.bangc);
  if (isBan) return reply(mess.banned);
  let msg = generateWAMessageFromContent(m.chat, {
    message: {
      "messageContextInfo": {
        "deviceListMetadata": {},
        "deviceListMetadataVersion": 2
      },
      interactiveMessage: proto.Message.InteractiveMessage.create({
        body: proto.Message.InteractiveMessage.Body.create({
          text: 'test button A17'
        }),
        footer: proto.Message.InteractiveMessage.Footer.create({
          text: 'Powered by Kai'
        }),
        // *Corrected: Header is now declared separately*
        header: proto.Message.InteractiveMessage.Header.create({
          title: 'honkai star rail',
          subtitle: null,
          hasMediaAttachment: true, 
          media: {  
            image: { 
              url: 'https://graph.org/file/4df95c0f7a5bf314a6dba.jpg', 
              mimetype: 'image/jpeg', 
            } 
          }
        }), 
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
          buttons: [
            {
              "name": "quick_reply",
              "buttonParamsJson": {"display_text":".jingliu","id":"${global.prefa[0]}jingliu"}
            },
            {
              "name": "quick_reply",
              "buttonParamsJson": {"display_text":".ruan mei","id":"${global.prefa[0]}ruan"}
            },
            {
              "name": "quick_reply",
              "buttonParamsJson": {"display_text":".blade","id":"${global.prefa[0]}blade"}
            }
          ],
        })
      })
    }
  }, {})

  A17.relayMessage(msg.key.remoteJid, msg.message, {
    messageId: msg.key.id
  })
  break;



      //
      case 'sc': case 'script': case 'sourcecode': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "❤", key: m.key } })

        let { data } = await axios.get('https://api.github.com/repos/Kai0071/A17');
        teks = `*A17 Script*\n\n*Total Stars*: ${data.stargazers_count}⭐\n*Total Forks*: ${data.forks_count} forks\n*GitHub*: https://github.com/Kai0071/A17\n\nDont forget to follow me on *GitHub* and give a ⭐️ to my projects. `
        /*  let buttons = [
          {buttonId: `${prefix}owner`, buttonText: {displayText: '🍁 DEVELOPER 🍁'}, type: 1}
          ] */
        let buttonMessage = {
          image: Thumb,
          jpegThumbnail: BotLogo,
          caption: teks,
          /* footer: `${BotName}`,
           buttons: buttons,
           headerType: 4, */
          contextInfo: {
            externalAdreply: {
              title: "Powered by Kai",
              body: " ",
              thumbnail: fs.readFileSync("Assets/pic2.jpg"),
              mediaType: 1,
              //mediaUrl: 'https://wallpapercave.com/wp/wp10524580.jpg',
              //sourceUrl: "https://wallpapercave.com/wp/wp10524580.jpg"
              mediaUrl: 'github.com/Kai0071/A17',
              sourceUrl: "github.com/Kai0071/A17"
            }
          }

        }
        A17.sendMessage(m.chat, buttonMessage, { quoted: m })
      }
        break; 


      case 'qt': {
        if (!args[0] && !m.quoted) {
          return m.reply(`Please provide a text (Type or mention a message) !`);
        }

        try {
          let userPfp;
          if (m.quoted) {
            userPfp = await A17.profilePictureUrl(m.quoted.sender, "image");
          } else {
            userPfp = await A17.profilePictureUrl(m.sender, "image");
          }

          const waUserName = pushname;
          const quoteText = m.quoted ? m.quoted.body : args.join(" ");

          const quoteJson = {
            type: "quote",
            format: "png",
            backgroundColor: "#FFFFFF",
            width: 700,
            height: 580,
            scale: 2,
            messages: [
              {
                entities: [],
                avatar: true,
                from: {
                  id: 1,
                  name: waUserName,
                  photo: {
                    url: userPfp,
                  },
                },
                text: quoteText,
                replyMessage: {},
              },
            ],
          };

          const quoteResponse = await axios.post("https://bot.lyo.su/quote/generate", quoteJson, {
            headers: { "Content-Type": "application/json" },
          });

          const buffer = Buffer.from(quoteResponse.data.result.image, "base64");
          A17.sendImageAsSticker(m.chat, buffer, m, {
            packname: `${global.BotName}`,
            author: waUserName,
          });
        } catch (error) {
          console.error(error);
          m.reply("Error generating quote!");
        }
        break;
      }


        case 'hh': { 
  
        const starrail = {
        "uid": "724281429",
        "lang": "ua",
         };
          
        const response = await axios.post("https://starraillcard.up.railway.app/api/genshin/profile", starrail, { 
          headers: { "Content-Type": "application/json"}, 
     });
          
        await A17.sendMessage(m.chat, { text: response.json() }, { quoted: m });
      } 
        break;


      case 'yy': {
        
const apiUrl = 'https://starraillcard.up.railway.app/get_profile';

const parameters = {
    Uid: 701607417,
    Image: { "1212": "https://graph.org/file/4e0d9651728cec9a07a49.jpg" }
};

const shiroko = await axios.get(apiUrl, { params: parameters })
       A17.sendMessage(m.chat, { text: shiroko.data }, { quoted: m });
      }
        break;




      case 'support': case 'supportgc': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        A17.sendMessage(from, { react: { text: "💫", key: m.key } })
        reply(`⚙ *My developer's group:* ⚙ https://chat.whatsapp.com/KJKxoW0FmOeLLv7etC6e5Y`)
      }
        break;


      case 'repo': case 'botrepo': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        A17.sendMessage(from, { react: { text: "💫", key: m.key } })
        reply(`⚙ My Source Code is </> - https://github.com/Kai0071/A17`)
      }
        break;


      case 'owner': case 'creator': case 'mod': case 'mods': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        A17.sendMessage(from, { react: { text: "💫", key: m.key } })
        A17.sendContact(m.chat, global.Owner, m)
      }
        break;


      case 'addmod':
      case 'addowner':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        A17.sendMessage(from, { react: { text: "🛡️", key: m.key } })

        if (!args[0]) return reply(`Use ${prefix + command} number\nExample ${prefix + command} ${OwnerNumber}`)
        bnnd = q.split("|")[0].replace(/[^0-9]/g, '')
        let ceknye = await A17.onWhatsApp(bnnd)
        if (ceknye.length == 0) return reply(`Enter A Valid And Registered Number On WhatsApp!!!`)
        Owner.push(bnnd)
        fs.writeFileSync('./database/mod.json', JSON.stringify(Owner))
        reply(`Number ${bnnd} Has Become An Owner!!!`)
        break;


      case 'delowner':
      case 'delmod':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        A17.sendMessage(from, { react: { text: "🛡️", key: m.key } })

        if (!args[0]) return reply(`Use ${prefix + command} nomor\nExample ${prefix + command} 916297175943`)
        ya = q.split("|")[0].replace(/[^0-9]/g, '')
        unp = Owner.indexOf(ya)
        Owner.splice(unp, 1)
        fs.writeFileSync('./database/mod.json', JSON.stringify(Owner))
        reply(`The Numbrr ${ya} Has been deleted from owner list by the owner!!!`)
        break;


      case 'modlist':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner);
        A17.sendMessage(from, { react: { text: "🛡️", key: m.key } })

        try {
          const modData = fs.readFileSync('./database/mod.json', 'utf8');
          const mods = JSON.parse(modData);

          if (mods.length === 0) {
            reply('There are no mods in the list.');
          } else {
            let modList = '';

            mods.forEach((mod, index) => {
              modList += `(${index + 1}) ${A17.getName(mod)}\n`;
            });

            reply(`List of List of Moderators:\n\n${modList}`);
          }
        } catch (error) {
          console.error(error);
          reply('Failed to fetch mod list.');
        }
        break;


      case 'setbotpp': {

        if (!isCreator) return reply(mess.owner)
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.owner)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        if (!quoted) return `*Send/reply Image With Caption* ${prefix + command}`
        if (!/image/.test(mime)) return `*Send/reply Image With Caption* ${prefix + command}`
        if (/webp/.test(mime)) return `*Send/reply Image With Caption* ${prefix + command}`
        let media = await A17.downloadAndSaveMediaMessage(quoted)
        await A17.updateProfilePicture(botNumber, { url: media }).catch((err) => fs.unlinkSync(media))
        m.reply(mess.jobdone)
      }
        break;
        

        case 'enhance':
        case 'upscale':{

        if (isBanChat) return reply(mess.bangc);
         A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
          let { GraphOrg } = require("./lib/uploader");

        if (!quoted) return `*Send/reply Image With Caption* ${prefix + command}`
        if (!/image/.test(mime)) return `*Send/reply Image With Caption* ${prefix + command}`
        let media = await A17.downloadAndSaveMediaMessage(quoted)
        let anu = await GraphOrg(media);
        let serika = await getBuffer(`https://api.lolhuman.xyz/api/upscale?apikey=Gata_Dios&img=${util.format(anu)}`) 
        await A17.sendMessage(m.chat, { image: serika }, { quoted: m })
      }
        break; 


        case 'removebackground':
        case 'removebg':{

        if (isBanChat) return reply(mess.bangc);
         A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
          let { GraphOrg } = require("./lib/uploader");

        if (!quoted) return `*Send/reply Image With Caption* ${prefix + command}`
        if (!/image/.test(mime)) return `*Send/reply Image With Caption* ${prefix + command}`
        let media = await A17.downloadAndSaveMediaMessage(quoted)
        let anu = await GraphOrg(media);
        let serika = await getBuffer(`https://api.neoxr.eu/api/nobg?apikey=gateapix&image=${util.format(anu)}`) 
        await A17.sendMessage(m.chat, { image: serika }, { quoted: m })
      }
        break;


      case 'resize':{

        if (isBanChat) return reply(mess.bangc);
         A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
          let { GraphOrg } = require("./lib/uploader");

        if (!quoted) return `*Send/reply Image With Caption* ${prefix + command}`
        if (!/image/.test(mime)) return `*Send/reply Image With Caption* ${prefix + command}`
        let media = await A17.downloadAndSaveMediaMessage(quoted)
        let anu = await GraphOrg(media);
        const swn = args.join(" ")
        const width = swn.split("x")[0];
        const height = swn.split("x")[1];
        let serika = await getBuffer(`https://resize.sardo.work/?imageUrl=${util.format(anu)}&width=${width}&height=${height}&quality=1`) 
        await A17.sendMessage(m.chat, { image: serika }, { quoted: m })
      }
        break;


        case 'compress':{

        if (isBanChat) return reply(mess.bangc);
         A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
          let { GraphOrg } = require("./lib/uploader");

        if (!quoted) return `*Send/reply Image With Caption* ${prefix + command}`
        if (!/video/.test(mime)) return `*Send/reply video With Caption* ${prefix + command}`
        let media = await A17.downloadAndSaveMediaMessage(quoted)
        let anu = await GraphOrg(media);
        let serika = await axios.get(`https://api.alyachan.dev/api/compressvid?video=${util.format(anu)}&apikey=QnYS8I`) 
        const shiroko = serika.data.data
        await A17.sendMessage(m.chat, { video: { url: shiroko.url_file} }, { quoted: m })
      }
        break; 



        case 'toanime':{

        if (isBanChat) return reply(mess.bangc);
         A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
          let { GraphOrg } = require("./lib/uploader");

        if (!quoted) return `*Send/reply Image With Caption* ${prefix + command}`
        if (!/image/.test(mime)) return `*Send/reply Image With Caption* ${prefix + command}`
        let media = await A17.downloadAndSaveMediaMessage(quoted)
        let anu = await GraphOrg(media);
          const typ = ['plana', 'arona', 'adamxion'];
        const api = typ[Math.floor(Math.random() * typ.length)];
        let serika = await getBuffer(`https://skizo.tech/api/toanime?apikey=${api}&url=${util.format(anu)}`) 
        let shiroko = await axios.get(`https://skizo.tech/api/toanime?apikey=${api}&url=${util.format(anu)} `)
        const sensei = shiroko.data.status;
        if (sensei === 400) {
            return reply("oops..daily limit reached..please wait for tomorrow reset");
          } else {      
        await A17.sendMessage(m.chat, { image: serika }, { quoted: m })
      }
         }
        break; 


      //
      case 'changeprefix':
      case 'setprefix':

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        A17.sendMessage(from, { react: { text: "🛡️", key: m.key } })

        if (args.length !== 1) {
          return m.reply(`Please provide a single character as the new prefix.`);
        } else {
          const newPrefix = args[0];
          try {
            global.prefa = [newPrefix];
            return m.reply(`${pushname} Successfully changed Prefix to "${newPrefix}"`);
          } catch (error) {
            console.error('Error changing prefix:', error);
            return m.reply(`An error occurred while changing the prefix. Please try again later.`);
          }
        }


      //
      case 'restart':
        await A17.sendMessage(from, { react: { text: "⚙", key: m.key } });
        if (!isCreator) return reply(mess.botowner)

        await A17.sendMessage(from, { text: mess.waiting });
        await A17.sendMessage(from, { react: { text: "✅", key: m.key } });
        await A17.sendMessage(from, { text: 'Restarting Success!' });

        // Delay the shutdown by 5 seconds using sleep function
        //await sleep(5000);

        // Use PM2 to restart the script
        pm2.restart('index', (err) => {
          if (err) {
            A17.sendMessage(from, { react: { text: "❌", key: m.key } });
            A17.sendMessage(from, { text: 'Restarting Failed!' });
          } else {
            return;
          }
        });
        break;


      //
      case 'shutdown': case 'sleep':
        if (!isCreator) return reply(mess.owner)
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.owner)
        await A17.sendMessage(from, { react: { text: "⚠️", key: m.key } })

        reply(`Okey bye time to sleep!`)
        await sleep(5000)
        process.exit()
        break;


      case 'public': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.owner)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        A17.public = true
        reply('I am now Publicly accessable!')
        A17.setStatus(`Mode : Public`)
      }
        break;


      case 'self': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)

        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        A17.public = false
        reply('Only Owner can use me now!')
        A17.setStatus(`Mode : Self`)
      }
        break;


      case 'autoreadgc':
      case 'auto-read-gc':
      case 'readgc':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner);
        A17.sendMessage(from, { react: { text: '❤', key: m.key } });

        if (args.length === 0) {
          // Display the current status of autoreadgc
          return m.reply(`Auto-Read-GC is currently ${global.autoreadgc ? 'enabled' : 'disabled'}.`);
        } else if (args.length === 1 && (args[0] === 'on' || args[0] === 'off')) {
          const status = args[0];
          if (status === 'on') {
            global.autoreadgc = true;
            return m.reply('Auto-Read-GC is now enabled.');
          } else {
            global.autoreadgc = false;
            return m.reply('Auto-Read-GC is now disabled.');
          }
        } else {
          return m.reply(`Usage: ${global.prefa[0]}autoreadgc [on/off]`);
        }
        break;


      case 'autotyping':
      case 'auto-typing':

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        A17.sendMessage(from, { react: { text: '❤', key: m.key } });

        if (args.length === 0) {
          if (global.autoTyping) {
            return m.reply(`Auto typing in group chats is currently *enabled*.\n\nTo disable, use \`${global.prefa[0]}autotyping off\`.`);
          } else {
            return m.reply(`Auto typing in group chats is currently *disabled*.\n\nTo enable, use \`${global.prefa[0]}autotyping on\`.`);
          }
        } else if (args.length === 1 && (args[0] === 'on' || args[0] === 'off')) {
          const status = args[0];
          if (status === 'on') {
            global.autoTyping = true;
            return m.reply(`Auto typing in group chats is now *enabled*.`);
          } else {
            global.autoTyping = false;
            return m.reply(`Auto typing in group chats is now *disabled*.`);
          }
        } else {
          return m.reply(`Usage: \`${global.prefa[0]}autotyping [on/off]\``);
        }
        break;


      case 'autorecord':
      case 'auto-recording':

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        A17.sendMessage(from, { react: { text: '❤', key: m.key } });

        if (args.length === 0) {
          if (global.autoRecord) {
            return m.reply(`Auto recording is currently *enabled*.\n\nTo disable, use \`${global.prefa[0]}autorecord off\`.`);
          } else {
            return m.reply(`Auto recording is currently *disabled*.\n\nTo enable, use \`${global.prefa[0]}autorecord on\`.`);
          }
        } else if (args.length === 1 && (args[0] === 'on' || args[0] === 'off')) {
          const status = args[0];
          if (status === 'on') {
            global.autoRecord = true;
            return m.reply(`Auto recording is now *enabled*.`);
          } else {
            global.autoRecord = false;
            return m.reply(`Auto recording is now *disabled*.`);
          }
        } else {
          return m.reply(`Usage: \`${global.prefa[0]}autorecord [on/off]\``);
        }
        break;


      //Hosted platfrom info
      case 'server':
      case 'sysinfo': {
        const used = process.memoryUsage();
        const cpu = os.cpus()[0];
        const totalCpuUsage = (100 * (cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.irq) / cpu.times.idle).toFixed(2);
        const systemName = os.platform() + ' ' + os.release();

        const respon = `
  🤖 *A17's Server Info* 🤖
  
  *System*: ${systemName}
  
  *RAM*: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
  
  *NodeJS Memory Usage*: ${Object.keys(used).map(key => `${key}: ${formatp(used[key])}`).join(', ')}
  
  *Total CPU Usage*: ${totalCpuUsage}%
  
  *CPU Model*: ${cpu.model.trim()} (${cpu.speed} MHz)
  
  *Runtime*: ${runtime(process.uptime())}
  
  *Response Speed*: ${latensie.toFixed(4)} seconds
  `.trim();

        m.reply(respon);
        break;
      }


      case 'ls':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "📂", key: m.key } });


        const currentDir = process.cwd(); // Get the current working directory

        try {
          const files = fs.readdirSync(currentDir);
          let folderName = `Files in ${currentDir}:\n\n`;
          let fileList = files.join('\n'); // Join the file names with a newline
          A17.sendMessage(from, { text: folderName + fileList }, m);
        } catch (error) {
          console.error(error);
          A17.sendMessage(from, { text: 'Error reading directory contents.🫳🏻' }, m);
        }
        break; 


      case 'autostatus':
      case 'auto-status':
      case 'statusevent':
      case 'autostatusseen':

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        A17.sendMessage(from, { react: { text: '❤', key: m.key } });

        if (args.length === 0) {
          // Display the current status of autostatus
          return m.reply(`Auto-Status is currently ${global.statusseen ? 'enabled' : 'disabled'}.`);
        } else if (args.length === 1 && (args[0] === 'on' || args[0] === 'off')) {
          const status = args[0];
          if (status === 'on') {
            global.statusseen = true;
            return m.reply('Auto-Status is now enabled.');
          } else {
            global.statusseen = false;
            return m.reply('Auto-Status is now disabled.');
          }
        } else {
          return m.reply(`Usage: ${global.prefa[0]}autostatus [on/off]`);
        }
        break;


      case 'ban': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (!args[0]) return reply(`Select add or del (add to ban, del to unban), For Example: reply *${prefix}ban add* to the user you want to ban.`)
        if (args[1]) {
          orgnye = args[1] + "@s.whatsapp.net"
        } else if (m.quoted) {
          orgnye = m.quoted.sender
        }
        const isBane = banUser.includes(orgnye)
        if (args[0] === "add") {
          if (isBane) return ads('User is already banned.')
          banUser.push(orgnye)
          reply(`Successfully Banned the user.`)
        } else if (args[0] === "del") {
          if (!isBane) return ads('User is already unbanned.')
          let delbans = banUser.indexOf(orgnye)
          banUser.splice(delbans, 1)
          reply(`Successfully Unbanned the user.`)
        } else {
          reply("Error")
        }
      }
        break;



      //-------------------------------------------------------------------------------------------------------------------------//



      //tictactoe game

      case 'ttc': case 'ttt': case 'tictactoe': {
        if (isBan) return reply(mess.ban)
        if (isBanChat) return reply(mess.banChat)
        A17.sendMessage(from, { react: { text: "🎮", key: m.key } })

        let TicTacToe = require("./lib/tictactoe")
        this.game = this.game ? this.game : {}
        if (Object.values(this.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) return reply(`${pushname} You Are Still In The Game...`)
        let room = Object.values(this.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true))
        if (room) {
          reply(`Hey ${pushname} Your Partner found!`)
          room.o = m.chat
          room.game.playerO = m.sender
          room.state = 'PLAYING'
          let arr = room.game.render().map(v => {
            return {
              X: '❌',
              O: '⭕',
              1: '1️⃣',
              2: '2️⃣',
              3: '3️⃣',
              4: '4️⃣',
              5: '5️⃣',
              6: '6️⃣',
              7: '7️⃣',
              8: '8️⃣',
              9: '9️⃣',
            }[v]
          })
          let str = `Room ID: ${room.id}
  ${arr.slice(0, 3).join('')}
  ${arr.slice(3, 6).join('')}
  ${arr.slice(6).join('')}
  Waiting @${room.game.currentTurn.split('@')[0]}
  Type *surrender* to surrender and admit defeat...`
          if (room.x !== room.o) await A17.sendText(room.x, str, m, { mentions: parseMention(str) })
          await A17.sendText(room.o, str, m, { mentions: parseMention(str) })
        } else {
          room = {
            id: 'tictactoe-' + (+new Date),
            x: m.chat,
            o: '',
            game: new TicTacToe(m.sender, 'o'),
            state: 'WAITING'
          }
          if (text) room.name = text
          reply('Waiting For Partner' + (text ? ` Type The Command Below ${prefix} ${command} ${text}` : ''))
          this.game[room.id] = room
        }
      }
        break;



      // report and suggest ...

      case 'report': case 'suggest ': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`please provide a report message you want to deliver`)
        if (text.length > 300) return reply(`Are you trying to send virus!`)
        const txtmsg = `*📮 Report Message*\n\n*Sender ➛* wa.me/${m.sender.split("@")[0]}\n\n*Group Name ➛* ${groupName}\n\n*Message ➛*  ${text}`
        for (let mod of global.Owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != '6297175943@s.whatsapp.net'))
          await A17.sendMessage(`${mod}`, { text: `${txtmsg}` }, { quoted: m })
        await A17.sendMessage(`120363026915700516@g.us`, { text: `${txtmsg}`, mentions: groupAdmins }, { quoted: m })
        reply(`*✅ Your Report has been submitted Successfully to Support group & Owner*\n\n*You will get response shortly... ♥️*`);
      }
        break;



      // economy ...

      case 'dice': case 'roll': {
        A17.sendMessage(from, { react: { text: "🎲", key: m.key } })
        const result = Math.floor(Math.random() * 6) + 1; // Generate a random number between 1 and 6

        const diceMessage = `🎲 *Dice Roll Result:* ${result}`;

        reply(diceMessage);
      }
        break;


      case 'flipcoin': case 'coin': {
        A17.sendMessage(from, { react: { text: "🪙", key: m.key } });
        // Simulate flipping a coin (0 for heads, 1 for tails)
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';

        const flipCoinMessage = `🪙 *Coin Flip Result: ${result}*`;
        reply(flipCoinMessage);
      }
        break;


      case 'rps': {
        const randomEmoji = manyemojis[Math.floor(Math.random() * manyemojis.length)];
        A17.sendMessage(from, { react: { text: randomEmoji, key: m.key } });

        // Check if the command includes a valid move (rock, paper, or scissors)
        const validMoves = ['rock', 'paper', 'scissors'];
        if (!args[0] || !validMoves.includes(args[0].toLowerCase())) {
          return reply('Please provide a valid move: rock, paper, or scissors.');
        }

        // Generate a random move for the bot
        const botMove = validMoves[Math.floor(Math.random() * validMoves.length)];

        // Determine the winner
        const userMove = args[0].toLowerCase();
        let result;

        if (userMove === botMove) {
          result = 'It\'s a tie!';
        } else if (
          (userMove === 'rock' && botMove === 'scissors') ||
          (userMove === 'paper' && botMove === 'rock') ||
          (userMove === 'scissors' && botMove === 'paper')
        ) {
          result = `You win! 🥳 ${userMove} beats ${botMove}.`;
        } else {
          result = `You lose! 🫳🏻 ${botMove} beats ${userMove}.`;
        }

        // Send the result as a response
        reply(`You chose ${userMove}.\nA17 chose ${botMove}.\n${result}`);
      }
        break;


      case 'daily': case 'claim': case 'reward':

        {
          if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
          if (isBan) return reply(mess.banned);
          if (isBanChat) return reply(mess.bangc);
          if (!m.isGroup) return reply(mess.grouponly)

          A17.sendMessage(from, { react: { text: "💰", key: m.key } })
          let user = m.sender
          const cara = "cara"
          const daily = await eco.daily(user, cara, 5000); //give 999 for daily, can be changed

          if (daily.cd) return reply(`You already claimed daily for today, come back in ${daily.cdL}`); //cdL is already formatted cooldown Left

          reply(`You claimed 💎${daily.amount} for daily`);
        }
        break;

      case 'wallet': case 'purse': {

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly)

        A17.sendMessage(from, { react: { text: "💳", key: m.key } })

        if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)

        const user = m.sender

        const cara = "cara"

        const balance = await eco.balance(user, cara); //Returns wallet, bank, and bankCapacity. Also creates a USer if it doesn't exist.

        await reply(`👛 ${pushname}'s Purse:\n\n_💎${balance.wallet}_`);

      }

        break;


      case 'bank': case 'levee': {
        if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly)

        A17.sendMessage(from, { react: { text: "💳", key: m.key } })

        const user = m.sender
        const cara = "cara"
        const balance = await eco.balance(user, cara); //Returns wallet, bank, and bankCapacity. Also creates a USer if it doesn't exist.
        await reply(`🏦 ${pushname}'s Bank:\n\n_💎${balance.bank}/${balance.bankCapacity}_`);
      }
        break;


      case 'capacity': case 'bankupgrade':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly)

        {
          A17.sendMessage(from, { react: { text: "💲", key: m.key } })

          //if (!isCreator) return reply(mess.botowner)
          if (!text) return reply(`💴 Bank-capacity 💳\n\n1 | 10000 sp = 💎100\n\n2 | 100000 sp = 💎1000\n\n3 | 250000 sp = 💎10000\n\nExample- ${prefix}capacity 1 OR ${prefix}bankupgrade 1000`)
          if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
          const user = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
          const cara = "cara"
          let value = text.trim();
          let k = parseInt(value)
          const balance = await eco.balance(user, cara)
          switch (value) {
            case '10000':
            case '1':
              if (k > balance.wallet) return reply(`You need to pay 💎100 to increase bank capacity ~ 1000 sp`);
              const deduct1 = await eco.deduct(user, cara, 100);
              const add1 = eco.giveCapacity(user, cara, 10000);
              await reply(`1000 💎diamond storage has been added in ${pushname} bank`)
            case '100000':
            case '2':
              if (k > balance.wallet) return reply(`You need to pay 💎1000 to increase bank capacity ~ 10000 sp`);
              const deduct2 = await eco.deduct(user, cara, 1000);
              const add2 = eco.giveCapacity(user, cara, 100000);
              await reply(`100000 💎diamond storage has been added in ${pushname} bank`)
            case '250000':
            case '3':
              if (k > balance.wallet) return reply(`You need to pay 💎10000 to increase bank capacity ~ 100000 sp`);
              const deduct3 = await eco.deduct(user, cara, 10000);
              const add3 = eco.giveCapacity(user, cara, 250000);
              await reply(`250000 💎diamond storage has been added in ${pushname} bank`)
          }
        }
        break;


      case 'deposit': case 'pay-in': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly)

        A17.sendMessage(from, { react: { text: "📥", key: m.key } })

        if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
        if (!text) return reply("Provide the amount you want to deposit!");
        const texts = text.trim();
        const user = m.sender;
        const cara = 'cara'
        const deposit = await eco.deposit(user, cara, texts);
        if (deposit.noten) return reply('You can\'t deposit what you don\'t have.'); //if user states more than whats in his wallet
        reply(`Successfully Deposited 💎${deposit.amount} to your bank.`)
      }
        break;


      case 'withdraw': case 'withdrawal': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly)

        A17.sendMessage(from, { react: { text: "💸", key: m.key } })

        if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
        const user = m.sender
        if (!text) return reply("Provide the amount you want to withdraw!");
        const query = text.trim();
        const cara = 'cara'
        const withdraw = await eco.withdraw(user, cara, query);
        if (withdraw.noten) return reply('🏧 Insufficient fund in bank'); //if user states more than whats in his wallet
        const add = eco.give(user, cara, query);
        reply(`🏧 ALERT  💎${withdraw.amount} has been added in your wallet.`)

      }
        break;


      case 'rob':
      case 'attack':
   //    let dd = 'https://chat.whatsapp.com/GinclPTNvg6FMMOaGfUNcf';
//     let response = await A17.groupInviteCode(m.chat);
//    let link = (`https://chat.whatsapp.com/${response}`);

//    if (dd === link) {
//    return reply('امشي قروب السرقة يا عب');
//   }
       if (isBan) return reply(mess.banned);
    if (isBanChat) return reply(mess.bangc);
    if (!m.isGroup) return reply(mess.grouponly);

    {
        A17.sendMessage(from, { react: { text: "🔪", key: m.key } });
        if (!text) return reply(`Use ${prefix}rob @user`);
        
        const target = m.quoted && m.mentionedJid.length === 0 ? m.quoted.sender : m.mentionedJid[0] || null;
        if (!target || target === m.sender) return reply("What are you trying to do!");
        if (m.quoted?.sender && !m.mentionedJid.includes(m.quoted.sender)) m.mentionedJid.push(m.quoted.sender);
        while (m.mentionedJid.length < 2) m.mentionedJid.push(m.sender);

        const cara = "cara";
        const user1 = m.sender;
        const user2 = target;
        const a = 250;
        const b = 10000;
        const balance1 = await eco.balance(user1, cara);
        const balance2 = await eco.balance(user2, cara);
        const k = balance1.wallet * 0.25
        const w = balance2.wallet * 0.25

        const typ = ['ran', 'rob', 'caught'];
        const random = typ[Math.floor(Math.random() * typ.length)];

        if (a > balance1.wallet) return reply("دا شنو العب المقطع دا..جيب قروش الكفالة اول");
        if (a > balance2.wallet) return reply("زولك دا مفلس اعمل رايح");
  //      if (b > balance2.wallet) {
          
    //      let userToKick = m.sender;
   //       if (isBotAdmins) await A17.sendMessage(from, { text: 'ياخ دا شنو العب دا حشيتنا حش' });
    //      if (isBotAdmins) await A17.sendMessage(from, { text: 'شوف ليك زول تاني اسرقو ما معقول اسود و كمان قلبك اسود' });
 //   await A17.groupParticipantsUpdate(m.chat, [userToKick], 'remove');

  //      }else{

        let tpy = random;
        if (random === 'ran') {
            await reply("زولك دا هرب اعمل رايح");
        } else if (random === 'caught') {
            await eco.deduct(user1, cara, k);
            await eco.give(user2, cara, k);
            reply("ماشي وين يا عب تعال هنا قبضوك بالثابتة");
            reply(`You lost 💎${k}`);
        } else if (random === 'rob') {
            await eco.deduct(user2, cara, w);
            await eco.give(user1, cara, w);
            reply("حرامي خسيس..شيلها ان شاء الله تنفعك");
            reply(`You got 💎${w}`);
         }
    }
    break;


      case 'transfer': case 'give': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly)
        A17.sendMessage(from, { react: { text: "🗿", key: m.key } })
        let value = text.trim().split(" ");
        if (value[0] === "") return reply(`Use ${prefix}transfer 100 @user`);
        const target =
          m.quoted && m.mentionedJid.length === 0
            ? m.quoted.sender
            : m.mentionedJid[0] || null;
        if (!target || target === m.sender) return reply("what are you trying to do!")
        if (m.quoted?.sender && !m.mentionedJid.includes(m.quoted.sender)) m.mentionedJid.push(m.quoted.sender)
        while (m.mentionedJid.length < 2) m.mentionedJid.push(m.sender)
        const cara = "cara"
        const user1 = m.sender
        const user2 = target
        const word = value[0];
        const code = value[1];
        let d = parseInt(word)
        if (!d) return reply("check your text plz u r using the command in a wrong way")

        const balance = await eco.balance(user1, cara);
        let a = (balance.wallet) < parseInt(word)
        //Returns wallet, bank, and bankCapacity. Also creates a USer if it doesn't exist.	
        if (a == true) return reply("you dont have sufficient money to transfer");

        const deduct = await eco.deduct(user1, cara, value[0]);
        const give = await eco.give(user2, cara, value[0]);
        reply(`📠 Transaction successful`)

      }
        break;


      case 'wealth': 
       if (!isCreator) return reply(mess.botowner)
        var user = m.sender
        var cara = 'cara'
        const give1 = eco.give(user, cara, 100000)
        reply(`*You got 💎100000*`)
        break;


        case 'gift': {
	if (!isCreator) return reply(`هاك القيفت دي🍆`) 
    var cara = 'cara';
  // Get all users (You need to implement this function)
async function getAllUsers() {
  try {
    const data = await fs.promises.readFile('./storage/user/user.json', 'utf-8');
    const pendaftar = JSON.parse(data);
    return pendaftar; // Return the array of user IDs
  } catch (error) {
    console.error("Error reading user data:", error);
    return []; // Return an empty array if there is an error
  }
}
  const allUsers = await getAllUsers(); 
  for (const user of allUsers) {
    try {
      await eco.give(user, cara, 100000); 
    } catch (error) {
      console.error("Wealth ritual error:", error);
      // Handle the error appropriately (e.g., log it, send a message)
    }
  }

  reply(`Wealth ritual completed! All users received 💎100000.`); 
}
break; 




      /* ████ ✪ ███▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ [ GAMBLE ] ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███ ✪ ███ */



      //
      case 'gamble': case 'lottery':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly)
        {
          //var response = await A17.groupInviteCode(from)
          //var link1 = `https://chat.whatsapp.com/${response}`
          //var link2 = `https://chat.whatsapp.com/BXQaaeg7utI29OI4RbhdIhl`
          var texts = text.trim().split(" ");
          var opp = texts[1];// your value
          var value = texts[0].toLowerCase();
          var gg = parseInt(value)
          var user = m.sender //m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
          const cara = 'cara'
          const balance = await eco.balance(user, cara);
          const g = (balance.wallet) > parseInt(value)
          const k = 50
          const a = (k) > parseInt(value)
          const twice = gg * 2
          const f = ["up", "right", "left", "down", "up", "left", "down", "right", "up", "down", "right", "left"]
          const r = f[Math.floor(Math.random() * f.length)]
          if (isBan) return reply(mess.banned);
          if (isBanChat) return reply(mess.bangc);
          if (!m.isGroup) return reply(mess.grouponly)
          //if (link1 == link2){
          if (texts[0] === "")
            return reply(
              `Example:  ${prefix}gamble 100 direction(left,right,up,down)`
            );
          if (!value) return reply("*Please, specify the amount you are gambling with!");
          if (!opp) return reply("Specify the direction you are betting on!");
          if (!gg) return reply("Check your text please, You are using the command in a wrong way")
          if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
          if (g == false) return reply(`You don't have sufficient 💎 Diamond to gamble with`);
          if (a == true) return reply(`Sorry ${pushname}, you can only gamble with more than 💎50.`);
          if (r == opp) {
            let give = await eco.give(user, cara, twice);
            reply(`*📉 You won 💎${twice}*`)
          }
          else {
            let deduct = await eco.deduct(user, cara, texts[0]);
            reply(`*📈 You lost 💎${texts[0]}*`)
          }
          //}
          //else{
          //reply(`Gambling is allowed only in Casino/Gamble Group,\n\ntype ${prefix}casino to get the group link`)
          //}
        }
        break;


      //-----------------Slot----------------------
      /*
      case'slot': case 'spin': {
             if (isBan) return reply(mess.banned);
             if (isBanChat) return reply(mess.bangc);
             if (!m.isGroup) return reply(mess.grouponly)
             var today = new Date();
         if (today.getDay() == 6 || today.getDay() == 5 || today.getDay() == 0){
             if (text == 'help') return reply(`*1:* Use ${prefix}slot to play\n\n*2:* You must have 💎100 in your wallet\n\n*3:* If you don't have money in wallet then withdraw from your bank\n\n*4:* If you don't have money in your bank too then use economy features to gain money`)
             if (text == 'money') return reply(`*1:* Small Win --> +💎20\n\n*2:* Small Lose --> -💎20\n\n*3:* Big Win --> +💎100\n\n*4:* Big Lose --> -💎50\n\n*5:* 🎉 JackPot --> +💎1000`)
             const fruit1= ["🥥", "🍎", "🍇"]
             const fruit2 = ["🍎", "🍇", "🥥"]  
             const fruit3 = ["🍇", "🥥", "🍎"]         
             const fruit4 = ["🍇", "🍎", "🥥"]
             const lose = ['*You suck at playing this game*\n\n_--> 🍍-🥥-🍎_', '*Totally out of line*\n\n_--> 🥥-🍎-🍍_', '*Are you a newbie?*\n\n_--> 🍎-🍍-🥥_']
             const smallLose = ['*You cannot harvest coconut 🥥 in a pineapple 🍍 farm*\n\n_--> 🍍>🥥<🍍_', '*Apples and Coconut are not best Combo*\n\n_--> 🍎>🥥<🍎_', '*Coconuts and Apple are not great deal*\n\n_--> 🥥>🍎<🥥_']
             const won = ['*You harvested a basket of*\n\n_--> 🍎+🍎+🍎_', '*Impressive, You must be a specialist in plucking coconuts*\n\n_--> 🥥+🥥+🥥_', '*Amazing, you are going to be making pineapple juice for the family*\n\n_--> 🍍+🍍+🍍_']             
             const near = ['*Wow, you were so close to winning pineapples*\n\n_--> 🍎-🍍+🍍_', '*Hmmm, you were so close to winning Apples*\n\n_--> 🍎+🍎-🍍_']          
             const jack = ['*🥳 JackPot 🤑*\n\n_--> 🍇×🍇×🍇×🍇_', '*🎉 JaaackPooot!*\n\n_--> 🥥×🥥×🥥×🥥_', '*🎊 You Just hit a jackpot worth 💎1000*']
             const user = m.sender
             const cara = "cara"
             const k = 100
             const balance1  = await eco.balance(user, cara)
             
             if (k > balance1.wallet) return reply(`You are going to be spinning on your wallet, you need at least 💎100`);
             const f1 = fruit1[Math.floor(Math.random() * fruit1.length)];
             const f2 = fruit2[Math.floor(Math.random() * fruit2.length)];
             const f3 = fruit3[Math.floor(Math.random() * fruit3.length)];
             const f4 = fruit4[Math.floor(Math.random() * fruit4.length)];
             const mess1 = lose[Math.floor(Math.random() * lose.length)];
             const mess2 = won[Math.floor(Math.random() * won.length)];
             const mess3 = near[Math.floor(Math.random() * near.length)];
             const mess4 = jack[Math.floor(Math.random() * jack.length)];
             const mess5 = smallLose[Math.floor(Math.random() * smallLose.length)];
             
             if ((f1 !== f2) && f2 !== f3){
                const deduct1 = await eco.deduct(user, cara, 50);
                       reply(`${mess1}\n\n*Big Lose -->* _💎50_`)
             }
             else if ((f1 == f2) && f2 == f3){
                const give1 = await eco.give(user, cara, 100); 
                      reply(`${mess2}\n*_Big Win -->* _💎100_`)
             }
             else if ((f1 == f2) && f2 !== f3){
                const give2 = await eco.give(user, cara, 20);
                      reply(`${mess3}\n*Small Win -->* _💎20_`)
             }
             else if ((f1 !== f2) && f1 == f3){
                const deduct2 = await eco.deduct(user, cara, 20);
                      reply(`${mess5}\n\n*Small Lose -->* _💎20_`)
             }
             else if ((f1 !== f2) && f2 == f3){
                const give4 = eco.give(user, cara, 20); 
                      reply(`${mess3}\n\n*Small Win -->* _💎20_`)
             }
             else if (((f1 == f2) && f2 == f3) && f3 == f4){
                const give5 = eco.give(user, cara, 1000);
                     reply(`${mess4}\n\n_JackPot --> _💎1000_`)
             }
             else { 
                     reply(`Do you understand what you are doing?`)
             }
          }
          else{
                 reply(`*You can only play this game during weekends*\n\n*🌿 Friday*\n*🎏 Saturday*\n*🎐 Sunday*`)
          }
      }
      break;
      */


      case 'slot': case 'spin': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly)
        var today = new Date();
        if (today.getDay() == 6 || today.getDay() == 5 || today.getDay() == 0) {
          if (text == 'help') return reply(`*1:* Use ${prefix}slot to play\n\n*2:* You must have 💎100 in your wallet\n\n*3:* If you don't have money in wallet then withdraw from your bank\n\n*4:* If you don't have money in your bank too then use economy features to gain money`)
          if (text == 'money') return reply(`*1:* Small Win --> +💎20\n\n*2:* Small Lose --> -💎20\n\n*3:* Big Win --> +💎100\n\n*4:* Big Lose --> -💎50\n\n*5:* 🎉 JackPot --> +💎1000`)
          const fruit1 = ["🥥", "🍎", "🍇"]
          const fruit2 = ["🍎", "🍇", "🥥"]
          const fruit3 = ["🍇", "🥥", "🍎"]
          const fruit4 = ["🍇", "🥥", "🍎"]
          const lose = ['*You suck at playing this game*\n\n_--> 🍍-🥥-🍎_', '*Totally out of line*\n\n_--> 🥥-🍎-🍍_', '*Are you a newbie?*\n\n_--> 🍎-🍍-🥥_']
          const smallLose = ['*You cannot harvest coconut 🥥 in a pineapple 🍍 farm*\n\n_--> 🍍>🥥<🍍_', '*Apples and Coconut are not best Combo*\n\n_--> 🍎>🥥<🍎_', '*Coconuts and Apple are not great deal*\n\n_--> 🥥>🍎<🥥_']
          const won = ['*You harvested a basket of*\n\n_--> 🍎+🍎+🍎_', '*Impressive, You must be a specialist in plucking coconuts*\n\n_--> 🥥+🥥+🥥_', '*Amazing, you are going to be making pineapple juice for the family*\n\n_--> 🍍+🍍+🍍_']
          const near = ['*Wow, you were so close to winning pineapples*\n\n_--> 🍎-🍍+🍍_', '*Hmmm, you were so close to winning Apples*\n\n_--> 🍎+🍎-🍍_']
          const jack = ['*🥳 JackPot 🤑*\n\n_--> 🍇×🍇×🍇×🍇_', '*🎉 JaaackPooot!*\n\n_--> 🥥×🥥×🥥×🥥_', '*🎊 You Just hit a jackpot worth 💎1000*']
          const user = m.sender
          const cara = "cara"
          const k = 100
          const balance1 = await eco.balance(user, cara)

          if (k > balance1.wallet) return reply(`You are going to be spinning on your wallet, you need at least 💎100`);
          const f1 = fruit1[Math.floor(Math.random() * fruit1.length)];
          const f2 = fruit2[Math.floor(Math.random() * fruit2.length)];
          const f3 = fruit3[Math.floor(Math.random() * fruit3.length)];
          const f4 = fruit4[Math.floor(Math.random() * fruit4.length)];
          const mess1 = lose[Math.floor(Math.random() * lose.length)];
          const mess2 = won[Math.floor(Math.random() * won.length)];
          const mess3 = near[Math.floor(Math.random() * near.length)];
          const mess4 = jack[Math.floor(Math.random() * jack.length)];
          const mess5 = smallLose[Math.floor(Math.random() * smallLose.length)];

          if ((f1 !== f2) && f2 !== f3) {
            const deduct1 = await eco.deduct(user, cara, 50);
            reply(`${mess1}\n\n*Big Lose -->* _💎50_`)
          }
          else if ((f1 == f2) && f2 == f3) {
            const give1 = await eco.give(user, cara, 100);
            reply(`${mess2}\n*_Big Win -->* _💎100_`)
          }
          else if ((f1 == f2) && f2 !== f3) {
            const give2 = await eco.give(user, cara, 20);
            reply(`${mess3}\n*Small Win -->* _💎20_`)
          }
          else if ((f1 !== f2) && f1 == f3) {
            const deduct2 = await eco.deduct(user, cara, 20);
            reply(`${mess5}\n\n*Small Lose -->* _💎20_`)
          }
          else if ((f1 !== f2) && f2 == f3) {
            const give4 = eco.give(user, cara, 20);
            reply(`${mess3}\n\n*Small Win -->* _💎20_`)
          }
          else if (((f1 == f2) && f2 == f3) && f3 == f4) {
            const give5 = eco.give(user, cara, 1000);
            reply(`${mess4}\n\n_🎊 JackPot --> _💎1000_`)
          }
          else {
            reply(`Do you understand what you are doing?`)
          }
        }
        else {
          reply(`*You can only play this game during weekends*\n\n*🌿 Friday*\n*🎏 Saturday*\n*🎐 Sunday*`)
        }
      }
        break;



      /////////////////////////////////////////////////////////////////////////////////////////////////



      // case 'banchat': case 'bangroup':{
      //   if (isBan) return reply(mess.banned);	 			
      //   if (!isCreator) return reply(mess.botowner)
      //   if (args[0] === "on") {
      //   if (isBanChat) return reply('This Group is Already Banned from using me!')
      //   banchat.push(from)
      //   reply('This Group has been banned from using me!')
      //   var groupe = await A17.groupMetadata(from)
      //   var members = groupe['participants']
      //   var mems = []
      //   members.map(async adm => {
      //   mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
      //   })
      //   A17.sendMessage(from, {text: `\`\`\`「 Notice 」\`\`\`\n\nThis group is banned from using bot. So, here nobody can use me anymore!`, contextInfo: { mentionedJid : mems }}, {quoted:m})
      //   } else if (args[0] === "off") {
      //   if (!isBanChat) return reply('This Group is Already Banned from using me!')
      //   let off = banchat.indexOf(from)
      //   banchat.splice(off, 1)
      //   reply('This Group has been *unbanned* from using me!')
      //   } else {
      //     let buttonsntnsfw = [
      //     { buttonId: `${prefix}bangroup on`, buttonText: { displayText: 'Ban' }, type: 1 },
      //     { buttonId: `${prefix}bangroup off`, buttonText: { displayText: 'Unban' }, type: 1 }
      //     ]
      //     await A17.sendButtonText(m.chat, buttonsntnsfw, `Please choose any Button below.\n\n *On / Off*`, `${global.BotName }`, m)
      //     }
      //     }
      //     break;


      case 'reaction': case 'react': case 'reactions': case 'r':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "❤️", key: m.key } })

        reply(` *━━〈  ⚡ Reactions ⚡  〉━━*\n\nbonk, cry, bully, cuddle, hug, kiss, lick, pat, smug, yeet, blush, smile, wave, highfive, handhold, nom, glomp, bite, slap, kill, happy, wink, poke, dance, cringe`)
        break;


      case 'limituser': case 'userlimit': case 'limit':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        {
          let txt = `「 *All User Limit* 」\n\n`
          for (let i of _limit) {
            txt += ` *User ID :* @${i.id.split("@")[0]}\n➸ *Limit* : ${i.limit}\n`
          }
          reply(txt)
        }
        break;


      case 'film': case 'movie': case 'moviesearch':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        reply(mess.waiting)
        if (!q) return reply(`Please enter a Movie search term...\nExample: ${prefix}movie Spiderman`)
        xfarrapi.Film(q)
          .then(data => {
            console.log(data)
            let krl = `*Search Term:* ${q}\n\n`
            for (let i of data) {
              krl += (`${prefix}----------------------------------------------------------------------------\n\n\n*Movie Name:* ${i.judul}\n *Quality :* ${i.quality}\n *Type : ${i.type}*\n *Uploaded on :* ${i.upload}\n *Source URL :* ${i.link}\n\n\n`)
            }
            A17.sendMessage(from, { image: { url: data[0].thumb }, caption: krl }, { quoted: fdocs })
          });
        break;


      // case 'wallpaper': case 'animewallpaper': case 'animewall': {
      // if (isBan) return reply(mess.banned);	 			
      // if (isBanChat) return reply(mess.bangc);
      // if (!args.join(" ")) return reply("اكتب اسم الانمي يا غبي")
      // const { AnimeWallpaper } =require("anime-wallpaper")
      // const wall = new AnimeWallpaper();
      // const pages = [1,2,3,4];
      // const random=pages[Math.floor(Math.random() * pages.length)]
      //         const wallpaper = await wall .getAnimeWall4({ title: q, type: "sfw", page: pages }).catch(() => null);
      //         const i = Math.floor(Math.random() * wallpaper.length);

      // let buttons = [
      //             {buttonId: `${prefix}wallpaper ${args.join(" ")}`, buttonText: {displayText: '>>'}, type: 1}
      //         ]
      //         let buttonMessage = {
      //             image: {url:wallpaper[i].image},
      //             caption: `*Search term:* ${q}`,
      //             footer: `${BotName}`,
      //             buttons: buttons,
      //             headerType: 4
      //         }
      //         A17.sendMessage(m.chat, buttonMessage, { quoted: m })
      //     }
      //     break;


      // case 'wallpaper':
      // case 'animewallpaper':
      // case 'animewall': {
      //   if (isBan) return reply(mess.banned);
      //   if (isBanChat) return reply(mess.bangc);
      //   A17.sendMessage(from, { react: { text: "💦" , key: m.key }});

      //   if (!args.join(" ")) return reply("Please enter a term to search!");

      //   const { AnimeWallpaper } = require("anime-wallpaper");
      //   const wall = new AnimeWallpaper();
      //   const pages = [1, 2, 3, 4];
      //   const random = pages[Math.floor(Math.random() * pages.length)];
      //   const wallpaper = await wall.getAnimeWall4({ title: q, type: "sfw", page: pages }).catch(() => null);
      //   const i = Math.floor(Math.random() * wallpaper.length);

      //   let message = {
      //     image: { url: wallpaper[i].image },
      //     caption: `*Search term:* ${q}`,
      //     footer: `${BotName}`,
      //     headerType: 4
      //   };

      //   A17.sendMessage(m.chat, message, { quoted: m });
      // }
      // break;


      // case 'wallpaper':
      // case 'animewallpaper':
      // case 'animewall': {
      //   if (isBan) return reply(mess.banned);
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!args.join(" ")) return reply("اكتب اسم الانمي يا غبي!");

      //   const { AnimeWallpaper } = require("anime-wallpaper");
      //   const wall = new AnimeWallpaper();
      //   const pages = [1, 2, 3, 4];
      //   const random = pages[Math.floor(Math.random() * pages.length)];
      //   const wallpapers = await wall.getAnimeWall4({ title: q, type: "sfw", page: pages }).catch(() => null);

      //   for (let i = 0; i < wallpapers.length; i++) {
      //     let message = {
      //       image: { url: wallpapers[i].image },
      //       caption: `*Search term:* ${q}`,
      //       footer: `${BotName}`,
      //       headerType: 4
      //     };
      //     A17.sendMessage(m.chat, message, { quoted: m });
      //   }
      // }
      // break;


      // case 'wallpaper':
      // case 'animewallpaper':
      // case 'animewall': {
      //   if (isBan) return reply(mess.banned);
      //   if (isBanChat) return reply(mess.bangc);
      //   reply(mess.waiting)
      //   A17.sendMessage(from, { react: { text: "💦" , key: m.key }});
      //   if (!args.join(" ")) return reply("اكتب اسم الانمي يا غبي");

      //   const { AnimeWallpaper } = require("anime-wallpaper");
      //   const wall = new AnimeWallpaper();
      //   const pages = [1, 2, 3, 4];
      //   const random = pages[Math.floor(Math.random() * pages.length)];
      //   const wallpapers = await wall.getAnimeWall4({ title: q, type: "sfw", page: pages }).catch(() => null);

      //   for (let i = 0; i < wallpapers.length; i++) {
      //     let message = {
      //       image: { url: wallpapers[i].image },
      //       footer: `${BotName}`,
      //       headerType: 4
      //     };
      //     A17.sendMessage(m.chat, message, { quoted: m });
      //   }
      // }
      // break;

        
       case 'wallpaper': {
    if (isBan) return reply(mess.banned);
    if (isBanChat) return reply(mess.bangc);
    if (m.isGroup) return reply ('تعال خاص يا عسل');
    A17.sendMessage(from, { react: { text: "💦", key: m.key } });
    if (!text) return reply("اكتب الاسم يا غبي");

    const shiroko = await axios.get(`https://weeb-api.vercel.app/wallpaper?query=${encodeURIComponent(q)}`)
    const sensei = shiroko.data;
    // قم بنسخ هذا الجزء واستبداله مع الجزء السابق في الكود
const imageCount = 10; // عدد الصور التي تريد إرسالها

for (let i = 0; i < imageCount; i++) {
    const randomImageUrl = sensei[i % sensei.length]; // يُحدد اختيار صورة عشوائية من القائمة
    let media = await getBuffer(randomImageUrl);
    await A17.sendMessage(m.chat, { image: media }, { quoted: m });
}
     } 
break; 


      case 'wikimedia': case 'wikiimage': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!args.join(" ")) return reply("What picture are you looking for??")
        let { wikimedia } = require('./lib/scraper')
        anu = await wikimedia(args)
        hasil = anu[Math.floor(Math.random() * anu.length)]
        let buttons = [
          { buttonId: `${prefix}wikimedia ${args.join(" ")}`, buttonText: { displayText: 'Next Image' }, type: 1 }
        ]
        let buttonMessage = {
          image: { url: hasil.image },
          caption: `Title : ${hasil.title}\nSource : ${hasil.source}\nMedia Url : ${hasil.image}`,
          footer: `${BotName}`,
          buttons: buttons,
          headerType: 4
        }
        A17.sendMessage(m.chat, buttonMessage, { quoted: m })
      }
        break;


      case 'quotesimagexxx': case 'qoutesimagexxx': case 'quoteimage':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let cok = await fetchJson(`http://api.lolhuman.xyz/api/random/quotesimage?apikey=${lolkey}`)
        reply(mess.waiting)
        A17.sendMessage(m.chat, { image: { url: cok }, caption: 'Here it is...' }, { quoted: m })
        break;


      case 'quotesanime': case 'quoteanime': case 'animequote': case 'animequotes': {
        let { quotesAnime } = require('./lib/scraper')
        let anu = await quotesAnime()
        hasil = anu[Math.floor(Math.random() * anu.length)]
        /*     let buttons = [
                 {buttonId: `${prefix}quotesanime`, buttonText: {displayText: '>>'}, type: 1}
             ]  */
        let buttonMessage = {
          text: `_${hasil.quotes}_\n\nBy '${hasil.karakter}', ${hasil.anime}\n\n- ${hasil.up_at}`,
          /*     footer: 'A17',
               buttons: buttons,
               headerType: 2  */
        }
        A17.sendMessage(m.chat, buttonMessage, { quoted: m })
      }
        break;



      case 'animestory': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        reply(mess.waiting)
        await fetchJson(`https://api.jikan.moe/v4/anime?q=${q}`)
          .then((res) => {
            console.log(res)
            let sections = []
            for (let i of res.data) {
              const list = {
                title: `${i.title}`,
                rows: [
                  {
                    title: `${i.title}\n\n`,
                    rowId: `${prefix}animesearch ${i.mal_id}`,
                    description: `${i.synopsis}`
                  },
                ]
              }
              sections.push(list)
            }
            const sendm = A17.sendMessage(
              from,
              {
                text: "Anime Search",
                footer: BotName,
                title: OwnerName,
                buttonText: "Search Results",
                sections
              }, { quoted: m }
            )
          })
      }
        break;


      case 'ai':
      case 'gpt': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        if (!q) return reply(`Please provide a text query. Example: ${prefix + command} Hello, plana!`);

        try {
          const typ = ['plana', 'arona', 'adamxion'];
        const api = typ[Math.floor(Math.random() * typ.length)];
        
          const hoshino = await axios.get(`https://skizo.tech/api/openai?apikey=${api}&messages=&system=&text=${encodeURIComponent(q)}`);
          const yume = hoshino.data;
          let message = "";

          if (yume.status === 200) {
            message = yume.result;
          } else {
            return reply("Sorry, I couldn't fetch a response from the API at the moment.");
          }

          const me = m.sender;
          await A17.sendMessage(m.chat, { text: message, mentions: [me] }, { quoted: m });

        } catch (error) {
          console.error(error);
          reply("An error occurred while fetching the response from the API.");
        }
      }
        break;


      case 'plana':
        case 'cai':
      case 'aiussy': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        if (!q) return reply(`Please provide a text query. Example: ${prefix + command} Hello, plana!`);

        try {
          const typ = ['plana', 'arona', 'adamxion'];
        const api = typ[Math.floor(Math.random() * typ.length)];

          const hoshino = await axios.get(`https://skizo.tech/api/cai/chat?apikey=${api}&characterId=-adAKK1rjZQ0ljfpXOJtrOG0H9nsmrFDP4jrHB3qHDo&sessionId=rRyqPFkVnFPa2fd9xu2WpTT-BsJzloxD53zo06LrZik&token=529e24b4173b29dbc3054fef02a380e1e5b41949&text=${encodeURIComponent(q)}`);
          const yume = hoshino.data;
          let message = "";

          if (yume.success === true) {
            message = yume.result.text;
          } else {
            return reply("Sorry, my circuits has been fried..wait a bit till i get hold of myself.");
          }

          const me = m.sender;
          await A17.sendMessage(m.chat, { text: message, mentions: [me] }, { quoted: m });

        } catch (error) {
          console.error(error);
          reply("An error occurred while fetching the response from the API.");
        }
      }
        break;


      case 'dalle': case 'imgai': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        const randomEmoji = manyemojis[Math.floor(Math.random() * manyemojis.length)];
        A17.sendMessage(from, { react: { text: randomEmoji, key: m.key } });

        if (!q) return reply(`Please provide a query to generate an image. Example: ${prefix + command} Beautiful landscape`);

        const apiUrl = `https://gurugpt.cyclic.app/dalle?prompt=${encodeURIComponent(q)}`;

        try {
          await A17.sendMessage(m.chat, { image: { url: apiUrl } }, { quoted: m });
        } catch (error) {
          console.error(error);
          reply("An error occurred while generating the image.");
        }
      }
        break;



      case 'grupsetting':
      case 'groupsetting': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        let sections = []
        let com = [`group open`, `leveling on`, `antilinkgc on`, `antilinktg on`, `antilinktt on`, `antilinkytch on`, `antilinkytvid on`, `antilinkig on`, `antilinkfb on`, `antilinktwit on`, `antilinkall on`, `antiwame on`]
        let comm = [`group close`, `leveling off`, `antilinkgc off`, `antilinktg off`, `antilinktt off`, `antilinkytch off`, `antilinkytvid off`, `antilinkig on`, `antilinkfb off`, `antilinktwit off`, `antilinkall off`, `antiwame off`]
        let listnya = [`Group open/close`, `Leveling on/off`, `Antilink Group on/off`, `Antilink Telegram on/off`, `Antilink Tiktok on/off`, `Antilink Youtube Channel on/off`, `Antilink Youtube Video on/off`, `Antilink Instagram on/off`, `Antilink Facebook on/off`, `Antilink Twitter on/off`, `Antilink All on/off`, `Anti Wame on/off`]
        let suruh = [`Enable`, `Disable`]
        let fiturname = [`Group`, `Leveling`, `Auto Sticker`, `Antilink Group`, `Antilink Telegram`, `Antilink Tiktok`, `Antilink Youtube Channel`, `Antilink Youtube Video`, `Antilink Instagram`, `Antilink Facebook`, `Antilink Twitter`, `Antilink All`, `Anti Wame`, `Auto Revoke`]
        let startnum = 0; let startnu = 0; let startn = 0; let start = 0
        let startnumm = 1
        for (let x of com) {
          const yy = {
            title: `${listnya[startnum++]}`,
            rows: [
              {
                title: `${suruh[0]}`,
                description: `Activate ${fiturname[startnu++]}`,
                rowId: `${prefix}${x}`
              }, {
                title: `${suruh[1]}`,
                description: `Deactivate ${fiturname[startn++]}`,
                rowId: `${prefix}${comm[start++]}`
              }
            ]
          }
          sections.push(yy)
        }
        const sendm = A17.sendMessage(
          from,
          {
            text: "Group Settings",
            /* footer: BotName,
            title: "Set your group settings here...",
            buttonText: "Click Button", 
            sections */
          }, { quoted: m }
        )
      }
        break;


      /*
      case 'animesearchxxx': case 'anime':{
          await fetchJson(`https://api.jikan.moe/v4/anime/${q}`)
          .then((res) => {
          let txt = `   _Anime Search Engine_ \n\n*Title:* *${res.data.title}*\n*English:* *${res.data.title_english}*\n*Japanese:* *${res.data.title_japanese}*\n*Anime Type:* *${res.data.type}*\n*Adaptation:* *${res.data.source}*\n*Total Episode:* *${res.data.episodes}*\n*Status:* *${res.data.status}*\n*Ongoing:* *${res.data.airing ? 'Yes' : 'No'}*\n*Aired:* *${res.data.aired.string}*\n*Duration:* *${res.data.duration}*\n*Rating:* *${res.data.rating}*\n*Score:* *${res.data.score}*\n*Rank:* *${res.data.rank}*\n*Main Producer:* *${res.data.producers.name}*\n*Studio:* *${res.data.studios[0].name}* `
          A17.sendMessage(from, { image : { url : res.data.images.jpg.image_url}, caption : txt}, {quoted :m }) 
          })
          }
          break;
      */


      case 'emojimix': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        if (!q) reply(`*Example :* ${prefix + command} 😊+🌹`)
        let [emoji1, emoji2] = q.split`+`
        let kuntuh = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
        for (let res of kuntuh.results) {
          let encmedia = await A17.sendImageAsSticker(from, res.url, m, { packname: global.packname, author: global.author, categories: res.tags })
          await fs.unlinkSync(encmedia)
        }
      }
        break;



      //-----------------------------------------------------------------------------------------------------------------------------------//


      //
      case 'badword': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(`plana isn't an admin`);
        if (!isAdmins && !isCreator) return reply(mess.useradmin);
        A17.sendMessage(from, { react: { text: "⚠️", key: m.key } });

        if (args[0] === "on") {
          if (AntiBadWord) return reply('Already activated');
          ntword.push(from);
          reply('anti badword is now enabled');
        } else if (args[0] === "off") {
          if (!AntiBadWord) return reply('Already deactivated');
          let off = ntword.indexOf(from);
          ntword.splice(off, 1);
          reply('anti bad word is now disabled');
        } else {
          reply(`بالذوق`);
        }
      }
        break;


    /*  case 'nsfwmenu':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!AntiNsfw) return reply(mess.nonsfw);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "⚠️", key: m.key } })

        reply(` *━━〈 ⚠️ NSFW Menu ⚠️  〉━━*\n\n gifs, hentaivideo, blowjobgif, hneko, masturbation, thighs, pussy, panties, orgy, ahegao, ass, bdsm, blowjob, cuckold, ero, gasm, cum, femdom, foot, gangbang, glasses, jahy, trap, blowjobgif, spank, hneko, hwaifu, gasm`)
        break;


      //
      case 'مينغودا':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/cum.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.succses, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'ass':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/ass.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'bdsm':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/bdsm.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'blowjob':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/blowjob.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'cuckold':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/cuckold.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'cum':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/cum.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'eba':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/eba.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'ero':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/ero.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'femdom':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/femdom.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'foot':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/foot.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'gangbang':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/gangbang.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      //
      case 'gifs':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        reply(mess.waiting)
        A17.sendMessage(from, { react: { text: "👀", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/gifs.json'))
        const rand = nsfwdata[Math.floor(Math.random() * nsfwdata.length)]
        const response = await fetchBuffer(rand.url)
        //console.log(response)

        var fetchedgif = await GIFBufferToVideoBuffer(response)

        await A17.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true }, { quoted: m }).catch(err => {
          console.log(err);
        }) */


      //


  /*    case 'glasses':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/glasses.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'hentai':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/hentai.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'jahy':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/pussy.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'mangansfw':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/manga.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'masturbation':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/masturbation.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'milf':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/milf.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'neko':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/neko.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break;


      case 'neko2':
        if (isBan) return reply(mess.banned)
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw)
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/neko2.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break; 


      case 'مينغوداا':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/nsfwloli.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break; */


      // case 'orgy':
      //   if (isBan) return reply(mess.banned)	 			
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!m.isGroup) return reply(mess.grouponly);
      //   if (!AntiNsfw) return reply(mess.nonsfw)
      //   A17.sendMessage(from, { react: { text: "💦" , key: m.key }})

      // var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/orgy.json'))
      // var kairesult = pickRandom(nsfwdata)
      // A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
      // break;


     /*   case 'loli':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);

        // React to the command message with a specific emoji
        A17.sendMessage(from, { react: { text: "💦", key: m.key } });

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/anime/loli.json'));
        var numberOfPictures = 3; // Change this value if you want to send a different number of pictures

        // Create a function to get multiple random pictures from the 'nsfwdata' array
        function getRandomPictures(array, count) {
          var shuffled = array.slice();
          var i = array.length;
          var min = i - count;
          var temp;
          var index;

          while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
          }

          return shuffled.slice(min);
        }

        // Get multiple random pictures from 'nsfwdata'
        var selectedPictures = getRandomPictures(nsfwdata, numberOfPictures);

        // Send the selected pictures one by one
        for (let picture of selectedPictures) {
          A17.sendMessage(m.chat, { caption: mess.success, image: { url: picture.url } }, { quoted: m });
        }
        break;


      // case 'panties':
      //   if (isBan) return reply(mess.banned)	 			
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!m.isGroup) return reply(mess.grouponly);
      //   if (!AntiNsfw) return reply(mess.nonsfw)
      //   A17.sendMessage(from, { react: { text: "🥵" , key: m.key }})

      // var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/panties.json'))
      // var kairesult = pickRandom(nsfwdata)
      // A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
      // break;


      case 'panties':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!AntiNsfw) return reply(mess.nonsfw);

        // React to the command message with a specific emoji
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } });

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/panties.json'));
        var numberOfPictures = 3; // Change this value if you want to send a different number of pictures

        // Create a function to get multiple random pictures from the 'nsfwdata' array
        function getRandomPictures(array, count) {
          var shuffled = array.slice();
          var i = array.length;
          var min = i - count;
          var temp;
          var index;

          while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
          }

          return shuffled.slice(min);
        }

        // Get multiple random pictures from 'nsfwdata'
        var selectedPictures = getRandomPictures(nsfwdata, numberOfPictures);

        // Send the selected pictures one by one
        for (let picture of selectedPictures) {
          A17.sendMessage(m.chat, { caption: mess.success, image: { url: picture.url } }, { quoted: m });
        }
        break;


      // case 'pussy':
      //   if (isBan) return reply(mess.banned)	 			
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!m.isGroup) return reply(mess.grouponly);
      //   if (!AntiNsfw) return reply(mess.nonsfw)
      //   A17.sendMessage(from, { react: { text: "🥵" , key: m.key }})

      // var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/pussy.json'))
      // var kairesult = pickRandom(nsfwdata)
      // A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
      // break; */


      case 'orgy':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        // React to the command message with a specific emoji
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } });

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/orgy.json'));

        // Create an empty array to store the randomly selected pictures
        var selectedPictures = [];

        // The number of pictures you want to send (in this case, we'll send 3)
        var numberOfPictures = 3;

        // Loop to randomly select 'numberOfPictures' from 'nsfwdata'
        for (let i = 0; i < numberOfPictures; i++) {
          // Pick a random index from 'nsfwdata'
          var randomIndex = Math.floor(Math.random() * nsfwdata.length);
          var kairesult = nsfwdata[randomIndex];

          // Add the selected picture URL to the 'selectedPictures' array
          selectedPictures.push(kairesult.url);

          // Optionally, you can remove the selected picture from 'nsfwdata' to avoid duplication.
          // nsfwdata.splice(randomIndex, 1);
        }

        // Send the selected pictures one by one
        for (let url of selectedPictures) {
          A17.sendMessage(m.chat, { caption: mess.success, image: { url: url } }, { quoted: m });
        }
        break;


      case 'tentacles':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🥵", key: m.key } })

        var nsfwdata = JSON.parse(fs.readFileSync('./HostMedia/nsfw/tentacles.json'))
        var kairesult = pickRandom(nsfwdata)
        A17.sendMessage(m.chat, { caption: mess.success, image: { url: kairesult.url } }, { quoted: m })
        break; 


      //-----------------------------------------------------------------------------------------------------------------------------------//


      case 'getcase':
        if (isBan) return reply(mess.banned);
        if (m.sender != '916297175943@s.whatsapp.net') { return; }

        if (isBanChat) return reply(mess.bangc);
        if (m.isGroup) reply(mess.privateonly)

        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        const getCase = (cases) => {
          return "case" + `'${cases}'` + fs.readFileSync("Core.js").toString().split('case \'' + cases + '\'')[1].split("break;")[0] + "break;"
        }
        reply(`${getCase(q)}`)
        break;


      case 'emoji': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        if (!args.join(" ")) return reply('Where is the emoji?')
        emoji.get(args.join(" ")).then(async (emoji) => {
          let mese = await A17.sendMessage(m.chat, { image: { url: emoji.images[4].url }, caption: `Here it is...` }, { quoted: m })
          await A17.sendMessage(from, { text: "reply -s to this image to make sticker" }, { quoted: mese })
        })
      }
        break;


      /*
      case 'delete': case 'del': {
       if (isBan) return reply(mess.banned);	 			
      if (isBanChat) return reply(mess.bangc);
      if (!m.quoted) return
      let { chat, fromMe, id, isBaileys } = m.quoted
      if (!isBaileys) return reply('How can i delete messages of other person? Baka!')
      A17.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: true, id: m.quoted.id, participant: m.quoted.sender } })
      }
      break;
      */


      case 'deleteall': case 'delall': case 'delete': case 'del': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
      //  if (!isBotAdmins) return reply(mess.botadmin);
     //   if (!isAdmins && !isCreator) return reply(mess.useradmin)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        if (!m.quoted) return reply('Please mention a message baka!')
        let { chat, fromMe, id } = m.quoted

        const key = {
          remoteJid: m.chat,
          fromMe: false,
          id: m.quoted.id,
          participant: m.quoted.sender
        }

        await A17.sendMessage(m.chat, { delete: key })
      }
        break;


      //////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////



      case 'ghstalk': case 'githubstalk': case 'github': {
        A17.sendMessage(from, { react: { text: "🔍", key: m.key } })

        if (!q) return reply(`Give me a user name like *${prefix}github Kai0071*`)

        gitdata = await githubstalk.githubstalk(`${q}`)
        A17.sendMessage(m.chat, {
          image: { url: gitdata.profile_pic }, caption:
            `*ㅤㅤㅤ|ㅤㅤㅤGithub Info ㅤㅤㅤ|\*

  🚩 Id : ${gitdata.id}
  🔖 Nickname : ${gitdata.nickname}
  🔖 Username : ${gitdata.username}
  ✨ Bio : ${gitdata.bio}
  🏢 Company : ${gitdata.company}
  📍 Location : ${gitdata.location}
  📧 Email : ${gitdata.email}
  🔓 Public Repo : ${gitdata.public_repo}
  🔐 Public Gists : ${gitdata.public_gists}
  💕 Followers : ${gitdata.followers}
  👉 Following : ${gitdata.following}`
        }, { quoted: m })
      }
        break;

      //
      //🚩 Id : ${gitdata.id}
      //✅ Type : ${gitdata.type}
      //🛡 Admin : ${gitdata.admin}
      //❇ Nodeid : ${gitdata.nodeId}
      // 📰 Blog : ${gitdata.blog}
      //  🔗 Url Profile : ${gitdata.profile_pic}
      // 🔗 Url Github : ${gitdata.url}
      // 🔄 Updated At : ${gitdata.updated_at}
      // 🧩 Created At : ${gitdata.ceated_at}


      case 'git':
      case 'gitclone':
      case 'git-clone':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        A17.sendMessage(from, { react: { text: "💫", key: m.key } });

        if (!args[0]) {
          return reply(`Please provide the GitHub repository link.\nExample:\n${prefix}${command} https://github.com/Kai0071/A17`);
        }

        if (!isUrl(args[0]) || !args[0].includes('github.com')) {
          return reply(`Invalid or non-GitHub repository link provided. Please use a valid GitHub repository link.`);
        }

        try {
          let splitURL = args[0].split('github.com/');
          if (splitURL.length < 2) throw Error('Invalid GitHub URL');

          let [githubUser, githubRepo] = splitURL[1].split('/');
          githubRepo = githubRepo.replace('.git', '');

          let gitZipUrl = `https://api.github.com/repos/${githubUser}/${githubRepo}/zipball`;

          await A17.sendMessage(from, { text: `${pushname}, Please wait, downloading...` });


          let zipHeaders = await fetch(gitZipUrl, { method: 'HEAD' }).then(res => res.headers);
          let zipFilename = zipHeaders.get('content-disposition').match(/attachment; filename=(.*)/)[1];

          await A17.sendMessage(m.chat, { document: { url: gitZipUrl }, fileName: zipFilename + '.zip', mimetype: 'application/zip' }, { quoted: m });
        } catch (err) {
          console.error(err);
          return reply(`Failed to fetch the repository contents. Please ensure the GitHub link is correct and accessible. Use the format: 'https://github.com/username/repository'.`);
        }
        break;


     /* case 'listpc': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        let anu = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v)
        let teks = ` 「  A17's pm user list  」\n\nTotal ${anu.length} users are using A17 in personal chat.`
        for (let i of anu) {
          teks += `\n\nProfile : @${i.id.split('@')[0]}\nChat : ${i.unreadCount}\nLastchat : ${moment(i.conversationTimestamp * 1000).tz("Asia/Kolkata").format("DD/MM/YYYY HH:mm:ss")}`
        }
        A17.sendTextWithMentions(m.chat, teks, m)
      }
        break;


      case 'listgc': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        let anu = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)
        let teks = ` 「  A17's group user list  」\n\nTotal ${anu.length} users are using bot in Groups.`
        for (let i of anu) {
          let metadata = await A17.groupMetadata(i)
          if (metadata.owner === "undefined") {
            loldd = false
          } else {
            loldd = metadata.owner
          }
          teks += `\n\nName : ${metadata.subject ? metadata.subject : "undefined"}\nOwner : ${loldd ? '@' + loldd.split("@")[0] : "undefined"}\nID : ${metadata.id ? metadata.id : "undefined"}\nMade : ${metadata.creation ? moment(metadata.creation * 1000).tz('Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss') : "undefined"}\nMember : ${metadata.participants.length ? metadata.participants.length : "undefined"}`
        }
        A17.sendTextWithMentions(m.chat, teks, m)
      }
        break; */


      case 'speedtest': case 'speedcheck': {
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        m.reply(`Plz Wait ${pushname} Testing Speed... ⚙️`)
        let cp = require('child_process')
        let { promisify } = require('util')
        let exec = promisify(cp.exec).bind(cp)
        let o
        try {
          o = await exec('python speed.py')
        } catch (e) {
          o = e
        } finally {
          let { stdout, stderr } = o
          if (stdout.trim()) m.reply(stdout)
          if (stderr.trim()) m.reply(stderr)
        }
      }
        break;


/*case 'status':
case 'post': {
  if (!isCreator) return reply("You don't have permission to do that")
  if (!quoted) return reply(`Send/reply Image With Caption ${prefix}status`)
  if (/video/.test(mime)) {
    if ((quoted.msg || quoted).seconds > 30) return reply('Maximum 30 seconds video is allowed!')
  }
  const messageType = Object.keys(m.message)[0]
  if (messageType === 'imageMessage') {
    // Replace 'downloadMediaMessage' and 'writeFile' with appropriate functions
    // Replace 'A17' and 'botNumber' with the actual variables
    // Replace './image.jpeg' with the correct file path
    // Replace 'reply' with the function to send a reply
    // Replace 'pushname' with the user's name
    // Replace 'fs.unlinkSync(media)' with the appropriate error handling
    // Make sure to import necessary modules or functions
    // Handle errors appropriately
  }
  else if (messageType === 'videoMessage') {
    // Similar to above, handle video message posting
  }
  else {
    // Handle other message types
  }
  break;
}
*/






      ////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////



      case 'afk': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        let user = global.db.users[m.sender]
        user.afkTime = + new Date
        user.afkReason = args.join(" ")
        reply(`${m.pushName} is now Away From Keyboard.\nAFK Reason : ${args.join(" ") ? args.join(" ") : ''}`)
      }
        break;


      case 'fliptext': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (args.length < 1) return reply(`Example:\n${prefix}fliptext ${OwnerName}`)
        quere = args.join(" ")
        flipe = quere.split('').reverse().join('')
        reply(`\`\`\`「  Text Flipper Tool  」\`\`\`\n*Input text :*\n${quere}\n*Fliped text :*\n${flipe}`)
      }
        break;


      case 'toletter': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!Number(args[0])) return reply(`Example:\n${prefix}toletter 956`)
        try {
          quere = args.join(" ")
          convertes = await toHur(quere)
          reply(`\`\`\`「  Word Maker Tool  」\`\`\`\n*Input Number :*\n${quere}\n*Converted Alphabet :*\n${convertes}`)
        } catch {
          reply(`Error!`)
        }
      }



      case 'leveling':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args.length < 1) return reply('Type on to *Enable*\nType off to *Disable*')
        if (args[0] === 'on') {
          if (isLeveling) return reply(`Already activated`)
          _leveling.push(from)
          fs.writeFileSync('./database/leveling.json', JSON.stringify(_leveling))
          reply('Leveling activated')
        } else if (args[0] === 'off') {
          let anu = _leveling.indexOf(from)
          _leveling.splice(anu, 1)
          fs.writeFileSync('./database/leveling.json', JSON.stringify(_leveling))
          reply('Leveling deactivated')
        }
        break;


      ////////////////////////////////////////////////////////////////////////////


      /* ████ ✪ ███▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ [ Antilink ] ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███ ✪ ███ */


      //
      case 'antilinkgc': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLink) return reply('Already activated')
          ntilink.push(from)
          reply('Activated _Antilink_ in this group.')
          var groupe = await A17.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          A17.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLink) return reply('Already deactivated!')
          let off = ntilink.indexOf(from)
          ntilink.splice(off, 1)
          reply('Deactivated _Antilink_ in this group!')
        } else {
          let buttonsntilink = [
            { buttonId: `${prefix}antilinkgc on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antilinkgc off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await A17.sendButtonText(m.chat, buttonsntilink, `Please click the button below On / Off`, `${global.BotName}`, m)
        }
      }
        break;


      case 'antilinkyoutubevideo': case 'antilinkyoutubevid': case 'antilinkytvid': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLinkYoutubeVid) return reply('Already activated')
          ntilinkytvid.push(from)
          reply('Activated youtube video antilink !')
          var groupe = await A17.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          A17.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLinkYoutubeVid) return reply('Already deactivated')
          let off = ntilinkytvid.indexOf(from)
          ntilinkytvid.splice(off, 1)
          reply('Deactivated youtube video antilink !')
        } else {
          let buttonsntilink = [
            { buttonId: `${prefix}antilinkyoutubevideo on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antilinkyoutubevideo off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await A17.sendButtonText(m.chat, buttonsntilink, `Please click the button below On / Off`, `${global.BotName}`, m)
        }
      }
        break;


      case 'antilinkyoutubech': case 'antilinkyoutubechannel': case 'antilinkytch': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLinkYoutubeChannel) return reply('Already activated')
          ntilinkytch.push(from)
          reply('Activated youtube channel antilink !')
          var groupe = await A17.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          A17.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLinkYoutubeChannel) return reply('Already deactivated')
          let off = ntilinkytch.indexOf(from)
          ntilinkytch.splice(off, 1)
          reply('Deactivated youtube channel antilink !')
        } else {
          let buttonsntilink = [
            { buttonId: `${prefix}antilinkyoutubech on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antilinkyoutubech off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await A17.sendButtonText(m.chat, buttonsntilink, `Please click the button below On / Off`, `${global.BotName}`, m)
        }
      }
        break;


      case 'antilinkinstagram': case 'antilinkig': case 'antilinkinsta': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLinkInstagram) return reply('Already activated')
          ntilinkig.push(from)
          reply('Activated instagram antilink !')
          var groupe = await A17.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          A17.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLinkInstagram) return reply('Already deactivated')
          let off = ntilinkig.indexOf(from)
          ntilinkig.splice(off, 1)
          reply('Deactivated instagram antilink !')
        } else {
          let buttonsntilink = [
            { buttonId: `${prefix}antilinkinstagram on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antilinkinstagram off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await A17.sendButtonText(m.chat, buttonsntilink, `Please click the button below On / Off`, `${global.BotName}`, m)
        }
      }
        break;


      case 'antilinkfacebook': case 'antilinkfb': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLinkFacebook) return reply('Already activated')
          ntilinkfb.push(from)
          reply('Activated facebook antilink !')
          var groupe = await A17.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          A17.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLinkFacebook) return reply('Already deactivated')
          let off = ntilinkfb.indexOf(from)
          ntilinkfb.splice(off, 1)
          reply('Deactivated facebook antilink !')
        } else {
          let buttonsntilink = [
            { buttonId: `${prefix}antilinkfacebook on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antilinkfacebook off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await A17.sendButtonText(m.chat, buttonsntilink, `Please click the button below On / Off `, `${global.BotName}`, m)
        }
      }
        break;


      case 'antilinktelegram': case 'antilinktg': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLinkTelegram) return reply('Already activated')
          ntilinktg.push(from)
          reply('Activated telegram antilink !')
          var groupe = await A17.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          A17.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLinkTelegram) return reply('Already deactivated')
          let off = ntilinkig.indexOf(from)
          ntilinkig.splice(off, 1)
          reply('Deactivated telegram antilink in this group')
        } else {
          let buttonsntilink = [
            { buttonId: `${prefix}antilinktelegram on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antilinktelegram off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await A17.sendButtonText(m.chat, buttonsntilink, `Please click the button below On / Off `, `${global.BotName}`, m)
        }
      }
        break;


      case 'antilinktiktok': case 'antilinktt': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLinkTiktok) return reply('Already activated')
          ntilinktt.push(from)
          reply('Activated tiktok antilink !')
          var groupe = await A17.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          A17.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLinkTiktok) return reply('Already deactivated')
          let off = ntilinktt.indexOf(from)
          ntilinktt.splice(off, 1)
          reply('Deactivated tiktok antilink !')
        } else {
          let buttonsntilink = [
            { buttonId: `${prefix}antilinktiktok on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antilinktiktok off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await A17.sendButtonText(m.chat, buttonsntilink, `Please click the button below\n\nOn to enable\nOff to disable`, `${global.BotName}`, m)
        }
      }
        break;


      case 'antilinktwt': case 'antilinktwitter': case 'antilinktwit': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLinkTwitter) return reply('Already activated')
          ntilinktwt.push(from)
          reply('Activated twitter antilink in this group !')
          var groupe = await A17.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          A17.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLinkTwitter) return reply('Already deactivated')
          let off = ntilinktwt.indexOf(from)
          ntilinktwt.splice(off, 1)
          reply('Deactivated twitter antilink !')
        } else {
          let buttonsntilink = [
            { buttonId: `${prefix}antilinktwt on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antilinktwt off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await A17.sendButtonText(m.chat, buttonsntilink, `Please click the button below\n\nOn to enable\nOff to disable`, `${global.BotName}`, m)
        }
      }
        break;


      // case 'antilinkall': {
      // if (isBan) return reply(mess.banned);	 			
      // if (isBanChat) return reply(mess.bangc);
      // if (!m.isGroup) return reply(mess.grouponly);
      // if (!isBotAdmins) return reply(mess.botadmin);
      // if (!isAdmins && !isCreator) return reply(mess.useradmin)
      // if (args[0] === "on") {
      // if (AntiLinkTwitter) return reply('Already activated')
      // ntilinkall.push(from)
      // reply('Enabled all antilink !')
      // var groupe = await A17.groupMetadata(from)
      // var members = groupe['participants']
      // var mems = []
      // members.map(async adm => {
      // mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
      // })
      // A17.sendMessage(from, {text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid : mems }}, {quoted:m})
      // } else if (args[0] === "off") {
      // if (!AntiLinkAll) return reply('Already deactivated')
      // let off = ntilinkall.indexOf(from)
      // ntilinkall.splice(off, 1)
      // reply('Disabled all antilink !')
      // } else {
      // let buttonsntilink = [
      // { buttonId: `${prefix}antilinkall on`, buttonText: { displayText: 'On' }, type: 1 },
      // { buttonId: `${prefix}antilinkall off`, buttonText: { displayText: 'Off' }, type: 1 }
      // ]
      // await A17.sendButtonText(m.chat, buttonsntilink, `Please click the button below\n\nOn to enable\nOff to disable`, `${global.BotName}`, m)
      // }
      // }
      // break;


      case 'antilinkall': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } });

        if (args[0] === "on") {

          if (AntiLinkAll) return reply('Already activated');
          ntilinkall.push(from);
          reply('Enabled all antilink!');
          var groupe = await A17.groupMetadata(from);
          var members = groupe['participants'];
          var mems = [];
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'));
          });
          A17.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m });
        } else if (args[0] === "off") {
          if (!AntiLinkAll) return reply('Already deactivated');
          let off = ntilinkall.indexOf(from);
          ntilinkall.splice(off, 1);
          reply('Disabled all antilink!');
        } else {
          reply(`Please use '${prefix}antilinkall on' to enable the Antilink system or '${prefix}antilinkall off' to disable it.`);
        }
      }
        break;


      case 'antiwame': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (antiWame) return reply('Already activated')
          ntwame.push(from)
          reply('Activated antiwame !')
          var groupe = await A17.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          A17.sendMessage(from, { text: `\`\`\`*「  Warning  」*\`\`\`\n\nAntilink is enabled!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!antiWame) return reply('Already deactivated')
          let off = nttoxic.indexOf(from)
          ntwame.splice(off, 1)
          reply('Deactivated antiwame !')
        } else {
          let buttonsntwame = [
            { buttonId: `${prefix}antiwame on`, buttonText: { displayText: 'On' }, type: 1 },
            { buttonId: `${prefix}antiwame off`, buttonText: { displayText: 'Off' }, type: 1 }
          ]
          await A17.sendButtonText(m.chat, buttonsntwame, `Please click the button below\n\nOn to enable\nOff to disable`, `${global.BotName}`, m)
        }
      }
        break;



      /////////////////////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////



      // case 'nsfw': {
      // if (isBan) return reply(mess.banned);	 			
      // if (isBanChat) return reply(mess.bangc);
      // if (!m.isGroup) return reply(mess.grouponly);
      // if (!isBotAdmins) return reply(mess.botadmin);
      // if (!isAdmins && !isCreator) return reply(mess.useradmin)
      // A17.sendMessage(from, { react: { text: "🫡" , key: m.key }})
      // if (args[0] === "on") {
      // if (AntiNsfw) return reply('Already activated')
      // ntnsfw.push(from)
      // reply('Enabled NSFW Commands!')
      // var groupe = await A17.groupMetadata(from)
      // var members = groupe['participants']
      // var mems = []
      // members.map(async adm => {
      // mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
      // })
      // A17.sendMessage(from, {text: `\`\`\`「 Notice 」\`\`\`\n\nNSFW(not safe for work) feature has been enabled in this group, which means anyone here can accesss Adult commands!`, contextInfo: { mentionedJid : mems }}, {quoted:m})
      // } else if (args[0] === "off") {
      // if (!AntiNsfw) return reply('Already deactivated')
      // let off = ntnsfw.indexOf(from)
      // ntnsfw.splice(off, 1)
      // reply('Disabled NSFW Commands!')
      // } else {
      // let buttonsntnsfw = [
      // { buttonId: `${prefix}nsfw on`, buttonText: { displayText: 'On' }, type: 1 },
      // { buttonId: `${prefix}nsfw off`, buttonText: { displayText: 'Off' }, type: 1 }
      // ]
      // await A17.sendButtonText(m.chat, buttonsntnsfw, `Please click the button below\n\nOn to enable\nOff to disable`, `${global.BotName}`, m)
      // }
      // }
      // break;


      //-----------------------------------------------------------------------------------------------------------------------------------//


      case 'listonline': case 'listaktif': case 'here': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
        let online = [...Object.keys(store.presences[id]), botNumber]
        let liston = 1
        A17.sendText(m.chat, '  「 *Online Members* 」\n\n' + online.map(v => `${liston++} . @` + v.replace(/@.+/, '')).join`\n`, m, { mentions: online })
      }
        break;


      //-----------------------------------------------------------------------------------------------------------------------------------//


      // case 'happymod': {
      // if (isBan) return reply(mess.banned);	 			
      // if (isBanChat) return reply(mess.bangc);
      // A17.sendMessage(from, { react: { text: "🫡" , key: m.key }})
      // if (!args.join(" ")) return reply(`Example : ${prefix + command} Kinemaster`)
      //modapk.happymod(args.join(" ")).then(async(res) => {
      // teks = '```「 HappyMod Search Engine 」```'
      // for (let i of res) {
      // teks += `\n\n${i.name}\n`
      // teks += `${i.link}`
      // }

      // let buttonMessage = {
      // image: {url:res[0].icon},
      // jpegThumbnail: Thumb,
      // caption: teks,
      // footer: `${global.BotName}`,
      // headerType: 4
      // }
      // A17.sendMessage(m.chat, buttonMessage, { quoted: m })
      // })
      // }
      // break;

      //
      case 'happymod': case 'modapk': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🔍", key: m.key } });

        if (!args.join(" ")) return reply(`Example: ${prefix + command} Kinemaster`);

        const searchTerm = args.join(" ");
        modapk.happymod(searchTerm).then(async (res) => {
          let teks = '```「 HappyMod Search Engine 」```';
          for (let i of res) {
            teks += `\n\n${i.name}\n`;
            teks += `${i.link}`;
          }

          let messageToSend = teks;
          if (res[0].icon) {
            messageToSend = {
              text: teks,
              image: { url: res[0].icon },
              jpegThumbnail: Thumb,
            };
          }

          A17.sendMessage(from, messageToSend, { quoted: m });
        });
      }
        break;



      //-----------------------------------------------------------------------------------------------------------------------------------//


      //group moderation

      case 'banchat': case 'bangroup': case 'banmode': {
        if (isBan) return reply(mess.banned);
        if (!isCreator) return reply(mess.botowner);
        A17.sendMessage(from, { react: { text: "⚠️", key: m.key } })

        if (args[0] === "on") {
          if (isBanChat) return reply('This Group is Already Banned from using me!');
          banchat.push(from);
          reply('This Group has been banned from using me!');

          var groupe = await A17.groupMetadata(from);
          var members = groupe['participants'];
          var mems = [];
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'));
          });

          A17.sendMessage(from, { text: `\`\`\`「 Notice 」\`\`\`\n\nThis group is banned from using the bot. So, here nobody can use me anymore!`, contextInfo: { mentionedJid: mems } }, { quoted: m });
        } else if (args[0] === "off") {
          if (!isBanChat) return reply('This Group is Already Banned from using me!');
          let off = banchat.indexOf(from);
          banchat.splice(off, 1);
          reply('This Group has been *unbanned* from using me!');
        } else {
          reply('Please choose either *"on"* or *"off"* to ban or unban the group from using the bot.');
        }
      }
        break;


      case 'setname': case 'setsubject': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (!text) return reply('Pls enter -setname <New Group Name>  to change this Group Name')
        await A17.groupUpdateSubject(m.chat, text).then((res) => reply(mess.jobdone)).catch((err) => reply(jsonformat(err)))
      }
        break;


      case 'block': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        await A17.updateBlockStatus(users, 'block').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
      }
        break;


      case 'unblock': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        await A17.updateBlockStatus(users, 'unblock').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
      }
        break;


      case 'setdesc': case 'setdesk': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        A17.sendMessage( { react: { text: "🫡", key: m.key } })
        if (!text) return reply('Pls enter -setname <New Group Description>  to change this Group Description.')
        await A17.groupUpdateDescription(m.chat, text).then((res) => reply(mess.jobdone)).catch((err) => reply(jsonformat(err)))
      }
        break;


      case 'setgrouppp': case 'setgruppp': case 'setgcpp': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (!quoted) return reply(`Send/reply Image With Caption ${prefix + command}`)
        if (!/image/.test(mime)) return reply(`Send/reply Image With Caption ${prefix + command} to change the Profile Pic of this group.`)
        if (/webp/.test(mime)) return reply(`Send/reply Image With Caption ${prefix + command} to change the Profile Pic of this group.`)
        let media = await A17.downloadAndSaveMediaMessage(quoted)
        await A17.updateProfilePicture(m.chat, { url: media }).catch((err) => fs.unlinkSync(media))
        reply(mess.jobdone)
      }
        break;


      case 'tagall': case 'all': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        A17.sendMessage(from, { react: { text: "😳", key: m.key } })
        let teks = `「 Attention 」

*Message : ${args.join(" ") ? args.join(" ") : 'no message'}*\n\n`
        for (let mem of participants) {
          teks += `» @${mem.id.split('@')[0]}\n`
        }
        A17.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
      }
        break;


      case 'hidetag': case 'tag': case 'ping': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        A17.sendMessage(from, { react: { text: "✨", key: m.key } })
        A17.sendMessage(m.chat, { text: args.join(" ") ? args.join(" ") : '', mentions: participants.map(a => a.id) }, { quoted: m })
      }
        break;


      case 'tagadmins': case 'admins': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "🗿", key: m.key } })
        if (!text) return reply(`*Please quote or write a meaningful message to tag admins to*`)
        let teks = `*「 Tag Admins 」*

*Message : ${text}*\n\n`
        for (let mem of groupAdmins) {
          teks += `🍁 @${mem.split('@')[0]}\n`
        }
        A17.sendMessage(m.chat, { text: teks, mentions: groupAdmins }, { quoted: m })
      }
        break;


      /*
      case 'purge':{
        if (isBan) return reply(mess.banned);	 			
      if (isBanChat) return reply(mess.bangc);
      if (!m.isGroup) return reply(mess.grouponly);
      if (!isBotAdmins) return reply(mess.botadmin);
      if (!isAdmins && !isCreator) return reply(mess.useradmin)
      
        const delay = time => new Promise(res=>setTimeout(res,time));
      
        let users = (await A17.fetchGroupMetadataFromWA(m.chat)).participants.map(u => u.jid)
        for (let user of users){
      
            await A17.groupParticipantsUpdate(m.chat, [user], 'remove')
            await delay(3000)
        }
      }
      break;
      
      */

      case 'purge': {
        mess
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        const delay = time => new Promise(res => setTimeout(res, time));
        let mentioned = participants.map(v => v.jid)
        for (let member of mentioned) {
          A17.groupParticipantsUpdate(m.chat, [member], 'remove')
        }
      }

        break;


      case 'nowa': case 'find': case 'stalk': case 'stalknumber': {
        if (isBan) return reply(mess.banned);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (!args[0]) return reply(`Use command like: ${prefix}stalk <number>xxx`)
        var inputnumber = args[0]
        if (!inputnumber.includes('x')) return reply('You didnot added x')
        reply(`Searching for WhatsApp account in given range...`)
        reply(`Please wait while i fetch details...`)
        function countInstances(string, word) {
          return string.split(word).length - 1;
        }
        var number0 = inputnumber.split('x')[0]
        var number1 = inputnumber.split('x')[countInstances(inputnumber, 'x')] ? inputnumber.split('x')[countInstances(inputnumber, 'x')] : ''
        var random_length = countInstances(inputnumber, 'x')
        var randomxx;
        if (random_length == 1) {
          randomxx = 10
        } else if (random_length == 2) {
          randomxx = 100
        } else if (random_length == 3) {
          randomxx = 1000
        }
        var nomerny = `*『 List of Whatsapp Numbers 』*\n\n`
        var nobio = `\n*Bio:* || \nHey there! I am using WhatsApp.\n`
        var nowhatsapp = `\n*Numbers with no WhatsApp account within the range you provided*\n`
        for (let i = 0; i < randomxx; i++) {
          var nu = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
          var status1 = nu[Math.floor(Math.random() * nu.length)]
          var status2 = nu[Math.floor(Math.random() * nu.length)]
          var status3 = nu[Math.floor(Math.random() * nu.length)]
          var dom4 = nu[Math.floor(Math.random() * nu.length)]
          var rndm;
          if (random_length == 1) {
            rndm = `${status1}`
          } else if (random_length == 2) {
            rndm = `${status1}${status2}`
          } else if (random_length == 3) {
            rndm = `${status1}${status2}${status3}`
          } else if (random_length == 4) {
            rndm = `${status1}${status2}${status3}${dom4}`
          }
          var anu = await A17.onWhatsApp(`${number0}${i}${number1}@s.whatsapp.net`);
          var anuu = anu.length !== 0 ? anu : false
          try {
            try {
              var anu1 = await A17.fetchStatus(anu[0].jid)
            } catch {
              var anu1 = '401'
            }
            if (anu1 == '401' || anu1.status.length == 0) {
              nobio += `wa.me/${anu[0].jid.split("@")[0]}\n`
            } else {
              nomerny += `🪄 *Number:* wa.me/${anu[0].jid.split("@")[0]}\n🔹 *Bio :* ${anu1.status}\n🔸 *Updated On :* ${moment(anu1.setAt).tz('Asia/Kolkata').format('HH:mm:ss DD/MM/YYYY')}\n\n`
            }
          } catch {
            nowhatsapp += `${number0}${i}${number1}\n`
          }
        }
        reply(`${nomerny}${nobio}${nowhatsapp}`)
      }
        break;


      case 'grouplink': case 'gclink': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        A17.sendMessage(from, { react: { text: "🪄", key: m.key } })
        let response = await A17.groupInviteCode(m.chat)
        A17.sendMessage(m.chat, {
          text: `*Group Name:* *${groupMetadata.subject}* \n\n*Group Link :* \nhttps://chat.whatsapp.com/${response}l`, "contextInfo": {
            mimetype: "image/jpeg",
            text: `${global.OwnerName}`,
            "forwardingScore": 1000000000,
            isForwarded: true,
            sendEphemeral: true,
            "externalAdreply": {
              "title": `${global.BotName}`,
              "body": `${global.WaterMark}`,
              "previewType": "PHOTO",
              "thumbnailUrl": Thumb,
              "thumbnail": Thumb,
              "sourceUrl": `${global.websitex}`
            }
          }
        }, { quoted: m, detectLink: true })
      }
        break;


      case 'resetlinkgc':
      case 'resetlinkgroup':
      case 'resetlinkgrup':
      case 'revoke':
      case 'resetlink':
      case 'resetgrouplink':
      case 'resetgclink':
      case 'resetgruplink': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        A17.groupRevokeInvite(m.chat)
      }
        break;


   /*   case 'group': case 'grup': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (args[0] === 'close') {
          await A17.groupSettingUpdate(m.chat, 'announcement').then((res) => reply(`Group has been closed!`)).catch((err) => reply(jsonformat(err)))
        } else if (args[0] === 'open') {
          await A17.groupSettingUpdate(m.chat, 'not_announcement').then((res) => reply(`Group has been opened!`)).catch((err) => reply(jsonformat(err)))
        } else {

          let buttonMessage = {
            image: BotLogo,
            jpegThumbnail: Thumb,
            caption: `*「 ${global.BotName} 」*\n\n_Group Setting Changer tool_:\n\nIf you want to Group close *-group close*\n\nIf you want to Group Oepn *-group open*`,
            footer: `${BotName}`,
            headerType: 4
          }
          A17.sendMessage(m.chat, buttonMessage, { quoted: m })
        }
      }
        break; */


      case 'promote': case 'admin': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        await A17.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
      }
        break;


      case 'demote': case 'unadmin': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        await A17.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
      }
        break;


      case 'add': {
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isCreator) return reply(mess.botowner)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })


        let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        if (users.length == 0) return reply(`Please write the number of the person you want to add to thhis group`)
        await A17.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => reply(`User Added Successfully!`)).catch((err) => reply(`Cannot add that user to this group!`))
      }
        break;


      case 'invite': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        if (!text) return reply(`Enter the number you want to invite to the group...\n\nExample :\n*${prefix + command}* 916297175943`)
        if (text.includes('+')) return reply(`Enter the number together without *+*`)
        if (isNaN(text)) return reply(`Enter only the numbers plus your country code without spaces`)
        let group = m.chat
        let link = 'https://chat.whatsapp.com/' + await A17.groupInviteCode(group)
        await A17.sendMessage(text + '@s.whatsapp.net', { text: ` *اصير لك مامي بس لا تزعل🥰..يلا ادخل \n\n${link}`, mentions: [m.sender] })
        reply(` An invite link is sent to the user`)
      }
        break;


      case 'send': {
        if (!isCreator) return reply (`🍆`) 
      A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        const swn = args.join(" ")
        const number = swn.split("/")[0];
        const message = swn.split("/")[1];
        await A17.sendMessage(number+ '@s.whatsapp.net', { text: message, mentions: [m.sender] })
        reply(`تم الطبخ`)
      }
        break;


      case 'remove': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        await A17.groupParticipantsUpdate(m.chat, [users], 'remove')
      }
        break;


      // join command  is a possible to Ban bot number.
      case 'join': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (!args[0]) return reply(`Where's the link?`)
        vdd = args[0]
        let vcc = vdd.split("https://chat.whatsapp.com/")[1]
        if (!vcc) return reply("Link invalid!")
        if (isCreator) {
          await A17.groupAcceptInvite(vcc).then(async (res) => reply(jsonformat(res))).catch(_ => _)
          reply("Succes!")
        } else if (!isCreator) {
          if (!args[0]) return reply(`Where's the link?`)
          vdd = args[0]
          let vcc = vdd.split("https://chat.whatsapp.com/")[1]
          if (!vcc) return reply("Link invalid!")
          const number = (`249904077717`)
          await A17.sendMessage(number+ '@s.whatsapp.net', { text: 'https://chat.whatsapp.com/' +vcc, mentions: [m.sender] })
	  const txtmsg = `*request*`
        for (let mod of global.Owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != '6297175943@s.whatsapp.net'))
          await A17.sendMessage(`${mod}`, { text: `${txtmsg}` }, { quoted: m })
          await A17.sendMessage(`120363026915700516@g.us`, { text: `${txtmsg}`, mentions: groupAdmins }, { quoted: m })
          reply(`request added successfully..please wait till it get accepted`)
        }   
       }
        break;


      // case 'leavegc': case 'leavegroup': case 'bye': {
      //   if (isBan) return reply(mess.banned);	 			
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!m.isGroup) return reply(mess.grouponly);
      //       reply(mess.waiting)
      //                   if (!isCreator) return reply(`${mess.botowner}`)
      //                   A17.sendMessage(from, { react: { text: "☯️" , key: m.key }})
      //                   await A17.groupLeave(m.chat).then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
      //               }
      //               break;


      //
      case 'groupevent':
      case 'group-event':

        A17.sendMessage(from, { react: { text: '❤', key: m.key } });
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)

        if (args.length === 0) {
          if (global.groupevent) {
            return m.reply(`Group events are currently *enabled*.\n\nYou can turn them *off* using "${global.prefa[0]}groupevent off".`);
          } else {
            return m.reply(`Group events are currently *disabled*.\n\nYou can turn them *on* using "${global.prefa[0]}groupevent on".`);
          }
        } else if (args.length === 1 && (args[0] === 'on' || args[0] === 'off')) {
          const status = args[0];
          if (status === 'on') {
            if (global.groupevent) {
              return m.reply(`Group events are already *enabled*.`);
            } else {
              global.groupevent = true;
              return m.reply(`Group events are now *enabled*.`);
            }
          } else {
            if (!global.groupevent) {
              return m.reply(`Group events are already *disabled*.`);
            } else {
              global.groupevent = false;
              return m.reply(`Group events are now *disabled*.`);
            }
          }
        } else {
          return m.reply(`Usage: ${global.prefa[0]}groupevent [on/off]`);
        }
        break;


      //
      case 'ban': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        if (!args[0]) return reply(`Select add or del (add to ban, del to unban), For Example: reply *${prefix}ban add* to the user you want to ban.`)
        if (args[1]) {
          orgnye = args[1] + "@s.whatsapp.net"
        } else if (m.quoted) {
          orgnye = m.quoted.sender
        }
        const isBane = banUser.includes(orgnye)
        if (args[0] === "add") {
          if (isBane) return ads('User was already banned.')
          banUser.push(orgnye)
          reply(`Successfully banned the user`)
        } else if (args[0] === "del") {
          if (!isBane) return ads('User was already unbanned.')
          let delbans = banUser.indexOf(orgnye)
          banUser.splice(delbans, 1)
          reply(`Successfully unbanned the user.`)
        } else {
          reply("Error")
        }
      }
        break;


      case 'antilink': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        if (!isBotAdmins) return reply(mess.botadmin);
        if (!isAdmins && !isCreator) return reply(mess.useradmin)
        if (args[0] === "on") {
          if (AntiLinkAll) return reply('Already activated')
          ntilinkall.push(from)
          reply('Enabled all antilink !')
          var groupe = await A17.groupMetadata(from)
          var members = groupe['participants']
          var mems = []
          members.map(async adm => {
            mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
          A17.sendMessage(from, { text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`, contextInfo: { mentionedJid: mems } }, { quoted: m })
        } else if (args[0] === "off") {
          if (!AntiLinkAll) return reply('Already deactivated')
          let off = ntilinkall.indexOf(from)
          ntilinkall.splice(off, 1)
          reply('Disabled all antilink !')
        } else {
          let textmsg = 'Type ' + `${prefix}${command}` + ' on to turn on antilink feature or Type ' + `${prefix + command}` + ' off to turn off antilink feature'
          await A17.sendMessage(m.chat, { text: `${textmsg}` }, `${global.BotName}`, m)
        }
      }
        break;



      //-----------------------------------------------------------------------------------------------------------------------------------//



      //
      case 'ringtone': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!args.join(" ")) return reply(`Example: ${prefix}ringtone black over`)
        let { ringtone } = require('./lib/scraper')
        let anu = await ringtone(text)
        let result = anu[Math.floor(Math.random() * anu.length)]
        A17.sendMessage(m.chat, { audio: { url: result.audio }, fileName: result.title + '.mp3', mimetype: 'audio/mpeg' }, { quoted: m })
      }
        break;


      case 'volume': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!args.join(" ")) return reply(`Example: ${prefix + command} 10`)
        media = await A17.downloadAndSaveMediaMessage(quoted, "volume")
        if (isQuotedAudio) {
          rname = getRandom('.mp3')
          exec(`ffmpeg -i ${media} -filter:a volume=${args[0]} ${rname}`, (err, stderr, stdout) => {
            fs.unlinkSync(media)
            if (err) return reply('Error!')
            jadie = fs.readFileSync(rname)
            A17.sendMessage(from, { audio: jadie, mimetype: 'audio/mp4', ptt: true }, { quoted: m })
            fs.unlinkSync(rname)
          })
        } else if (isQuotedVideo) {
          rname = getRandom('.mp4')
          exec(`ffmpeg -i ${media} -filter:a volume=${args[0]} ${rname}`, (err, stderr, stdout) => {
            fs.unlinkSync(media)
            if (err) return reply('Error!')
            jadie = fs.readFileSync(rname)
            A17.sendMessage(from, { video: jadie, mimetype: 'video/mp4' }, { quoted: m })
            fs.unlinkSync(rname)
          })
        } else {
          reply("Please send video/audio file only!")
        }
      }
        break;


      case 'tempo': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!args.join(" ")) return reply(`Example: ${prefix + command} 10`)
        var req = args.join(' ')
        media = await A17.downloadAndSaveMediaMessage(quoted, "tempo")
        if (isQuotedAudio) {
          ran = getRandom('.mp3')
          exec(`ffmpeg -i ${media} -filter:a "atempo=1.0,asetrate=${req}" ${ran}`, (err, stderr, stdout) => {
            fs.unlinkSync(media)
            if (err) return reply('Error!')
            hah = fs.readFileSync(ran)
            A17.sendMessage(from, { audio: hah, mimetype: 'audio/mp4', ptt: true }, { quoted: m })
            fs.unlinkSync(ran)
          })
        } else if (isQuotedVideo) {
          ran = getRandom('.mp4')
          exec(`ffmpeg -i ${media} -filter:a "atempo=1.0,asetrate=${req}" ${ran}`, (err, stderr, stdout) => {
            fs.unlinkSync(media)
            if (err) return reply('Error!')
            hah = fs.readFileSync(ran)
            A17.sendMessage(from, { video: hah, mimetype: 'video/mp4' }, { quoted: m })
            fs.unlinkSync(ran)
          })
        } else {
          reply("Please send video/audio file only!")
        }
      }
        break;


      case 'bass': case 'blown': case 'deep': case 'earrape': case 'fast': case 'fat': case 'nightcore': case 'reverse': case 'robot': case 'slow': case 'smooth': case 'tupai':
        A17.sendMessage(from, { react: { text: "⌛", key: m.key } })

        try {
          let set
          if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20'
          if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log'
          if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'
          if (/earrape/.test(command)) set = '-af volume=12'
          if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
          if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
          if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
          if (/reverse/.test(command)) set = '-filter_complex "areverse"'
          if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
          if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
          if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
          if (/tupai/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'
          if (/audio/.test(mime)) {
            reply(mess.waiting)
            let media = await A17.downloadAndSaveMediaMessage(quoted)
            let ran = getRandom('.mp3')
            exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
              fs.unlinkSync(media)
              if (err) return reply(err)
              let buff = fs.readFileSync(ran)
              A17.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: m })
              fs.unlinkSync(ran)
            })
          } else reply(`Pls mention any audio you want to modify _${prefix + command}_`)
        } catch (e) {
          reply(e)
        }
        break;


      case 'calculator': case 'cal': case 'calculate': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (args.length < 1) return reply(`*Example :*\n${prefix}calculator 2*5\n\n`)
        let qsd = args.join(" ")
        if (typeof mathjs.evaluate(qsd) !== 'number') {
          reply('Error')
        } else {
          reply(`\`\`\`「 _Calculator Tool_ 」\`\`\`\n\n*Input :* ${qsd}\n*Calculation Result :* ${mathjs.evaluate(qsd.replace(/×/g, "*").replace(/x/g, "*").replace(/÷/g, "/"))}`)
        }
      }
        break;



      //////////////////////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



      //
      case 'toimage': case 'makeimg': case 'toimg': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🪄", key: m.key } })
        if (!m.quoted) return reply('reply Image')
        if (!/webp/.test(mime)) return reply(`reply sticker with caption *${prefix + command}*`)
        reply(mess.waiting)
        let media = await A17.downloadAndSaveMediaMessage(quoted)
        let ran = await getRandom('.png')
        exec(`ffmpeg -i ${media} ${ran}`, (err) => {
          fs.unlinkSync(media)
          if (err) throw err
          let buffer = fs.readFileSync(ran)
          A17.sendMessage(m.chat, { image: buffer }, { quoted: m })
          fs.unlinkSync(ran)
        })
      }
        break;


   /*   case 'tomp4': case 'makemp4': case 'makevideo': case 'tovideo': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🪄", key: m.key } })
        if (!m.quoted) return reply('reply Image')
        if (!/webp/.test(mime)) return reply(`reply sticker with caption *${prefix + command}*`)
        reply(mess.waiting)
        let { webp2mp4File } = require('./lib/uploader')
        let media = await A17.downloadAndSaveMediaMessage(quoted)
        let webpToMp4 = await webp2mp4File(media)
        await A17.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Here it is...' } }, { quoted: m })
        await fs.unlinkSync(media)
      }
        break; */


      case 'toaud': case 'makeaudio': case 'toaudio': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "⌛", key: m.key } })

        if (!/video/.test(mime) && !/audio/.test(mime)) return reply(`Send/reply Video/Audio You Want To Use As Audio With Caption ${prefix + command}`)
        if (!m.quoted) return reply(`Send/reply Video/Audio You Want To Use As Audio With Caption ${prefix + command}`)
        reply(mess.waiting)
        let media = await quoted.download()
        let { toAudio } = require('./lib/converter')
        let audio = await toAudio(media, 'mp4')
        A17.sendMessage(m.chat, { audio: audio, mimetype: 'audio/mpeg' }, { quoted: m })
      }
        break;


      case 'tomp3': case 'makemp3': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (/document/.test(mime)) return reply(`Send/reply Video/Audio You Want To Convert Into MP3 With Caption ${prefix + command}`)
        if (!/video/.test(mime) && !/audio/.test(mime)) return reply(`Send/reply Video/Audio You Want To Convert Into MP3 With Caption ${prefix + command}`)
        if (!m.quoted) return reply(`Send/reply Video/Audio You Want To Convert Into MP3 With Caption ${prefix + command}`)
        reply(mess.waiting)
        let media = await quoted.download()
        let { toAudio } = require('./lib/converter')
        let audio = await toAudio(media, 'mp4')
        A17.sendMessage(m.chat, { document: audio, mimetype: 'audio/mpeg', fileName: `Converted By ${global.BotName} (${m.id}).mp3` }, { quoted: m })
      }
        break;


      case 'togif': case 'makegif': case 'getgif': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })
        if (!m.quoted) return reply('reply Image')
        if (!/webp/.test(mime)) return reply(`reply sticker with caption *${prefix + command}*`)
        reply(mess.wait)
        let { webp2mp4File } = require('./lib/uploader')
        let media = await A17.downloadAndSaveMediaMessage(quoted)
        let webpToMp4 = await webp2mp4File(media)
        await A17.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Converted From Webp To Gif' }, gifPlayback: true }, { quoted: m })
        await fs.unlinkSync(media)
      }
        break;


      // case 'tourl': case 'makeurl':{
      // if (isBan) return reply(mess.banned);	 			
      // if (isBanChat) return reply(mess.bangc);
      // A17.sendMessage(from, { react: { text: "🪄" , key: m.key }})

      // // let { UploadFileUgu, webp2mp4File, TelegraPh } = require('./lib/uploader');
      // let media = await A17.downloadAndSaveMediaMessage(quoted)
      // if (/image/.test(mime)) {
      // let anu = await TelegraPh(media)
      // reply(util.format(anu))
      // } else if (!/image/.test(mime)) {
      // let anu = await UploadFileUgu(media)
      // reply(util.format(anu))
      // }
      // await fs.unlinkSync(media)
      // }
      // break;


        case "yg":{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
       let { GraphOrg } = require("./lib/uploader");      
        if (m.quoted.isAnimated === true) {
          let media =  await A17.downloadAndSaveMediaMessage(quoted);
          let anu = await GraphOrg(media);
          m.reply(`${anu}`);
       } }
          break; 


      case "tourl": case 'tolink':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        let { GraphOrg } = require("./lib/uploader");
        if (!m.quoted) {
          //
          A17.sendMessage(from, { react: { text: "❔", key: m.key } })
          return m.reply(
            `With caption not working, first send an *Image* / *Video* to generate a link! then tag with *${prefix}tourl*`
          );
        }
        let media5 = await A17.downloadAndSaveMediaMessage(quoted);
        if (/image/.test(mime)) {
          //
          let anu = await GraphOrg(media5);
          m.reply(`*Generated Image URL:* \n\n${util.format(anu)}\n`);
        } else if (/sticker/.test(mime)) {
          //
          try {
            let anu = await GraphOrg(media5);
            m.reply(`*Generated Video URL:* \n\n${util.format(anu)}\n`);
          } catch (e) {
            //
            await fs.unlinkSync(media5);
            return A17.sendMessage(
              m.from,
              {
                text: `*Your video size is too big!*\n\n*Max video size:* 5MB`,
              },
              { quoted: m }
            );
          }
        } else {
          //
          return m.reply(
            `Plese provide an *Image* / *Video* to generate a link!`
          );
        }
        await fs.unlinkSync(media5);
        break;


     /*   case "enhance": case 'upscale':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        let { GraphOrg } = require("./lib/uploader");
        if (!m.quoted) {
          //
          A17.sendMessage(from, { react: { text: "❔", key: m.key } })
          return m.reply(
            `With caption not working, first send an *Image* / *Video* to generate a link! then tag with *${prefix}tourl*`
          );
        }
        let media6 = await A17.downloadAndSaveMediaMessage(quoted);
        if (/image/.test(mime)) {
          //
          let anu = await GraphOrg(media5);
          serika = await getBuffer(`https://api.lolhuman.xyz/api/upscale?apikey=GataDios&img=${util.format(anu)}`)
          A17.sendMessage(from, { image: serika }, { quoted: m })
        } else if (/video/.test(mime)) {
          //
          try {
            let anu = await GraphOrg(media5);
          } catch (e) {
            //
            await fs.unlinkSync(media5);
            return A17.sendMessage(
              m.from,
              {
                text: `*Your video size is too big!*\n\n*Max video size:* 5MB`,
              },
              { quoted: m }
            );
          }
        } else {
          //
          return m.reply(
            `Plese provide an *Image* / *Video* to generate a link!`
          );
        }
        await fs.unlinkSync(media5);
        break; */
        

      //--------------------------------------------------------------------------------------------------------------------//

      case 'translate': case 'ts': case 'trans': {
        if (isBan) return reply(mess.banned);
        A17.sendMessage(from, { react: { text: "⌛", key: m.key } })

        if (!args.join(" ")) return reply("Pls enter any text to translate")
        tes = await fetchJson(`https://megayaa.herokuapp.com/api/translate?to=en&kata=${args.join(" ")}`)
        Infoo = tes.info
        Detek = tes.translate
        reply(`Input : ${Detek}\nTranslation Results : ${Infoo}`)
      }
        break;


      // case 'gimage': case 'gig': case 'googleimage':{
      // if (isBan) return reply(mess.banned);	 			
      // if (isBanChat) return reply(mess.bangc);
      // A17.sendMessage(from, { react: { text: "⌛" , key: m.key }})

      // if (!args[0]) return reply("Enter a search term to get Google Image!")
      // let gis = require('g-i-s')
      // gis(args.join(" "), async (error, result) => {
      // n = result
      // images = n[Math.floor(Math.random() * n.length)].url
      // let buttons = [
      // {buttonId: `${prefix}gimage ${args.join(" ")}`, buttonText: {displayText: '>>'}, type: 1}
      // ]
      // let buttonMessage = {
      // image: { url: images },
      // caption: `「 _Google Image Search_ 」

      // _Search Term_ : ${text}
      // _Media Url_ : ${images}`,
      // footer: `${global.BotName}`,
      // buttons: buttons,
      // headerType: 4,

      // }
      // A17.sendMessage(m.chat, buttonMessage, { quoted: m })
      // })
      // }
      // break;



      // case 'gimage':
      // case 'gig':
      // case 'googleimage': {
      //   if (isBan) return reply(mess.banned);
      //   if (isBanChat) return reply(mess.bangc);
      //   A17.sendMessage(from, { react: { text: "⌛", key: m.key } });

      //   if (!args[0]) return reply("Enter a search term to get Google Image!");
      //   let gis = require('g-i-s');
      //   gis(args.join(" "), async (error, result) => {
      //     n = result;
      //     images = n[Math.floor(Math.random() * n.length)].url;
      //     let buttonMessage = {
      //       image: { url: images },
      //       caption: `「 _Google Image Search_ 」\n\n_Search Term_ : ${text}\n_Media Url_ : ${images}`,
      //       footer: `${global.BotName}`,
      //       headerType: 4,
      //     };
      //     A17.sendMessage(m.chat, buttonMessage, { quoted: m });
      //   });
      // }
      // break;
      case 'gimage':
      case 'gig':
      case 'googleimage': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "⌛", key: m.key } });

        if (!args[0]) return reply("Enter a search term to get Google Image!");
        let gis = require('g-i-s');
        gis(args.join(" "), async (error, result) => {
          if (error) {
            console.error(error);
            return reply("Error occurred while searching for images.");
          }

          if (!result || result.length === 0) {
            return reply("No images found for the given search term.");
          }

          n = result;
          images = n[Math.floor(Math.random() * n.length)].url;
          let buttonMessage = {
            image: { url: images },
            caption: `「 _Google Image Search_ 」\n\n_Search Term_ : ${text}\n_Media Url_ : ${images}`,
            footer: `${global.BotName}`,
            headerType: 4,
          };
          A17.sendMessage(m.chat, buttonMessage, { quoted: m });
        });
      }
        break;







      // case "gig":
      //   case "gimage":
      //   case "googleimage":
      //   case "image":
      //     if (!text) {
      //       A17.sendMessage(from, { react: { text: "⌛", key: m.key } });
      //       return m.reply(`Please provide an image Search Term !\n\nExample: *${prefix}image cheems*`);
      //     }

      //     gis(text, async (error, result) => {
      //       n = result;
      //       let images = n[Math.floor(Math.random() * n.length)].url;
      //       let resText = `\n_🎀 Image Search Term:_ *${text}*\n\n_🧩 Powered by_ *${botName}*\n`;
      //       /*
      //       let buttons = [
      //         {
      //             buttonId: `${prefix}gimage ${text}`,
      //             buttonText: { displayText: ">>" },
      //             type: 1,
      //         },
      //       ];
      //       */
      //       await A17.sendMessage(
      //         m.from,
      //         {
      //           image: { url: images },
      //           caption: resText,
      //           //footer: `*${botName}*`,
      //           //buttons: buttons,
      //           //headerType: 4,
      //         },
      //         { quoted: m }
      //       );
      //     });
      //     break;



      //---------------------------------------- NASA  -----------------------------------------//

      case 'apod': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        //A17.sendMessage(from, { react: { text: "🌌", key: m.key }});
        const randomEmoji = spaceemojis[Math.floor(Math.random() * spaceemojis.length)]; // Select a random emoji
        A17.sendMessage(from, { react: { text: randomEmoji, key: m.key } });

        const apiKey = 'ugce43VIO63s8gQhcQ7Ts2DHQo1Srcchdh9mgI2S'; // Replace with your actual NASA API key // You can use it.
        const moment = require('moment'); // Import moment library here
        const timeZone = 'Asia/Kolkata'; // Set desired timezone.

        const currentDate = moment().tz(timeZone).format('YYYY-MM-DD'); // Initialize currentDate here

        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`;

        try {
          const response = await fetch(apiUrl);
          const data = await response.json();

          if (data.url) {
            A17.sendMessage(from, {
              image: { url: data.url },
              caption: `*Astronomy Picture of the Day:*\n\n${data.title}\n${data.explanation}`,
            });
          } else {
            console.log("No APOD image data available.");

            return reply('No APOD image data available.');
          }
        } catch (error) {
          console.error('Error fetching APOD data:', error);

          return reply('An error occurred while fetching APOD data.');
        }
      }
        break;


      case 'google': case 'search': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "✨", key: m.key } })

        if (!args[0]) return reply(`Example: ${prefix + command} <query>\nUses : ${prefix + command} anything...`)
        let google = require('google-it')
        google({ 'query': args.join(" ") }).then(res => {
          let teks = `「 *Google Search Engine* 」\n\n*Search term:* ${text}\n\n\n`
          for (let g of res) {
            teks += `*Title* : ${g.title}\n\n`
            teks += `*Description* : ${g.snippet}\n\n`
            teks += `*Link* : ${g.link}\n\n\n        -----------------------------------------------------------------------------\n\n`
          }
          reply(teks)
        })
      }
        break;


      case "tts": case "texttospeech": case "say": case "speak": {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "⌛", key: m.key } })

        if (!args[0]) return reply("Please give me a text so that i can speak it!")

        let texttosay = text
          ? text
          : m.quoted && m.quoted.text
            ? m.quoted.text
            : m.text;
        const SpeakEngine = require("google-tts-api");
        const texttospeechurl = SpeakEngine.getAudioUrl(texttosay, { lang: "en", slow: false, host: "https://translate.google.com", });
        A17.sendMessage(m.chat, { audio: { url: texttospeechurl, }, mimetype: "audio/mpeg", fileName: `A17SpeechEngine.mp3`, }, { quoted: m, });
      }
        break;


      case 'wiki':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "⌛", key: m.key } })

        if (args.length < 1) return reply('What Are You Looking For?? ')
        const res2 = await wikiSearch(q).catch(e => {
          return reply('Error Result Not Found!')
        })
        const result2 = `*Title :* ${res2[0].judul}\n*Wiki :* ${res2[0].wiki}`
        A17.sendMessage(from, { image: { url: res2[0].thumb }, caption: result2 })
        break;


     case 'urban': {
        A17.sendMessage(from, { react: { text: "📖", key: m.key } })
        // Extract the word from the message
        const word = text.trim();

        if (!word) {
          reply(`Please provide a word to look up on Urban Dictionary. Example: ${prefix}urban hello`);
          return;
        }

        // Make a request to the Urban Dictionary API
        const apiUrl = `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(word)}`;

        try {
          const response = await axios.get(apiUrl);

          // Extract the first definition from the API response
          const definition = response.data.list[0]?.definition;

          if (definition) {
            const urbanMessage = `📖 *Urban Dictionary Definition for "${word}":*\n\n${definition}`;
            reply(urbanMessage);
          } else {
            reply(`No Urban Dictionary definition found for "${word}".`);
          }
        } catch (error) {
          console.error('Error fetching Urban Dictionary definition:', error.message);
          reply('An error occurred while fetching the Urban Dictionary definition. Please try again later.');
        }
      }
        break;


        case 'aju': case 'campus': case 'imgaju':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "✨", key: m.key } })

        const aju = {
          image: { url: 'https://campus-pictures.onrender.com/' },
          caption: `${pushname} here you go...`,

        }

        await A17.sendMessage(m.chat, aju, { quoted: m }).catch(err => {
          return ('Error!')
        })

        break;
  

      case 'earthquake':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "⌛", key: m.key } })

        const tres = await Gempa()
        var { Waktu, Lintang, Bujur, Magnitude, Kedalaman, Wilayah, Map } = tres.result
        console.log(Map)
        const captt = `Time : ${Waktu}\nLatitude : ${Lintang}\nLongitude : ${Bujur}\nRegion : ${Wilayah}`
        A17.sendMessage(from, { image: { url: Map }, caption: captt })
        break;


      case 'covidinfo':
      case 'covid':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "⌛", key: m.key } })

        const c = await covid()
        var { cases, death, healed } = c[0]
        A17.sendMessage(from, { text: `\nCovid India \n\nCase : ${cases}\n\nDead : ${death}\n\nHealed : ${healed}\n` }, m)
        break;


      // const { getBuffer } = require("./lib/myfunc");

      // case 'ss':
      //   async (A17, m, { pushName, prefix, args, text }) => {
      //     if (!args[0]) return m.reply(`Please provide me a link to lookup!`);

      //     let lookupURL;
      //     if (!args[0].includes("http")) {
      //       lookupURL = `https://${args[0]}`;
      //     } else {
      //       lookupURL = args[0];
      //     }

      //     try {
      //       const resImage = await getBuffer(`https://api.popcat.xyz/screenshot?url=${lookupURL}`);
      //       await A17.sendMessage(m.from, { image: resImage, caption: `_Here's how this URL looks like:_\n${args[0]}\n` }, { quoted: m });
      //     } catch (error) {
      //       m.reply(`An error occurred while processing your request!\n\nPlease recheck your link and try again!`);
      //     }
      //   };
      //   break;



      ///////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


      //

      // ///
      // case 'igdl': case 'instagramreels': case 'igreels': {
      // if (isBan) return reply(mess.banned);	 			
      // if (isBanChat) return reply(mess.bangc);
      // A17.sendMessage(from, { react: { text: "🪄" , key: m.key }})
      // if (!args[0]) return reply(`Example :\n${prefix + command} https://www.instagram.com/p/CcvJGuxh9VI/?igshid=YmMyMTA2M2Y=`)
      // try {
      // hx.igdl(args[0]).then(async(resed) => {
      // ini_anu = []
      // anu_list = []
      // textbv = `「 _Instagram Downloader_ 」\n\nUsername : ${resed.user.username ? resed.user.name : "undefined"}\nFollowers : ${resed.user.followers}`
      // urut = 1
      // for (let i = 0; i < resed.medias.length; i++) {
      // ini_anu.push({
      // "type": resed.medias[i].fileType,
      // "url": resed.medias[i].url
      // })
      // }
      // ilod = 1
      // for (let i of ini_anu) {
      // anu_list.push({buttonId: `${prefix}ig ${i.type} ${i.url}`, buttonText: {displayText: `Media ${ilod++}`}, type: 1})
      // }
      // textbv += `\n\n_Select the media below to download_`
      // let buttons = anu_list
      // let buttonMessage = {
      // image:BotLogo,
      // jpegThumbnail:Thumb,
      // caption: textbv,
      // footer: `${global.BotName}`,
      // buttons: buttons,
      // headerType: 4
      // }
      // A17.sendMessage(from, buttonMessage, {quoted:m})
      // })
      // } catch (err) {
      // reply("An Error Occured!")
      // }
      // }
      // break;


      case 'mp4': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!args[0]) return reply(`Pls provide link!`)
        try {
          A17.sendMessage(from, {
            video: { url: args[0] }, caption: "Succes!", contextInfo: {
              externalAdreply: {
                title: `${global.BotName}`,
                body: `${global.OwnerName}`,
                thumbnail: BotLogo,
                mediaType: 2,
                mediaUrl: `${global.websitex}`,
                sourceUrl: `${global.websitex}`
              }
            }
          }, { quoted: m })
        } catch {
          reply("Link error!")
        }
      }
        break;


      case 'jpeg': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!args[0]) return reply(`Please provide link!`)
        try {
          A17.sendMessage(from, { image: { url: args[0] }, caption: "Success!" }, { quoted: m })
        } catch {
          reply("Link error")
        }
      }
        break; 
        

      ///
      case 'fbdl': case 'fb': case 'facebook': case 'fbmp4': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please provide the link!\n\nExample: ${prefix}facebook https://www.facebook.com/groups/599913174599515/permalink/705467384044093/`)
        if (!isUrl(args[0]) && !args[0].includes('facebook.com')) return reply(`Invalid link!`)
        let bocil = require('@bochilteam/scraper')
        bocil.facebookdlv2(`${text}`).then(async (data) => {
          let txt = `「 _Facebook Downloader_ 」\n\n`
          txt += `*Title :* ${data.title}\n`
          txt += `*Quality :* ${data.result[0].quality}\n`
          txt += `*Description:* ${data.description}\n`
          txt += `*URL :* ${text}\n\n`
          buf = await getBuffer(data.thumbnail)
          A17.sendMessage(m.chat, { image: { url: data.thumbnail }, jpegThumbnail: buf, caption: `${txt}` }, { quoted: m })
          for (let i of data.result) {
            A17.sendMessage(m.chat, { video: { url: i.url }, jpegThumbnail: buf, caption: `*Quality :* ${i.quality}` }, { quoted: m })
          }
        }).catch((err) => {
          reply(mess.error)
        })
      }
        break;


      case 'fbmp3': case 'facebookmp3': case 'facebookaudio': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please provide the link!\n\nExample: ${prefix + command} https://www.facebook.com/groups/599913174599515/permalink/705467384044093/`)
        if (!isUrl(args[0]) && !args[0].includes('facebook.com')) return reply(`Invalid link!`)
        let noh = require('@bochilteam/scraper')
        noh.savefrom(`${text}`).then(async (anu) => {
          A17.sendMessage(m.chat, { audio: { url: anu.url[0].url }, mimetype: 'audio/mp4' }, { quoted: m })
        }).catch((err) => {
          reply(mess.error)
        })
      }
        break;


      case 'facebookxx': case 'fbdlxxx': case 'fbmp4xxx': case 'fbxxx': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!args[0]) return reply(`Example :\n${prefix + command} https://fb.watch/cAX2dep-BZ/`)
        try {
          let resd = await aiovideodl(args[0])
          teks = `「 _Facebook Downloader_ 」
Type : video/${resd.medias[0].extension}
Quality : ${resd.medias[0].quality}
Size : ${resd.medias[0].formattedSize}
_Click the button below to download_`
          let buttons = [
            { buttonId: `${prefix}fbdl ${resd.medias[1].url}`, buttonText: { displayText: 'QualityHD' }, type: 1 }
          ]
          let buttonMessage = {
            video: { url: resd.medias[0].url },
            caption: teks,
            footer: `${pushname}`,
            buttons: buttons,
            headerType: 4,

          }
          A17.sendMessage(from, buttonMessage, { quoted: m })
        } catch {
          reply("Link invalid!")
        }
      }
        break;


      case 'fbddlxx': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let buttons = [
          { buttonId: `${prefix}menu`, buttonText: { displayText: '✨Menu✨' }, type: 1 }
        ]
        let buttonMessage = {
          video: { url: args[0] },
          caption: "Done!",
          footer: `${pushname}`,
          buttons: buttons,
          headerType: 4,

        }
        A17.sendMessage(from, buttonMessage, { quoted: m })
      }
        break;


      ///
      case 'yts': case 'ytsearch': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "📍", key: m.key } })

        if (!args.join(" ")) return reply(`Example : -yts Heat waves`)
        let yts = require("youtube-yts")
        let search = await yts(args.join(" "))
        let teks = '```「 YouTube search Engine 」```\n\n Search Term: ' + text + '\n\n'
        let no = 1
        for (let i of search.all) {
          teks += `Result No : ${no++}\n\nTitle : ${i.title}\n\nViews : ${i.views}\n\nDuration : ${i.timestamp}\n\nUploaded : ${i.ago}\n\nAuthor : ${i.author.name}\n\nUrl : ${i.url}\n\n\n-----------------------------------------------------------------------------\n\n\n`
        }
        A17.sendMessage(m.chat, { image: { url: search.all[0].thumbnail }, caption: teks }, { quoted: m })
      }
        break;


      /*
        	
      case 'music': case 'p': case 'play': case 'song': case 'ytplay': {
          if (isBan) return reply(mess.banned);	 			
       if (isBanChat) return reply(mess.bangc);
       A17.sendMessage(from, { react: { text: "🍁" , key: m.key }}) 
       const YT=require('./lib/ytdlcore')
       const { isUrl, fetchBuffer } = require('./lib/Function')
      
       if(!text) return A17.sendMessage(from,{text:"Pls enter song name to play!"},{quoted:m})
       let yts = require("@adiwajshing/keyed-db2")
       let search = await yts(text)
       let anu = search.videos[0]
       let buttons = [
       {buttonId: `${prefix}ytad ${text}`, buttonText: {displayText: '♫ Audio'}, type: 1},
       {buttonId: `${prefix}ytvd ${text}`, buttonText: {displayText: '► Video'}, type: 1}
      
       ]
       let buttonMessage = {
       image: { url: anu.thumbnail },
       caption: `「  A17 Youtube Player 2.0  」
      
      ✨ *Title :* ${anu.title}
      
      ⏳ *Duration :* ${anu.timestamp}
      
      📈 *Viewers :* ${anu.views}
      
      📍 *Uploaded :* ${anu.ago}
      
      🎐 *Channel :* ${anu.author.name}
      
      🔗 *Url :* ${anu.url}`,
         
       footer: `${global.BotName}`,
       buttons: buttons,
       headerType: 4,
      
       }
       A17.sendMessage(m.chat, buttonMessage, { quoted: m })
       }
       break;
      
      */


      /// Normal
      // case 'play': case 'song': case 'music': {
      //   if (isBan) return reply(mess.banned);	 			
      //   if (isBanChat) return reply(mess.bangc);
      //   A17.sendMessage(from, { react: { text: "🍁" , key: m.key }}) 
      //   const YT=require('./lib/ytdl-core')
      //   let yts = require("youtube-yts")
      //   let search = await yts(text)
      //   let anu = search.videos[0]
      //   const ytmp3play = await YT.mp3(anu.url)

      // await A17.sendMessage(from, {audio: fs.readFileSync(ytmp3play.path),fileName: anu.title + '.mp3',mimetype: 'audio/mpeg',}, {quoted:m})
      // }
      // break;


      case 'play':
      case 'song':
      case 'music': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator && !isAdam && !isTawfik) return reply(`this command is unavailable for you`)
        A17.sendMessage(from, { react: { text: "🍁", key: m.key } });

        const YT = require('./lib/ytdl-core');
        const yts = require('youtube-yts');
        const ffmpeg = require('fluent-ffmpeg');

        let search = await yts(text);
        let anu = search.videos[0];
        const ytmp3play = await YT.mp3(anu.url);

        // Fetch the thumbnail URL from the 'anu' object
        let thumbnailUrl = anu.thumbnail;

        await A17.sendMessage(
          from,
          {
            image: { url: thumbnailUrl }, // Include the thumbnail image in the response
            caption: `\n*Downloading:* *${anu.title}*
            
  ⏳ *Duration :* ${anu.timestamp}

  📈 *Viewers :* ${anu.views}

  🎐 *Channel :* ${anu.author.name}

  🏮 *Video Uploaded:* ${anu.ago}

  🔗 *Url :* ${anu.url}\n`,

          },
          { quoted: m }
        );

        // Send the audio file with the proper 'type' property set to 'audio'
        await A17.sendMessage(from, {
          audio: fs.readFileSync(ytmp3play.path),
          filename: anu.title + '.mp3',
          mimetype: 'audio/mpeg',
          quoted: m,
        });

        // Rest of the code remains unchanged.
        // ...
      }
        break; 
        

      case 'spotify': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍁", key: m.key } });

        if (!q) return reply(`Please provide a query. Example: ${prefix + command} 295`);

        let bbuffer = await axios.get(`https://api.lolhuman.xyz/api/spotifysearch?apikey=GataDios&query=${encodeURIComponent(q)}`)
 
        let bname = bbuffer.data.result[0].title
        let burl = bbuffer.data.result[0].external_urls.spotify;

       let abuffer = await axios.get(`https://api.caliph.biz.id/api/download/spotify?apikey=caliphkey&url=${burl}`) 

        let bimg = abuffer.data.result.thumbnail; 
        
        await A17.sendMessage(from, {
          audio: { url: abuffer.data.result.mp3},
          ptt: true,
          filename: 'error.mp3',
          mimetype: 'audio/mpeg',
          contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
              title: "↺ |◁   II   ▷|   ♡",
              body: `Now playing: ${bname}`,
              thumbnailUrl: bimg,
              sourceUrl: burl,
              mediaType: 1,
              renderLargerThumbnail: true
            }
          }
        }, { quoted: m }
        );
      }
        break;


     case 'soundcloud': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍁", key: m.key } });

        if (!q) return reply(`Please provide a query. Example: ${prefix + command} eternal Shrine maiden`);

        let bbuffer = await axios.get(`https://api.neoxr.eu/api/soundcloud-search?apikey=gateapix&q=${encodeURIComponent(q)}`)

        let bname = bbuffer.data.data[0].title
        let burl = bbuffer.data.data[0].url;

       let abuffer = await axios.get(`https://api.neoxr.eu/api/soundcloud?apikey=gateapix&url=${burl}`) 

       let bimg = abuffer.data.data.imageURL;

        await A17.sendMessage(from, {
          audio: { url: abuffer.data.data.url},
          ptt: true,
          filename: 'error.mp3',
          mimetype: 'audio/mpeg',
          contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
              title: "↺ |◁   II   ▷|   ♡",
              body: `Now playing: ${bname}`,
              thumbnailUrl: bimg,
              sourceUrl: burl,
              mediaType: 1,
              renderLargerThumbnail: true
            }
          }
        }, { quoted: m }
        );
      }
        break;


      case 'ytvd': case 'video': case 'ytvideo': case 'ytmp4': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍃", key: m.key } })
        const YT = require('./lib/ytdl-core')
        let yts = require("youtube-yts")
        let search = await yts(text)
        let anu = search.videos[0]
        const ytmp4play = await YT.mp4(anu.url)
        A17.sendMessage(from, { video: { url: ytmp4play.videoUrl }, mimetype: "video/mp4", caption: anu.title }, { quoted: m })
      }

        break; 


      /*
      case 'ytmp3': case 'ytmusic':  case 'ytmp4': case 'ytvideo': case 'ytdl':{
        if (isBan) return reply(mess.banned);	 			
      if (isBanChat) return reply(mess.bangc);
      if (!args[0]) return reply(mess.nolink)
      
      const YT=require('./lib/ytdlcore')
      if(!text) return A17.sendMessage(from,{text:"Please provide a valid youtube link!"},{quoted:m})
      let yts = require("@adiwajshing/keyed-db2")
      let search = await yts(text)
      let anu = search.videos[0]
      let buttons = [
      {buttonId: `${prefix}ytad2 ${text}`, buttonText: {displayText: '♫ Audio'}, type: 1},
      {buttonId: `${prefix}ytvd2 ${text}`, buttonText: {displayText: '► Video'}, type: 1}
      
      ]
      let buttonMessage = {
      image: { url: anu.thumbnail },
      caption: `「  A17 Youtube Downloader 2.0  」
      
      ✨ *Title :* ${anu.title}
      
      ⏳ *Duration :* ${anu.timestamp}
      👀 *Viewers :* ${anu.views}
      📍 *Uploaded :* ${anu.ago}
      🎐 *Channel :* ${anu.author.name}
      🔗 *Url :* ${anu.url}`,
      footer: `${global.BotName}`,
      buttons: buttons,
      headerType: 4,
      
      }
      A17.sendMessage(m.chat, buttonMessage, { quoted: m })
      }
      break; 
      */


      case 'ytmp3': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "⌛", key: m.key } })

        const YT = require('./lib/ytdl-core')
        const ytmp3play2 = await YT.mp3(text)

        await A17.sendMessage(from, { document: fs.readFileSync(ytmp3play2.path), fileName: 'A17_YTmp3_Downloader.mp3', mimetype: 'audio/mpeg', }, { quoted: m })
      }
        break;


      case 'ytvd2': case 'ytmp4': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍁", key: m.key } })
        const YT = require('./lib/ytdl-core')
        const ytmp4play2 = await YT.mp4(text)
        A17.sendMessage(from, { video: { url: ytmp4play2.videoUrl }, mimetype: "video/mp4", caption: 'Downloaded by *A17 MD*', }, { quoted: m })
      }
        break;


      case 'lyrics': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "🍁", key: m.key } })
        if (!text) return reply(`Comand usage: ${prefix}lyrics Thunder`)
        reply(mess.waiting)
        const { lyrics, lyricsv2 } = require('@bochilteam/scraper')
        const result = await lyricsv2(text).catch(async _ => await lyrics(text))
        reply(`
*Title :* ${result.title}
*Author :* ${result.author}
*Url :* ${result.link}

*Lyrics :* ${result.lyrics}

`.trim())
      }
        break;



      //////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



      ///
      // case 'couplepp': case 'cpp': case 'ppcouple': {
      // if (isBan) return reply(mess.banned);
      // if (isBanChat) return reply(mess.bangc);
      // A17.sendMessage(from, { react: { text: "🤓" , key: m.key }});

      //        reply(mess.waiting)
      //        let anu = await fetchJson('https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json')
      //        let random = anu[Math.floor(Math.random() * anu.length)]
      //        A17.sendMessage(m.chat, { image: { url: random.male }, caption: `For him...` }, { quoted: m })
      //        A17.sendMessage(m.chat, { image: { url: random.female }, caption: `not for her عشان انت سنقل عرص😂...` }, { quoted: m })
      //    }
      // break;


      case 'couplepp':
      case 'cpp':
      case 'ppcouple': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);

        A17.sendMessage(from, { react: { text: "🤓", key: m.key } });
        reply(mess.waiting);

        let anu = await fetchJson('https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json');

        for (let i = 0; i < 3; i++) {  // the set of picures.
          let random = anu[Math.floor(Math.random() * anu.length)];

          // Sending the male picture
          await A17.sendMessage(m.chat, { image: { url: random.male }, caption: `For him...` }, { quoted: m });

          // Sending the female picture
          await A17.sendMessage(m.chat, { image: { url: random.female }, caption: `not for her عشان انت سنقل عرص 🤣...` }, { quoted: m });
        }
      }
        break;


      //
      case 'coffee': case 'kopi': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        /*     let buttons = [
                     {buttonId: `${prefix}coffee`, buttonText: {displayText: '>>'}, type: 1}
                 ]  */
        let buttonMessage = {
          image: { url: 'https://coffee.alexflipnote.dev/random' },
          caption: `Here is your Coffee...`,
          /*   footer: `${BotName}`,
             buttons: buttons,
             headerType: 4  */
        }
        A17.sendMessage(m.chat, buttonMessage, { quoted: m })
      }
        break;


      //old code of A17 button 

      // case 'pinterest': case 'pin': {
      //   if (isBan) return reply(mess.banned);
      //   if (isBanChat) return reply(mess.bangc);
      // if (!args.join(" ")) return reply("Pls providea search term!")
      // try {
      // hx.pinterest(args.join(" ")).then(async(res) => {
      // imgnyee = res[Math.floor(Math.random() * res.length)]
      // /* let buttons = [
      // {buttonId: `${prefix}pinterest ${args.join(" ")}`, buttonText: {displayText: '>>'}, type: 1}
      // ] */
      // let buttonMessage = {
      // image: { url: imgnyee },
      // caption:  `Title : ` + args.join(" ") + `\nMedia Url : `+imgnyee,
      // /* footer: `${global.BotName}`,
      // buttons: buttons,
      // headerType: 4, */

      // }
      // A17.sendMessage(m.chat, buttonMessage, { quoted: m })
      // }).catch(_ => _)
      // } catch {
      // reply("Error")
      // }
      // }
      // break;



      ////// Hehe ////// 

      // case 'pinterest': case'pin' : {
      //   if (isBan) return reply(mess.banned);
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!args.join(" ")) return reply(`${pushname} Pls provide a search term!`)
      // let { pinterest } = require('./lib/scraper')
      // anutrest = await pinterest(text)
      // result = anutrest[Math.floor(Math.random() * anutrest.length)]
      // A17.sendMessage(m.chat, { image: { url: result }, caption: '⭔ Media Url : '+result }, { quoted: m })
      // }
      // break;


      //
      case 'pinterest': {
    if (isBan) return reply(mess.banned);
    if (isBanChat) return reply(mess.bangc);
    A17.sendMessage(from, { react: { text: "🍁", key: m.key } });
    if (!text) return reply("Please provide a search term!\n\n*Example:* ${prefix}pinterest phild corn");

    const pin = await axios.get(`https://api.lolhuman.xyz/api/pinterest2?apikey=Gata_Dios&query=${encodeURIComponent(q)}`);
    reply(mess.waiting);
    const images = pin.data.result;
    // قم بنسخ هذا الجزء واستبداله مع الجزء السابق في الكود
const imageCount = 5; // عدد الصور التي تريد إرسالها

for (let i = 0; i < imageCount; i++) {
    const randomImageUrl = images[i % images.length]; // يُحدد اختيار صورة عشوائية من القائمة
    let media = await getBuffer(randomImageUrl);
    await A17.sendMessage(m.chat, { image: media }, { quoted: m });
}
     } 
break; 


        case 'stickers': {
    if (isBan) return reply(mess.banned);
    if (isBanChat) return reply(mess.bangc);
    if (m.isGroup) return reply('تعال خاص يا عسل');
    A17.sendMessage(from, { react: { text: "🍁", key: m.key } });
    if (!text) return reply("Please provide a search term!\n\n*Example:* ${prefix}stickers frieren");

    const tawfik = await axios.get(`https://api.lolhuman.xyz/api/stickerwa?apikey=Gata_Dios&query=${encodeURIComponent(q)}`);
    reply(mess.waiting);
    const results = tawfik.data.result;

    for (let i = 0; i < 7 && i < tawfik.data.result.length; i++) {
        const essam = tawfik.data.result[i].stickers;

        const imageCount = 5;

        for (let j = 0; j < imageCount && j < essam.length; j++) {
            const randomImageUrl = essam[j];
            let media = await getBuffer(randomImageUrl);

            if (randomImageUrl.endsWith('.png')) {
          const webpBuffer = await sharp(media)
         .webp() 
         .toBuffer();
       // Send sticker using A17 library (replace with your actual function)
       A17.sendMessage(from, { sticker: webpBuffer }, { quoted: m });   
            } else {
               A17.sendMessage(from, { sticker: media }, { quoted: m });
            }
        }
    }
}
break;


        case 'stickers2': {
    if (isBan) return reply(mess.banned);
    if (isBanChat) return reply(mess.bangc);
    A17.sendMessage(from, { react: { text: "🍁", key: m.key } });
    if (!text) return reply("Please provide a search term!\n\n*Example:* ${prefix}stickers frieren");

    const tawfik = await axios.get(`https://api.lolhuman.xyz/api/stickerwa?apikey=GataDios&query=${encodeURIComponent(q)}`);
    reply(mess.waiting);
    const results = tawfik.data.result;
// يمكنك استخدام حلقة for للوصول إلى جميع القيم داخل مصفوفة النتائج
for (let i = 0; i < 7 && i < tawfik.data.result.length; i++) {
    const essam = tawfik.data.result[i].stickers;
    // هنا يمكنك استخدام مصفوفة stickers كما تحتاج
    // قم بنسخ هذا الجزء واستبداله مع الجزء السابق في الكود
const imageCount = 5; // عدد الصور التي تريد إرسالها
for (let i = 0; i < imageCount && i < essam.length; i++) {
    const imageUrl = essam[i];

    // التحقق من صيغة الصورة
    if (imageUrl.endsWith('.webp')) {
        // تخطي الصورة إذا كانت بصيغة WebP
        continue;
    // إرسال الصورة كملصق بعد التحقق من صيغتها ومعالجتها
    let media = await getBuffer(imageUrl);
    let encmedia = await A17.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author });
    await fs.unlinkSync(encmedia);
}
    }
         } 
           } 
break;



      // case 'pinterest':
      // case 'pin': {
      //   if (isBan) return reply(mess.banned);
      //   if (isBanChat) return reply(mess.bangc);
      //   A17.sendMessage(from, { react: { text: "🐦", key: m.key } });

      //   if (!args.join(" ")) return reply(`${pushname} Please provide a search term!`);
      //   reply(mess.waiting);
      //   let { pinterest } = require('./lib/scraper');
      //   let anutrest = await pinterest(text);
      //   let results = [];

      //   // Get multiple random images (let's say 5 images)
      //   const numImages = 5;
      //   for (let i = 0; i < numImages && i < anutrest.length; i++) {
      //     results.push(anutrest[Math.floor(Math.random() * anutrest.length)]);
      //   }

      //   // Send each image with a common caption
      //   const commonCaption = 'Check out this image from Pinterest By A17';
      //   for (let i = 0; i < results.length; i++) {
      //     A17.sendMessage(m.chat, { image: { url: results[i] }, caption: commonCaption }, { quoted: m });
      //   }
      // }
      // break;



      /////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



      //
      case 'swm': case 'take': case 'stickerwm': case 'steal': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🫡", key: m.key } })

        if (!args.join(" ")) return reply(`Like use -take plana|By: حسن زلقو`)
        const swn = args.join(" ")
        const pcknm = swn.split("|")[0];
        const atnm = swn.split("|")[1];
         if (m.quoted.isAnimated === true) {
          let media = await quoted.download()
          let enc = await A17.sendMessage(from, { sticker: media, packname: pcknm }, { quoted: m })
          await fs.unlinkSync(enc)
        } else if (/image/.test(mime)) {
          let media = await quoted.download()
          let encmedia = await A17.sendImageAsSticker(m.chat, media, m, { packname: pcknm, author: atnm })
          await fs.unlinkSync(encmedia)
        } else if (/video/.test(mime)) {
          if ((quoted.msg || quoted).seconds > 11) return reply('Maximum 10 seconds!')
          let media = await quoted.download()
          let encmedia = await A17.sendVideoAsSticker(m.chat, media, m, { packname: pcknm, author: atnm })
          await fs.unlinkSync(encmedia)
        } else if (/sticker/.test(mime)) {
          let media = await quoted.download()
          A17.sendMessage(from, { sticker: media }, { packname: pcknm, author: atnm }, { quoted: m }); 
        }
      }
        break;


      case 'smeme': case 'stickermeme': case 'stickmeme': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "⌛", key: m.key } })

        let { TelegraPh } = require('./lib/uploader')
        if (!text) return reply(`Send/reply Photo With Caption ${prefix + command} *text*`)
        if (text.includes('|')) return reply(`Send/reply Photo With Caption ${prefix + command} *text*`)
        if (!/image/.test(mime)) return reply(`Send/reply Photo With Caption ${prefix + command} *text*`)
        reply(mess.wait)
        mee = await A17.downloadAndSaveMediaMessage(quoted)
        mem = await TelegraPh(mee)
        meme = `https://api.memegen.link/images/custom/-/${text}.png?background=${mem}`
        memek = await A17.sendImageAsSticker(m.chat, meme, m, { packname: global.packname, author: global.author })
        await fs.unlinkSync(memek)
      }
        break;


      case 'sgif': case 'sticker': case 's': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
	let { GraphOrg } = require("./lib/uploader");
        if (/image/.test(mime)) {
          let media = await quoted.download()
	  const webpBuffer = await sharp(media)
         .webp({ animated: true }) // Set animated to true for animated stickers
         .toBuffer();
       // Send sticker using A17 library (replace with your actual function)
       A17.sendMessage(from, { sticker: webpBuffer }, { quoted: m });  
   } else if (/video/.test(mime)) {
          if ((quoted.msg || quoted).seconds > 11) return reply('Maximum 10 seconds!')
          let media = await quoted.download()
          const webpBuffer = await sharp(media)
         .webp({ animated: true }) // Set animated to true for animated stickers
         .toBuffer();
       // Send sticker using A17 library (replace with your actual function)
       A17.sendMessage(from, { sticker: webpBuffer }, { quoted: m }); 
        } else {
          reply(`رسل الصورة العايز تحولها لستيكر يا غبي`)
        }
      }
        break;



      ///////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



       case 'couple': case 'ship': {
         if (isBan) return reply(mess.banned);
         if (isBanChat) return reply(mess.bangc);
         if (!m.isGroup) return reply(`${mess.grouponly}`)
       A17.sendMessage(from, { react: { text: "🌝" , key: m.key }})

       let member = participants.map(u => u.id)
       let orang = member[Math.floor(Math.random() * member.length)]
       let jodoh = member[Math.floor(Math.random() * member.length)]
       let jawab = `@${orang.split('@')[0]} ❤️ @${jodoh.split('@')[0]}
       Ohh i see 👀💖...`
       let menst = [orang, jodoh]
       let buttons = [
       { buttonId: '❤️', buttonText: { displayText: 'Congratulations ❤️' }, type: 1 }
       ]
       await A17.sendButtonText(m.chat, buttons, jawab, A17.user.name, m, {mentions: menst})
       }
       break;


      // case 'soulmate': {
      //   if (isBan) return reply(mess.banned);
      //   if (isBanChat) return reply(mess.bangc);
      // if (!m.isGroup) return reply(`${mess.grouponly}`)
      // A17.sendMessage(from, { react: { text: "🌝" , key: m.key }})
      // let member = participants.map(u => u.id)
      // let me = m.sender
      // let jodoh = member[Math.floor(Math.random() * member.length)]
      // let jawab = `👫 Soulmates
      // @${me.split('@')[0]} ❤️ @${jodoh.split('@')[0]}`
      // let ments = [me, jodoh]
      // let buttons = [
      // { buttonId: '❤️', buttonText: { displayText: 'Be my Soulmate ❤️' }, type: 1 }
      // ]
      // await A17.sendButtonText(m.chat, buttons, jawab, A17.user.name, m, {mentions: ments})
      // }
      // break;


      case 'soulmate': {

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(`${mess.grouponly}`);
        A17.sendMessage(from, { react: { text: "🌝", key: m.key } });

        let member = participants.map(u => u.id);
        let me = m.sender;
        let jodoh = member[Math.floor(Math.random() * member.length)];

        let message = `👫 Be me Soulmate...\n@${me.split('@')[0]} ❤️ @${jodoh.split('@')[0]}`;
        A17.sendMessage(m.chat, { text: message, mentions: [me, jodoh] }, { quoted: m });
      }
        break;


        case 'pick': {

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(`${mess.grouponly}`);
        A17.sendMessage(from, { react: { text: "🐒", key: m.key } });

        let member = participants.map(u => u.id);
        let me = m.sender;
        let jodoh = member[Math.floor(Math.random() * member.length)];

        let message = `@${jodoh.split('@')[0]}`;
        A17.sendMessage(m.chat, { text: message, mentions: [jodoh] }, { quoted: m });
      }
        break;


      case 'handsomecheck':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "😺", key: m.key } })
        if (!text) return reply(`Tag Someone, Example : ${prefix + command} @Kai`)
        const gan = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100']
        const teng = gan[Math.floor(Math.random() * gan.length)]
        A17.sendMessage(from, { text: `*${command}*\n\nName : ${q}\nAnswer : *${teng}%*` }, { quoted: m })
        break;


      case 'beautifulcheck':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "😺", key: m.key } })

        if (!text) return reply(`Tag Someone, Example : ${prefix + command} @Kai`)
        const can = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100']
        const tik = can[Math.floor(Math.random() * can.length)]
        A17.sendMessage(from, { text: `*${command}*\n\nName : ${q}\nAnswer : *${tik}%*` }, { quoted: m })
        break;



      case 'awesomecheck':
      case 'greatcheck':
      case 'gaycheck':
      case 'cutecheck':
      case 'lesbiancheck':
      case 'hornycheck':
      case 'prettycheck':
      case 'lovelycheck':
      case 'uglycheck':
      case 'قنيطcheck':
      case 'niggacheck':
      case 'ضعفجنسيcheck':
      case 'خولنةcheck':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "😺", key: m.key } })

        if (!text) return reply(`Tag Someone, Example : ${prefix + command} @Kai`)
        const sangeh = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100']
        const sange = sangeh[Math.floor(Math.random() * sangeh.length)]
        A17.sendMessage(from, { text: `*${command}*\n\nName : ${q}\nAnswer : *${sange}%*` }, { quoted: m })
        break;


      case 'charactercheck':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🤧", key: m.key } })

        if (!text) return reply(`Tag Someone, Example : ${prefix + command} @Kai`)
        const A17tttt = ['قنيط', 'عب', 'خول', 'معرص', 'كلجة', 'عب قاتشا', 'قافل الشغل', 'فاتح الشغل', 'عب كراتين صينية', 'بوت', 'نجاو ساي' , 'مصري', 'نيرد']
        const taky = A17tttt[Math.floor(Math.random() * A17tttt.length)]
        A17.sendMessage(from, { text: `Character Check : ${q}\nAnswer : *${taky}*` }, { quoted: m })
        break;


      //
      case 'dare':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })

        const dare = [
          "eat 2 tablespoons of salt",
          "kiss me",
          "call your crush and send nudes",
          "kill yourself.",
          "say Welcome to Who Wants To fuck me! to all the groups you have",
          "call ex saying مشتاقين",
          "sing the chorus of the last song you played",
          "vn your ex/crush/girlfriend, says hi (name), wants to call, just a moment. I miss you😔",
          "Bang on the table (which is at home) until you get scolded for being noisy",
          "Tell random people - I was just told I was your twin first, we separated, then I had plastic surgery",
          "mention ex's name",
          "رسل 10 الف بنكك!",
          "send ur whatsapp chat list",
          "chat random people with Japanese",
          "tell your own version of embarrassing things",
          "tag the person you hate",
          "Pretending to be possessed, for example: possessed by dog, possessed by grasshoppers, possessed by refrigerator, etc.",
          "change name to *I AM A WHORE* for 24 hours",
          "shout *فكت مني* in front of your house",
          "snap/post boyfriend photo/crush",
          "tell me your boyfriend type!",
          "say *i hv crush on you, do you want to be my girlfriend?* to the opposite sex, the last time you chatted (submit on wa/tele), wait for him to reply, if you have, drop here",
          "record ur voice and say i love you plana*",
          "prank chat ex and say *i love u, please come back.* without saying dare!",
          "chat to contact wa in the order according to your battery %, then tell him *i am lucky to hv you!*",
          "change the name to *I am a slave for plana* for 5 hours",
          "type in Saudi for 24 hours",
          "Use my photo as pfp for 3 days",
          "drop a song quote then tag a suitable member for that quote",
          "send voice note saying can i call u baby?",
          "send recent call on whatsapp",
          "Say *YOU ARE SO BEAUTIFUL DON'T LIE* to a random guy!",
          "pop to a group member, and say fuck you",
          "Act like a chicken in front of ur parents",
          "Pick up a random book and read one page out loud in vn n send it here",
          "Open your front door and howl like a wolf for 10 seconds",
          "Take an embarrassing selfie and paste it on your profile picture",
          "Let the group choose a word and a well known song. You have to sing that song and send it in voice note",
          "Walk on your elbows and knees for as long as you can",
          "sing blue archive main theme in voice note",
          "break;dance for 30 seconds in the sitting room",
          "Tell the saddest story you know",
          "make a twerk dance video and put it on status for 5mins",
          "Eat a raw piece of garlic",
          "Show the last five people you texted and what the messages said",
          "put your full name on status for 5hrs",
          "make a short dance video without any filter just with a music and put it on ur status for 5hrs",
          "call ur bestie, bitch",
          "put your photo without filter on ur status for 10mins",
          "say i love braa in voice note",
          "Send a message to your ex and say I still like you",
          "call Crush/girlfriend/bestie now and screenshot here",
          "pop to one of the group member personal chat and Say you ugly bustard",
          "say YOU ARE BEAUTIFUL/HANDSOME to one of person who is in top of ur pinlist or the first person on ur chatlist",
          "send voice notes and say, can i call u baby, if u r boy tag girl/if girl tag boy",
          "write i love you (random group member name, who is online) in personal chat, (if u r boy write girl name/if girl write boy name) take a snap of the pic and send it here",
          "use any blue archive character as your pfp for 3 days",
          "put your crush photo on status with caption, this is my crush",
          "change name to I AM GAY for 5 hours",
          "chat to any contact in whatsapp and say i will be ur bf/gf for 5hours",
          "send voice note says i hv crush on you, want to be my girlfriend/boyfriend or not? to any random person from the grup(if u girl choose boy, if boy choose girl",
          "slap ur butt hardly send the sound of slap through voice note😋",
          "state ur gf/bf type and send the photo here with caption, ugliest girl/boy in the world",
          "say i love you plana and send it here through voice note",
          "snap your face then send it here",
          "Send your photo with a caption, i am lesbian",
          "shout using harsh words and send it here through vn",
          "shout you bastard in front of your mom/papa",
          "change the name to i am idiot for 24 hours",
          "slap urself firmly and send the sound of slap through voice note😂",
          "say i love the bot owner Kai through voice note",
          "send your gf/bf pic here",
          "make any tiktok dance challenge video and put it on status, u can delete it after 5hrs",
          "break;up with your best friend for 5hrs without telling him/her that its a dare",
          "tell one of your frnd that u love him/her and wanna marry him/her, without telling him/her that its a dare",
          "say انا لوطي عايز اتناك through voice note",
          "write i am feeling horny and put it on status, u can delete it only after 5hrs",
          "write i am lesbian and put it on status, u can delete only after 5hrs",
          "kiss your mommy or papa and say i love you😌",
          "put your father name on status for 5hrs",
          "send abusive words in any grup, excepting this grup, and send screenshot proof here"
        ]
        const A17dareww = dare[Math.floor(Math.random() * dare.length)]
        buffer = await getBuffer(`https://c.wallhere.com/photos/24/97/Blue_Archive_anime_girls-2267394.jpg!d`)
        A17.sendMessage(from, { image: buffer, caption: '*You have chosen Dare...*\n\n' + A17dareww }, { quoted: m })
        break;


      case 'truth':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🌝", key: m.key } })

        const truth = [
          "Have you ever liked anyone? How long?",
          "If you can or if you want, which gc/outside gc would you make friends with? (maybe different/same type)",
          "Have you ever liked someone and felt that person likes you too?",
          "What is the name of your friend's ex-girlfriend that you used to secretly like?",
          "Have you ever stolen money from your father or mom? The reason?",
          "What makes you happy when you're sad?",
          "Ever had a one sided love? if so who? how does it feel bro?",
          "حار هو ولا حار فراقو?",
          "the most feared thing",
          "Who is the most influential person in your life?",
          "what proud thing did you get this year",
          "Who is the person who can make you awesome",
          "Who is the person who has ever made you very happy?",
          "Who is closest to your ideal type of partner here",
          "Who do you like to play with??",
          "Have you ever rejected people? the reason why?",
          "Mention an incident that made you hurt that you still remember",
          "What achievements have you got this year??",
          "What's your worst habit at school??",
          "What song do you sing most in the shower",
          "Have you ever had a near-death experience",
          "When was the last time you were really angry. Why?",
          "Who is the last person who called you",
          "Do you have any hidden talents, What are they",
          "What word do you hate the most?",
          "What is the last YouTube video you watched?",
          "What is the last thing you Googled",
          "Who in this group would you want to swap lives with for a week",
          "What is the scariest thing thats ever happened to you",
          "Have you ever farted and blamed it on someone else",
          "When is the last time you made someone else cry",
          "Have you ever ghosted a friend",
          "Have you ever seen a dead body",
          "Which of your family members annoys you the most and why",
          "If you had to delete one app from your phone, which one would it be",
          "What app do you waste the most time on",
          "Have you ever faked sick to get home from school",
          "What is the most embarrassing item in your room",
          "What five items would you bring if you got stuck on a desert island",
          "Have you ever laughed so hard you peed your pants",
          "Do you smell your own farts",
          "have u ever peed on the bed while sleeping ðŸ¤£ðŸ¤£",
          "What is the biggest mistake you have ever made",
          "Have you ever cheated in an exam",
          "What is the worst thing you have ever done",
          "When was the last time you cried",
          "whom do you love the most among ur parents",
          "do u sometimes put ur finger in ur nosetrilðŸ¤£",
          "who was ur crush during the school days",
          "tell honestly, do u like any boy in this grup",
          "have you ever liked anyone? how long?",
          "do you have gf/bf','what is your biggest fear?",
          "have you ever liked someone and felt that person likes you too?",
          "What is the name of your ex boyfriend of your friend that you once liked quietly?",
          "ever did you steal your mothers money or your fathers money",
          "what makes you happy when you are sad",
          "do you like someone who is in this grup? if you then who?",
          "have you ever been cheated on by people?",
          "who is the most important person in your life",
          "what proud things did you get this year",
          "who is the person who can make you happy when u r sad",
          "who is the person who ever made you feel uncomfortable",
          "have you ever lied to your parents",
          "do you still like ur ex",
          "who do you like to play together with?",
          "have you ever stolen big thing in ur life? the reason why?",
          "Mention the incident that makes you hurt that you still remember",
          "what achievements have you got this year?",
          "what was your worst habit at school?",
          "do you love the bot creator Kai?",
          "have you ever thought of taking revenge from ur teacher?",
          "do you like current prime minister of ur country",
          "you non veg or veg",
          "if you could be invisible, what is the first thing you would do",
          "what is a secret you kept from your parents",
          "Who is your secret crush",
          "whois the last person you creeped on social media",
          "If a genie granted you three wishes, what would you ask for",
          "What is your biggest regret",
          "What animal do you think you most look like",
          "How many selfies do you take a day",
          "What was your favorite childhood show",
          "if you could be a fictional character for a day, who would you choose",
          "whom do you text the most",
          "What is the biggest lie you ever told your parents",
          "Who is your celebrity crush",
          "Whats the strangest dream you have ever had",
          "do you play pubg, if you then send ur id number"
        ]
        const A17truthww = truth[Math.floor(Math.random() * truth.length)]
        buffer = await getBuffer(`https://c.wallhere.com/photos/6f/77/Blue_Archive_anime_girls_Plana_Blue_Archive_arona_blue_archive_sleepy_sailor_uniform_fan_art_nimbus-2247482.jpg!d`)
        A17.sendMessage(from, { image: buffer, caption: '*You have chosen Truth...*\n' + A17truthww }, { quoted: m })
        break;


       case 'كافكا':
       case 'kafka':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs8GPAYvWY__tYflw2ULggmH-C0_hMXiNMMQ&usqp=CAU`)
        A17.sendMessage(from, { image: buffer, caption: '*بدل تبني الشخصيات رايك شنو تبني حياتك اول*'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXFMAy9siZ1PSNg_5bjQLQzHEy3Tj9RBJsJA&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


       case 'سيلي':
       case 'seele':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704879265.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgu6gPxlqJs2FGmoQ8UMbIRCrgF7K5RwSr0A&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


       case 'جينغ يوان':
       case 'jinguan':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704880190.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2V6yr6orqjGOu12EbmpFs1AjeM3OvRoHwjw&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


      case 'هيميكو':
      case 'himeko':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704880251.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQALeK44bkOP2aNq03cwQ8yjuSlRMwgEuS8FA&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


       case 'جيبارد':
       case 'jepard':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704880694.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4cyk6H17zhhC_wGnnXn7L74zENf29mmGZKA&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


       case 'برونيا':
       case 'bronya':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704880768.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5YKh1JhKHGhF05hBtiYbz04XrscnpSB3FNw&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


       case 'كلارا':
       case 'clara':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704880881.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw2uaJ1rs6D59enw2KcPZQy4LVfWwr-pUb-A&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


       case 'بايلو':
       case 'bailu':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704880982.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        break


       case 'ويلت':
       case 'welt':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704881087.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Z8ak3uT0Za_ztxclHK6wLAKu8zvxjqy-hA&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


       case 'يانكينغ':
       case 'yanqing':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704883857.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRlrfsTJxphJQhgDjr24Kt4YHbw5h3SsCBWA&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


       case 'لوتشا':
       case 'loucha':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704883922.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGo3cBOEEEM8chSZQLZDWsbVraOG-1XCskIw&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


      case 'سيلفر':
      case 'silver':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704883980.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEkbC3vroccfwYo-eO8AAFNqkEx0hBvwEmnQ&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


      case 'بلايد':
      case 'blade':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704884014.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQglKhETlZC2vnIMFU3E3o03QtDmi6yn_kcAg&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


      case 'دان':
      case 'dan':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704884088.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9H7nGX2W-OKFYC_3jELFgfSrDHZmiMx8_rg&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        buffer3 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-dmSOsdAUPy2LRhUtMsdGNAHKNxrzgVRhhQ&usqp=CAU");
        A17.sendMessage(from, { image: buffer3, caption: 'ْ' }, { quoted: m });
        break


      case 'فوشوان':
      case 'fuxuan':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704884157.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdregiOJKswXw6uNHxyUFw0YTj277udIhqRg&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


      case 'جينغلو':
      case 'jinglu':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704886323.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsWNIQZBgoxCAbBuZoLO4wTr8AX-f3wFUCjA&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


      case 'هوهو':
      case 'huohuo':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704886396.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJbnkKuP-Jbd4s3Y9cI4Wmi2fokx4Xj46gAg&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


      case 'ارجينتي':
      case 'aregnti':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704886471.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgZBHdzVzErHc3S1tYvqJpVGVVsW7qLpPIVw&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


      case 'توباز':
      case 'topaz':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704886518.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLhY7V43HwJZeUt21YbKrclv1LjOYjaNrwyQ&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


     case 'روان':
     case 'ruan':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704886550.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkVvhRAUG7-tBfPnsRSN0yk-f5E3oPVt8ngw&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


     case 'ريشيو':
     case 'ratio':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704886653.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm6uZpdyb1-bS2K2KDHJKf7eE4bA_C-Z5f2Q&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


     case 'بلاك':
     case 'black':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704886731.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0_URlfmP4C-nhdLfuEa9Mvea4ZnSL8YBKEw&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


      case 'هانابي':
      case 'hanabi':
      case 'sparkle':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704886809.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTULwSKD0B7MWFIt_W_-ZsQP6qyIAV8Snunw&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break

      case 'هيرتا':
      case 'herta':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704894960.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUvGdtQ-EAVP7DyvbQ0hzvqOgzeYkp-NsbgA&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


      case 'استا':
      case 'asta':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704895074.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT87HPd1GszebEE49dCHyrYjOAh-rXnHqEvxw&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


      case 'بيلا':
      case 'pela':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704895128.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT89Yaa4f8eeYtsSxSTHaWqJq_LUCsaXmuCdQ&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


      case 'سيرفال':
      case 'serval':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704960076.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7DUo02v2wW7wXXGWkZwApC1Oijhoh7vmW4Q&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


      case 'مارش':
      case 'march':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704960138.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSLw2jEdeTE2VZ7kb4U8t5bjXVeObwou9Zbw&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


       case 'ناتاشا':
       case 'Natasha':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704960219.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxAw4MJxkg7vgdyZa_Bi9M4uP7ipBG6BLfSg&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


       case 'هوك':
       case 'hook':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704960262.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_q9d3J75QHSM3w7CfqWcmc_NRjtwv9sLdzg&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


       case 'qq':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704960341.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://upload-os-bbs.hoyolab.com/upload/2024/03/04/162791300/7f806d21095428c636ede42df3f5f28b_2190414815822329489.png?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_80");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


       case 'ارلان':
       case 'arlan':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704960379.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqxrjBNLd1vsl-fpXwwT-gLqYrY7SkrkHbtQ&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


       case 'تينغيون':
       case 'tingyun':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704960418.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'the kitsunyussy got me actin unwise'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkpGNtKpVSeYmZ7cIAT5i2HI0_GZG4Gqj6Rw&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


       case 'سامبو':
       case 'sampo':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704960492.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIppAoZjtw6eLu262d9T0IB8Ci_4TDbO2c3w&usqp=CAU");
       A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break;


       case 'سوشانغ':
       case 'sushang':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704960532.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQydCaPgR04wfNd_8SkRgk9cTjYBKQ9-exw-g&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break;


        case 'يوكونغ':
        case 'yukong':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSj4WxQa24Ze1nLVvk6TEi_3q26IaKbw965Q&usqp=CAU`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        break;


       case 'لوكا':
       case 'louka':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704960670.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHzYMPip3NeQc8WCZMjhyEYbYEX0gj9XFF4Q&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


       case 'لينكس':
       case 'lynx':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704960701.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        break;


       case 'جيونافين':
       case 'guinaifen':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704960738.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'منبه السكس 🔥'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROJbGOPT0CjA6R3ctkIAGDE35pUdZ3JUHjMw&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


       case 'هانيا':
       case 'hanya':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704960790.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZtbqMhAIoYfHYXx_CbFxMy0a0fLKxOZXKUg&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


       case 'شيويي':
       case 'Xueyi':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704960828.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStqkwws-JgR-Oj5G739wgaiIeQHM7EOEbq6Q&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


       case 'ميشا':
       case 'misha':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1704960858.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv-8EeX59aC6oFUnnzNHmh6EHkFtbT4ZwM0w&usqp=CAU");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break


        case 'ستيلي':
        case 'stellle':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "💦", key: m.key } })
        buffer = await getBuffer(`https://upload-os-bbs.hoyolab.com/upload/2023/05/17/136718215/5aa872ec3ef8456beaaac5b105e097fb_7649136321522721804.jpg?x-oss-process=image%2Fresize%2Cs_1000%2Fquality%2Cq_80%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        break;


        case 'كاليوس':
        case 'calius':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🤮", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1706175536.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'امشي من هنا يا عرص مافي اي بيلد ليك'}, { quoted: m })
        break;


       case 'اكيرون':
       case 'acheron':
    if (isBan) return reply(mess.banned);
    if (isBanChat) return reply(mess.bangc);
    A17.sendMessage(from, { react: { text: "💦", key: m.key } });

    // إرسال الصورة الأولى
    buffer1 = await getBuffer("https://mallucampaign.in/images/img_1708542982.jpg");
    A17.sendMessage(from, { image: buffer1, caption: 'ْ' }, { quoted: m });

    // إرسال الصورة الثانية
    buffer2 = await getBuffer("https://pbs.twimg.com/media/GGygxuqWMAE11NK.jpg:large");
    A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });

    break;


      case 'افينشرين':
      case 'aventurine':
      case 'كاكافاشا':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🤓", key: m.key } })
        buffer = await getBuffer(`https://mallucampaign.in/images/img_1708542989.jpg`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        buffer2 = await getBuffer("https://pbs.twimg.com/media/GG0z7tGbMAARnBi.jpg:large");
        A17.sendMessage(from, { image: buffer2, caption: 'ْ' }, { quoted: m });
        break;


      case 'boothill':
      case 'بوتهيل':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🤓", key: m.key } })
        buffer = await getBuffer(`https://pbs.twimg.com/media/GJtziVUWQAAGn4P?format=jpg&name=large`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        break;


      case 'robin':
      case 'روبن':
      case 'روبين':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🤓", key: m.key } })
        buffer = await getBuffer(`https://pbs.twimg.com/media/GJtznMUWwAAbKyX.jpg:large`)
        A17.sendMessage(from, { image: buffer, caption: 'ْ'}, { quoted: m })
        break;


      case 'ei':
      case 'baal':
      case 'raiden':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714356455.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714356456.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714356457.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


      case 'sara':
      case 'سارا':
      case 'سارة':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714356959.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714356958.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714356957.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


      case 'اياكا':
      case 'ayaka':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714357056.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714357055.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714357057.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


      case 'يانفي':
      case 'yanfei':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714357191.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714357190.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       break;


        case 'يويميا':
      case 'yoimiya':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714357344.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        break;


        case 'الوي':
      case 'aloy':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714357423.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714357394.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
        break;


        case 'سايو':
      case 'sayu':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714357478.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        break;


        case 'كازوها':
      case 'kazuha':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714357537.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714357538.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714357539.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'نينقوانق':
        case 'نينغوانغ':
      case 'ningguang':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714357634.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714357607.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714357606.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


      case 'eula':
      case 'ايولا':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714357831.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714357830.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714357829.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


      case 'childe':
      case 'tartaglia':
      case 'تشايلد':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714357905.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714357906.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
        break;


        case 'razor':
      case 'ريزور':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714358006.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714358005.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714358004.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        buffer4 = await getBuffer(`https://mallucampaign.in/images/img_1714358003.jpg`)
        A17.sendMessage(from, { image: buffer4 }, { quoted: m })
        break;


      case 'roasaria':
      case 'روزاريا':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714358119.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        break;


      case 'diluc':
      case 'ديلوك':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714360028.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714360029.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714360030.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


      case 'jean':
      case 'جين':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714360118.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714360119.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
        break;


      case 'fishl':
      case 'فيشل':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714360182.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714360183.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714360207.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'barbara':
      case 'باربارا':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714360376.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714360362.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
        break;


      case 'xingqiu':
      case 'كلجة':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714360444.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714360443.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
        break;


      case 'هوتاو':
      case 'hutao':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714360542.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714360541.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
        break;


      case 'klee':
      case 'كليي':
      case 'كلي':
      case 'كيلي':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714360618.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714360619.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
        break;


        case 'شاو':
      case 'xiao':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714360703.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714360704.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714360705.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


      case 'zhongli':
      case 'زونجلي':
      case 'زونقلي':
      case 'زنقولة':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714360781.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714360782.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714360783.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'ganyu':
      case 'جانيو':
        case 'قانيو':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714360903.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714360904.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714360905.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        buffer4 = await getBuffer(`https://mallucampaign.in/images/img_1714360921.jpg`)
        A17.sendMessage(from, { image: buffer4 }, { quoted: m })
        break;


       case 'فينتي':
      case 'venti':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714361126.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714361097.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714361084.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        buffer4 = await getBuffer(`https://mallucampaign.in/images/img_1714361083.jpg`)
        A17.sendMessage(from, { image: buffer4 }, { quoted: m })
        break;


        case 'albedo':
      case 'البيدو':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714361341.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714361342.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
        break;


       case 'beidou':
      case 'بيدو':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714361491.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714361492.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       break;


        case 'qiqi':
      case 'تشي':
      case 'تشيتشي':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714361569.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714361568.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       break;


        case 'amber':
      case 'امبر':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714361692.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        break;


        case 'noelle':
      case 'نويل':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714361736.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714361737.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714361738.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'xiangling':
      case 'شانلينغ':
        case 'شانغلينغ':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714361835.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714361815.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714361814.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        buffer4 = await getBuffer(`https://mallucampaign.in/images/img_1714361835.jpg`)
        A17.sendMessage(from, { image: buffer4 }, { quoted: m })
        break;


        case 'xinyan':
      case 'شينيان':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714361953.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714361954.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
        break;


        case 'ديونا':
      case 'diona':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714362020.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714362021.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
        break;


        case 'lisa':
      case 'ليسا':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714362071.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714362072.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
        break;


      case 'بينيت':
      case 'Bennett':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714362125.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        break;


      case 'mona':
      case 'مونا':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714362170.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714362171.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
        break;


         case 'kaeya':
      case 'كايا':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714367257.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714367256.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714367255.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'keqing':
      case 'كيتشنغ':
      case 'كيتشنق':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714367389.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714367390.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714367391.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'thoma':
      case 'ثوما':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714367469.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714367468.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714367467.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'gorou':
      case 'قورو':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714367593.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714367576.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714367575.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'shenhe':
      case 'شينهي':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714367655.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714367654.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714367653.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'yunjin':
      case 'يونجين':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714367706.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714367697.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714367696.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'اياتو':
      case 'ayato':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714367766.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714367765.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714367764.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'ياي':
      case 'yae':
        case 'miko':
      case 'ميكو':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714367824.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714367823.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714367822.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'yelan':
      case 'يلان':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714367906.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714367905.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714367904.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'kuki':
      case 'كوكي':
      case 'شينوبو':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714367950.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714367951.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       break;


        case 'heizhou':
      case 'هيزو':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714368045.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714368036.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714368037.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        buffer4 = await getBuffer(`https://mallucampaign.in/images/img_1714368035.jpg`)
        A17.sendMessage(from, { image: buffer4 }, { quoted: m })
        break;


        case 'dori':
      case 'دوري':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714368213.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714368212.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714368211.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'tighnari':
      case 'الطغنري':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714368265.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714368264.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714368263.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'collei':
      case 'كولي':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714368324.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714368323.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714368322.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'nilou':
      case 'نيلو':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714368376.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714368374.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714368373.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        buffer4 = await getBuffer(`https://mallucampaign.in/images/img_1714368375.jpg`)
        A17.sendMessage(from, { image: buffer4 }, { quoted: m })
        break;


        case 'cyno':
      case 'ساينو':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714368471.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714368472.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714368473.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'candace':
      case 'كانديس':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        A17.sendMessage(from, { text: `can deez nuts fit in your mouth🤭` }, { quoted: m })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714368521.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714368522.jpg`)
        break;


        case 'ليلى':
      case 'layla':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714368636.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714368634.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714368633.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'nahida':
      case 'ناهيدا':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714368681.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714368682.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
        break;


        case 'الهيثم':
      case 'alhaitham':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714368747.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714368741.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714368740.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'wanderer':
      case 'واندرر':
        case 'scaramouche':
      case 'سكراموش':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714368813.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714368812.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714368811.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'فاروزان':
      case 'faruzan':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714368885.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714368884.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714368886.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'yaoyao':
      case 'ياوياو':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714368943.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714368937.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714368936.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'ديهيا':
      case 'dehya':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714368987.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714368986.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714368988.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'mika':
      case 'ميكا':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714369523.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714369524.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714369535.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'kirara':
      case 'كيرارا':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714369670.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714369671.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714369672.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'baizhu':
      case 'بايزو':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714369719.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714369720.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714369721.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'كافيه':
      case 'kaveh':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714369771.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714369772.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
       buffer3 = await getBuffer(`https://mallucampaign.in/images/img_1714369773.jpg`)
        A17.sendMessage(from, { image: buffer3 }, { quoted: m })
        break;


        case 'lynette':
      case 'لينيت':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714369816.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714369817.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
        break;


        case 'lyney':
      case 'ليني':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714369884.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714369885.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
        break;


        case 'freminet':
      case 'فريمينت':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍆", key: m.key } })
        buffer1 = await getBuffer(`https://mallucampaign.in/images/img_1714369933.jpg`)
        A17.sendMessage(from, { image: buffer1 }, { quoted: m })
        buffer2 = await getBuffer(`https://mallucampaign.in/images/img_1714369934.jpg`)
        A17.sendMessage(from, { image: buffer2 }, { quoted: m })
        break;        


     case 'menggoda':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://api.lolhuman.xyz/api/danbooru?apikey=Gata_Dios&query=prinz_eugen_(azur_lane)`)
        A17.sendMessage(from, { image: buffer, caption: ':q 💦 '}, { quoted: m })
        break;


        case 'card-jingliu': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1212": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1212_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1212_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


       case 'card-ruan': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1303": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1303_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1303_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-fuxuan':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1208": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1208_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1208_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-ratio':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1305": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1305_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1305_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;

        case 'card-hanabi':
        case 'card-sparkle':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1306": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1306_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1306_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


         case 'card-seele':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1102": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1102_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1102_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-blade':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1205": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1205_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1205_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-silver':
        case 'card-silverwolf':
        case 'card-brony':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1006": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1006_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1006_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


         case 'card-kafka':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1005": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1005_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1005_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-swan':
        case 'card-blackswan':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1307": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1307_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1307_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-robin':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1309": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1309_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1309_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;



        case 'card-topaz':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1112": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1112_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1112_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


         case 'card-bronya':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1101": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1101_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1101_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-bailu':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1211": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1211_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1211_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-clara':
        case 'card-klara':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1107": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1107_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1107_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


         case 'card-himeko':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1003": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1003_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1003_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-welt':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1004": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1004_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1004_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-gepard':
        case 'card-jepard': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1104": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1104_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1104_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


         case 'card-loucha':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1203": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1203_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1203_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-jingyuan':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1204": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1204_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1204_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-lunae':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1213": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1213_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1213_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


         case 'card-huohuo':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1217": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1217_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1217_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;

        case 'card-argenti':
        case 'card-arjenti':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1302": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1302_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "🏳️‍🌈", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1302_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-march':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1001": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1001_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1001_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-dan':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1002": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1002_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1002_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-asta':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1009": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1009_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1009_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-herta':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1013": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1013_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1013_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;

        case 'card-serval':
        case 'card-sevral':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1103": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1103_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1103_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-natasha':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1105": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1105_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1105_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-pela':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1106": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1106_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1106_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;

        case 'card-sampo':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1108": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1108_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1108_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;

        case 'card-hook':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1109": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1109_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1109_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-lynx':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1110": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1110_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1110_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-luka':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1111": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1111_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1111_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-qq':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1201": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1201_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1201_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-tingyun':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1202": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1202_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1202_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-sushang':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1206": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1206_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1206_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-yukong':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1207": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1207_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1207_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-yanqing':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1209": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1209_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1209_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-guinafen':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1210": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1210_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1210_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-xueyi':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1214": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1214_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1214_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-hanya':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1215": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1215_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1215_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-misha':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1312": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1312_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1312_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;

        case 'card-acheron':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1308": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1308_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1308_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


        case 'card-aventurine':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        let { GraphOrg } = require("./lib/uploader");
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}card-jingliu 701607417`)
         if (/image/.test(mime)) {
           let media = await A17.downloadAndSaveMediaMessage(quoted)
          let anu = await GraphOrg(media);
         let jingliu = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}&image={"1304": "${util.format(anu)}"}`) 
          buffer = await getBuffer(`https://starraillcard.up.railway.app/card/1304_${q}.png`)
        await A17.sendMessage(from, { image: buffer }, { quoted: m })
         } else {
          A17.sendMessage(from, { react: { text: "😋", key: m.key } })
           sx = await getBuffer(`https://starraillcard.up.railway.app/card/1304_${q}.png`)
          await A17.sendMessage(from, { image: sx }, { quoted: m })
       } 
        } 
           break;


       case 'card-ayaka':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000002_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;


        case 'card-jean':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000003_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;


        case 'card-lisa':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000006_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;


        case 'card-barbara':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000014_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;


        case 'card-kaya':
        case 'card-kaeya':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000015_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;


        case 'card-diluc':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000016_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;


        case 'card-razor':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000020_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;


        case 'card-amber':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000021_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;


        case 'card-venti':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000022_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;


        case 'card-xiangling':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000023_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;


        case 'card-beidou':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000024_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;


        case 'card-Xingqiu':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000025_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;


        case 'card-xiao':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000026_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-Ningguang':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000027_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-klee':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000029_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-zhongli':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000030_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-fischl':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000031_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-bennett':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000032_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-tartaglia':
        case 'card-childe':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000033_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-noelle':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000034_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-qiqi':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000035_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-chongyun':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000036_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-ganyu':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000037_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-albedo':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000038_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-diona':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000039_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-mona':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000041_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-keqing':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000042_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-sucrose':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000043_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-xinyan':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000044_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-rosaria':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000045_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-hutao':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000046_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;


        case 'card-kazuha':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000047_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-yanfei':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000048_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-yoimiya':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000049_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-thoma':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000050_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-eula':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000051_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-raiden':
        case 'card-baal':
        case 'card-ei':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000052_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-sayu':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000053_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-kokomi':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000054_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-gorou':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000055_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-sara':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000056_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-itto':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000057_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-yae':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000058_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

       case 'card-heizou':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000059_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

       case 'card-yelan':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000060_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

       case 'card-kirara':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000061_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

       case 'card-aloy':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000062_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

       case 'card-shenhe':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000063_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

      case 'card-yunjin':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000064_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

      case 'card-shinobu':
      case 'card-kuki':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000065_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

      case 'card-ayato':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000066_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;

        
        case 'card-collei':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000067_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

     case 'card-dori':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000068_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

     case 'card-tighnari':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000069_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

    case 'card-nilou':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000070_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

    case 'card-cyno':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000071_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

    case 'card-candace':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000072_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

     case 'card-nahida':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        const genshinid = await axios.get(`https://starraillcard.up.railway.app/gen/profile/${q}?update=true`)
        sleep(15000);
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000073_${q}.png`)
        gg = await axios.get(`https://starraillcard.up.railway.app/card/gen_10000073_${q}.png`)
        const nahida = gg.data
        if (nahida.message === 'There was an error retrieving the image; it may be out of date') {
            return reply("uhh..an error occurred..please make sure you have this character on your profile and (show character details) option is enabled"); 
          } else {
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        } break; 

    
     case 'card-layla':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000074_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

      case 'card-wanderer':
      case 'card-scramouche':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000075_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

     case 'card-faruzan':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000076_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-yaoyao':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000077_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-alhaitham':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000078_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;


        case 'card-dehya':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000079_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-mika':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000080_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-kaveh':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000081_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-baizhu':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000082_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-lynette':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000083_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-lyney':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "🏳️‍🌈", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000084_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;
        

        case 'card-freminet':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000085_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;


        case 'card-wriothesely':
        case 'card-wrio':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000086_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;


        case 'card-neuvillette':
        case 'card-خرطوش':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000087_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;


        case 'card-charlotte':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000088_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;


        case 'card-furina':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000089_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;


        case 'card-chevreuse':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000090_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;


        case 'card-navia':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000091_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;


        case 'card-gaming':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000092_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;


        case 'card-xianyun':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000093_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;


        case 'card-chiori':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000094_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;


        case 'card-arlecchino':
        case 'card-daddy':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}card-ayaka 733507614`)
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })
        buffer = await getBuffer(`https://starraillcard.up.railway.app/card/gen_10000096_${q}.png`)
        A17.sendMessage(from, { image: buffer }, { quoted: m })
        break;


        
        


      /* ████ ✪ ███▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ [ NSFW ] ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███ ✪ ███ */



      case 'nsfwA17':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        reply(mess.wait)
        nye = `http://api.lolhuman.xyz/api/gimage?apikey=${lolkey}&query=${command}`
        A17.sendMessage(from, { image: { url: nye }, caption: "Master..." }, { quoted: m })
        break;
        

      case 'mediafire': case 'mediafiredl': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(mess.linkm)
        if (!isUrl(args[0]) && !args[0].includes('mediafire.com')) return reply(`The link you provided is invalid`)
        const baby1 = await mediafireDl(text)
        if (baby1[0].size.split('MB')[0] >= 999) return reply('*File Over Limit* ' + util.format(baby1))
        const result4 = `「  *Mediafire Downloader*  」
      
*Name* : ${baby1[0].nama}
*Size* : ${baby1[0].size}
*Mime* : ${baby1[0].mime}
*Link* : ${baby1[0].link}`
        reply(`${result4}`)
        A17.sendMessage(m.chat, { document: { url: baby1[0].link }, fileName: baby1[0].nama, mimetype: baby1[0].mime }, { quoted: m }).catch((err) => reply(mess.error))
      }
        break;


      // case 'masturbation': case 'jahy': case 'hentai': case 'glasses': case 'gangbang': case 'foot': 
      // case 'femdom': case 'cum': case 'ero': case 'cuckold': case 'blowjob': case 'bdsm': 
      // case 'ahegao': case 'ass': case 'orgy': case 'panties': case 'pussy': case 'thighs': case 'yuri': case 'tentacles':
      // // if (isBan) return reply(mess.banned);	 			
      // // if (isBanChat) return reply(mess.bangc);
      // // if (!m.isGroup) return reply(mess.grouponly);
      // // if (!AntiNsfw) return reply(mess.nonsfw)
      // // try{
      // // reply(mess.waiting)



      // // buffer = `https://fantox-apis.vercel.app/${command}`
      // // A17.sendMessage(from, {image:{url:buffer}, caption:"Here you go!"}, {quoted:m})


      // // // NoHorny = await fetchJson(`https://fantox-apis.vercel.app/${command}`)
      // // // YesHorny = await getBuffer(NoHorny.result)
      // // // A17.sendMessage(from, {image:YesHorny},{quoted:m})
      // // // } catch (e) {error("Error")}	
      // // break;

      // case 'spank':
      //   if (isBan) return reply(mess.banned);	 			
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!m.isGroup) return reply(mess.grouponly);
      //   if (!AntiNsfw) return reply(mess.nonsfw)
      // reply(mess.waiting)
      // spankd = await axios.get(`https://nekos.life/api/v2/img/spank`)                                   
      // let spbuff = await getBuffer(spankd.data.url)
      // let spgif = await GIFBufferToVideoBuffer(spbuff)   
      //       await A17.sendMessage(m.chat,{video: spgif, gifPlayback:true},{ quoted:m }).catch(err => {
      //                   return reply('Error!')
      //                                   })
      // break;


      // case 'hentaivid': case 'hentaivideo': {
      //   if (isBan) return reply(mess.banned);	 			
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!m.isGroup) return reply(mess.grouponly);
      //   if (!AntiNsfw) return reply(mess.nonsfw)
      // reply(mess.waiting)
      // anu = await hentai()
      // result912 = anu[Math.floor(Math.random(), anu.length)]
      // A17.sendMessage(m.chat, { video: { url: result912.video_1 }, caption: `Title : ${result912.title}\nCategory : ${result912.category}\n$Mimetype : ${result912.type}\nViews : ${result912.views_count}\nShares : ${result912.share_count}\nSource : ${result912.link}\nMedia Url : ${result912.video_1}` }, { quoted: m })
      // }
      // break;


      // case 'trap' :
      //   if (isBan) return reply(mess.banned);	 			
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!m.isGroup) return reply(mess.grouponly);
      //   if (!AntiNsfw) return reply(mess.nonsfw)
      // reply(mess.waiting)
      // waifudd = await axios.get(`https://waifu.pics/api/nsfw/${command}`)       
      // /* let trapbot = [
      //   {buttonId: `${prefix}trap`, buttonText: {displayText: `>>`}, type: 1},
      //   ] */
      // let button2Messages = {
      //  image: {url:waifudd.data.url},
      //  caption:  `Here it is...`,
      // /* buttons: trapbot,
      // headerType: 1 */
      // }     
      //           await A17.sendMessage(m.chat, button2Messages, { quoted:m }).catch(err => {
      //                   return('Error!')
      //               })
      // break;


      // case 'hentai-neko' :
      // case 'hneko' :
      //   if (isBan) return reply(mess.banned);	 			
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!m.isGroup) return reply(mess.grouponly);
      //   if (!AntiNsfw) return reply(mess.nonsfw)
      // reply(mess.waiting)
      //   waifudd = await axios.get(``)
      // /* let hnekobot = [
      //   {buttonId: `${prefix + command}`, buttonText: {displayText: `>>`}, type: 1},
      //   ] */
      // let button3Messages = {
      //  image: {url:waifudd.data.url},
      //  caption:  `Nyaah...`,
      // /* buttons: hnekobot,
      // headerType: 1 */
      // }      
      //           await A17.sendMessage(m.chat, button3Messages, { quoted:m }).catch(err => {
      //                   return('Error!')
      //               })
      // break;


      // case 'hentai-waifu' :
      // case 'hwaifu' :
      //   if (isBan) return reply(mess.banned);	 			
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!m.isGroup) return reply(mess.grouponly);
      //   if (!AntiNsfw) return reply(mess.nonsfw)
      // reply(mess.waiting)
      //   waifudd = await axios.get(`https://waifu.pics/api/nsfw/waifu`)         
      // /* let nwaifubot = 
      //   {buttonId: `${prefix + command}`, buttonText: {displayText: `>>`}, type: 1},
      //   ] */
      // let button4Messages = {
      //  image: {url:waifudd.data.url},
      //  caption:  `Here it is...`,
      // /* buttons: nwaifubot,
      // headerType: 1 */
      // }      
      //           await A17.sendMessage(m.chat, button4Messages, { quoted:m }).catch(err => {
      //                   return('Error!')
      //               })
      // break;


      // case 'gasm':
      //   if (isBan) return reply(mess.banned);	 			
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!m.isGroup) return reply(mess.grouponly);
      //   if (!AntiNsfw) return reply(mess.nonsfw)
      // reply(mess.waiting)						
      // waifudd = await axios.get(`https://nekos.life/api/v2/img/${command}`)
      //                      /*    var wbuttsss = [
      //       {buttonId: `${prefix}gasm`, buttonText: {displayText: `>>`}, type: 1},
      //       ] */
      //     let buttonsssMessages = {
      //      image: {url:waifudd.data.url},
      //      caption:  `Here it is...`,
      //    /* footer: `${global.BotName}`,
      //     buttons: wbuttsss,
      //     headerType: 4 */
      //     }     
      //           await A17.sendMessage(m.chat, buttonsssMessages,{ quoted:m }).catch(err => {
      //                   return('Error!')
      //               })
      // break;  



      // /* ████ ✪ ███▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ [ Anime Mode ] ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███ ✪ ███ */


      ///////////////////////////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



      //
      case 'danbooru':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}danbooru plana`)
        reply(mess.waiting)
        waifudd = await getBuffer(`https://api.lolhuman.xyz/api/danbooru?apikey=Gata_Dios&query=${q}`)
        /*       var wbuttsss = [
{buttonId: `${prefix}قدور`, buttonText: {displayText: `>>`}, type: 1},
] */
        let button1ssMessages = {
          image: waifudd,
          caption: `ْ`,
          /*  footer: `${global.BotName}`,
            buttons: wbuttsss,
            headerType: 4 */
        }
        await A17.sendMessage(m.chat, button1ssMessages, { quoted: m }).catch(err => {
          return ('Error!')
        })
        break;


      case 'test':
const CharacterAI = require("node_characterai");
const characterAI = new CharacterAI();

(async () => {
  // Authenticating as a guest (use `.authenticateWithToken()` to use an account)
  await characterAI.authenticateWithToken("529e24b4173b29dbc3054fef02a380e1e5b41949");

  // Place your character's id here
  const characterId = "zISqldbxDP0sG2UfhCYcGNVtF7tksXNLUcuo5wTu5OM";

  const chat = await characterAI.createOrContinueChat(characterId);

  // Send a message
  const response = await chat.sendAndAwaitResponse("Hello plana", true);

         A17.sendMessage(m.chat, response.text, { quoted: m }).catch(err => {
          return ('Error!')
        })
  // Use `response.text` to use it as a string
})();
        break;


      case 'upscale':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!image) return reply(`Please proide an image`)
        reply(mess.waiting)
        K = await getBuffer(`https://api.lolhuman.xyz/api/upscale?apikey=GataDios&img=${image}`)
        let j = {
          image: k,
          caption: `ْ`,
        }
        await A17.sendMessage(m.chat, j, { quoted: m }).catch(err => {
          return ('Error!')
        })
        break;
        

      case 'foxgirl':
      case 'neko':
      case 'loli':
      case 'waifu':
      case 'kiss': 
         if (isBan) return reply(mess.banned);	 			
         if (isBanChat) return reply(mess.bangc);
       return reply(`عيب`)
       bjd = await getBuffer(`https://media.tenor.com/et1uYmWUlwIAAAAM/%D8%B1%D9%85%D8%B6%D8%A7%D9%86-%D8%B9%D9%85%D8%B1%D9%88_%D9%85%D8%B5%D8%B7%D9%81%D9%89.gif`)
       let bjif = await GIFBufferToVideoBuffer(bjd)   
             await A17.sendMessage(m.chat,{video: bjif, gifPlayback:true},{ quoted:m }).catch(err => {
                         return reply('error..')
                                         })
       break;
        

      case 'topless':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        reply(mess.waiting)
        waifudd = await axios.get(`https://fantox-apis.vercel.app/topless`)
        /*  let xxhnekobot = [
          {buttonId: `${prefix}touhou`, buttonText: {displayText: `>>`}, type: 1},
          ]  */
        let xx1button3Messages = {
          image: { url: waifudd.data.url },
          caption: `can't have shit in gensokyo...`,
          /*  buttons: xxhnekobot,
          headerType: 1 */
        }
        await A17.sendMessage(m.chat, xx1button3Messages, { quoted: m }).catch(err => {
          return ('Error!')
        })
        break;


      //
      case 'feed':
      case 'meow':
      case 'tickle':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        reply(mess.waiting)
        waifudd = await axios.get(`https://nekos.life/api/v2/img/${command}`)
        var wbuttsss = [
          { buttonId: `${prefix + command}`, buttonText: { displayText: `>>` }, type: 1 },
        ]
        let buttonssMessages = {
          image: { url: waifudd.data.url },
          caption: `Here it is...`,
          footer: `${global.BotName}`,
          buttons: wbuttsss,
          headerType: 4
        }
        await A17.sendMessage(m.chat, buttonssMessages, { quoted: m }).catch(err => {
          return ('Error!')
        })
        break; 



      /////////////////////////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



      //
      case 'cry': case 'handhold': {

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "❤", key: m.key } })

        var pat = await fetchJson(`https://api.waifu.pics/sfw/${command}`)
        try {
          let messsender = m.sender
          let musers = ``
          try {
            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]
          } catch {
            users == "none"
            ment = [messsender, m.sender]
          }
          if (users == "none") {
            musers = `@${m.sender.split("@")[0]} ${command}ed with themself!`
            console.log(musers)

          } else {
            const rcpp = `@${users.split("@"[0])}`
            musers = `@${m.sender.split("@")[0]} ${command}ed with @${users.split("@")[0]} `

            console.log(musers)
          }
          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })
          const buffer = Buffer.from(response.data, "utf-8")
          var fetchedgif = await GIFBufferToVideoBuffer(buffer)
          A17.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })
        } catch (error) {
          console.log(error);
        }
      }
        break;


      case 'nom': {

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        var pat = await fetchJson(`https://api.waifu.pics/sfw/${command}`)
        try {
          let messsender = m.sender
          let musers = ``
          try {
            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]
          } catch {
            users == "none"
            ment = [messsender, m.sender]
          }
          if (users == "none") {
            musers = `@${m.sender.split("@")[0]} is eating with themself!`
            console.log(musers)

          } else {
            const rcpp = `@${users.split("@"[0])}`
            musers = `@${m.sender.split("@")[0]} is eating with @${users.split("@")[0]} `

            console.log(musers)
          }
          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })
          const buffer = Buffer.from(response.data, "utf-8")
          var fetchedgif = await GIFBufferToVideoBuffer(buffer)
          A17.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })
        } catch (error) {
          console.log(error);
        }
      }
        break;


      case 'hug': {

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        var pat = await fetchJson(`https://api.waifu.pics/sfw/${command}`)
        try {
          let messsender = m.sender
          let musers = ``
          try {
            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]
          } catch {
            users == "none"
            ment = [messsender, m.sender]
          }
          if (users == "none") {
            musers = `@${m.sender.split("@")[0]} hugged themself!`
            console.log(musers)

          } else {
            const rcpp = `@${users.split("@"[0])}`
            musers = `@${m.sender.split("@")[0]} hugged @${users.split("@")[0]} `

            console.log(musers)
          }
          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })
          const buffer = Buffer.from(response.data, "utf-8")
          var fetchedgif = await GIFBufferToVideoBuffer(buffer)
          A17.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })
        } catch (error) {
          console.log(error);
        }
      }
        break;


      case 'dance': {

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        var pat = await fetchJson(`https://api.waifu.pics/sfw/${command}`)
        try {
          let messsender = m.sender
          let musers = ``
          try {
            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]
          } catch {
            users == "none"
            ment = [messsender, m.sender]
          }
          if (users == "none") {
            musers = `@${m.sender.split("@")[0]} is dancing alone!!`
            console.log(musers)

          } else {
            const rcpp = `@${users.split("@"[0])}`
            musers = `@${m.sender.split("@")[0]} is dancing with @${users.split("@")[0]} `

            console.log(musers)
          }
          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })
          const buffer = Buffer.from(response.data, "utf-8")
          var fetchedgif = await GIFBufferToVideoBuffer(buffer)
          A17.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })
        } catch (error) {
          console.log(error);
        }
      }
        break; 


      //
      case 'kill': case 'pat': case 'lick': case 'bite':
      case 'bully': case 'bonk': case 'poke': case 'slap':
      case 'happy':
      case 'cuddle': case 'kick': {

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        var pat = await fetchJson(`https://api.waifu.pics/sfw/${command}`)
        try {
          let messsender = m.sender
          let musers = ``
          try {
            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]
          } catch {
            users == "none"
            ment = [messsender, m.sender]
          }
          if (users == "none") {
            musers = `@${m.sender.split("@")[0]} ${command}ed themselves!!`
            console.log(musers)

          } else {
            const rcpp = `@${users.split("@"[0])}`
            musers = `@${m.sender.split("@")[0]} ${command}ed  @${users.split("@")[0]} `

            console.log(musers)
          }
          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })
          const buffer = Buffer.from(response.data, "utf-8")
          var fetchedgif = await GIFBufferToVideoBuffer(buffer)
          A17.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })
        } catch (error) {
          console.log(error);
        }
      }
        break;


      case 'yeet':
      case 'wink': case 'smile':
      case 'wave': case 'blush': case 'smug': case 'glomp':
      case 'cringe': case 'highfive': {

        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        var pat = await fetchJson(`https://api.waifu.pics/sfw/${command}`)
        try {
          let messsender = m.sender
          let musers = ``
          try {
            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]
          } catch {
            users == "none"
            ment = [messsender, m.sender]
          }
          if (users == "none") {
            musers = `@${m.sender.split("@")[0]} ${command}ed at themself!`
            console.log(musers)

          } else {
            const rcpp = `@${users.split("@"[0])}`
            musers = `@${m.sender.split("@")[0]} ${command}ed at @${users.split("@")[0]} `

            console.log(musers)
          }
          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })
          const buffer = Buffer.from(response.data, "utf-8")
          var fetchedgif = await GIFBufferToVideoBuffer(buffer)
          A17.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })
        } catch (error) {
          console.log(error);
        }
      }
        break;


      
      
      case 'cry': case 'kill': case 'hug': case 'pat': case 'bite': case 'yeet':
      case 'bully': case 'bonk': case 'wink': case 'poke': case 'nom': case 'slap': case 'smile':
      case 'wave': case 'blush': case 'smug': case 'glomp': case 'happy': case 'dance':
      case 'cringe': case 'cuddle': case 'highfive': case 'handhold': case 'kick':
      
        if (isBan) return reply(mess.banned);	 			
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);						
      resggh = await axios.get(`https://nekos.life/api/v2/img/${command}`)         
      let resffj = await getBuffer(resggh.data.url)
      let resmain = await GIFBufferToVideoBuffer(resffj)   
          await A17.sendMessage(m.chat,{video: resmain, gifPlayback:true},{ quoted:m }).catch(err => {
                      return reply('error..')
                                      })
      break;
      
      


      case 'megumin':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        reply(mess.waiting)
        ud = await axios.get('https://waifu.pics/api/sfw/megumin')
        /*var wbutsss = [
          {buttonId: `${prefix}megumin`, buttonText: {displayText: `>>`}, type: 1},
               ] */
        let buttonzMessage = {
          image: { url: ud.data.url },
          caption: `Here it is...`,
          /*   footer: `${global.BotName}`,
                 buttons: wbutsss,
            headerType: 4 */
        }
        await A17.sendMessage(m.chat, buttonzMessage, { quoted: m }).catch(err => {
          return ('Error!')
        })
        break;

        
      case 'men':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "😋", key: m.key } })

        reply(mess.waiting)
        buffer = await getBuffer(`https://api.lolhuman.xyz/api/danbooru?apikey=GataDios&query=prinz_eugen_(azur_lane)`)
        /* var wbuttsss = [
          {buttonId: `${prefix}awoo`, buttonText: {displayText: `>>`}, type: 1},
          ] */
        let button1Messages = {
          image: buffer,
          caption: `:q💦 `,
          /*  footer: `${global.BotName}`,
          buttons: wbuttsss,
          headerType: 2 */

        }
        await A17.sendMessage(m.chat, button1Messages, { quoted: m }).catch(err => {
          return ('Error!')
        })
        break;


      case 'animewall2': case 'animewallpaper2':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        reply(mess.waiting)
        const { AnimeWallpaper } = require("anime-wallpaper")
        if (!q) return reply('Please enter a seach term!')
        const wall = new AnimeWallpaper();
        const pages = [1, 2, 3, 4];
        const random = pages[Math.floor(Math.random() * pages.length)]
        const wallpaper = await wall
          .getAnimeWall4({ title: q, type: "sfw", page: pages })
          .catch(() => null);
        const i = Math.floor(Math.random() * wallpaper.length);
        var walb = [
          { buttonId: `${prefix}animewall2 ${q}`, buttonText: { displayText: `>>` }, type: 1 },
        ]
        let wal = {
          image: { url: wallpaper[i].image },
          caption: `*Search Term :* ${q}`,
          footer: `${global.BotName}`,
          buttons: walb,
          headerType: 4
        }
        await A17.sendMessage(m.chat, wal, { quoted: m }).catch(err => {
          return ('Error!')
        })
        break;


      // case 'anime':
      //   if (isBan) return reply(mess.banned);	 			
      //   if (isBanChat) return reply(mess.bangc);
      //   if (!m.isGroup) return reply(mess.grouponly);
      //     if(!q) return reply(`Please proide a search term!\n\n*Example:* ${prefix}anime naruto`)
      // reply(mess.waiting)							
      // const { Anime } =require("@shineiichijo/marika")
      //   const client = new Anime();
      //    let anime = await client.searchAnime(q)
      //   let result = anime.data[0];
      //   console.log(result)
      //  let details = `*Title:* ${result.title}\n`;
      //   details += `*Format:* ${result.type}\n`;
      //   details += `*Status:* ${result.status.toUpperCase().replace(/\_/g, " ")}\n`;
      //   details += `*Total episodes:* ${result.episodes}\n`;
      //   details += `*Duration:* ${result.duration}\n`;
      //   details += `*Genres:*\n`;
      //   for (let i = 0; i < result.genres.length; i++) {
      //     details += `\t\t\t\t\t\t\t\t${result.genres[i].name}\n`;
      //   }
      //   details += `*Based on:* ${result.source.toUpperCase()}\n`;
      //   details += `*Studios:*\n`;
      //   for (let i = 0; i < result.studios.length; i++) {
      //     details += `\t\t\t\t\t\t\t\t${result.studios[i].name}\n`;
      //   }
      //   details += `*Producers:*\n`;
      //   for (let i = 0; i < result.producers.length; i++) {
      //     details += `\t\t\t\t\t\t\t\t\t\t${result.producers[i].name}\n`;
      //   }
      //   details += `*Premiered on:* ${result.aired.from}\n`;
      //   details += `*Ended on:* ${result.aired.to}\n`;
      //   details += `*Popularity:* ${result.popularity}\n`;
      //   details += `*Favorites:* ${result.favorites}\n`;
      //   details += `*Rating:* ${result.rating}\n`;
      //   details += `*Rank:* ${result.rank}\n\n`;
      //   if (result.trailer.url !== null)
      //     details += `*Trailer:* ${result.trailer.url}\n\n`;
      //   details += `*URL:* ${result.url}\n\n`;
      //   if (result.background !== null)
      //     details += `*Background:* ${result.background}\n\n`;
      //   details += `*Description:* ${result.synopsis.replace(
      //     /\[Written by MAL Rewrite]/g,
      //     ""
      //   )}`
      // A17.sendMessage(m.chat,{image:{url:result.images.jpg.large_image_url},caption:details},{quoted:m})   
      // break;


      //
      case 'anime': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "🍁", key: m.key } });
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}anime naruto`)

        const malScraper = require('mal-scraper')
        reply(mess.waiting);
        const anime = await malScraper.getInfoFromName(text).catch(() => null)
        if (!anime) return reply(`${p}Could not find your scarch`)
        let animetxt = `
  🎀 *Title: ${anime.title}*
  🎋 *Type: ${anime.type}*
  🎐 *Premiered on: ${anime.premiered}*
  💠 *Total Episodes: ${anime.episodes}*
  📈 *Status: ${anime.status}*
  💮 *Genres: ${anime.genres}
  📍 *Studio: ${anime.studios}*
  🌟 *Score: ${anime.score}*
  💎 *Rating: ${anime.rating}*
  🏅 *Rank: ${anime.ranked}*
  💫 *Popularity: ${anime.popularity}*
  ♦️ *Trailer: ${anime.trailer}*
  🌐 *URL: ${anime.url}*
  ❄ *Description:* ${anime.synopsis}*`
        await A17.sendMessage(m.chat, { image: { url: anime.picture }, caption: animetxt }, { quoted: m })
      }
        break;


      case 'register':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍁", key: m.key } });
        if (!text) return reply(`Please proide an id!`)
        
        const starid = await axios.get(`https://starraillcard.up.railway.app/get_profile?uid=${q}`)
        const fuck = starid.data;
        if (fuck.data === 'Successfully') {
        reply(`id registered..you can generate your star rail cards now`)
      } else {
        const genshinid = await axios.get(`https://starraillcard.up.railway.app/gen/profile/${q}?update=true`) 
        reply(`id registered..you can generate your genshin cards now`)
      }
      }
        break;
        

      case 'الارشيف':
      case 'ba':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍁", key: m.key } });
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}ba aru`)
        
        const ba = await axios.get(`https://api.ennead.cc/buruaka/character/${encodeURIComponent(q)}`)
        reply(mess.waiting);
        const aru = ba.data;
        let arutxt = `
🎀 *Name: ${aru.character.name}*
🌟 *rarity: ${aru.character.rarity}
🍆*armorType: ${aru.character.armorType}*
🎯 *bulletType: ${aru.character.bulletType}
🚩*position: ${aru.character.position}*
💮 *role: ${aru.character.role}*
📍 *squadType: ${aru.character.squadType}*
🌟 *profile: ${aru.character.profile}*
😋 *age: ${aru.info.age}*
✨ *birthDay: ${aru.info.birthDate}*
🔆 *height: ${aru.info.height}*
🎨 *artist: ${aru.info.artist}*
♣️ *club: ${aru.info.club}*
🌹 *schoolYear: ${aru.info.schoolYear}*
🏫 *school: ${aru.info.school}*
➿ *voiceactor: ${aru.info.voiceActor}*
`;
       await A17.sendMessage(m.chat, { image: { url: aru.image.portrait}, caption: arutxt }, { quoted: m })
     }
        break;


      case 'servant':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "🍁", key: m.key } });
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}ba aru`)
        
        const ba = await axios.get(`https://api.atlasacademy.io/nice/JP/servant/search?lang=en&name=${q}`)
        const aru = ba.data[0];
        const traitNames = aru.traits.map(traits => traits.name).join(',');
        let arutxt = `
  Name: ${aru.name}
  original name: ${aru.originalName}
  class: ${aru.className}
rarity: ${aru.rarity}
cost: ${aru.cost}
 max level: ${aru.lvMax}
 Gender: ${aru.gender}
 attribute: ${aru.attribute}
 traits: ${traitNames} 
`;
  await A17.sendMessage(m.chat, { image: { url:aru.extraAssets.CharaGraph.ascension["4"]}, caption: arutxt }, { quoted: m })   
    }
        break;
        

        
      case 'jp':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
         A17.sendMessage(from, { react: { text: "🍁", key: m.key } });
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}fgo jp/${q}`)
        
        const ba = await axios.get(`https://rayshift.io/api/v1/support/lookup?apiKey=03555929-1d69-40c0-998c-5f7e7457528f&region=1&friendId=${q}`)
        const aru = ba.data.response;
        let arutxt = `
 Name: ${aru.name}
 code: ${aru.code}
level: ${aru.level}
last login: ${aru.lastLogin}
`;
        if (ba.data.message === 'in queue'){
          return reply(`currently in queue..please wait for 10 seconds then use the command again`)
          }else{
        await A17.sendMessage(m.chat, { image: { url: 'https://rayshift.io' + aru.decks[0] }, caption: arutxt }, { quoted: m })
        await A17.sendMessage(m.chat, { image: { url: 'https://rayshift.io' + aru.decks[1] }, caption: arutxt }, { quoted: m })
        
           } 
      }
        break;


        case 'na':{
        if (isBan) return replyMessage(mess.banned);
        if (isBanChat) return reply(mess.bangc);
         A17.sendMessage(from, { react: { text: "🍁", key: m.key } });
        if (!text) return reply(`Please provide a search term!\n\n*Example:* ${prefix}fgo jp/${q}`)
        
        const ba = await axios.get(`https://rayshift.io/api/v1/support/lookup?apiKey=03555929-1d69-40c0-998c-5f7e7457528f&region=2&friendId=${q}`)
        const aru = ba.data.response;
        let arutxt = `
 Name: ${aru.name}
 code: ${aru.code}
level: ${aru.level}
last login: ${aru.lastLogin}
`;
        if (ba.data.message === 'in queue'){
          return reply(`currently in queue..please wait for 10 seconds then use the command again`)
          }else{
        await A17.sendMessage(m.chat, { image: { url: 'https://rayshift.io' + aru.decks[0] }, caption: arutxt }, { quoted: m })
        await A17.sendMessage(m.chat, { image: { url: 'https://rayshift.io' + aru.decks[1] }, caption: arutxt }, { quoted: m })
        
           } 
      }
        break;


      case 'genshin':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "🍁", key: m.key } });
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}genshin hu tao`)
        
        const q = await axios.get(`https://api.lolhuman.xyz/api/genshin/hu tao?apikey=Gata_Dios`)
        reply(mess.waiting);
        const w = q.data.result;
        let hutao = `
        *Name*: ${w.title}
        *Description*: ${w.intro} `;
        await A17.sendMessage(m.chat, { image: { url: w.cover1}, caption: hutao }, { quoted: m })
        await A17.sendMessage(m.chat, { audio: { url: w.cv[0].audio[0]} }, { quoted: m })
      }
        break;


      case 'character':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "🍁", key: m.key } });
        if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}character Tachibana kanade`)
        
        const character = await axios.get(`https://api.lolhuman.xyz/api/character?apikey=Gata_Dios&query=${q}`)
        reply(mess.waiting);
        const shiroko = character.data.result;
        let shirokotxt = `
  *Name: ${shiroko.name.full}*
 *native: ${shiroko.name.native}*
  *id: ${shiroko.id}*
  *favorites: ${shiroko.favourites}*
  *description*: ${shiroko.description}
  `;
        await A17.sendMessage(m.chat, { image: { url: shiroko.image.large}, caption: shirokotxt }, { quoted: m })
     }
        break;


        case 'ig': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a link`) 
        const instgram = await axios.get(`https://skizo.tech/api/ig?apikey=arona&url=${encodeURIComponent(q)}`)
        reply(mess.waiting);
        const ig = instgram.data[0];
        await A17.sendMessage(m.chat, { video: { url: ig.url} }, { quoted: m })
     }
        break;


        case 'twitter': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a link`) 
        const instgram = await axios.get(`https://api.lolhuman.xyz/api/twitter?apikey=Gata_Dios&url=${encodeURIComponent(q)}`)
        const ig = instgram.data.result.media[0];
        await A17.sendMessage(m.chat, { video: { url: ig.url} }, { quoted: m })
     }
        break;


	case 'coomer': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`parameters :
	Pussy Spreadpussy Genshin Squirt Glasses Sunglasses Swimsuit School Swimsuit Holo Live Ass Underwear Nipples Uncensored Sex Sex2 Sex3 Blonde Twintails Breasts Thighhighs Skirt Gamecg Animal Ears Foxgirl Dress School Uniform Twogirls Gloves Vocaloid Touhou Weapon With Flowers Pinkhair Clouds View White Tail Nude Ponytail Bed White Hair Ribbons Japanese Cloths Hatsune Miku Bikini Barefoot Nobra Food Wings Pantyhose Open Shirt Headband Close Wet Catgirl Wolfgirl Neko Loli Spread Legs Bra Fate Series Tree Elbow Gloves Green Hair Horns With Petals Drunk Cum Head Dress Tie Shorts Maid Headphones Anus View Idol Gun Stockings Tears Breasthold Necklace Seethrough Bunnyears Bunnygirl Topless Beach Erect Nipples Yuri Vampire Shirt Pantypull Torn Clothes Bondage Demon Bell Shirt Lift Tattoo Chain Flat Chest Fingering`) 
        const cum = await axios.get(`https://fantox-apis.vercel.app/${encodeURIComponent(q)}`)
        const zib = cum.data.url;
        await A17.sendMessage(m.chat, { image: { url: zib} }, { quoted: m })
     }
        break; 


        case 'imagine': {
        if (isIssam) return reply(`نو`)
        if (isIssamm) return reply(`ههههههه فاكر لو راح ل رقمه التاني ح يقدر يخدعني`)
        if (isIssammm) return reply(`لول فاكرني ناسية الرقم دا`)  
        if (!isCreator) return reply(`how about you imagine deez nuts on your mouth 🍆`) 
        if (!text) return reply(`Please provide a prompt`) 
          const typ = ['plana', 'arona', 'adamxion'];
        const api = typ[Math.floor(Math.random() * typ.length)];
        
        const instgram = await axios.get(`https://skizo.tech/api/dalle3?apikey=${api}&prompt=${encodeURIComponent(q)}`)
        const ig = instgram.data;
        await A17.sendMessage(m.chat, { image: { url: ig.url} }, { quoted: m })
     }
        break; 


        case 'tiktok':
        case 'tt':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a link`) 
        const tt = await axios.get(`https://api.lolhuman.xyz/api/tiktok?apikey=Gata_Dios&url=${encodeURIComponent(q)}`)
        const sx = tt.data.result;
        let shirokotxt = `
  *title: ${sx.title}*

  
 *views: ${sx.statistic.play_count}*
  *likes: ${sx.statistic.like_count}*
 *share: ${sx.statistic.share_count}*
  *comments: ${sx.statistic.comment_count}*
  `; 
        await A17.sendMessage(m.chat, { video: { url: sx.link}, caption: shirokotxt }, { quoted: m })
     }
        break;


        case 'segs': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply (`عيب`)
        if (isCreator && !text) return reply (`The type of image to get. Current types: hass, hmidriff, pgif, 4k, hentai, holo, hneko, neko, hkitsune, kemonomimi, anal, hanal, gonewild, kanna, ass, pussy, thigh, hthigh, gah, coffee, food, paizuri, tentacle, boobs, hboobs, yaoi, donator types: cosplay, swimsuit, pantsu, nakadashi`)
        const tt = await axios.get(`https://nekobot.xyz/api/image?type=${q}`)
        const sx = tt.data.message;
        let shirokotxt = await getBuffer(sx) 
        await A17.sendMessage(m.chat, { image: shirokotxt }, { quoted: m })
     }
        break;



        case 'apk': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a link`) 
        const apk = await axios.get(`https://api.lolhuman.xyz/api/apkdownloader?apikey=Gata_Dios&package=${encodeURIComponent(q)}`)
        reply(mess.waiting);
        const fk = apk.data.result;
        await A17.sendMessage(
          from,
          {
            image: { url: fk.apk_icon}, // Include the thumbnail image in the response
            caption: `\n*Downloading:* *${fk.apk_name}*
            
   *version :* ${fk.apk_version}

   *author :* ${fk.apk_author}\n`,
  },
          { quoted: m }
        );

        // Send the audio file with the proper 'type' property set to 'audio'
        await A17.sendMessage(from, {
           document: { url: fk.apk_link},
          filename: fk.apk_name + '.apk',
          mimetype: 'application/vnd.android.package-archive',
          quoted: m,
        });

        // Rest of the code remains unchanged.
        // ...
      }
        break; 


        case 'mkv': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a link`) 
        const apk = await axios.get(`https://aemt.me/download/gdrive?url=${encodeURIComponent(q)}`)
        const fk = apk.data.result;
        await A17.sendMessage(
          from,
         { 
           text: `\n*Downloading:* *${fk.fileName}*
            
   *size :* ${fk.fileSize}`,
  },
          { quoted: m }
        );

        // Send the audio file with the proper 'type' property set to 'audio'
        await A17.sendMessage(from, {
          document: { url: fk.data},
          filename: fk.fileName,
          mimetype: 'video/x-matroska',
          quoted: m,
        });

        // Rest of the code remains unchanged.
        // ...
      }
        break;


        case 'drive': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!text) return reply(`Please proide a link`) 
        const apk = await axios.get(`https://aemt.me/download/gdrive?url=${encodeURIComponent(q)}`)
        const fk = apk.data.result;
        await A17.sendMessage(
          from,
         { 
           text: `\n*Downloading:* *${fk.fileName}*
            
   *size :* ${fk.fileSize}

   *type :* ${fk.mimetype}\n`,
  },
          { quoted: m }
        );

        // Send the audio file with the proper 'type' property set to 'audio'
        await A17.sendMessage(from, {
          document: { url: fk.data},
          filename: fk.fileName,
          mimetype: fk.mimetype,
          quoted: m,
        });

        // Rest of the code remains unchanged.
        // ...
      }
        break; 


        case 'nhentai': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(`💀`) 
        if (!text) return reply(`Please proide a code`) 
        const apk = await axios.get(`https://skizo.tech/api/nhentai?apikey=plana&code=${q}`)
        const fk = apk.data;
        await A17.sendMessage(
          from,
          {
            image: { url: fk.cover}, // Include the thumbnail image in the response
            caption: `\n*Downloading:* *${fk.title.english}*
            
   *language : ${fk.language}*

   *characters : ${fk.characters}*

   *parodies : ${fk.parodies}*

   *tags: ${fk.tags}*

   *groups : ${fk.groups}*

   *categories : ${fk.categories}*

   *uploaded: ${fk.uploaded}*

   *artists : ${fk.artists}*

   *id: ${fk.id}*\n`,
    },
          { quoted: m }
        );

        // Send the audio file with the proper 'type' property set to 'audio'
        await A17.sendMessage(from, {
          document: { url: fk.download + 'plana'},
          filename: + fk.title.english + '.pdf', 
          mimetype: 'application/pdf',
          quoted: m,
        });

        // Rest of the code remains unchanged.
        // ...
      }
        break; 


    case 'yt': { 
    if (isBan) return reply(mess.banned);
    if (isBanChat) return reply(mess.bangc);
    if (!text) return reply('Please provide a link');
    
    const youtube = await axios.get(`https://api.lolhuman.xyz/api/ytvideo?apikey=gata_dios&url=${encodeURIComponent(q)}`);
    const yt = youtube.data.result.link.link;

    await A17.sendMessage(m.chat, { video: { url: yt } }, { quoted: m });
    }
      break;


        case 'pin': { 
    if (isBan) return reply(mess.banned);
    if (isBanChat) return reply(mess.bangc);
    if (!text) return reply('Please provide a link');
    
    const youtube = await axios.get(`https://api.lolhuman.xyz/api/pinterestdl?apikey=39d86e79464a60f1043a9418&url=${encodeURIComponent(q)}`);
    const yt = youtube.data;

    await A17.sendMessage(m.chat, { video: { url: yt.result} }, { quoted: m });
    }
      break;
        

        case 'planaarona119': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        const seggs = await axios.get(`https://api.waifu.pics/nsfw/blowjob`)
        let bjf = await getBuffer(seggs.data.url)
       let bjif = await GIFBufferToVideoBuffer(bjf)   
             await A17.sendMessage(m.chat,{video: bjif, gifPlayback:true},{ quoted:m })
                                         }
       break;



  /*   case 'loli':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "🍁", key: m.key } });
        
        const sex = await axios.get(`https://api.lolicon.app/setu/v2?tag=ロリ`)
        reply(mess.waiting);
        const loli = sex.data.data[0];
        let lolitxt = `
*pid: ${loli.pid}*
*uid: ${loli.uid}*
*title: ${loli.title}*
*author: ${loli.author}*
*R18: ${loli.r18}*
*Tags: ${loli.tags.join(',')}*
*aitype: ${loli.aiType}*
`;
       await A17.sendMessage(m.chat, { image: { url: loli.urls.original}, caption: lolitxt }, { quoted: m })
     }
        break; */


     case 'pixiv':{
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "🍁", key: m.key } });
       if (!text) return reply(`Please proide a search term!\n\n*Example:* ${prefix}pixiv shiki`)

        const segs = await axios.get(`https://api.lolicon.app/setu/v2?tag=${encodeURIComponent(q)}`)
        reply(mess.waiting);
        const pixiv = segs.data.data[0];
        let pixivtxt = `
 *pid: ${pixiv.pid}*
 *uid: ${pixiv.uid}*
*title: ${pixiv.title}*
 *author: ${pixiv.author}*
*R18: ${pixiv.r18}*
 *Tags: ${pixiv.tags.join(',')}*
 *aitype: ${pixiv.aiType}*
`;
       await A17.sendMessage(m.chat, { image: { url: pixiv.urls.original}, caption: pixivtxt }, { quoted: m })
     }
        break;
          

      case 'manga':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "🍁", key: m.key } })

        reply(mess.waiting)
        const { Manga } = require("@shineiichijo/marika")
        const manga = new Manga();
        if (!q) return reply(`Please proide a search term!\n\n_Example:_ ${prefix}manga naruto`)
        let srh = await manga.searchManga(q)
        let mang = `*Title:* ${srh.data[0].title}\n`;
        mang += `*Status:* ${srh.data[0].status}\n`;
        mang += `*Total Volumes:* ${srh.data[0].volumes}\n`;
        mang += `*Total Chapters:* ${srh.data[0].chapters}\n`;
        mang += `*Genres:*\n`;
        for (let i = 0; i < srh.data[0].genres.length; i++) {
          mang += `\t\t\t\t\t\t\t\t${srh.data[0].genres[i].name}\n`;
        }
        mang += `*Published on:* ${srh.data[0].published.from}\n`;
        mang += `*Score:* ${srh.data[0].scored}\n`;
        mang += `*Popularity:* ${srh.data[0].popularity}\n`;
        mang += `*Favorites:* ${srh.data[0].favorites}\n`;
        mang += `*Authors:*\n`;
        for (let i = 0; i < srh.data[0].authors.length; i++) {
          mang += `\t\t\t\t\t\t\t\t\t${srh.data[0].authors[i].name} (${srh.data[0].authors[0].type})\n`;
        }
        mang += `\n*URL:* ${srh.data[0].url}\n\n`;
        if (srh.data[0].background !== null)
          mang += `*Background:* ${srh.data[0].background}`;
        mang += `*Description:* ${srh.data[0].synopsis.replace(
          /\[Written by MAL Rewrite]/g,
          ""
        )}`;
        A17.sendMessage(m.chat, { image: { url: srh.data[0].images.jpg.large_image_url }, caption: mang }, { quoted: m })
        break;


      case 'shinobu':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        reply(mess.waiting)
        waifuddd = await axios.get('https://waifu.pics/api/sfw/shinobu')
        /* var wbuttsssr = [
          {buttonId: `${prefix}loli`, buttonText: {displayText: `>>`}, type: 1},
          ] */
        let buttonMessagessfgr = {
          image: { url: waifuddd.data.url },
          caption: 'اتحفنا يا سفاح الاندرإيج!',
          /*  buttons: wbuttsssr,
            headerType: 2 */
        }

        await A17.sendMessage(m.chat, buttonMessagessfgr, { quoted: m }).catch(err => {
          return ('error..')
        })
        break;



      ////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////



      // case 'remove': {

      //   if (!m.isGroup) return reply(mess.grouponly);
      //   if (!isBotAdmins) return reply(mess.botadmin);
      //   if (!isAdmins && !isCreator) return reply(mess.useradmin)
      //   let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
      //   await A17.groupParticipantsUpdate(m.chat, [users], 'remove')
      // }
      //   break;




      ///////////////////////////////////////////////////


      case 'bc': case 'broadcast': case 'bcall': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!isCreator) return reply(mess.botowner)
        if (!args.join(" ")) return reply(`Please enter some text to broadcast! \n\nExample : ${prefix + command} ${global.OwnerName}`)
        let anu = await store.chats.all().map(v => v.id)
        reply(`Send Broadcast To ${anu.length} Chat\nTime's up ${anu.length * 1.5} second`)
        for (let yoi of anu) {
          await sleep(1500)
          let btn = [{
            quickreplyButton: {
              displayText: '💡 Menu 💡',
              id: '-menu'
            }
          }, {
            quickreplyButton: {
              displayText: 'Bot Owner',
              id: '-owner'
            }
          }]
          let txt = `「 *${global.OwnerName}'s Broadcast* 」\n\n${text}`
          A17.send5ButImg(yoi, txt, `${global.BotName}`, BotLogo, btn, Thumb)
        }
        reply('Broadcast Sent !')
      }
        break;




      case 'help': case 'h': case 'menu': case 'allmenu': case 'listmenu': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "✨", key: m.key } })
        const helpmenu = `Hemlo *${pushname}* sensei...!! ${nowtime} ,
  
Hemlo, I am "plana" a WhatsApp bot create and recode by braa Mohammad to do everything that is possible on WhatsApp based on WhatsApp Multi Device(MD) Support.



  ⌯    *if you want to add me to your group.. Join the support group by typing ${prefix}support or dm my owner by typing ${prefix}owner*
  ⌯    *i use character.ai for auto reply..plana is the default character..if you want a different character you can contact my owner*


  ⌯    *Time* : ${kaitime}
  ⌯    *Date* : ${kaidate}


  〢━━━ 〄 Bot Info 〄 ━━━〢


  ⌯    *Bot usr name :* ${pushname} 
  ⌯    *My prefix is :*  ${prefix}
  ⌯    *Owner name :* ${global.OwnerName} 
  ⌯    *Bot runtime :* ${runtime(process.uptime())} 
  ⌯    *Platform :* your mom

 
  〢━━ ❅ Group Moderation ❅ ━━〢

  ⌯     ${prefix}add
  ⌯     ${prefix}invite
  ⌯     ${prefix}remove
  ⌯     ${prefix}promote
  ⌯     ${prefix}demote
  ⌯     ${prefix}grouplink
  ⌯     ${prefix}group-event
  ⌯     ${prefix}groupsetting
  ⌯     ${prefix}setname
  ⌯     ${prefix}setgcpp
  ⌯     ${prefix}setdesc
  ⌯     ${prefix}revoke
  ⌯     ${prefix}tagall
  ⌯     ${prefix}hidetag 
  

  〢━━━ 🔍 *Search* 🔎 ━━━〢
  
 
  ⌯     ${prefix}play
  ⌯     ${prefix}song
  ⌯     ${prefix}video 
  ⌯     ${prefix}yts
  ⌯     ${prefix}lyrics
  ⌯     ${prefix}movie
  ⌯     ${prefix}google
  ⌯     ${prefix}gimage
  ⌯     ${prefix}pinterest
  ⌯     ${prefix}wallpaper
  ⌯     ${prefix}image
  ⌯     ${prefix}searchgc
  ⌯     ${prefix}wikimedia
  ⌯     ${prefix}gpt
  ⌯     ${prefix}stickers


  〢━━━ 📈 *Economy* 📈 ━━━〢


  ⌯     ${prefix}daily 
  ⌯     ${prefix}wallet
  ⌯     ${prefix}bank
  ⌯     ${prefix}bankupgrade
  ⌯     ${prefix}deposit
  ⌯     ${prefix}withdraw 
  ⌯     ${prefix}rob / attack
  ⌯     ${prefix}transfer / give
  ⌯     ${prefix}wealth / ritual


  〢━━━ 🎮 *Games* 🎮 ━━━〢


  ⌯     ${prefix}ttt / tictactoe
  ⌯     ${prefix}truth
  ⌯     ${prefix}dare
  ⌯     ${prefix}spin / slot
  ⌯     ${prefix}gamble / lottery
 

  〢━━━ 🛠️ *Convert* 🛠️ ━━━〢
 

  ⌯     ${prefix}sticker
  ⌯     ${prefix}imagine
  ⌯     ${prefix}toanime
  ⌯     ${prefix}toimg
  ⌯     ${prefix}tovideo
  ⌯     ${prefix}togif
  ⌯     ${prefix}tourl
  ⌯     ${prefix}tomp3
  ⌯     ${prefix}toaudio
  ⌯     ${prefix}steal
  ⌯     ${prefix}emojimix
  ⌯     ${prefix}enhance / upscale 
  ⌯     ${prefix}removebackground / removebg


  〢━━━ 📍 *Reactions* 📍 ━━━〢
 

  ⌯     ${prefix}cuddle
  ⌯     ${prefix}hug
  ⌯     ${prefix}bonk
  ⌯     ${prefix}cry
  ⌯     ${prefix}bully
  ⌯     ${prefix}slap
  ⌯     ${prefix}kill
  ⌯     ${prefix}happy
  ⌯     ${prefix}pat
  ⌯     ${prefix}smug
  ⌯     ${prefix}nom
  ⌯     ${prefix}glomp
  ⌯     ${prefix}bite
  ⌯     ${prefix}yeet
  ⌯     ${prefix}blush
  ⌯     ${prefix}smile
  ⌯     ${prefix}wave
  ⌯     ${prefix}highfive
  ⌯     ${prefix}handhold
  ⌯     ${prefix}poke
  ⌯     ${prefix}wink
  ⌯     ${prefix}dance
  ⌯     ${prefix}cringe


  〢━━ 🌌 *Downloader* 🌌 ━━〢
 

  ⌯     ${prefix}yt
  ⌯     ${prefix}drive (up to 1 GB)
  ⌯     ${prefix}instagram / ig
  ⌯     ${prefix}facebook / fb
  ⌯     ${prefix}twitter
  ⌯     ${prefix}tiktok
  ⌯     ${prefix}soundcloud
  ⌯     ${prefix}Spotify
  ⌯     ${prefix}apk

 
  〢━━━ 🎐 *Fun* 🎐 ━━━〢
  

  ⌯     ${prefix}reaction
  ⌯     ${prefix}cutecheck
  ⌯     ${prefix}couple
  ⌯     ${prefix}soulmate
  ⌯     ${prefix}handsomecheck
  ⌯     ${prefix}beautifulcheck
  ⌯     ${prefix}awesomecheck
  ⌯     ${prefix}greatcheck
  ⌯     ${prefix}uglycheck
  ⌯     ${prefix}charactercheck
  ⌯     ${prefix}lesbiancheck
  ⌯     ${prefix}prettycheck
  ⌯     ${prefix}lovelycheck


  〢━━━ 🈴 *Weeb* 🈴 ━━━〢

  
  ⌯     ${prefix}anime
  ⌯     ${prefix}manga
  ⌯     ${prefix}feed
  ⌯     ${prefix}foxgirl
  ⌯     ${prefix}shinobu
  ⌯     ${prefix}megumin
  ⌯     ${prefix}waifu
  ⌯     ${prefix}loli
  ⌯     ${prefix}coffee
  ⌯     ${prefix}tickle
  ⌯     ${prefix}wallpaper
  ⌯     ${prefix}hsr (honkai star rail bulids) 
  ⌯     ${prefix}hsr-cards (honkai star rail character cards)
  ⌯     ${prefix}ba (blue archive characters)
  ⌯     ${prefix}register (for generating your genshin and hsr cards) 
  ⌯     ${prefix}character
  
 

  〢━━━ ♨️ *Informative* ♨️ ━━━〢
  

  ⌯     ${prefix}weather
  ⌯     ${prefix}wiki


  〢━━━ 🪁 *Essentials* 🪁 ━━━〢
 
  
  ⌯     ${prefix}qr
  ⌯     ${prefix}say
  ⌯     ${prefix}fliptext
  ⌯     ${prefix}toletter
  ⌯     ${prefix}translate 
  
 
  〢━━━ 🎗 *Others* 🎗 ━━━〢


  ⌯     ${prefix}report
  ⌯     ${prefix}afk
  ⌯     ${prefix}pick


  〢━━━ 💕 *Ramadan Mobarak* 💕 ━━━〢
 
  ⌯    
  ⌯   『  *${global.BotName}*  』
  ⌯       Developed By: *braa Mohammad*
  ⌯    
  ⌯   🍁 To use any of these
  ⌯       commands type.
  ⌯    
  ⌯   *${prefix}<Command name>*.
  ⌯    
  ⌯   🍁 To get Support Group link
  ⌯     type *${prefix}support*.
  ⌯    
  ⌯    
  ⌯   🍁 Type *${prefix}help* to get
  ⌯       full command list.
  ┬│▸
  ╰────────────···▸`
        let buttonMessage = {
          video: fs.readFileSync('./system/A17_3.mp4'), gifPlayback: true,
          caption: helpmenu,

          headerType: 4

        }
        A17.sendMessage(m.chat, buttonMessage, { quoted: m })
      }
        break;


      case 'honkai': case 'hsr': case 'هونكاي': case 'قطار': case 'star': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "✨", key: m.key } })
        const helpmenu = `الشخصيات 


 *(  5 stars  )* 
🌟🌟🌟🌟🌟

⌯     ${prefix}ستيلي   stelle
⌯     ${prefix}كاليوس   calius
⌯     ${prefix}سيلي   seele
⌯     ${prefix}جينغ يوان   jinguan 
⌯     ${prefix}هيميكو     Himeko
⌯     ${prefix}جيبارد    jepard
⌯     ${prefix}برونيا    Bronya 
⌯     ${prefix}كلارا    clara
⌯     ${prefix}بايلو    Bailu
⌯     ${prefix}ويلت    welt
⌯     ${prefix}يانكينغ   yanqing
⌯     ${prefix}لوتشا     loucha
⌯     ${prefix}سيلفر وولف  silver worlf
⌯     ${prefix}بلايد      Blade
⌯     ${prefix}دان       Dan
⌯     ${prefix}فوشوان    fuxuan
⌯     ${prefix}جينغلو     jingliu 
⌯     ${prefix}كافكا      Kafka
⌯     ${prefix}هاوهاو    Haohao
⌯     ${prefix}ارجينتي   Argenti
⌯     ${prefix}توباز      Topaz
⌯     ${prefix}روان مي   Ruan mai
⌯     ${prefix}ريشيو     Ratio
⌯     ${prefix}بلاك سوان   black swan
⌯     ${prefix}هانابي (لو كتبت سباركل بركبك)
⌯     ${prefix}اكيرون   acheron
⌯     ${prefix}افينشرين   aventurine 

*( 4 stars )* 
🌟🌟🌟🌟

⌯     ${prefix}هيرتا   Herta
⌯     ${prefix}استا    Asta 
⌯     ${prefix}بيلا     Bela
⌯     ${prefix}دان     dan
⌯     ${prefix}سيرفال  Serval
⌯     ${prefix}مارش   March
⌯     ${prefix}ناتاشا   Natacha
⌯     ${prefix}هوك   Hook
⌯     ${prefix}qq (ما عرفت اكتب اسمها عربي)
⌯     ${prefix}ارلان   arlan
⌯     ${prefix}تينغيون  Tingyun
⌯     ${prefix}سامبو     sampo
⌯     ${prefix}سوشانغ    Suchang
⌯     ${prefix}يوكونغ     Yukong
⌯     ${prefix}لوكا       Louka
⌯     ${prefix}لينكس     Lynx
⌯     ${prefix}جيونافين   guinaifen
⌯     ${prefix}هانيا     Hanya
⌯     ${prefix}شيويي   Xueyi
⌯     ${prefix}ميشا     Misha`
     let buttonMessage = {
          video: fs.readFileSync('./system/A17_4.mp4'), gifPlayback: true,
          caption: helpmenu,

          headerType: 4

        }
        A17.sendMessage(m.chat, buttonMessage, { quoted: m })
      }
      break;


        case 'hsr-cards': case 'cards': case 'بطاقات': {
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "✨", key: m.key } })
        const helpmenu = `you can generate your characters cards using the command ${prefix}register followed by your id..
        then wait 20 seconds..after that you can use the command ${prefix}card followed by the character name..example ${prefix}card-jingliu 701607417...
       
        *Commands list* :

        Card-seele
        Card-bronya
        Card-himeko
        Card-welt
        Card-clara
        Card-bailu
        Card-jepard
        Card-jingyuan
        Card-loucha
        Card-silver
        Card-blade
        Card-lunae
        Card-fuxuan
        Card-jingliu 
        Card-kafka
        Card-huohuo
        Card-argenti 
        Card-topaz
        Card-ruan
        Card-ratio
        Card-swan
        Card-hanabi
        Card-acheron 
        Card-aventurine
        
        
        Card-herta
        Card-asta
        Card-march
        Card-dan
        Card-asta
        Card-pela
        Card-serval
        Card-natasha
        Card-hook
        Card-qq
        Card-arlan
        Card-tingyun
        Card-sampo
        Card-luka
        Card-yukong
        Card-lynx
        Card-guinafen
        Card-hanya
        Card-xueyi
        Card-misha`
        let buttonMessage = {
          video: fs.readFileSync('./system/A17_4.mp4'), gifPlayback: true,
          caption: helpmenu,

          headerType: 4

        }
        A17.sendMessage(m.chat, buttonMessage, { quoted: m })
      }
      break;


      case '':
        if (isCmd) {
          if (isBan) return reply(mess.banned);
          if (isBanChat) return reply(mess.bangc);
          A17.sendMessage(from, { react: { text: "✨", key: m.key } })

          reply(`الحاصل`)
        }

        break;


      case '':
        if (isCmd) {
          if (isBan) return reply(mess.banned);
          if (isBanChat) return reply(mess.bangc);
          A17.sendMessage(from, { react: { text: "✨", key: m.key } })

          reply(`الحاصل`)
        }

        break;



      case '':
        if (isCmd) {
          if (isBan) return reply(mess.banned);
          if (isBanChat) return reply(mess.bangc);
          A17.sendMessage(from, { react: { text: "✨", key: m.key } })

          reply(`الحاصل`)
        }

        break;


      //qr
      case 'qr': case 'scanner': case 'qrcode':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        if (!m.isGroup) return reply(mess.grouponly);
        A17.sendMessage(from, { react: { text: "🍁", key: m.key } })

        reply(`Running repl....Please wait until repl.it responds...`)
        var replqr = await getBuffer(`https://a17-qr-scanner.broken0007.repl.co/`)
        /*        var qrbutton = [
{buttonId: `${prefix}qr`, buttonText: {displayText: `Tap to Re-run Repl`}, type: 1}
] */
        let bmffg = {
          image: replqr,
          caption: `Scan the qr within 10-15 seconds...`,
          /*    footer: `${global.BotName}`,
              buttons: qrbutton,
              headerType: 4 */
        }
        await A17.sendMessage(m.chat, bmffg, { quoted: m }).catch(err => {
          return ('Error!')
        })
        break;


      //////search
      case 'weather':
        if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
        A17.sendMessage(from, { react: { text: "✨", key: m.key } })
        if (!args[0]) return reply("Enter your location to search weather.")
        myweather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args.join(" ")}&units=metric&appid=e409825a497a0c894d2dd975542234b0&language=tr`)

        const weathertext = `           🌤 *Weather Report* 🌤  \n\n🔎 *Search Location:* ${myweather.data.name}\n*💮 Country:* ${myweather.data.sys.country}\n🌈 *Weather:* ${myweather.data.weather[0].description}\n🌡️ *Temperature:* ${myweather.data.main.temp}°C\n❄️ *Minimum Temperature:* ${myweather.data.main.temp_min}°C\n📛 *Maximum Temperature:* ${myweather.data.main.temp_max}°C\n💦 *Humidity:* ${myweather.data.main.humidity}%\n🎐 *Wind:* ${myweather.data.wind.speed} km/h\n`
        A17.sendMessage(from, { video: { url: 'https://media.tenor.com/bC57J4v11UcAAAPo/weather-sunny.mp4' }, gifPlayback: true, caption: weathertext }, { quoted: m })

        break;


      // case 'weather':{
      //   if (!text) return reply('Give me Location...')
      //               let wdata = await axios.get(
      //                   `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en`
      //               );
      //               let textw = ""
      //               textw += `*🗺️Weather of  ${text}*\n\n`
      //               textw += `*Weather:-* ${wdata.data.weather[0].main}\n`
      //               textw += `*Description:-* ${wdata.data.weather[0].description}\n`
      //               textw += `*Avg Temp:-* ${wdata.data.main.temp}\n`
      //               textw += `*Feels Like:-* ${wdata.data.main.feels_like}\n`
      //               textw += `*Pressure:-* ${wdata.data.main.pressure}\n`
      //               textw += `*Humidity:-* ${wdata.data.main.humidity}\n`
      //               textw += `*Humidity:-* ${wdata.data.wind.speed}\n`
      //               textw += `*Latitude:-* ${wdata.data.coord.lat}\n`
      //               textw += `*Longitude:-* ${wdata.data.coord.lon}\n`
      //               textw += `*Country:-* ${wdata.data.sys.country}\n`

      //             A17.sendMessage(
      //                   m.chat, {
      //                       text: textw,
      //                   }, {
      //                       quoted: m,
      //                   }
      //              )
      //              }
      //              break;



      // //  "parse-ms": "^1.1.0",



      ///////////////////////////////////////////////////
      ///funmenu

      case 'stupidcheck': case 'uncleancheck':
      case 'hotcheck': case 'smartcheck':
      case 'greatcheck':
      case 'evilcheck': case 'dogcheck':
      case 'coolcheck':
      case 'waifucheck':
        cantik = body.slice(1)
        const okebnh1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100']
        const A17kak = okebnh1[Math.floor(Math.random() * okebnh1.length)]
        A17.sendMessage(m.chat, { text: A17kak }, { quoted: m })
        break;



      ///////////////////////////////////////////////////
      ///////////////////////////////////////////////////



      default:

        if (isCmd) {
          if (isBan) return reply(mess.banned);
          if (isBanChat) return reply(mess.bangc);
          A17.sendMessage(from, { react: { text: "❌", key: m.key } })
          reply(`جلا`)

        }


        if (budy.startsWith('=>')) {
          if (!isCreator) return reply(mess.botowner)
          function Return(sul) {
            sat = JSON.stringify(sul, null, 2)
            bang = util.format(sat)
            if (sat == undefined) {
              bang = util.format(sul)
            }
            return reply(bang)
          }
          try {
            reply(util.format(eval(`(async () => { ${budy.slice(3)} })()`)))
          } catch (e) {
            A17.sendMessage(from, { image: ErrorPic, caption: String(e) }, { quoted: m })
          }
        }
        if (budy.startsWith('>')) {
          if (!isCreator) return reply(mess.botowner)
          try {
            let evaled = await eval(budy.slice(2))
            if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
            await reply(evaled)
          } catch (err) {
            await A17.sendMessage(from, { image: ErrorPic, caption: String(err) }, { quoted: m })
          }
        }


        if (budy.startsWith('$')) {
          if (!isCreator) return reply(mess.botowner)
          exec(budy.slice(2), (err, stdout) => {
            if (err) return A17.sendMessage(from, { image: ErrorPic, caption: String(err) }, { quoted: m })
            if (stdout) return replyH(stdout)
          })
        }


        if (isCmd && budy.toLowerCase() != undefined) {
          if (m.chat.endsWith('broadcast')) return
          if (m.isBaileys) return
          let msgs = global.db.database
          if (!(budy.toLowerCase() in msgs)) return
          A17.copyNForward(m.chat, msgs[budy.toLowerCase()], true)
        }
    }
  } catch (err) {
    A17.sendMessage(`${ownertag}@s.whatsapp.net`, util.format(err), { quoted: m })
    console.log(err)
  }
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright(`Update ${__filename}`))
  delete require.cache[file]
  require(file)
})
