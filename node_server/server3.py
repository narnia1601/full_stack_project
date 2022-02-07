from distutils.command.config import config
from pymongo import MongoClient
import certifi
import requests
import csv
from get_valuations import GetValuations
from dotenv import dotenv_values

config = dotenv_values('.env')

# connect to mongodb
client = MongoClient(config['DB_CONNECTION'], tlsCAFile=certifi.where())
db = client['stocksDatabase']
col = db['stocks']

class GetData:
    def __init__(self, exchange):
        self.exchange = exchange.upper()
        self.token = config['API_TOKEN']
        self.exchanges = ['NASDAQ','NYSE']
        self.count = 0
    
    def getData(self):
        download = requests.get(f'https://eodhistoricaldata.com/api/exchange-symbol-list/{self.exchange}?api_token={self.token}')
        content = download.content.decode('utf-8')
        cr = csv.reader(content.splitlines(), delimiter=',')
        my_list = list(cr)
        for line in my_list:
            if 'Common Stock' in line and line[6] != '' and line[3] in self.exchanges:
                getValuations = GetValuations(line[0], line[3], line[4])
                getValuations.get_stock_data()
                getValuations.get_exchange_rate()
                getValuations.get_margin_of_safety()
                getValuations.get_52_week_low()
                if getValuations.currency != None and getValuations.price != 0:
                    self.count += 1
                    data = { 
                        "ticker_symbol": line[0],
                        "name": line[1],
                        "exchange": line[3],
                        "revenue_growth_estimate": getValuations.get_revenue_estimate_growth(),
                        "currency": getValuations.currency,
                        "stock_symbol_currency": getValuations.stock_price_currency,
                        "exchange_rate": getValuations.exchange_rate,
                        "unlevered_free_cash_flow": getValuations.get_unlevered_free_cash_flow(),
                        "total_debt": getValuations.total_debt,
                        "interest_expense": getValuations.interest_expense,
                        "cost_of_equity": getValuations.cost_of_equity,
                        "cost_of_debt": getValuations.cost_of_debt,
                        "wacc": getValuations.wacc,
                        "price": getValuations.price,
                        "value": getValuations.value,
                        "shares_outstanding": getValuations.shares_outstanding,
                        "cash": getValuations.cash,
                        "52_week_low": getValuations.annual_low_price,
                    }
                    try:
                        # if row exists
                        if len(list(col.find({ "ticker_symbol": line[0] }))) > 0:
                            filter = { 'ticker_symbol': line[0] }
                            col.update_one(filter, {
                                "$set": data
                            })
                            print(f'Stock updated: {line[1]}')
                        # if it does not exist
                        else:
                            try:
                                col.insert_one(data)
                                print(f'Stock inserted: {line[1]}')
                            except Exception as e:
                                print(e)
                    except Exception as e:
                        print(e)


exchange_list = ['NASDAQ', "NYSE"]
for exchange in exchange_list:
    getTickers = GetData(exchange)
    getTickers.getData()