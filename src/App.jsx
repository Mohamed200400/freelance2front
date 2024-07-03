
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './component/Login'
import Register from './component/Register'
import Home from './component/Home'
import Categ from './Context/ResultContext'
import Next from './Context/Next'
import Result from './component/Result'
import Dashboard from './component/Dashboard'
import Add from './component/Add'
import Founder from './component/Founder'
import Note from './component/Note'
import Info from './component/Info'
import Forg from './component/Forg'


function App() {
 

  return (
    <div className='container'>
    <Next>
      <Categ>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Founder/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/note' element={<Note/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/result' element={<Result />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/info' element={<Info/>} />
            <Route path='/addquestion' element={<Add />} />
            <Route path='/forg' element={<Forg />} />
          </Routes>
        </BrowserRouter>
      </Categ>
    </Next>
    </div>
  )
}

export default App
