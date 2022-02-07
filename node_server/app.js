const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: '*'
}));
const port = process.env.PORT || 5000

//   Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log('Connected to DB!');
})

var Schema = mongoose.Schema;

var StocksSchema = new Schema({
    ticker_symbol: String,
    name: String,
    exchange: String,
    revenue_growth_estimate: Number,
    currency: String,
    stock_symbol_currency: String,
    exchange_rate: Number,
    unlevered_free_cash_flow: Number,
    total_debt: Number,
    interest_expense: Number,
    cost_of_equity: Number,
    cost_of_debt: Number,
    wacc: Number,
    price: Number,
    value: Number,
    shares_outstanding: Number,
    cash: Number
});

var Stocks = mongoose.model('stocks', StocksSchema);

app.get('/nasdaq', (req, res) => {
    var result = [];
    Stocks.find({exchange:'NASDAQ'}, (err,data) => {
        for(index in data){
            result.push(data[index]);
        }
        res.send({'stocks': result});
    });
  });

app.get('/nyse', (req,res) => {
    var result = [];
    Stocks.find({exchange:'NYSE'}, (err,data) => {
        for(index in data){
            result.push(data[index]);
        }
        res.send({'stocks': result});
    })
})

app.get('/stock', (req,res) => {
    var stock_name = req.query.name;
    Stocks.find({name:stock_name}, (err,data) => {
        for(index in data){
            res.send(data[index])
        }
    })
})

app.listen(port, () => {
    console.log('App available on localhost 5000');
})