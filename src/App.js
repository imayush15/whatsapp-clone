/* eslint-disable no-unused-vars */

import Chat from './Chat'
import './App.css';
import Sidebar from './Sidebar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Login.js';
import { useStateValue } from './StateProvider';


function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="App">
     
    {!user ? (
      <Login />
    ): <div className="app_body">
     <Router>
       <Sidebar />
       <Switch>
          <Route path="/rooms/:roomId">
              <Chat />
          </Route>
          <Route path='/'>
            <Chat />
          </Route>
       </Switch>
     </Router>
       
     </div>
     }
     
    </div>
  );
}

export default App;
