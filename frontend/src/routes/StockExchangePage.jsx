import { useEffect, useState } from "react";
import StockTable from "../components/StockTable";

const StockExchangePage = (props) => {
  const [stockData, setStockData] = useState([])
  const [revenueGrowthInput, setRevenueGrowthInput] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [companyNameIsSet, setCompanyNameIsSet] = useState('false')
  const exchangeName = window.location.pathname
  const handleChange = (e) => {
    setRevenueGrowthInput(e.target.value)
  }
  const handleCompanyChange = (e) => {
    setCompanyName(e.target.value);
    setCompanyNameIsSet('true');
  }
  useEffect(() => {
    fetch('https://narnia01server.herokuapp.com' + exchangeName).then(
      res => res.json().then(data => {
        setStockData(data.stocks)
      })
    )
  })
  return (
    <div className="container">
      <h2>{props.title}</h2>
      <input id="revenueGrowthInput" className="form-control" value={revenueGrowthInput} onChange={handleChange} placeholder="Enter minimum revenue growth rate forecast" type="number" />
      <input id="revenueGrowthInput" className="form-control mt-2" value={companyName} onChange={handleCompanyChange} placeholder="Enter a stock ticker symbol" />
      <StockTable stocks={stockData} companyNameIsSet={companyNameIsSet} companyName={companyName} revenueGrowthInput={revenueGrowthInput}></StockTable>
    </div>
  )
}

export default StockExchangePage;