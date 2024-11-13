import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Books from './pages/Book';
import Collections from './pages/Collections';
import Overview from './pages/Overview';
import Explore from './pages/Explore';
import Info from './pages/Info';
import Item from './pages/Item';
import Elsewhere from "./pages/Elsewhere";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Tootop from "./components/Tootop";
import Acknowledgements from "./pages/Acknowledgements";
import Accessibility from "./pages/Accessibility"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Tootop/>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/publications" element={<Books />} />
          <Route path="/elsewhere" element={<Elsewhere />}/>
          <Route path="/Acknowledgements" element={<Acknowledgements />}/>
          <Route path="/collections" element={<Collections />}>
            <Route path="" element={<Overview />} />
            <Route path="explore" element={<Explore />} />
            <Route path="about/:id" element={<Info />} />
          </Route>
          <Route path="/collections/object/:id" element={<Item />} />
          <Route path="/accessibility" element={<Accessibility />}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
