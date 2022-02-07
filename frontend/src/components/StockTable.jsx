import { Link } from "react-router-dom"

const StockTable = (props) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Stock Ticker</th>
                    <th>Stock Name</th>
                    <th>Current Price</th>
                    <th>Fair Value Price (DCF)</th>
                </tr>
            </thead>
            <tbody>
                {props.stocks.map((stock) => {
                    if(stock.revenue_growth_estimate >= props.revenueGrowthInput / 100){
                        if(props.companyNameIsSet == 'true'){
                            if(stock.ticker_symbol.includes(props.companyName)){
                                return (
                                    <tr>
                                        <td>{stock.ticker_symbol}</td>
                                        <td><Link to={'/stock?name=' + stock.name}>{stock.name}</Link></td>
                                        <td>{stock.price.toFixed(2)}</td>
                                        <td style={{ color: stock.value > stock.price ? 'green' : 'red'}}>{stock.value.toFixed(2)}</td>
                                    </tr>
                                )
                            }
                        }else{
                            return (
                                <tr>
                                    <td>{stock.ticker_symbol}</td>
                                    <td><Link to={'/stock?name=' + stock.name}>{stock.name}</Link></td>
                                    <td>{stock.price.toFixed(2)}</td>
                                    <td style={{ color: stock.value > stock.price ? 'green' : 'red'}}>{stock.value.toFixed(2)}</td>
                                </tr>
                            )
                        }
                    }
                })}
            </tbody>
        </table>
    )
}

export default StockTable;