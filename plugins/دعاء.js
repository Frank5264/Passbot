import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  // تحقق مما إذا كانت الرسالة تحتوي على كلمة 'ذكر'
  if (m.text && m.text.toLowerCase().includes('ذكر')) {
    try {
      // جلب النص من الAPI الجديد
      const response = await fetch('https://ayah.nawafdev.com/api/dekr?types=pd%2Cqd&ignore_errors=false');
      const data = await response.json();

      // استخراج قيمة العنصر content من الاستجابة
      const ayahContent = data.content;

      // إرسال النص للمستخدم
      m.reply("•┈┈•🌺 ❀ 🍃🌸 🍃 ❀ 🌺•┈┈•\n\n﴿" + ayahContent + "﴾\n \n•┈┈•🍁 ❀ 🍃🌸 🍃 ❀ 🍁•┈┈•");
    } catch (error) {
      console.error(error);
      m.reply('حدث خطأ في جلب الذكر. يرجى المحاولة مرة أخرى.');
    }
  }
};

handler.help = ['do3aa'];
handler.tags = ['prayer'];
handler.command = /^(دعاء)$/i;

export default handler;