const { default: WAConnection, useMultiFileAuthState, generateWAMessageFromContent, getContentType, downloadContentFromMessage, makeCacheableSignalKeyStore } = require("@whiskeysockets/baileys");
const pino = require("pino");
const fetch = require("node-fetch");
const axios = require("axios");
const dl = require("@bochilteam/scraper");
const cheerio = require("cheerio");
const chalk = require("chalk");
const { Odesus } = require("odesus");
const { JSDOM } = require("jsdom");
const clph = require("caliph-api");
const yts = require("yt-search");
const tooHurf = require('@develoka/angka-terbilang-js');
const moment = require("moment-timezone");
const formData = require("form-data");
const ffmpeg = require("fluent-ffmpeg");
const xfar = require("xfarr-api");
const dylux = require("api-dylux");
const path = require("path");
const fs = require("fs");
const os = require("os");
const speed = require("performance-now");
const { format } = require("util");
const { PassThrough } = require("stream");
const { watchFile } = require("fs");
const { exec } = require("child_process");

const fakeThumb = fs.readFileSync("./database/media/fakeThumb.jpg");
const parseRes = require("./database/functions/parseres.js");
const resolveDesuUrl = require("./resolve-desu-url.js");
const resolveBufferStream = require("./resolve-buffer-stream.js");
const scraper = require("./database/functions/scraperTT.js");

const color = (text, color) => {
  return !color ? chalk.green(text) : chalk.keyword(color)(text);
};

const start = async () => {
  const { state, saveCreds } = await useMultiFileAuthState("session");

  const level = pino({ level: "silent" });
  const sock = WAConnection({
    logger: level,
    printQRInTerminal: true,
    browser: ["Moon", "Firefox", "3.0.0"],
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, level),
    },
  });

  sock.ev.on("connection.update", (v) => {
    const { connection, lastDisconnect } = v;
    if (connection === "close") {
      if (lastDisconnect.error.output.statusCode !== 401) {
        start();
      } else {
        exec("rm -rf session");
        console.error("Scan QR!");
        start();
      }
    } else if (connection === "open") {
      console.log("Bot connected!");
    }
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("messages.upsert", async (m) => {
const time = moment().tz("Africa/Nairobi").format("HH:mm:ss");

const { ownerNumber, ownerName, botName, otakudesuUrl, spikexc } = require("./config.json");
const ods = new Odesus(otakudesuUrl);

if (!m.messages) return;

const msg = m.messages[0];
const from = msg.key.remoteJid;
const type = getContentType(msg.message);
const quotedType = getContentType(msg?.message?.extendedTextMessage?.contextInfo?.quotedMessage) || null;

if (type === 'ephemeralMessage') {
  if (msg && msg.message && msg.message.ephemeralMessage && msg.message.ephemeralMessage.message) {
    msg.message = msg.message.ephemeralMessage.message;
    if (msg.message.viewOnceMessage) {
      msg.message = msg.message.viewOnceMessage;
    }
  }
}

if (type === 'viewOnceMessage') {
  if (msg && msg.message && msg.message.viewOnceMessage) {
    msg.message = msg.message.viewOnceMessage.message;
  }
}

const body =
  type === 'imageMessage' || type === 'videoMessage'
    ? msg.message[type].caption
    : type === 'conversation'
    ? msg.message[type]
    : type === 'extendedTextMessage'
    ? msg.message[type].text
    : '';

const isGroup = from.endsWith('@g.us');
let sender = isGroup ? msg.key.participant : from;
sender = sender.includes(':') ? sender.split(':')[0] + '@s.whatsapp.net' : sender;
const senderName = msg.pushName;
const senderNumber = sender.split('@')[0];
const groupMetadata = isGroup ? await sock.groupMetadata(from) : null;
const participants = isGroup ? await groupMetadata.participants : '';
const groupName = groupMetadata?.subject || '';
const groupMembers = groupMetadata?.participants || [];
const groupAdmins = groupMembers.filter((v) => v.admin).map((v) => v.id);
const isGroupAdmins = groupAdmins.includes(sender);
const botId = sock.user.id.includes(':') ? sock.user.id.split(':')[0] + '@s.whatsapp.net' : sock.user.id;
const isBotGroupAdmins = groupMetadata && groupAdmins.includes(botId);
const isOwner = ownerNumber.includes(sender);
const isCmd = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\\\©^]/.test(body);
const prefix = isCmd ? body[0] : '';
const args = body.trim().split(/ +/).slice(1);

const reply = (teks) => {
  sock.sendMessage(from, { text: teks }, { quoted: msg });
};

const fakeSend = async (teks, judul, isi, msg) => {
  sock.sendMessage(from, {
    text: teks,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        title: judul,
        body: isi,
        mediaType: 3,
        thumbnail: fakeThumb,
        sourceUrl: 'https://github.com/mohalicious'
      }
    }
  }, {
    sendEphemeral: true,
    quoted: msg
  });
}

let command = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : '';
let q = args.join(' ');

const isImage = type === 'imageMessage';
const isVideo = type === 'videoMessage';
const isAudio = type === 'audioMessage';
const isSticker = type === 'stickerMessage';
const isContact = type === 'contactMessage';
const isLocation = type === 'locationMessage';

const isQuoted = type === 'extendedTextMessage';
const isQuotedImage = isQuoted && quotedType === 'imageMessage';
const isQuotedVideo = isQuoted && quotedType === 'videoMessage';
const isQuotedAudio = isQuoted && quotedType === 'audioMessage';
const isQuotedSticker = isQuoted && quotedType === 'stickerMessage';
const isQuotedContact = isQuoted && quotedType === 'contactMessage';
const isQuotedLocation = isQuoted && quotedType === 'locationMessage';

let mediaType = type;
let stream;
if (isQuotedImage || isQuotedVideo || isQuotedAudio || isQuotedSticker) {
  mediaType = quotedType;
  msg.message[mediaType] = msg?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.[mediaType];
  stream = await downloadContentFromMessage(msg.message[mediaType], mediaType.replace('Message', '')).catch(console.error);
}   


async function modsFouad() {
  const userAgent =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36';
  const urlsc = 'https://fmmods.com/download-center/mega.php';

  const Proxy = (url) =>
    url
      ? `https://translate.google.com/translate?sl=en&tl=fr&hl=en&u=${encodeURIComponent(
          url
        )}&client=webapp`
      : '';

  return new Promise((resolve, reject) => {
    const list = [];
    axios
      .get(Proxy(urlsc), {
        headers: {
          'User-Agent': userAgent,
        },
      })
      .then((response) => {
        const $ = cheerio.load(response.data);
        $('div.su-button-center').each((i, element) => {
          const link = $(element).find('a').attr('href');
          list.push({
            name: link.split('/')[7].replace('.', '_').replace('_apk', '.apk'),
            link: link,
          });
        });

        const result = {};
        result.com_whatsapp = list && list[0] ? list[0] : undefined;
        result.com_fmwhatsapp = list && list[1] ? list[1] : undefined;
        result.com_gbwhatsapp = list && list[2] ? list[2] : undefined;
        result.com_yowhatsapp = list && list[3] ? list[3] : undefined;

        resolve(result);
      })
      .catch(reject);
  });
}


async function youtubeSearch(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await yts(query);
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
}

async function getBuffer(url, options) {
  try {
    options = options || {};
    const res = await axios({
      method: "get",
      url,
      headers: {
        DNT: 1,
        "Upgrade-Insecure-Request": 1,
      },
      ...options,
      responseType: "arraybuffer",
    });
    return res.data;
  } catch (e) {
    return reply(`Error: ${e}`);
  }
}

async function randomObj(array) {
  return array[Math.floor(Math.random() * array.length)];
}

async function instagram(url) {
  const res = await axios("https://indown.io/");
  const _$ = cheerio.load(res.data);
  const referer = _$("input[name=referer]").val();
  const locale = _$("input[name=locale]").val();
  const _token = _$("input[name=_token]").val();
  const { data } = await axios.post(
    "https://indown.io/download",
    new URLSearchParams({
      link: url,
      referer,
      locale,
      _token,
    }),
    {
      headers: {
        cookie: res.headers["set-cookie"].join("; "),
      },
    }
  );
  const $ = cheerio.load(data);
  const result = [];
  const __$ = cheerio.load($("#result").html());
  __$("video").each(function () {
    const $$ = $(this);
    result.push({
      type: "video",
      thumbnail: $$.attr("poster"),
      url: $$.find("source").attr("src"),
    });
  });
  __$("img").each(function () {
    const $$ = $(this);
    result.push({
      type: "image",
      url: $$.attr("src"),
    });
  });
  return result;
}

async function getBase64(url) {
  try {
    const res = await axios.get(url, { responseType: "arraybuffer" });
    const data = Buffer.from(res.data, "binary").toString("base64");
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function fetchJson(url, options) {
  try {
    options = options || {};
    const res = await axios.get(url, options);
    return res.data;
  } catch (error) {
    return error.message;
  }
}

function isUrl(url) {
  const regexp =
    /^(?:(?:https?|ftp|file):\/\/|www\.|ftp\.){1,1}(?:\S+(?::\S*)?@)?(?:localhost|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-?)*[a-zA-Z\u00a1-\uffff0-9]+){1,1}(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-?)*[a-zA-Z\u00a1-\uffff0-9]+)*)(?::\d{2,5})?(?:\/[^\s]*)?$/;
  return regexp.test(url);
}

async function shortlink(url) {
  const res = await axios.get(`https://tinyurl.com/api-create.php?url=${url}`);
  return res.data;
}

async function scheduleFunction(func, ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(func());
      } catch (e) {
        reject(e);
      }
    }, ms);
  });
}

function parseMs(ms) {
  let seconds = Math.floor((ms / 1000) % 60);
  let minutes = Math.floor((ms / (1000 * 60)) % 60);
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  let days = Math.floor(ms / (1000 * 60 * 60 * 24));

  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds: ms % 1000,
  };
}

const runtime = function (seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
};

    if (!isGroup && !isCmd) console.log(color(`[ ${time} ]`, "white"), color("[ PRIVATE ]", "aqua"), color(body.slice(0, 50), "white"), "from", color(senderNumber, "yellow"));
    if (isGroup && !isCmd) console.log(color(`[ ${time} ]`, "white"), color("[  GROUP  ]", "aqua"), color(body.slice(0, 50), "white"), "from", color(senderNumber, "yellow"), "in", color(groupName, "yellow"));
    if (!isGroup && isCmd) console.log(color(`[ ${time} ]`, "white"), color("[ COMMAND ]", "aqua"), color(body, "white"), "from", color(senderNumber, "yellow"));
    if (isGroup && isCmd) console.log(color(`[ ${time} ]`, "white"), color("[ COMMAND ]", "aqua"), color(body, "white"), "from", color(senderNumber, "yellow"), "in", color(groupName, "yellow"));

    switch (command) {
case "menu":
case "help":
case "?":
  sock.sendMessage(from, { 
  caption: `
  
 Hi I'm *${botName}*
 
*≡ Commands*

┌─⊷ *Downloader*
▢ igdl, igs, mediafire, tiktok, twitter, ytmp3, ytmp4, yts
└─────────────

┌─⊷ *Moderation*
▢ close, closetime, demote, hidetag, kick, opentime, open, promote, setdesc, setname
└─────────────

┌─⊷ *Maker*
▢ comic, runner, starwars, style, water, gumball, paper, bastard, woi, joebiden, erun
└─────────────

┌─⊷ *General*
▢ weather, ai, foudinfo, get, truecaller, lyrics, owner, runtime, shortlink, ssweb, sticker, waifu

        *𝑁𝑜𝑡𝑒:*
Moon uses Baileys Library (@whiskeysockets/baileys)\nDo Not Call or Spam The Bot🦄\nBot Is still under Development So Expect Random Bugs And Errors\nPowered By Dreaded Bot
    `,
   image: {
      url: "https://telegra.ph/file/a071917ffbe98093eba89.jpg",
    },
  }, { quoted: msg });

//Downloader
  break;
case "igdl":
case "instagram":
  if (!q) {
    return reply(`Example:\n${prefix + command} URL`);
  }
  fakeSend(`\nWait a minute..\n`);
  instagram(q)
    .then((data) => {
      for (let i of data) {
        if (i.type === "video") {
          sock.sendMessage(from, { video: { url: i.url } }, { quoted: msg });
        } else if (i.type === "image") {
          sock.sendMessage(from, { caption: `Success`, image: { url: i.url } }, { quoted: msg });
        }
      }
    })
    .catch(() => reply(`Sorry, an error occurred`));
  break;
case "mediafire":
case "mf":
  if (!q) {
    return reply(`Example:\n${prefix + command} URL`);
  }
  fakeSend(`\nWait a minute..\n`);
  dl.mediafiredl(q).then((data) => {
    reply(`*${data.filename}*\n*Ukuran: ${data.filesize}*`);
    sock.sendMessage(from, { document: { url: data.url }, mimetype: "zip", fileName: data.filename });
  });
  break;
case "tiktok":
  if (!q) {
    return reply(`Example:\n${prefix + command} URL`);
  }
  dl.savefrom(q).then((data) => {
    fakeSend(`\nWait a minute..\n`);
    sock.sendMessage(from, {
      video: {
        url: data[0].url[0].url,
      },
      caption: data[0].meta.title,
    });
  });
  break;
case "igstory":
case "igs":
  if (!q) {
    return reply(`Example:\n${prefix + command} donbel_ovibel`);
  } else {
    fakeSend(`\nWait a minute..\n`);
    var storis = `https://instagram.com/stories/` + q;
    instagram(storis.replace("@", ""))
      .then((data) => {
        for (let i of data) {
          if (i.type === "video") {
            sock.sendMessage(from, { video: { url: i.url } }, { quoted: msg });
          } else if (i.type === "image") {
            sock.sendMessage(from, { image: { url: i.url } }, { quoted: msg });
          }
        }
      })
      .catch(() => reply(`Sorry, an error occurred`));
  }
  break;
case "twitter":
case "twt":
  if (!q) {
    return reply(`Example:\n${prefix + command} URL`);
  }
  var urls = q;
  dl.savefrom(urls)
    .then((data) => {
      fakeSend(`\nWait a minute..\n`);
      if (data[0].url[0].type === "mp4") {
        sock.sendMessage(from, { video: { url: data[0].url[0].url } });
      } else if (data[0].url[0].type === "jpg") {
        sock.sendMessage(from, { image: { url: data[0].url[0].url } });
      }
    })
    .catch((e) => {
      reply(String(e));
    });
  break;
case "ytmp3":
  if (!q) {
    return reply(`Example:\n${prefix + command} URL`);
  }
  fakeSend(`\nWai a minute..\n`);
  var urll = q;
  var yt = await dl.youtubedl(urll).catch(async () => await dl.youtubedl(url));
  var dl_url = await yt.audio["128kbps"].download();
  sock.sendMessage(from, { image: { url: yt.thumbnail }, caption: `*${yt.title}*` }, { quoted: msg });
  sock.sendMessage(from, { document: { url: dl_url }, fileName: yt.title + `.mp3`, mimetype: "audio/mp4", caption: `乂  *Y T - P L A Y*` }, { quoted: msg });
  break;
case "ytmp4":
  if (!q) {
    return reply(`Example:\n${prefix + command} URL`);
  }
  fakeSend(`\nWait a minute..\n`);
  var urlls = q;
  var yt = await dl.youtubedl(urlls).catch(async () => await dl.youtubedl(url));
  var dl_url = await yt.video["480p"].download();
  setTimeout(() => {
    sock.sendMessage(from, { video: { url: dl_url }, caption: `*${yt.title}*` });
  }, 3000);
  break;
case "yts":
case "ytsearch":
  if (!q) {
    return reply(`Example:\n${prefix + command} Alan Walker`);
  }
  try {
    const results = await youtubeSearch(q);
    if (results && results.videos.length > 0) {
      const video = results.videos[0];
      const response = `YouTube Search Results:
      Title: ${video.title}
      Description: ${video.description}
      Link: ${video.url}`;
      reply(response);
    } else {
      reply("no results found.");
    }
  } catch (error) {
    console.error("Error saat melakukan pencarian YouTube:", error);
    reply("Terjadi kesalahan saat melakukan pencarian YouTube.");
  }
  break;
 //Groups
case "close":
  if (!isGroup) {
    return reply("For use within groups only!");
  }
  if (!isGroupAdmins) {
    return reply("For group admins only!");
  }
  if (!isBotGroupAdmins) {
    return reply("Bot must be and admin first!");
  }
  await sock.groupSettingUpdate(from, "announcement");
  reply("Success.");
  break;
case "closetime":
case "ct":
  if (!isGroup) {
    return reply("For use within groups only!");
  }
  if (!isGroupAdmins) {
    return reply("For group admins only!");
  }
  if (!isBotGroupAdmins) {
    return reply("Bot must be an admin first!");
  }
  if (!args[1]) {
    return reply(`*Options:*\nseconds\nminutes\ntime\nday\n\n*Example:*\n${prefix + command} 20 seconds`);
  }
  let closeTimer;
  switch (args[1]) {
    case "seconds":
      closeTimer = args[0] * 1000;
      break;
    case "minutes":
      closeTimer = args[0] * 60000;
      break;
    case "time":
      closeTimer = args[0] * 3600000;
      break;
    case "day":
      closeTimer = args[0] * 86400000;
      break;
    default:
      return reply(`*Options:*\nseconds\nminutes\nday\ntime\n\n*Example:*\n${prefix + command} 20 seconds`);
  }
  reply(`${q} from now on`);
  setTimeout(() => {
    sock.groupSettingUpdate(from, "announcement");
    reply(`Success ${command} ${q}`);
  }, closeTimer);
  break;
case "demote":
case "dme":
case "dethrone":
  if (!isGroup) {
    return reply("For user within groups only!");
  }
  if (!isGroupAdmins) {
    return reply("For group admins only!");
  }
  if (!isBotGroupAdmins) {
    return reply("Bot must be an admin first!");
  }
  if (!msg.message.extendedTextMessage) {
    return reply("Reply target!");
  }
  demote = msg.message.extendedTextMessage.contextInfo.participant;
  await sock.groupParticipantsUpdate(from, [demote], "demote");
  reply("Success.");
  break;
case "hidetag":
  if (!q) {
    return reply(`Example:\n${prefix + command} Hidetag Malaaya`);
  }
  if (!isGroup) {
    return reply("For use within groups only!");
  }
  if (!isGroupAdmins) {
    return reply("For group admins only!");
  }
  let mem = participants.map((i) => i.id);
  sock.sendMessage(from, { text: q ? q : "", mentions: mem }, { quoted: msg });
  break;
case "kick":
case "rm":
  if (!isGroup) {
    return reply("For use within groups only!");
  }
  if (!isGroupAdmins) {
    return reply("For group admins only!");
  }
  if (!isBotGroupAdmins) {
    return reply("Bot must be an admin first!");
  }
  if (!msg.message.extendedTextMessage) {
    return reply("Reply targetnya!");
  }
  remove = msg.message.extendedTextMessage.contextInfo.participant;
  await sock.groupParticipantsUpdate(from, [remove], "remove");
  break;
case "opentime":
case "ot":
  if (!isGroup) {
    return reply("For use within groups only!");
  }
  if (!isGroupAdmins) {
    return reply("For group admins only!");
  }
  if (!isBotGroupAdmins) {
    return reply("Bot must be an admin first!");
  }
  if (!args[1]) {
    return reply(`*Options:*\nseconds\nminutes\ntime\nday\n\n*Example:*\n${prefix + command} 20 seconds`);
  }
  let openTimer;
  switch (args[1]) {
    case "seconds":
      openTimer = args[0] * 1000;
      break;
    case "minutes":
      openTimer = args[0] * 60000;
      break;
    case "time":
      openTimer = args[0] * 3600000;
      break;
    case "day":
      openTimer = args[0] * 86400000;
      break;
    default:
      return reply(`*Options:*\nseconds\nminutes\nday\nhari\n\n*Example:*\n${prefix + command} 20 seconds`);
  }
  reply(`${q} starting from now`);
  setTimeout(() => {
    sock.groupSettingUpdate(from, "not_announcement");
    reply(`Success ${command} ${q}`);
  }, openTimer);
  break;
case "open":
  if (!isGroup) {
    return reply("Only for use within groups!!");
  }
  if (!isGroupAdmins) {
    return reply("For group admins only!");
  }
  if (!isBotGroupAdmins) {
    return reply("Bot must be an admin first!");
  }
  await sock.groupSettingUpdate(from, "not_announcement");
  reply("Success.");
  break;
case "promote":
case "pme":
  if (!isGroup) {
    return reply("Only for use within groups!");
  }
  if (!isGroupAdmins) {
    return reply("For group admins only!");
  }
  if (!isBotGroupAdmins) {
    return reply("Bot must be an admin first!");
  }
  if (!msg.message.extendedTextMessage) {
    return reply("Reply target!");
  }
  promote = msg.message.extendedTextMessage.contextInfo.participant;
  await sock.groupParticipantsUpdate(from, [promote], "promote");
  reply("Success.");
  break;
case "setdescgroup":
case "setdesc":
case "sd":
  if (!isGroup) {
    return reply("Only for use within groups!");
  }
  if (!isGroupAdmins) {
    return reply("For group admins only!");
  }
  if (!isBotGroupAdmins) {
    return reply("Bot must be an admin first!");
  }
  if (!q) {
    return reply(`Example:\n${prefix + command} Admin powerful`);
  }
  await sock.groupUpdateDescription(from, q)
    .then(() => reply("Success."))
    .catch(() => reply("Sorry, an error occurred"));
  break;
case "setnamegroup":
case "setname":
case "sn":
  if (!isGroup) {
    return reply("For use within groups only!");
  }
  if (!isGroupAdmins) {
    return reply("For group admins only!");
  }
  if (!isBotGroupAdmins) {
    return reply("Bot must be an admin first!");
  }
  if (!q) {
    return reply(`Example:\n${prefix + command} Naruto WhatsApp Bot`);
  }
  await sock.groupUpdateSubject(from, q)
    .then(() => reply("Success."))
    .catch(() => reply("Sorry, an error occurred"));
 //Maker
  break;
case "comic-logo":
case "cl":

  if (!q) {
    return reply(`Example:\n${prefix + command} Malik`);
  }
  sock.sendMessage(from, {
    caption: q,
    image: {
      url: `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=comics-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text=${q}`,
    },
  }, { quoted: msg });
  break;
case "runner-logo":
case "rl":
  if (!q) {
    return reply(`Example:\n${prefix + command} Malik`);
  }
  fakeSend(`\nWait a minute..\n`);
  sock.sendMessage(from, {
    caption: q,
    image: {
      url: `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=runner-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text=${q}`,
    },
  }, { quoted: msg });
  break;
case "starwars-logo":
case "sl":
  if (!q) {
    return reply(`Example:\n${prefix + command} Malik`);
  }
  fakeSend(`\nWait a minute..\n`);
  sock.sendMessage(from, {
    caption: q,
    image: {
      url: `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=star-wars-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text=${q}`,
    },
  }, { quoted: msg });
  break;
case "style-logo":
case "style":
  if (!q) {
    return reply(`Example:\n${prefix + command} Malik`);
  }
  fakeSend(`\nWait a minute..\n`);
  sock.sendMessage(from, {
    caption: q,
    image: {
      url: `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=style-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text=${q}`,
    },
  }, { quoted: msg });
  break;
case "joebiden":
  if (!q) {
    return reply(`Example:\n${prefix + command} Malik`);
  }
  fakeSend(`\nWait a minute..\n`);
  sock.sendMessage(from, {
    caption: q,
    image: {
      url: `https://api-xcoders.site/api/maker/biden?text=${q}&apikey=${xcoders}`,
    },
  }, { quoted: msg });
  break;
case "water-logo":
case "wl":
  if (!q) {
    return reply(`Example:\n${prefix + command} Malik`);
  }
  fakeSend(`\nWait a minute..\n`);
  sock.sendMessage(from, {
    caption: q,
    image: {
      url: `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text=${q}`,
    },
  }, { quoted: msg });
  break;
case "ledrun":
  if (!q) {
    return reply(`Example:\n${prefix + command} Naruto WhatsApp Bot`);
  }
  fakeSend(`\nWait a minute..\n`);
  sock.sendMessage(from, {
    caption: q,
    video: {
      url: `https://mfarels.my.id/api/led-runningtext?text=${q}`,
    },
  }, { quoted: msg });
  break;
      /* Others */
case "alki":
case "alkitab":
  if (!q) {
    return reply(`Example:\n${prefix + command} Kejadian`);
  }
  let res = await fetch(`https://alkitab.me/search?q=${encodeURIComponent(q)}`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36",
    },
  });
  if (!res.ok) {
    throw await res.text();
  }
  let html = await res.text();
  let { document } = new JSDOM(html).window;
  let ResultRess = [...document.querySelectorAll("div.vw")].map((el) => {
    let a = el.querySelector("a");
    let p = el.querySelector("p");
    return {
      teks: p ? p.textContent.trim() : "",
      link: a ? a.href : "",
      title: a ? a.textContent.trim() : "",
    };
  });
  reply(ResultRess.map((v) => `${v.title}\n${v.teks}`).join("\n────────\n"));
  break;
case "artname":
  if (!q) {
    return reply(`Example:\n${prefix + command} Nathanael`);
  }
  const name = q;
  const artiNama = await funcArtiNama(name);
  const resultss = `Artname of ${name}: ${artiNama}`;
  reply(resultss);
  break;
case "cuaca":
  if (!q) {
    return reply(`Example:\n${prefix + command} Yogyakarta`);
  }
  await fakeSend(`\nWait a minute..\n`);
  var { status, data: resultInfo } = await clph.search.cuaca(q);
  if (status != 200) {
    return reply(`District ${q} not found!`);
  }
  reply(
    parseRes(resultInfo, {
      title: "Weather Today",
    })
  );
  break;
case "ai":
  if (!q) {
    return reply(`Example:\n${prefix + command} What is coding?`);
  }
  dylux
    .ChatGpt(`${encodeURIComponent(q)}`)
    .then((data) => {
      fakeSend(data.text);
    })
    .catch((err) => {
      reply(err);
    });
  break;
case 'fouadinfo':
  const result = await modsFouad();
  let replyMessage = '';
  if (result.com_whatsapp) {
    replyMessage += `WhatsApp: ${result.com_whatsapp.name}\n${result.com_whatsapp.link}\n\n`;
  }
  if (result.com_fmwhatsapp) {
    replyMessage += `FMWhatsApp: ${result.com_fmwhatsapp.name}\n${result.com_fmwhatsapp.link}\n\n`;
  }
  if (result.com_gbwhatsapp) {
    replyMessage += `GBWhatsApp: ${result.com_gbwhatsapp.name}\n${result.com_gbwhatsapp.link}\n\n`;
  }
  if (result.com_yowhatsapp) {
    replyMessage += `YoWhatsApp: ${result.com_yowhatsapp.name}\n${result.com_yowhatsapp.link}`;
  }
  fakeSend(replyMessage);
  break;
case "get":
case "fetch":
  if (!q) {
    return reply(`Example:\n${prefix + command} https://github.com/mohalicious`);
  }
  if (!/^https?:\/\//.test(q)) {
    return reply("URL is Invalid!");
  }
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  if (body.match(/(mp4)/gi)) {
    fetch(`${q}`, requestOptions)
      .then((res) => sock.sendMessage(from, { video: { url: `${q}` }, mimetype: "video/mp4", caption: "Success" }, { quoted: msg }))
      .catch((error) => reply("Error", error));
  } else if (body.match(/(mp3)/gi)) {
    fetch(`${q}`, requestOptions)
      .then((res) => sock.sendMessage(from, { audio: { url: `${q}` }, mimetype: "audio/mp4", fileName: "Audio" }, { quoted: msg }))
      .catch((error) => reply("Error", error));
  } else if (body.match(/(png|jpg|jpeg)/gi)) {
    fetch(`${q}`, requestOptions)
      .then((res) => sock.sendMessage(from, { image: { url: `${q}` }, caption: "Success" }, { quoted: msg }))
      .catch((error) => reply("Error", error));
  } else {
    fetch(`${q}`, requestOptions)
      .then((response) => response.text())
      .then((result) => reply(result))
      .catch((error) => reply("Error", error));
  }
  break;
case "lyrics":
  if (!q) {
    return reply(`Example:\n${prefix + command} One Last Time : Ariana`);
  }
  dylux
    .lyrics(`${encodeURIComponent(q)}`)
    .then((data) => {
      let txt = `*Title:* ${data.title}\n`;
      txt += `*Artist:* ${data.artist}\n\n`;
      txt += `${data.lyrics}`;
      sock.sendMessage(from, { image: { url: data.thumb }, caption: txt }, { quoted: msg });
    })
    .catch((err) => {
      fakeSend(err);
    });
  break;
case "owner":
  const vcard =
    "BEGIN:VCARD\n" +
    "VERSION:3.0\n" +
    `FN:${ownerName}\n` +
    `ORG:${botName};\n` +
    `TEL;type=MSG;type=CELL;type=VOICE;waid=${ownerNumber[ownerNumber.length - 1].split("@")[0]}:+${ownerNumber[ownerNumber.length - 1].split("@")[0]}\n` +
    "END:VCARD";
  sock.sendMessage(from, {
    contacts: {
      displayName: ownerName,
      contacts: [{ vcard }],
    },
  });
  break;
case "runtime":
case "tes":
  fakeSend(`${runtime(process.uptime())}`);
  break;
case "shortlink":
  if (!q) {
    return reply(`Example:\n${prefix + command} URL`);
  }
  fakeSend(`\nWait a minute..\n`);
  const apishort = `https://xyros.my.id/api/shorturl?url=${q}`;
  const urlqr = `https://xyros.my.id/api/qrgen?keyword=${apishort}`;
  fetch(apishort)
    .then(response => response.json())
    .then(data => {
      sock.sendMessage(from, {
        image: { url: urlqr },
        caption: `${data.result}`,
      });
    })
    .catch(error => {
      console.error(error);
      reply("An error occurred");
    });
  break;
case "ssweb":
  if (!q) {
    return reply(`Example:\n${prefix + command} URL`);
  }
  fakeSend(`\n
Wait a minute..\n`);
  sock.sendMessage(from, {
    image: { url: `https://image.thum.io/get/width/1900/crop/1000/fullpage/${q}` },
    caption: `Success`,
  }, { quoted: msg });
  break;
case "sticker":
case "s":
  if (!(isImage || isQuotedImage || isVideo || isQuotedVideo)) {
    return reply("Reply media!");
  }
  let stream = await downloadContentFromMessage(msg.message[mediaType], mediaType.replace("Message", ""));
  let stickerStream = new PassThrough();
  if (isImage || isQuotedImage) {
    ffmpeg(stream)
      .on("start", function (cmd) {
        console.log(`Started: ${cmd}`);
      })
      .on("error", function (err) {
        console.log(`Error: ${err}`);
      })
      .on("end", function () {
        console.log("Finish");
      })
      .addOutputOptions([
        "-vcodec",
        "libwebp",
        "-vf",
        "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15,pad=320:320:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse",
      ])
      .toFormat("webp")
      .writeToStream(stickerStream);
    sock.sendMessage(from, { sticker: { stream: stickerStream } });
  } else if (isVideo || isQuotedVideo) {
    ffmpeg(stream)
      .on("start", function (cmd) {
        console.log(`Started: ${cmd}`);
      })
      .on("error", function (err) {
        console.log(`Error: ${err}`);
      })
      .on("end", async () => {
        sock.sendMessage(from, { sticker: { url: `./${sender}.webp` } }).then(() => {
          fs.unlinkSync(`./${sender}.webp`);
          console.log("Success");
        });
      })
      .addOutputOptions([
        "-vcodec",
        "libwebp",
        "-vf",
        "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15,pad=320:320:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse",
      ])
      .toFormat("webp")
      .save(`./${sender}.webp`);
  }
  break;
case "waifu":
  try {
    const response = await axios.get("https://waifu.pics/api/sfw/waifu");
    const data = response.data.url;
    sock.sendMessage(
      from,
      {
        image: { url: data },
        caption: `🥰`,
      },
      { quoted: msg }
    );
  } catch (error) {
    console.error("Error:", error);
    reply("Sorry, there was an error loading the waifu image.");
  }
            break
case "truecaller":
  if (!q || !q.startsWith("+")) return reply(`Example:\n${prefix + command} +254796032440`);
  reply(`Please wait a moment, your request is being processed`);
  const anu = await fetch(`https://outrageous-fish-dress.cyclic.app/api/other/truecaller?number=${q}`);
  let api = await anu.json();
  const anuress = `*${q} Number Truecaller:*
  
*• Name*: ${api.data.data[0].name}
*• Access*: ${api.data.data[0].access}
*• Score*: ${api.data.data[0].score}
*• E164*: ${api.data.data[0].phones[0].e164Format}
*• National*: ${api.data.data[0].phones[0].nationalFormat}
*• Dialing Code*: ${api.data.data[0].phones[0].dialingCode}
*• Country Code*: ${api.data.data[0].phones[0].countryCode}
*• Time Zone*: ${api.data.data[0].addresses[0].timeZone}
*• Company*: ${api.data.data[0].phones[0].carrier}
*• Type*: ${api.data.data[0].phones[0].type}`;
  reply(anuress);

  break;
default:
  if (!isOwner) return;
  if (body.startsWith(">")) {
    try {
      let value = await (async () => {
        return await eval(body.slice(1));
      })();
      await reply(format(value));
    } catch (e) {
      await reply(e.toString());
    }
  }
  
  if (!isOwner) return;
  if (body.startsWith("<")) {
    try {
      let value = await eval(`(async () => { return ${body.slice(1)} })()`);
      await reply(format(value));
    } catch (e) {
      await reply(e);
    }
  }
}
});
};
start();

//Thank You🦄
