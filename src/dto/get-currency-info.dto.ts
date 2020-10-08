export interface IGetCurrencyInfoDto {
  symbol: string;
  current_price: ICurrency;
  market_cap_rank: number;
  market_cap: ICurrency;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_14d: number;
  price_change_percentage_30d: number;
  price_change_percentage_60d: number;
}

interface ICurrency {
  usd: number;
}
