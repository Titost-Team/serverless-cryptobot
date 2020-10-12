import {TelegrafContext} from "telegraf/typings/context"

export const commandArgs = (ctx: TelegrafContext): string[] => {
  return ctx.update.message.text
    .split(' ')
    .slice(1);
}
