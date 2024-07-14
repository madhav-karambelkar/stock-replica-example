
import { getRandomIntegerInclusive } from '@/lib/utils'
import { http, HttpResponse } from 'msw'

const STOCK_DATA = [
    {
        id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
        name: 'Bitcoin',
        pricing: [
            {
                currentPrice: getRandomIntegerInclusive(1,100),
                priceChangePercentage: getRandomIntegerInclusive(-10,10)/0.2,
                timeStamp: Date.now()
            },
            {
                currentPrice: getRandomIntegerInclusive(1,100),
                priceChangePercentage: getRandomIntegerInclusive(-10,10)/0.2,
                timeStamp: Date.now()
            },
        ]
    },
    {
        id: 'c7b3d8e0-5eb-4b0f-8b3a-3b9f4b3d3b3d',
        name: 'Etherium',
        pricing: [
            {
                currentPrice: getRandomIntegerInclusive(1,100),
                priceChangePercentage: getRandomIntegerInclusive(-10,10)/0.2,
                timeStamp: Date.now()
            },
            {
                currentPrice: getRandomIntegerInclusive(1,100),
                priceChangePercentage: getRandomIntegerInclusive(-10,10)/0.2,
                timeStamp: Date.now()
            },
        ]
    },
    {
        id: 'd8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
        name: 'Tether',
        pricing: [
            {
                currentPrice: getRandomIntegerInclusive(1,100),
                priceChangePercentage: getRandomIntegerInclusive(-10,10)/0.2,
                timeStamp: Date.now()
            },
            {
                currentPrice: getRandomIntegerInclusive(1,100),
                priceChangePercentage: getRandomIntegerInclusive(-10,10)/0.2,
                timeStamp: Date.now()
            },
        ]
    },
    {
        id: 'd8-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
        name: 'Shimbu',
        pricing: [
            {
                currentPrice: getRandomIntegerInclusive(1,100),
                priceChangePercentage: getRandomIntegerInclusive(-10,10)/0.2,
                timeStamp: Date.now()
            },
            {
                currentPrice: getRandomIntegerInclusive(1,100),
                priceChangePercentage: getRandomIntegerInclusive(-10,10)/0.2,
                timeStamp: Date.now()
            },
        ]
    },
    {
        id: 'd8-e0b-4b0f-8b3a-3b9f4b3d3b3d',
        name: 'Binance Coin',
        pricing: [
            {
                currentPrice: getRandomIntegerInclusive(1,100),
                priceChangePercentage: getRandomIntegerInclusive(-10,10)/0.2,
                timeStamp: Date.now()
            },
            {
                currentPrice: getRandomIntegerInclusive(1,100),
                priceChangePercentage: getRandomIntegerInclusive(-10,10)/0.2,
                timeStamp: Date.now()
            },
        ]
    },
]

export const handlers = [
    http.get('https://example.com/get-stock-list', () => {
        // ...and respond to them using this JSON response.
        return HttpResponse.json(STOCK_DATA)
    }),
]