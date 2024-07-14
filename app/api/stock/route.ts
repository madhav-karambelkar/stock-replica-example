import StockDocument from "@/model/stock";
import { NextRequest, NextResponse } from "next/server";
import * as z from 'zod'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const coinId = z.string().min(1, 'Coin Id is required').parse(searchParams.get("coin_id"));
        const maxHistoricalCount = z.number().positive().parse(Number(searchParams.get("max_historical_count")))
        console.log(coinId, maxHistoricalCount)
        const limitedData = await StockDocument.aggregate([
            // destructure
            { $unwind: '$pricing' },
            // descending order, so that latest one at the top
            { $sort: { 'pricing.timeStamp': -1 } },
            { $match: { id: coinId } },
            {
                // Grouping all together in one
                $group: {
                    _id: '$_id',
                    name: { $first: '$name' },
                    id: { $first: '$id' },
                    pricing: { $push: '$pricing' }
                }
            },
            { 
                // limiting an array of pricing 
                $project: { 
                    name: 1, 
                    id: 1, 
                    pricing: { $slice: ['$pricing', maxHistoricalCount] } 
                } 
            }
        ])

        console.log("allData", limitedData)
        return NextResponse.json(limitedData)

    }
    catch (err) {
        console.log(err)
        return NextResponse.json(err, { status: 500 })
    }
}