// Hot reload when in development - https://github.com/mdlawson/piping
if (process.env.NODE_ENV == 'DEV' && !require('piping')()) {return}

// server.js

const express = require('express')
const R = require('ramda')
const cors = require('cors')

const config = require('./config')
const app = express()

console.log(`Starting Billing API server (ENV: ${config.NODE_ENV})...\n`)


const balance_day = require('./queries/balance_day.json')
const balance_month = require('./queries/balance_month.json')
const balance_week = require('./queries/balance_week.json')
const spending_day = require('./queries/spending_day.json')
const spending_month = require('./queries/spending_month.json')
const spending_week = require('./queries/spending_week.json')



// MIDDLEWARE

app.use('/assets', express.static('frontend/bundles'));
app.use(cors());


app.get('/api/v0/analytics', (req, res) => {


  const granularity = req.query.granularity || 'month'

  if (granularity == 'month') res.send(spending_month)
  if (granularity == 'week') res.send(spending_week)
  if (granularity == 'day') res.send(spending_day)

})

app.get('/api/v0/balance_overview', (req, res) => {
  const granularity = req.query.granularity || 'month'

  if (granularity == 'month') res.send(balance_month)
  if (granularity == 'week') res.send(balance_week)
  if (granularity == 'day') res.send(balance_day)
})


const server = app.listen(config.PORT, function () {
  console.log(`Express server listening on port ${config.PORT}!`)
})
