import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './Home';
import Record from './Record';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/record' element={<Record/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </HashRouter>
  )
}

export default App;
