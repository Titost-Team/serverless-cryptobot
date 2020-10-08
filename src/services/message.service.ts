import {IGetCurrencyInfoDto} from "../dto/get-currency-info.dto";
import {IGetExchangeRateInfoDto} from "../dto/get-exchange-rate-info.dto";

export const getCurrencyInfoMessage = (currency: IGetCurrencyInfoDto): string => {
  let message = `*${currency.symbol.toUpperCase()}*\n\n`;
  message += `Currency price: *$${currency.current_price.usd}*\n\n`;

  message += `Price change 24H: *${currency.price_change_percentage_24h.toFixed(2)}%*\n`;
  message += `Price change 7D: *${currency.price_change_percentage_7d.toFixed(2)}%*\n`;
  message += `Price change 14D: *${currency.price_change_percentage_14d.toFixed(2)}%*\n`;
  message += `Price change 30D: *${currency.price_change_percentage_30d.toFixed(2)}%*\n`;
  message += `Price change 60D: *${currency.price_change_percentage_60d.toFixed(2)}%*\n\n`;

  message += `Market cap rank: *${currency.market_cap_rank}*\n`;
  message += `Market cap: *$${(currency.market_cap.usd / 1000000).toFixed(2)}M*`;

  return message;
}

export const getExchangeRateInfoMessage = (currencies: IGetExchangeRateInfoDto[]): string => {
  let message = '';

  for (let currency of currencies) {
    message += `*${currency.symbol.toUpperCase()}:\t$${currency.current_price}*\n`;
  }

  return message;
}
