import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import Creator from './pages/Creator';
import Receive from './pages/Receive';
import Header from './components/Header';
import { Web3Provider } from '@ethersproject/providers'


export const App = () => {
    return (
       
           
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Creator />} />
                        <Route path="/receive" element={<Receive />} />
                    </Routes>
                </Router>
            
        
    )
}