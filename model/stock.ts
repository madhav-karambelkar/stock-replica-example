import type { StockListDataType } from '@/types/stock.type'
import mongoose from 'mongoose'

type StockType = StockListDataType
const stockSchema = new mongoose.Schema<StockType>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    pricing: [
        {
            currentPrice: {
                type: Number,
                required: true
            },
            priceChangePercentage: {
                type: Number,
                required: true
            },
            timeStamp:  {
                type: Number,
                required: true,
            }
        }
    ]

})

export default mongoose.models.StocksList<StockType> || mongoose.model<StockType>('StocksList', stockSchema)