import 'babel-polyfill'


import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'

import OverviewBalance from './components/OverviewBalance'
import OverviewSpending from './components/OverviewSpending'

const renderReact = (Comp, entrypoint) => (
  render(
    <Provider store={store}>
      <Comp/>
    </Provider>,
    entrypoint
  )
)

$(document).ready(() => {

  const overviewTd1 = document.getElementById('billing-api-overview-1')
  const overviewTd2 = document.getElementById('billing-api-overview-2')

  if (overviewTd1) { renderReact(OverviewBalance, overviewTd1) }
  if (overviewTd2) { renderReact(OverviewSpending, overviewTd2) }
})
