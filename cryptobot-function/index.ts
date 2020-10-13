import {AzureFunction} from '@azure/functions';
import {Context, Telegraf} from 'telegraf';
import {Constants} from './common/constants';
import {commandArgs} from './common/utils/command-args.utils';
import {getExchangeRateInfo, getInfo} from './services/currency.service';
import {abouMessage, helpMessage, startMessage} from './services/message.service';

require('dotenv').config();

let bot: Telegraf<Context>;

const httpTrigger: AzureFunction = (): void => {
};

const telegramBotInit = (): void => {
  try {
    bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN, {telegram: {webhookReply: true}});
    bot.telegram.setWebhook(process.env.WEBHOOK_ADDRESS);

    bot.start((ctx) => ctx.reply(startMessage));
    bot.help((ctx) => ctx.reply(helpMessage));
    bot.command(Constants.About, (ctx) => ctx.reply(abouMessage));
    bot.command(Constants.GetExchangeRate, async (ctx) => {
      const args = commandArgs(ctx);
      const info = await getExchangeRateInfo(args[0]);
      ctx.reply(info);
    });
    bot.command(Constants.GetInfo, async (ctx) => {
      const args = commandArgs(ctx);
      const info = await getInfo(args[0]);
      ctx.reply(info);
    });
    bot.launch();
  } catch (err) {
    console.log(`The initialization of the telegram bot ended up with a error: ${err}`);
  }
}

const checkTelegramBotInstance = (): void => {
  if (!bot) telegramBotInit();
}

checkTelegramBotInstance();

export default httpTrigger;