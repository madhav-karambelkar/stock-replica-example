'use client'

import { ALL_COINS } from "@/lib/constants";
import { selectCoinInfo, selectedMaxHistoricalCount, setCoinInfo, setMaxHistoricalCount } from "@/lib/features/coinInfoSlice/coinInfoSlice";
import { useGetStockDataQuery } from "@/lib/features/fetchStock/fetchStock";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { StockListDataType } from "@/types/stock.type";
import { format } from "date-fns";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch()
  const selectedCoin = useAppSelector(selectCoinInfo) as Omit<StockListDataType, 'pricing'>
  const maxHistoricalCount = useAppSelector(selectedMaxHistoricalCount)
  const { data } = useGetStockDataQuery({
    coinId: selectedCoin.id,
    maxHistoricalCount: Number(maxHistoricalCount)
  }, { pollingInterval: 5000, skipPollingIfUnfocused: true, refetchOnMountOrArgChange: true })

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch("/api/cron-job")
        const re = await resp.json()
        if (resp.ok) {
          console.log("RE", re)
        }
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="custom-select">
        <select value={selectedCoin.id} onChange={(event) => {
          event.stopPropagation()
          const { value } = event.target
          const selectedData = ALL_COINS.find(coinData => coinData.id === value)
          if (selectedData)
            dispatch(setCoinInfo(selectedData))
        }}>
          <option>Please choose one option</option>
          {
            ALL_COINS.map((coinData) =>
              <option key={coinData.id} value={coinData.id}>{coinData.name}</option>
            )
          }
        </select>
        <input type="tel" maxLength={2} value={maxHistoricalCount} onChange={(event) => {
          const { value } = event.target
          if (value) {
            dispatch(setMaxHistoricalCount(value))
          } else {
            dispatch(setMaxHistoricalCount(1))
            alert("This is an required field and defaulted to 1")
          }
        }} />
      </div>
      {
        data ?
          <table>
            <thead>
              <tr>
                <th>Serial Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Price Change</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((d) =>
                  d.pricing.map((priceData, priceDataIndex) =>
                    <tr key={priceData.timeStamp}>
                      <td>{priceDataIndex + 1}</td>
                      <td>{d.name}</td>
                      <td>{priceData.currentPrice}</td>
                      <td>{priceData.priceChangePercentage}</td>
                      <td>{format(priceData.timeStamp, 'MM/dd/yyyy hh:mm:ss')}</td>
                    </tr>
                  )
                )
              }

            </tbody>
          </table>
          : "Loading..."
      }
    </main>
  );
}
