import React from "react";
import { BrowserRouter, Route , Switch} from "react-router-dom";
import Login from './Login'
import Import from './Import'
import Register from './Register'
import Watch from './Watch'
import Upload from './Upload'
import OrbitDBHandler from './TestIpfs'

function App() {
  return (
    // <BrowserRouter>
    //   <div>
    //     <Route exact path="/" component={Login} />
    //     <Route path="/register" component={Register} />
    //     <Route path="/import" component={Import} />
    //   </div>
    // </BrowserRouter>
    <BrowserRouter>
      <div>
       <Switch>
          <Route path="/" component={Login} exact ></Route>
          <Route path="/import" component={Import}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/upload" component={Upload}></Route>
          <Route path="/watch" component={Watch}></Route>
          <Route path="/test" component={OrbitDBHandler}></Route>
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
