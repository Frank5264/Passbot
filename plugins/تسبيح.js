import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  // تحقق مما إذا كانت الرسالة تحتوي على كلمة 'ذكر'
  if (m.text && m.text.toLowerCase().includes('ذكر')) {
    try {
      // جلب النص من الAPI الجديد
      const response = await fetch('https://ayah.nawafdev.com/api/dekr?types=t&ignore_errors=false');
      const data = await response.json();

      // استخراج قيمة العنصر content من الاستجابة
      const ayahContent = data.content;
      const ayahDescription = data.description;

      // إرسال النص للمستخدم
      m.reply("•┈┈•🌺 ❀ 🍃🌸 🍃 ❀ 🌺•┈┈•\n_*الذكر*_: \n﴿" + ayahContent + "﴾\n _*فضلهُ*_ : \n"+ayahDescription+"\n•┈┈•🍁 ❀ 🍃🌸 🍃 ❀ 🍁•┈┈•");
    } catch (error) {
      console.error(error);
      m.reply('حدث خطأ في جلب الذكر. يرجى المحاولة مرة أخرى.');
    }
  }
};

handler.help = ['Tasbe7'];
handler.tags = ['prayer'];
handler.command = /^(ذكر)$/i;

export default handler;