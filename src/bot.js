import { config } from "dotenv";
import { Telegraf } from "telegraf";
import { CohereClient } from "cohere-ai";

import { message } from "telegraf/filters";

config();


const bot = new Telegraf(process.env.TOKEN_BOT);
const cohere = new CohereClient({
   token : process.env.TOKEN_COHERE
})



bot.start(ctx => ctx.reply(`Hola ${ctx.message.chat.first_name} soy un asistente virtual. En que te puedo ayudar? `));

bot.on(message('text'), async (ctx) => {
   try {
      const msg = ctx.text;
      console.log(msg)
      const response = await cohere.generate({
         model: "c4ai-aya-23",
         prompt: msg, 
         maxTokens: 300,
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


console.log('Bot Funcionando...')

export default bot;

