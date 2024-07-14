import { StockListDataType, StockPriceData, StockPriceDataType } from "@/types/stock.type";
import StockDocument from '@/model/stock'
import { getRandomIntegerInclusive } from "./utils";

export const mockCoinPrice = () => {
    return new Promise<StockPriceDataType>(async (resolve, reject) => {
        try {
            // Earlier Coin Geeko Time
            // Look Alike original fetch time
            setTimeout(() => {
                const newData = {
                    currentPrice: getRandomIntegerInclusive(1, 100),
                    priceChangePercentage: getRandomIntegerInclusive(-10, 10) / 0.2,
                    timeStamp: Date.now()
                }
                resolve(newData)
            }, 500)
        } catch (err) {
            console.log(err)
            reject(err)
        }
    })
}

export const fetchCoinPrice = () => {
    return new Promise<StockPriceDataType>(async (res, rej) => {
        try {
            // Here You can integrate Coin Info API's and Business Logic to push into DB.
            // PARSING BEFORE PUSHING TO DB
            const data = await mockCoinPrice()
            const parsedData = await StockPriceData.parseAsync(data);
            res(parsedData)
        }
        catch (err) {
            console.log("ERR,", err)
            rej(err)
        }
    })
}

export async function createOrUpdateDocument(newData: StockListDataType) {
    try {
        const { id } = newData
        // Check if a document with the given id exists
        const existingDocument = await StockDocument.findOne({ id });

        if (!existingDocument) {
            // Document doesn't exist, create a new one
            const newDocument = new StockDocument({
                ...newData
            });
            await newDocument.save();
            console.log(`Created new document with id ${id}, ${newData.name}`);
            return true
        } else {
            await StockDocument.findByIdAndUpdate(existingDocument._id.toString(), {
                $push: { pricing: newData.pricing[0] }
            });
            console.log(`Updated document with id ${id}, ${newData.name}`);
            return true
        }
    } catch (error) {
        console.error('Error creating or updating document:', error);
    }
}