import { createServer } from "http";
import bot from './bot.js';

const port = 3000 || process.env.PORT;

createServer(await bot.createWebhook({ domain: "telegrambotdavid-production.up.railway.app" })).listen(port);

console.log('Bot está funcionando...');
