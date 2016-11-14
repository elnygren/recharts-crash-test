import A from 'axios'
import R from 'ramda'
import moment from 'moment'

export const fetchBalanceOverview = (granularity) => ({
  type: 'GET_BALANCE_OVERVIEW',
  payload: {
    promise: A.get('/api/v0/balance_overview', {params: {granularity}})
  }
})

export const fetchBillingOverview = (granularity) => (dispatch, getState) => {

  dispatch({
    type: 'SELECT_BILLING_OVERVIEW_GRANULARITY',
    payload: {
      granularity: granularity
    }
  })

  dispatch({
    type: 'GET_BILLING_OVERVIEW',
    payload: {
      promise: A.get('/api/v0/analytics/', {params: {granularity}})
    }
  })
}
