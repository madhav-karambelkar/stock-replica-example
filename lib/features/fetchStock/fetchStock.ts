import type { StockListDataArrayType } from '@/types/stock.type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type StockTypeApi = {
    coinId: string,
    maxHistoricalCount: number
}
const stockDataAPI = createApi({
  reducerPath: 'stockDataAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['stock-list'],
  endpoints: (builder) => ({
    getStockData: builder.query<StockListDataArrayType,StockTypeApi>({
      query: ({ coinId , maxHistoricalCount }) => {
        console.log("coinId",coinId)
        return {
          url: `api/stock?coin_id=${coinId}&max_historical_count=${maxHistoricalCount}`,
          method: "GET"
        }
      },
      providesTags: ['stock-list'],
    }),
  }),
})

export const {
    useGetStockDataQuery
} = stockDataAPI
export default stockDataAPI
