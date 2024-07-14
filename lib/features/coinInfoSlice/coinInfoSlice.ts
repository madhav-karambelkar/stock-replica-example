/* eslint-disable no-param-reassign */
import { ALL_COINS, MAX_HISTORICAL_COUNT } from '@/lib/constants'
import { RootState } from '@/lib/store'
import { StockListDataType } from '@/types/stock.type'
import {
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'

type CoinInfoState = {
  selectedStock: Omit<StockListDataType, 'pricing'>,
  maxHistoricalCount: number
}

const initialState: CoinInfoState = {
  selectedStock: ALL_COINS[0],
  maxHistoricalCount: MAX_HISTORICAL_COUNT
}

const coinInfo = createSlice({
  name: 'coinInfo',
  initialState,
  reducers: {
    setCoinInfo(state, action: PayloadAction<CoinInfoState['selectedStock']>) {
      state.selectedStock = action.payload
    },
    setMaxHistoricalCount(state, action: PayloadAction<number | string>) {
      state.maxHistoricalCount = Number(action.payload)
    }
  },
})

export const coinInfoSelector = (state: RootState) => state.coinInfo
export const {
  setMaxHistoricalCount,
  setCoinInfo
} = coinInfo.actions

export const selectCoinInfo = createSelector(
  coinInfoSelector,
  ({ selectedStock }) => selectedStock
)

export const selectedMaxHistoricalCount = createSelector(
  coinInfoSelector, 
  ({ maxHistoricalCount }) => maxHistoricalCount
)

export default coinInfo
