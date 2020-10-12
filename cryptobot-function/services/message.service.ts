import {Constants} from "../common/constants";
import {ICurrencyInfoRes} from "../dto/currency-info.res";
import {IExchangeRateInfoRes} from "../dto/exchange-rate-info.res";

export const getExchangeRateInfoMessage = (currencies: IExchangeRateInfoRes[]): string => {
  return currencies.reduce((acc, curr) => acc += `${curr.symbol.toUpperCase()}:\t$${curr.current_price}\n`, '');
}

export const getCurrencyInfoMessage = (currency: ICurrencyInfoRes): string => {
  let message = `${currency.symbol.toUpperCase()}\n\n`;
  message += `Currency price: $${currency.current_price.usd}\n\n`;

  message += `Price change 24H: ${currency.price_change_percentage_24h.toFixed(2)}%\n`;
  message += `Price change 7D: ${currency.price_change_percentage_7d.toFixed(2)}%\n`;
  message += `Price change 14D: ${currency.price_change_percentage_14d.toFixed(2)}%\n`;
  message += `Price change 30D: ${currency.price_change_percentage_30d.toFixed(2)}%\n`;
  message += `Price change 60D: ${currency.price_change_percentage_60d.toFixed(2)}%\n\n`;

  message += `Market cap rank: ${currency.market_cap_rank}\n`;
  message += `Market cap: $${(currency.market_cap.usd / 1000000).toFixed(2)}M`;

  return message;
}

export const helpMessage = `Command reference:
/${Constants.Start} - Start bot (mandatory in groups)
/${Constants.GetInfo} $CURRENCY - Get information about currency
/${Constants.GetExchangeRate} $AMOUNT - Get exchange rate
/${Constants.About} - Show information about the bot
/${Constants.Help} - Show this help page`;

export const startMessage = `Hello, I'm your personal crypto bot, simply use the commands to view cryptocurrency exchange information\n\n${helpMessage}`;

export const abouMessage = `This bot was created by https://github.com/Titost-Team\nSource code and contact information can be found at https://github.com/Titost-Team/serverless-cryptobot`;
