import update from 'react-addons-update'
import { FETCH_PRODUCTS, FETCH_MORE_PRODUCTS, NO_MORE_DATA,
  FILTER_INPUT_SEARCH, INCREASE_SKIP } from '../actions/types'

const DEFAULT_STATE = { products: [], skip: 0, noMoreData: false }

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return update(state, { products: { $push: action.payload }})
    case NO_MORE_DATA:
      return { ...state, noMoreData: true }
    case INCREASE_SKIP:
      return { ...state, skip: state.skip + 15 }
    default:
      return state
    }
  }
