import fetch from 'node-fetch';
import path from 'path';
import fs from 'fs-extra';

const getRandomImage = async () => {

 const __dirname = path.resolve();
        const photo = fs.readJsonSync(path.join(__dirname, './video.json'));
  const random = photo[Math.floor(Math.random() * photo.length)];
  return random?.path;
};

const handler = async (m, { conn, command, participants, usedPrefix, text }) => {
  try {
    await conn.sendMessage(m.chat, {
    react: {
        text: "🔁",
        key: m.key
    }
})
    const randomImageUrl = await getRandomImage();

    const frank = '201015817243@s.whatsapp.net'; // ÙÙÙÙ Ø£Ù ÙÙÙÙ Ø§ÙØ®Ø§Øµ Ø¨Ù
  
    
        //conn.sendMessage(m.chat, {document: {url: randomImageUrl}, mimetype: 'video/mp4'}, {quoted: m});
    await conn.sendMessage(m.chat, {
    react: {
        text: "⬆️",
        key: m.key
    }
})
         const vid = await conn.sendMessage(m.chat, {video: {url: randomImageUrl}, caption: `*↰ الــــــدال عــــلـــى الــخـــيــر كــــفـــاعــــــلــــه*\n ◉ مطور البوت : 𝓕𝓷 ᯤ̸`}, {quoted: m});
   await conn.sendMessage(m.chat, {
    react: {
        text: "✅️",
        key: m.key
    }
})
    await conn.sendMessage(m.chat, {
    react: {
        text: "💙",
        key: vid.key
    }
})
  } catch (error) {
    console.error(error);
    m.reply(error);
  }
};

handler.help = ["quranVideo"];
handler.tags = ["quran"];
handler.command = /^(قصة|قصه|حالة|حاله|قران|قرآن)$/i;

export default handler;