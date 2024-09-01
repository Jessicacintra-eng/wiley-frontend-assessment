import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Header } from './components/header/Header'
import { ErrorPage } from './pages/ErrorPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { ProductInsertionPage } from './pages/ProductInsertionPage'
import { ProductListPage } from './pages/ProductListPage'
import store from './store/store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Header />
        </div>
        <div style={{ marginTop: '60px' }}>
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/homeProdutos" element={<ProductListPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/newProduct" element={<ProductInsertionPage />} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App
