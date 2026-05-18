export interface ExchangeRates {
  rub2usdt: number
  usdt2kzt: number
}

export interface CurrencyValues {
  rub: number
  usdt: number
  kzt: number
  course: number
}

export interface CBRResponse {
  Valute: {
    USD: {
      Value: number
      Nominal: number
    }
  }
}
