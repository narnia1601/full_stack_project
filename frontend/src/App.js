import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import StockExchangePage from './routes/StockExchangePage'
import StockPage from './routes/StockPage';

function App() {
  return (
    <div>
      <Nav></Nav>
      <Routes>
        <Route path="/nasdaq" element={<StockExchangePage title="NASDAQ"></StockExchangePage>}></Route>
        <Route path="/nyse" element={<StockExchangePage title="NYSE"></StockExchangePage>}></Route>
        <Route path="/stock" element={<StockPage></StockPage>}></Route>
      </Routes>
    </div>
  );
}

export default App
