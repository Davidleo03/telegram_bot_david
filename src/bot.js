import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { CohereClient } from "cohere-ai";


const bot = new Telegraf('7424067781:AAG-OT_ScEKogNYfMKZhc_clpEjrI1uaKDs');
const cohere = new CohereClient({
   token : 'NK1BGtDT8NcL1aySeUHX444525tibXzJuf8frbBI'
})

bot.start(ctx => ctx.reply(`Hola ${ctx.message.chat.first_name} soy un asistente virtual. En que te puedo ayudar? `));

bot.on(message('text'), async (ctx) => {
   try {
      const msg = ctx.text;
      console.log(msg)
      const response = await cohere.generate({
         model: "c4ai-aya-23",
         prompt: msg, 
         maxTokens: 500,
         temperature: 0.5,
         k: 0,
         p: 1, 
         stopSequences: [],
         returnLikelihoods: "NONE"
       });
      const { generations } = await response;
      ctx.reply(generations[0].text);
      
   } catch (error) {
      console.log(error);
      ctx.reply(`Ocurrió el siguiente error: ${error}`);
   }

})




export default bot;

