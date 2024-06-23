import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import EntityTable from './components/EntityTable'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Table' element={<EntityTable/>}/>
    </Routes>
  )
}

export default App
