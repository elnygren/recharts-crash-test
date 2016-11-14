import React, { Component, PropTypes } from 'react'
import R from 'ramda'


const flexrow = {
  display: 'flex',
  flexDirection: 'row',
}


export class OverviewBox extends Component {
  render() {
    const {first} = this.props;

    const style = {
      width: '100%',
      height: '100%',
      paddingTop: '5px',
      display: 'inline-block',
    }

    return <div style={style}>{this.props.children}</div>
  }
}

export class OverviewHead extends Component {
  render () {
    const style = R.merge({
      height: '50px',
      width: '95%',
      borderBottom: '1px solid rgb(220, 220, 220)',
      margin: '0 auto',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }, flexrow)

    return <div style={style}>{this.props.children}</div>

  }
}

export class OverviewGranularityButton extends Component {
  render () {
    const {txt, click} = this.props
    return (
      <button style={{marginLeft: '5px'}}
              onClick={click}>
          {txt}
      </button>
    )
  }
}
