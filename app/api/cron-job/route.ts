import { createOrUpdateDocument, mockCoinPrice } from "@/lib/shared";
import { CronJob } from "cron";
import { NextResponse } from "next/server";
import { ALL_COINS } from "@/lib/constants";
export const dynamic = 'force-dynamic'


export async function GET() {
    try {
        new CronJob(
            '*/3 * * * * *', // cronTime every 3 seconds
            async function () {
                console.log('You will see this message every 3 second', ALL_COINS.map(({ name }) => name));
                const mappedCoinsData = await Promise.all(ALL_COINS.map(async (coinData) => {
                    // Mocked price of coin
                    const newPrice = await mockCoinPrice()
                    return { ...coinData, pricing:[newPrice] }
                }))
                await Promise.all(mappedCoinsData.map(async (coinData) =>
                    await createOrUpdateDocument(coinData)
                ))
            },
            null,
            true,
            'America/Los_Angeles',
            null,
            false
        );
        return NextResponse.json("Cron-JOb Started")

    }
    catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}