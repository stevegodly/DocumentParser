import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import PanTable from './pages/PanTable'
import AadharTable from './pages/AadharTable'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/aadhartable' element={<AadharTable/>}/>
      <Route path='/pantable' element={<PanTable/>}/>
    </Routes>
  )
}

export default App
