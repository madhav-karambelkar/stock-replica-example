import { isValid } from 'date-fns'
import * as z from 'zod'

export const StockPriceData = z.object({
    currentPrice: z.number(),
    priceChangePercentage: z.number(),
    timeStamp: z.number().refine((t)=> !isValid(t), 'Invalid Date'),
})

export const StockListData = z.object({
    id: z.string(),
    name: z.string().min(1),
    pricing: z.array(StockPriceData).min(1)
})

export const StockListDatas = z.array(StockListData).min(1)

export type StockListDataType = z.infer<typeof StockListData>
export type StockPriceDataType = z.infer<typeof StockPriceData>
export type StockListDataArrayType = z.infer<typeof StockListDatas> 