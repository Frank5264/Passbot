let handler = m => m;

handler.before = async function (m, { conn }) {
  let body = m.text;
  let chat = m.sender;

  if (chat === "201559835871@s.whatsapp.net") {
    // مصفوفة الكلمات المحفوظة
    let savedWords = ["erea.111970", "erea&malek.111970", "frank24"];

    // مصفوفة الكلمات أو العبارات غير الإنجليزية
    let nonEnglishWords = [
      { word: "مرحبا", response: "أهلاً! كيف يمكنني مساعدتك؟" },
      { word: "كيف حالك", response: "أنا بخير، شكراً لسؤالك!" },
      { word: "ما اسمك", response: "أنا بوت واتساب، سعيد بخدمتك!" }
    ];

    // التحقق مما إذا كانت الرسالة تحتوي على حروف إنجليزية
    if (/[a-zA-Z]/.test(body)) {
      let matched = false;
      let highestSimilarity = 0;

      for (let word of savedWords) {
        let similarity = getSimilarity(body, word);
        if (similarity === 100) {
          matched = true;
          break;
        }
        if (similarity > highestSimilarity) {
          highestSimilarity = similarity;
        }
      }

      if (matched) {
        conn.reply(m.chat, "انتي صدقتي يهبلة 😂 \n امشي العبي بعيد ي شاطرة 😒\n بطلت اشحت ", m);

        setTimeout(() => {
          conn.reply(m.chat, "بهزر 😂\n الف مبروك يقموصة 🎉 \n اتصلي بيا رصيد ، انا عارف انك بخيلة بس تعالي ع نفسك المرة دي 😂", m);
        }, 2000); // تأخير قدره ثانيتان

      } else {
        let replyMessage = "";

        if (highestSimilarity < 50) {
          replyMessage = `غلط ❌️ \n نسبة التشابه ${highestSimilarity.toFixed(2)}%.\nفكري عدل ي بخيلة 😒!`;
        } else if (highestSimilarity < 70) {
          replyMessage = `غلط ❌️ \n نسبة التشابه ${highestSimilarity.toFixed(2)}%.\n عاش قربتي 🤥😂.`;
        } else if (highestSimilarity < 80) {
          replyMessage = `غلط ❌️ \n نسبة التشابه ${highestSimilarity.toFixed(2)}%. عااش فاضللك تكة ي بخيلة 😅😂!`;
        } else {
          replyMessage = `غلط ❌️ \n نسبة التشابه ${highestSimilarity.toFixed(2)}%. تقريبًا هناك!`;
        }

        conn.reply(m.chat, replyMessage, m);
      }
    } else {
      let nonEnglishMatched = false;
      
      for (let item of nonEnglishWords) {
        if (body.includes(item.word)) {
          conn.reply(m.chat, item.response, m);
          nonEnglishMatched = true;
          break;
        }
      }

      if (!nonEnglishMatched) {
      
      }
    }
  }
};

function getSimilarity(a, b) {
  const distance = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length);
  return (1 - distance / maxLen) * 100;
}

// دالة حساب مسافة ليفنشتاين
function levenshtein(a, b) {
  const alen = a.length;
  const blen = b.length;
  const matrix = [];

  if (alen === 0) return blen;
  if (blen === 0) return alen;

  for (let i = 0; i <= alen; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= blen; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= alen; i++) {
    for (let j = 1; j <= blen; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // حذف
        matrix[i][j - 1] + 1, // إضافة
        matrix[i - 1][j - 1] + cost // استبدال
      );
    }
  }

  return matrix[alen][blen];
}

export default handler;
