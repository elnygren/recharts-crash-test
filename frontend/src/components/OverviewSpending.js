import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import R from 'ramda'
import $ from 'jquery'
import {fetchBalanceOverview, fetchBillingOverview} from '../actions/dataActions'


import { OverviewBox, OverviewHead, OverviewGranularityButton } from './overview_helpers'


class OverviewColumn extends Component {

  componentDidMount() {
    this.props.fetchOverview('month')
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.spending_data.length == this.props.spending_data.length) {
      return false
    }
    return true
  }

  render() {
    const {fetchOverview, granularity, spending_data} = this.props


    const verboseGranularity = (g) => {
      const m = {month: 'month',
                 week: 'week',
                 day: 'day',}
      return m.g || g
    }

    console.log('render')

    return (
      <div style={{backgroundColor: 'white', height: '300px', maxHeight: '300px'}}>
        <OverviewBox>
          <OverviewHead>
            <div style={{flex: 1}}>
              <h2>CREDIT USAGE</h2>
              <p>Total per {verboseGranularity(granularity)}</p>
            </div>

            <div>
              <OverviewGranularityButton txt="Monthly" click={fetchOverview.bind(null, 'month')}/>
              <OverviewGranularityButton txt="Weekly" click={fetchOverview.bind(null, 'week')}/>
              <OverviewGranularityButton txt="Daily" click={fetchOverview.bind(null, 'day')}/>
            </div>
          </OverviewHead>

          <div style={{display: 'block', marginTop: '20px'}}>
            <LineChart data={spending_data} height={220} width={500} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="time" />
              <YAxis/>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
              <Legend />
              <Tooltip/>
              <Line type="monotone" dataKey="total_billings" stroke="#8884d8" />
            </LineChart>
          </div>

        </OverviewBox>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  granularity: state.analyticsView.overview.granularity,
  spending_data: state.analyticsView.overview.spending_data
})

const mapDispatchToProps = (dispatch) => ({
  fetchOverview: (granularity) => {
    dispatch(fetchBillingOverview(granularity));
    dispatch(fetchBalanceOverview(granularity));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(OverviewColumn);
