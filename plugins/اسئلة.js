import fetch from 'node-fetch';
import path from 'path';
import fs from 'fs-extra';

const handler = async (m, { conn, command, participants, usedPrefix, text }) => {
  try {
    // قراءة ملف quiz.json
    let rawData = fs.readFileSync('quiz.json');
    let quizData = JSON.parse(rawData);

    // قراءة ملف sent_questions.json
    let sentQuestionsData;
    const sentQuestionsFilePath = 'sent_questions.json';
    if (fs.existsSync(sentQuestionsFilePath)) {
      sentQuestionsData = JSON.parse(fs.readFileSync(sentQuestionsFilePath));
    } else {
      sentQuestionsData = {};
    }

    // الحصول على قائمة الأسئلة التي تم إرسالها في هذه المحادثة
    let chatId = m.chat;
    let sentQuestions = sentQuestionsData[chatId] || [];

    // اختيار سؤال عشوائي غير مرسل من قبل
    let availableQuestions = quizData.quiz.filter(q => !sentQuestions.some(sq => sq.question === q.qu));
    if (availableQuestions.length === 0) {
      await conn.sendMessage(m.chat, { text: "تم إرسال جميع الأسئلة المتاحة لهذه المحادثة." });
      return;
    }
    let randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];

    // ترتيب الخيارات عشوائيًا
    let options = [randomQuestion.ans1, randomQuestion.ans2, randomQuestion.ans3].sort(() => Math.random() - 0.5);

    // تكوين نص الرسالة ليبدو كاستطلاع باستخدام القالب المطلوب
    let pollMessage = `◉ ${randomQuestion.qu}\n\n` +
                      `↰ ${options[0]} .\n` +
                      `↰ ${options[1]} .\n` +
                      `↰ ${options[2]} .`;
    let correctAnswerMessage = `☜︎ الاجابة الصحيحة : ${randomQuestion.ans1}`;

    // إرسال الرسالة باستخدام sendMessage
    const sentMessage = await conn.sendMessage(m.chat, { text: pollMessage });
    await conn.sendMessage(m.chat, { text: correctAnswerMessage });

    // تحديث ملف sent_questions.json
    sentQuestions.push({
      question: randomQuestion.qu,
      correctAnswer: randomQuestion.ans1, // الافتراض أن ans1 هو الإجابة الصحيحة
      messageId: sentMessage.key.id
    });
    sentQuestionsData[chatId] = sentQuestions;
    fs.writeFileSync(sentQuestionsFilePath, JSON.stringify(sentQuestionsData, null, 2));

  } catch (error) {
    console.error('Error processing quiz:', error);
  }
};

handler.help = ["quranVideo"];
handler.tags = ["quran"];
handler.command = /^(سؤال|سوال|اسئلة|أسئلة|اسئله|أسئله)$/i;

export default handler;
