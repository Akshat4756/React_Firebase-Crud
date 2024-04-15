import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import { Route,Routes,Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import './FontAwesome/css/all.min.css';
import Homepage from './components/Homepage';
import { useFirebase } from './context/FirebaseContext';
function App() {
  const firebase=useFirebase();
  console.log(firebase);
  return (
    <div className="row justify-content-center align-items-center">
     <Routes>
      <Route exact path='/' Component={Login}/>
      <Route path='/Register' Component={Register}/>
      <Route path='/Homepage/*' Component={Homepage}/>
      {/* add a trailing start if there are nested routes just like above*/}
     </Routes>
    </div>
  );
}

export default App;
