/* -------------------------------------------------------*/
/* [❗]                      [❗]                      [❗] */
/*                                                       */
/*       |- [ ⚠ ] - CREDITOS DEL CODIGO - [ ⚠ ] -|      */
/*     —◉ DESAROLLADO POR OTOSAKA:                       */
/*     ◉ Otosaka (https://github.com/6otosaka9)          */
/*     ◉ Número: wa.me/51993966345                       */
/*                                                       */
/*     —◉ FT:                                            */
/*     ◉ BrunoSobrino (https://github.com/BrunoSobrino)  */
/*                                                       */
/* [❗]                      [❗]                      [❗] */
/* -------------------------------------------------------*/
import fetch from 'node-fetch';
import axios from 'axios';
import translate from '@vitalets/google-translate-api';
import {Configuration, OpenAIApi} from 'openai';
const configuration = new Configuration({organization: global.openai_org_id, apiKey: global.openai_key});
const openaiii = new OpenAIApi(configuration);
const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;
if (!text) throw `*[❗] يرجى إدخال الفكرة العامة للقصيدة التي تريدها *\n\n*—◉ مثال على الاستخدام*\n*◉ ${usedPrefix + command} شعر للغزل في المحبوبة*\n*◉ ${usedPrefix + command} قصيدة للوفاء بالعهود بين الاصدقاء*\n*◉ ${usedPrefix + command} شعر عن عشق المحبوبة*\n*◉ ${usedPrefix + command} قصيدة في حب الوطن*`;
  try {

     await conn.sendMessage(m.chat, {
    react: {
        text: "📝",
        key: m.key
    }
})

    
        conn.sendPresenceUpdate('composing', m.chat);
        //let sistema1 = await fetch(`https://raw.githubusercontent.com/Skidy89/chat-gpt-jailbreak/main/Text.txt`).then(v => v.text());
        let sistema1 = `تصرف كانك بوت ذكاء صناعي تدعي الترا وانت مصمم لكتابة الشعر.`;
        async function getOpenAIChatCompletion(texto) {
        const openaiAPIKey = global.openai_key;
        let chgptdb = global.chatgpt.data.users[m.sender];
        chgptdb.push({ role: 'user', content: texto });
        const url = "https://api.openai.com/v1/chat/completions";
        const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${openaiAPIKey}` };
        const data = { "model": "gpt-3.5-turbo", "messages": [{ "role": "system", "content": sistema1 }, ...chgptdb, ]};
        const response = await fetch(url, {method: "POST", headers: headers, body: JSON.stringify(data)});
        const result = await response.json();
        const finalResponse = result.choices[0].message.content;
        return finalResponse;
        };
        let respuesta = await getOpenAIChatCompletion(text);
        if (respuesta == 'error' || respuesta == '' || !respuesta) return XD; // causar error undefined para usar otra api
        m.reply(`${respuesta}`.trim());
    } catch {
      try {
        conn.sendPresenceUpdate('composing', m.chat);
        const botIA222 = await openaiii.createCompletion({model: 'text-davinci-003', prompt: text, temperature: 0.3, max_tokens: 4097, stop: ['Ai:', 'Human:'], top_p: 1, frequency_penalty: 0.2, presence_penalty: 0});
        if (botIA222.data.choices[0].text == 'error' || botIA222.data.choices[0].text == '' || !botIA222.data.choices[0].text) return XD; // causar error undefined para usar otra api
        m.reply(botIA222.data.choices[0].text.trim());
    } catch {
      try {
        conn.sendPresenceUpdate('composing', m.chat);
        const syms1 = `تصرف كأنك بوت واتساب مصمم لكتابة الشعر للمستخدمين وصفهم للشعر المطلوب .`;
        const fgapi1 = await fetch(`https://api-fgmods.ddns.net/api/info/openai?text=${text}&symsg=${syms1}&apikey=XlwAnX8d`);
        const fgjson1 = await fgapi1.json();
        if (fgjson1.result == 'error' || fgjson1.result == '' || !fgjson1.result) return XD; // causar error undefined para lanzar msg de error
        m.reply(`${fgjson1.result}\n8`.trim());
    } catch {
      try {
        conn.sendPresenceUpdate('composing', m.chat);
        const vihangayt1 = await fetch(`https://vihangayt.me/tools/chatgpt?q=اكتب لي شعرا عن : ${text}`);
        const vihangaytjson1 = await vihangayt1.json();
        if (vihangaytjson1.data == 'error' || vihangaytjson1.data == '' || !vihangaytjson1.data) return XD; // causar error undefined para usar otra api
        m.reply(`${vihangaytjson1.data}`.trim());
    } catch {
      try {
        conn.sendPresenceUpdate('composing', m.chat);
        const vihangayt2 = await fetch(`https://vihangayt.me/tools/chatgpt2?q=${text}`);
        const vihangaytjson2 = await vihangayt2.json();
        if (vihangaytjson2.data == 'error' || vihangaytjson2.data == '' || !vihangaytjson2.data) return XD; // causar error undefined para usar otra api
        m.reply(`${vihangaytjson2.data}\n6`.trim());
    } catch {
      try {
        conn.sendPresenceUpdate('composing', m.chat);
        const vihangayt3 = await fetch(`https://vihangayt.me/tools/chatgpt3?q=${text}`);
        const vihangaytjson3 = await vihangayt3.json();
        if (vihangaytjson3.data == 'error' || vihangaytjson3.data == '' || !vihangaytjson3.data) return XD; // causar error undefined para usar otra api
        m.reply(`${vihangaytjson3.data}\n5`.trim());        
    } catch {
      try {
        conn.sendPresenceUpdate('composing', m.chat);
        const tioress22 = await fetch(`https://api.lolhuman.xyz/api/openai?apikey=${lolkeysapi}&text=${text}&user=${m.sender}`);
        const hasill22 = await tioress22.json();
        if (hasill22.result == 'error' || hasill22.result == '' || !hasill22.result) return XD; // causar error undefined para usar otra api
        const hasill22_result = await translate(`${hasill22.result}`, {to: 'ar', autoCorrect: true});
        m.reply(`${hasill22_result.text}\n4`.trim());
    } catch {
      try {
        conn.sendPresenceUpdate('composing', m.chat);
        const searchString2 = ' مصر ';
        const replacementString2 = ' الشرقية ';
        const rres = await fetch(`https://api.ibeng.tech/api/others/chatgpt?q=Hola&apikey=eMlBNRzUXv`);
        const jjson = await rres.json();
        const hahaha = await translate(`${jjson.data}`, {to: 'ar', autoCorrect: true});
        const sextS = hahaha.text;
        const replacedText = sextS.replace(searchString2, replacementString2).trim();
        m.reply(replacedText+"\n3");
    } catch {
      try {
        conn.sendPresenceUpdate('composing', m.chat);
        const akuariapi2 = await fetch(`https://api.akuari.my.id/ai/gpt?chat=${text}`);
        const akuariapijson2 = await akuariapi2.json();
        if (akuariapijson2.respon == 'error' || akuariapijson2.respon == '' || !akuariapijson2.respon) return XD; // causar error undefined para lanzar msg de error
        const akuariapiresult2 = await translate(`${akuariapijson2.respon}`, {to: 'ar', autoCorrect: true});
        m.reply(akuariapiresult2.text.trim()+"\n2");
    } catch {
      try {
        conn.sendPresenceUpdate('composing', m.chat);
        const akuariapi1 = await fetch(`https://api.azz.biz.id/api/bard?q=${text}&key=global`);
        const akuariapijson1 = await akuariapi1.json();
        if (akuariapijson1.respon == 'error' || akuariapijson1.respon == '' || !akuariapijson1.respon) return XD; // causar error undefined para usar otra api
        const akuariapiresult1 = await translate(`${akuariapijson1.respon}`, {to: 'ar', autoCorrect: true});
        m.reply(`${akuariapiresult1.text}\n1`.trim());
    } catch {
        throw `*[❗] 𝙴𝚁𝚁𝙾𝚁, 𝚅𝚄𝙴𝙻𝚅𝙰 𝙰 𝙸𝙽𝚃𝙴𝙽𝚃𝙰𝚁𝙻𝙾*`;
     }}
    }}
   }}
  }}
 }}

   await conn.sendMessage(m.chat, {
    react: {
        text: "✔️",
        key: m.key
    }
})
};
handler.command = /^(عنتره|عنتر|عنترة)$/i;
export default handler;
