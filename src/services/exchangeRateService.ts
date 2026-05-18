import type { CBRResponse } from '@/types'

const CBR_API_URL = 'https://www.cbr-xml-daily.ru/daily_json.js'

export class ExchangeRateService {
  static async fetchUSDRate(): Promise<number> {
    try {
      const response = await fetch(CBR_API_URL)

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data: CBRResponse = await response.json()
      return data.Valute.USD.Value / data.Valute.USD.Nominal
    } catch (error) {
      console.error('Failed to fetch USD rate:', error)
      throw error
    }
  }
}
