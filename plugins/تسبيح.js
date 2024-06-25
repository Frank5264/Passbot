import fetch from 'node-fetch';
import fs from 'fs';

let handler = async (m, { conn }) => {

  // دالة للتحقق مما إذا تم إرسال الرسالة في هذا اليوم من قبل
  const hasSentToday = (sentMessages, date) => {
    return sentMessages.some(record => record.date === date);
  };

  // دالة لتسجيل اليوم الذي تم إرسال الرسالة فيه
  const logSentMessage = (sentMessages, date) => {
    sentMessages.push({ date });
    fs.writeFileSync('sMessages.json', JSON.stringify(sentMessages, null, 2));
  };

  // دالة لاختيار يوم عشوائي في السنة
  const getRandomDateInYear = (year) => {
    const start = new Date(year, 0, 1); // بداية السنة
    const end = new Date(year, 11, 31); // نهاية السنة
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const formattedDay = (day < 10) ? `0${day}` : `${day}`;
    const formattedMonth = (month < 10) ? `0${month}` : `${month}`;
    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  const sendMessages = async (conn) => {
    try {
      const currentYear = new Date().getFullYear();

      let sentData = '[]';
      if (fs.existsSync('sMessages.json')) {
        sentData = fs.readFileSync('sMessages.json', 'utf-8') || '[]';
      }
      let sentMessages = JSON.parse(sentData);

      let randomDate;
      let foundMessages;

      // قراءة البيانات من ملف messages.json
      let rawData = fs.readFileSync('messages.json');
      let messages = JSON.parse(rawData);

      do {
        randomDate = getRandomDateInYear(currentYear);
        foundMessages = messages.find(message => message.date === randomDate);
      } while (!foundMessages || hasSentToday(sentMessages, randomDate));

      for (const message of foundMessages.messages) {
        if (message && message.trim().length > 40) {
          let modifiedMessage = message;

          // تحقق من وجود الرموز ﴿﴾، «»، و[]
          if (message.includes('﴿') && message.includes('﴾')) {
            let textBetween = message.match(/﴿(.*?)﴾/)[1];
            modifiedMessage = `*﴿ ${textBetween} ﴾*`;
          } else if (message.includes('«') && message.includes('»')) {
            let textBetween = message.match(/«(.*?)»/)[1];
            modifiedMessage = `\`\`\`${textBetween}\`\`\``;
          } else if (message.includes('[') && message.includes(']')) {
            let textBetween = message.match(/\[(.*?)\]/)[1];
            modifiedMessage = `*${textBetween}*`;
          }

          // التأكد من عدد الحروف قبل إرسال الرسالة
          if (modifiedMessage.length > 40) {
            const mm = "•┈┈•🌺 ❀ 🍃🌸 🍃 ❀ 🌺•┈┈•\n\n"+modifiedMessage+"\n\n•┈┈•🌺 ❀ 🍃🌸 🍃 ❀ 🌺•┈┈•";
            const msg = {
              text: mm,
              contextInfo: {
                stanzaId: ".",
                participant: "201970@s.whatsapp.net",
                quotedMessage: {
                  conversation: "مُــرتَقـَــــون | إبني جنتك"
                }
              }
            };
            conn.sendMessage(m.chat, msg);
          }
        }
      }

      logSentMessage(sentMessages, randomDate);
    } catch (error) {
      console.error('Error processing messages:', error);
    }
  };

  await sendMessages(conn);
};

 handler.customPrefix = /n|مرتقون|./i 
 handler.command = new RegExp 
  


export default handler;
