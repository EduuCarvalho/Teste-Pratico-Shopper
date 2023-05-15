import {BrowserRouter, Routes, Route} from 'react-router-dom';
import GlobalStyle from './assets/GlobalStyle'
import HomePageShopper from './pages/HomePageShopper';

function App() {
  return (
    <>
    <BrowserRouter>
    <GlobalStyle/>
      <Routes>
        <Route path="/" element={<HomePageShopper/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;