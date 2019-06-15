import React from "react";
import { BrowserRouter, Route , Switch} from "react-router-dom";
import Login from './Login'
import Import from './Import'
import Register from './Register'
import Watch from './Watch'
import Upload from './Upload'
import OrbitDBHandler from './TestIpfs'
import Search from './Search'
import OrderBook from './OrderBook'
import {ProductConsumer} from './context'


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
                    <Route path="/orderbook" render={()=><OrderBook value={value}/>}></Route>
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
