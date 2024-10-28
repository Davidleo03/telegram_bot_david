import { createServer } from "http";
import bot from './bot.js';

const port = 3000 || process.env.PORT;

createServer(await bot.createWebhook({ domain: "https://telegram-bot-david-u9x7.onrender.com" })).listen(port);

console.log('Bot está funcionando...');
