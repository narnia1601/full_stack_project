const FinancialsOverview = props => {
    return (
        <div>
            <p>Unlevered Free Cash Flow: ${props.stockData.unlevered_free_cash_flow}</p>
            <p>Total Debt: ${props.stockData.total_debt}</p>
            <p>Interest Expense: ${props.stockData.interest_expense}</p>
            <p>Cost of Equity: {(props.stockData.cost_of_equity * 100).toFixed(2)}%</p>
            <p>Cost of Debt: {(props.stockData.cost_of_debt * 100).toFixed(2)}%</p>
        </div>
    )
}

export default FinancialsOverview;