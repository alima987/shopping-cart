import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header'
import CoffeeProvider from './Context/CoffeeContext'

function App() {

  return (
    <CoffeeProvider>
    <Header />
    <Footer />
    </CoffeeProvider>
  )
}

export default App