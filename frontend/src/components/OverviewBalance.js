import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import R from 'ramda'
import $ from 'jquery'
import {fetchBalanceOverview, fetchBillingOverview} from '../actions/dataActions'

import { OverviewBox } from './overview_helpers'

class OverviewColumn extends Component {

  render() {
    const {fetchOverview, balance_data} = this.props

    const col_style = {flex: 1, paddingLeft: '10px'}
    const p_margin = {marginTop: '4px'}

    return (
      <div style={{backgroundColor: 'white', height: '300px', maxHeight: '300px'}}>
        <OverviewBox first={true}>

          <div style={{display: 'block', marginTop: '20px'}}>
            <LineChart data={balance_data} height={220} width={500} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="time" />
              <YAxis/>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
              <Legend />
              <Tooltip/>
              <Line type="monotone" dataKey="credits" stroke="#8884d8" />
            </LineChart>
          </div>

        </OverviewBox>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  balance_data: state.analyticsView.overview.balance_data,
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(OverviewColumn);
