import Home from './components/Home';
import Signup from './components/SignUp';
import Login from './components/Login';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';


function App() {

  return (
    <Router>
      <div>
        <Navbar />
        <section>                              
            <Routes>                                                                        <Route path="/" element={<Home/>}/>
               <Route path="/signup" element={<Signup/>}/>
               <Route path="/login" element={<Login/>}/>
               <Route path="/home" element={<Home/>}/>
            </Routes>                    
        </section>
      </div>
    </Router>
  );
}

export default App;