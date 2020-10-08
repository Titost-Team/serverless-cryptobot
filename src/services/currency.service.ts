import {getCurrencyInfoMessage, getExchangeRateInfoMessage} from './message.service';
import * as cryptocurrencies from '../../cryptocurrencies.json';

const CoinGecko = require('coingecko-api');

const coingeckoClient = new CoinGecko();

export const getInfo = async (symbol: string): Promise<string> => {
  const currencyId = cryptocurrencies.find(cc => cc.symbol === symbol.toLowerCase()).id;
  if (!currencyId) return `Currency witn *${symbol}* not found!`;

  const currency =
    await coingeckoClient.coins.fetch(currencyId, {tickers: false, community_data: false, developer_data: false, localization: false})
      .then(response => response.data.market_data)
      .catch(() => `Currency with *${symbol}* not found!`);
  
  return getCurrencyInfoMessage({...currency, symbol});
}

export const getExchangeRateInfo = async (amount: number = 10): Promise<string> => {
  if (amount > 250 || amount < 1) return 'Amount should be more than 0 and less than 250';

  const currencies =
    await coingeckoClient.coins.markets({localization: false, per_page: amount})
      .then(response => response.data)
      .catch(() => 'Internal server error');
  
  return getExchangeRateInfoMessage(currencies);
}
