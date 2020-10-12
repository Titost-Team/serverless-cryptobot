import {getCurrencyInfoMessage, getExchangeRateInfoMessage} from './message.service';
import {Constants} from '../common/constants';
import * as cryptocurrencies from '../../cryptocurrencies.json';

const CoinGecko = require('coingecko-api');

const coingeckoClient = new CoinGecko();

export const getInfo = async (symbol: string): Promise<string> => {
  if (!symbol) return `Give me the symbol of the cryptocurrency! [/${Constants.GetInfo} BTC]`;

  const currency = cryptocurrencies.find(cc => cc.symbol === symbol.toLowerCase());
  if (!currency?.id) return `Currency ${symbol} was not found!`;

  const result =
    await coingeckoClient.coins.fetch(currency.id, {tickers: false, community_data: false, developer_data: false, localization: false})
      .then(response => response.data.market_data)
      .catch(() => 'CoinGecko server error');

  if (!result) return `Currency ${symbol} was not found!`;
  
  return getCurrencyInfoMessage({...result, symbol});
}

export const getExchangeRateInfo = async (arg: string): Promise<string> => {
  const amount = +arg ? +parseInt(arg) : 10;
  if (amount > 250 || amount < 1) return 'Amount should be more than 0 and less than 250';

  const result =
    await coingeckoClient.coins.markets({localization: false, per_page: amount})
      .then(response => response.data)
      .catch(() => 'CoinGecko server error');

  if (!result) return `Currencies were not found!`;
  
  return getExchangeRateInfoMessage(result);
}
