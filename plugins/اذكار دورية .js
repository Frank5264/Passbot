import fetch from 'node-fetch';
import fs from 'fs/promises';

const handler = async (m, { conn, usedPrefix, command }) => {
  

  try {

 
  
    // الحصول على الوقت الحالي بتنسيق معين
    const currentTime = new Date().toLocaleTimeString('en-US', {
      timeZone: 'Africa/Cairo',
      hour: '2-digit',
      minute: '2-digit',
    });

    const { key } = await m.reply("starting ....");

    let currentIndex = 0;

    const upm = async () => {
      try {
          // جلب النص من الAPI الجديد
    const response = await fetch('https://ayah.nawafdev.com/api/dekr?types=pd%2Cqd&ignore_errors=false');
    const data = await response.json();

    // استخراج قيمة العنصر content من الاستجابة
    const ayahContent = data.content;

        const currentTime = new Date().toLocaleTimeString('en-US', {
      timeZone: 'Africa/Cairo',
      hour: '2-digit',
      minute: '2-digit',
    });

        // تحديث الرسالة باستخدام الرسالة الحالية في config ووقت النظام
        const updatedMessage = '•┈┈•🌺 ❀ 🍃🌸 🍃 ❀ 🌺•┈┈• \n\n*↰ '+ayahContent+'‎‌*\n ```◉ الوقت الحالي : '+currentTime+'``` \n\n•┈┈•🌺 ❀ 🍃🌸 🍃 ❀ 🌺•┈┈•';

        await conn.sendMessage(m.chat, { text: `${updatedMessage}`, edit: key }, { quoted: m });


        
        // استمرار التحديث كل دقيقة
        timeoutId = setTimeout(upm, 60000);
      } catch (error) {
        console.error(error);
      }
    };

    let timeoutId;

    upm();
  } catch (error) {
    console.error(error);
  }
};

handler.help = ['zekr'];
handler.tags = ['zekr'];
handler.group = true;
handler.admin = true;
handler.fail = null;
handler.command = /^(‎‌‎zekr)$/i;

export default handler; 