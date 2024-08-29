
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import { ErrorPage } from './pages/ErrorPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { ProductInsertionPage } from './pages/ProductInsertionPage'
import { ProductListPage } from './pages/ProductListPage'


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/homeProdutos" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/newProduct" element={<ProductInsertionPage />} />
        <Route path="/erro" element={<ErrorPage />} />
      </Routes>
    </Router>
  )

}

export default App
