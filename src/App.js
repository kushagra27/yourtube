import React from "react";
import { BrowserRouter, Route , Switch} from "react-router-dom";
import Login from './Login'
import Import from './Import'
import Register from './Register'
import Watch from './Watch'
import Upload from './Upload'
import OrbitDBHandler from './TestIpfs'
import Search from './Search'
import {ProductConsumer} from './context'
import NewChannel from "./NewChannel";
import Advertise from "./Advertise";
import Dashboard from "./Dashboard";


class App extends React.Component {
  render(){
    return (
      <ProductConsumer>
        {
          value =>{
            return (
              <BrowserRouter>
                <div>
                  <Switch>
                    <Route path="/" exact render={()=><Login value={value}/>} ></Route>
                    <Route path="/import" render={()=><Import value={value}/>}></Route>
                    <Route path="/register" render={()=><Register value={value}/>}></Route>
                    <Route path="/upload" render={()=><Upload value={value}/>}></Route>
                    <Route path="/watch" render={()=><Watch value={value}/>}></Route>
                    <Route path="/test" render={()=><OrbitDBHandler value={value}/>}></Route>
                    <Route path="/search" render={()=><Search value={value}/>}></Route>
                    <Route path="/new_channel" render={()=><NewChannel value={value}/>}></Route>
                    <Route path="/advertise" render={()=><Advertise value={value}/>}></Route>
                    <Route path="/dashboard" render={()=><Dashboard value={value}/>}></Route>
                  </Switch>
                </div>
              </BrowserRouter>
            )
          }
        }
      </ProductConsumer>
    )
  }
}

export default App;
