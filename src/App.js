//import logo from './logo.svg';
//import './App.css';
import './styles/App.css';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import { Helmet } from 'react-helmet';
//import YourComponent from './YourComponent.jsx';
import Navbar from './components/Navbar';
import BarChart from './screens/province/Barchart';
import ExcelData_handling from './ExcelData_handling';
function App() {

  return (
    <div>
      {/*<YourComponent/>*/}
      <Navbar/>
      <Helmet>
                <style>{'body { background-color: #2C3E4C ; }'}</style>             
      </Helmet>
      <BrowserRouter>
      <Routes>
        <Route path='/' element = {<ExcelData_handling/>}/>
        <Route path='/BarChart' element = {<BarChart/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
