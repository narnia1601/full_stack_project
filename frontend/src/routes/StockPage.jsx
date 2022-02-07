import { useEffect, useState } from "react";
import '../css/sb-admin-2.min.css';
import Card from '../components/Card';
import LargeCard from "../components/LargeCard";
import FinancialsOverview from "../components/FinancialsOverview";
import DCFComponent from "../components/DCFComponent";

const StockPage = () => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let stockName = params.get('name');
  const [stockData, setStockData] = useState({})
  const [revenueGrowthEstimate, setRevenueGrowthEstimate] = useState('');
  const [revenueGrowthEstimate1, setRevenueGrowthEstimate1] = useState('');
  const [revenueGrowthEstimate2, setRevenueGrowthEstimate2] = useState('');
  const [revenueGrowthEstimate3, setRevenueGrowthEstimate3] = useState('');
  const [revenueGrowthEstimate4, setRevenueGrowthEstimate4] = useState('');
  const [wacc, setWacc] = useState('');
  const [value, setValue] = useState('');
  const [terminalGrowthRate, setTerminalGrowthRate] = useState(0.02);
  const handlePresentValueOfFreeCashFlow = (unlevered_free_cash_flow, wacc, time_period) => {
    let discount_factor = 1 / ((1 + wacc) ** (time_period))
    let present_value_of_free_cash_flow = unlevered_free_cash_flow * discount_factor
    return present_value_of_free_cash_flow
  }
  const handleEnterpriseValueChange = () => {
    let unlevered_free_cash_flow = stockData.unlevered_free_cash_flow
    let total_unlevered_free_cash_flow = 0
    unlevered_free_cash_flow = unlevered_free_cash_flow * (1 + revenueGrowthEstimate)
    let present_value_of_free_cash_flow = handlePresentValueOfFreeCashFlow(unlevered_free_cash_flow, wacc, 0)
    total_unlevered_free_cash_flow += present_value_of_free_cash_flow

    unlevered_free_cash_flow = unlevered_free_cash_flow * (1 + revenueGrowthEstimate1)
    present_value_of_free_cash_flow = handlePresentValueOfFreeCashFlow(unlevered_free_cash_flow, wacc, 1)
    total_unlevered_free_cash_flow += present_value_of_free_cash_flow

    unlevered_free_cash_flow = unlevered_free_cash_flow * (1 + revenueGrowthEstimate2)
    present_value_of_free_cash_flow = handlePresentValueOfFreeCashFlow(unlevered_free_cash_flow, wacc, 2)
    total_unlevered_free_cash_flow += present_value_of_free_cash_flow

    unlevered_free_cash_flow = unlevered_free_cash_flow * (1 + revenueGrowthEstimate3)
    present_value_of_free_cash_flow = handlePresentValueOfFreeCashFlow(unlevered_free_cash_flow, wacc, 3)
    total_unlevered_free_cash_flow += present_value_of_free_cash_flow

    unlevered_free_cash_flow = unlevered_free_cash_flow * (1 + revenueGrowthEstimate4)
    present_value_of_free_cash_flow = handlePresentValueOfFreeCashFlow(unlevered_free_cash_flow, wacc, 4)
    total_unlevered_free_cash_flow += present_value_of_free_cash_flow

    let continuing_value = unlevered_free_cash_flow * (1 + terminalGrowthRate) / (wacc - terminalGrowthRate)
    let present_value_of_continuing_value = continuing_value / (1 + wacc) ** 5
    return total_unlevered_free_cash_flow + present_value_of_continuing_value
  }
  const handleValuationChange = () => {
    let newEnterpriseValue = handleEnterpriseValueChange()
    setValue((newEnterpriseValue - stockData.total_debt + stockData.cash) / stockData.shares_outstanding)
  }
  useEffect(() => {
    fetch('https://narnia01server.herokuapp.com/stock?name=' + stockName).then(
      res => res.json().then(data => {
        setStockData(data);
        setRevenueGrowthEstimate(data.revenue_growth_estimate);
        setRevenueGrowthEstimate1(data.revenue_growth_estimate - 0.01)
        setRevenueGrowthEstimate2(data.revenue_growth_estimate - 0.02)
        setRevenueGrowthEstimate3(data.revenue_growth_estimate - 0.03)
        setRevenueGrowthEstimate4(data.revenue_growth_estimate - 0.04)
        setWacc(data.wacc);
        setValue(data.value);
      })
    )
  }, [])
  const handleEstimateChange = (estimateFunction, newEstimate) => {
    newEstimate /= 100;
    if(estimateFunction === 'revenueGrowthEstimate'){
      setRevenueGrowthEstimate(newEstimate)
    }else if(estimateFunction === 'revenueGrowthEstimate1'){
      setRevenueGrowthEstimate1(newEstimate)
    }else if(estimateFunction === 'revenueGrowthEstimate2'){
      setRevenueGrowthEstimate2(newEstimate)
    }else if(estimateFunction === 'revenueGrowthEstimate3'){
      setRevenueGrowthEstimate3(newEstimate)
    }else if(estimateFunction === 'revenueGrowthEstimate4'){
      setRevenueGrowthEstimate4(newEstimate)
    }else if(estimateFunction === 'waccEstimate'){
      setWacc(newEstimate)
    }else if(estimateFunction === 'terminalGrowthEstimate'){
      setTerminalGrowthRate(newEstimate)
    }
    handleValuationChange()
  }
  return (
    <div id="page-top">
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="container">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">{stockData.name} ({stockData.ticker_symbol})</h1>
              </div>
              <div className="row">
                <div className="col-xl-3 col-md-6 mb-4">
                  <Card borderStyle="border-left-primary" textStyle="text-primary" title='Exchange' text={stockData.exchange}></Card>
                </div>
                <div class="col-xl-3 col-md-6 mb-4">
                  <Card borderStyle="border-left-primary" textStyle="text-primary" title="Price" text={stockData.price ? '$' + stockData.price.toFixed(2) + ' (' + stockData.stock_symbol_currency + ')' : '$' + stockData.price + ' (' + stockData.stock_symbol_currency + ')'}></Card>
                </div>
                <div class="col-xl-3 col-md-6 mb-4">
                  <Card borderStyle="border-left-primary" textStyle="text-primary" title="Value" text={value ? '$' + value.toFixed(2) + ' (' + stockData.stock_symbol_currency + ')' : '$' + value + ' (' + stockData.stock_symbol_currency + ')'}></Card>
                </div>
                <div class="col-xl-3 col-md-6 mb-4">
                  <Card borderStyle="border-left-primary" textStyle="text-primary" title="Financial Statement Currency" text={stockData.currency}></Card>
                </div>
              </div>
              <div className="row">
              <div className="col-lg-5">
                <LargeCard header="Financials Overview">
                  <FinancialsOverview stockData={stockData}></FinancialsOverview>
                </LargeCard>
              </div>
              <div className="col-lg-7">
                <LargeCard header="DCF Calculator" stockData={stockData}>
                  Revenue Growth Estimate (%)
                  <div className="row">
                    <div className="col-xl-2">
                      <DCFComponent value={revenueGrowthEstimate} function='revenueGrowthEstimate' handleEstimateChange={handleEstimateChange}>Year 0</DCFComponent>
                    </div>
                    <div className="col-xl-2">
                      <DCFComponent value={revenueGrowthEstimate1} function='revenueGrowthEstimate1' handleEstimateChange={handleEstimateChange}>Year 1</DCFComponent>
                    </div>
                    <div className="col-xl-2">
                      <DCFComponent value={revenueGrowthEstimate2} function='revenueGrowthEstimate2' handleEstimateChange={handleEstimateChange}>Year 2</DCFComponent>
                    </div>
                    <div className="col-xl-2">
                      <DCFComponent value={revenueGrowthEstimate3} function='revenueGrowthEstimate3' handleEstimateChange={handleEstimateChange}>Year 3</DCFComponent>
                    </div>
                    <div className="col-xl-2">
                      <DCFComponent value={revenueGrowthEstimate4} function='revenueGrowthEstimate4' handleEstimateChange={handleEstimateChange}>Year 4</DCFComponent>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-xl-6">
                      <DCFComponent value={wacc} function="waccEstimate" handleEstimateChange={handleEstimateChange}>
                        Weighted Cost of Capital (%)
                      </DCFComponent>
                    </div>
                    <div className="col-xl-6">
                      <DCFComponent value={terminalGrowthRate} function="terminalGrowthEstimate" handleEstimateChange={handleEstimateChange}>
                        Continuing growth rate after year 4 (%)
                      </DCFComponent>
                    </div>
                  </div>
                </LargeCard>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StockPage;