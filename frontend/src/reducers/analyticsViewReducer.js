import R from 'ramda'
import moment from 'moment';

const defaultState = {
  overview: {
    granularity: 'week',
    spending_data: [],
    balance_data: []
  },
}

const analyticsViewReducer = (state = defaultState, action) => {

  const localize = (datapoint) => {
    if (state.overview.granularity == 'month') return moment(datapoint.time).format('MM/YYYY')
    if (state.overview.granularity == 'week') return moment(datapoint.time).format('WW/YYYY')
    if (state.overview.granularity == 'day') return moment(datapoint.time).format('DD/MM')
    return datapoint
  }
  const processAnalyticsData = (datapoint) => ({time: localize(datapoint), total: +(datapoint.total * -1).toFixed(2)})
  const processBalanceData = (datapoint) => ({time: localize(datapoint), credits: +datapoint.total.toFixed(2)})
  const processSpendingData = (datapoint) => ({time: localize(datapoint), total_billings: +(datapoint.total * -1).toFixed(2)})

  switch (action.type) {
    case 'SELECT_BILLING_OVERVIEW_GRANULARITY':
      return R.assocPath(['overview', 'granularity'], action.payload.granularity || 'month', state)
    case 'GET_BALANCE_OVERVIEW_FULFILLED':
      return R.assocPath(['overview', 'balance_data'], action.payload.data.map(processBalanceData), state)
    case 'GET_BILLING_OVERVIEW_FULFILLED':
      return R.assocPath(['overview', 'spending_data'], action.payload.data.map(processSpendingData), state)

    default:
      return state;
  }
}

export default analyticsViewReducer
