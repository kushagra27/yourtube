import React from 'react'
import { Redirect , Link } from "react-router-dom"
import CryptoJS from 'crypto-js'
// import Background from './assets/img/login.jpg'
import Watch from './Watch'
const OrbitDB = require('orbit-db')

export default class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        password: '',
        auth:false,
        watch:false,
        upload:false,
        search:false,
        query:'',
        user:''
      };
    }
  
    async componentDidMount(){
      const encA = localStorage.getItem('1')
      const encM = localStorage.getItem('2')
      this.setState({
        encA:encA,
        encM:encM
      })
    }

    handleChange = (event)=>{
      const {id,value} = event.target
      this.setState({[id]: value});
    }
  
    handleLogin = async (event)=>{
        event.preventDefault()
        try{
          const bytes  = CryptoJS.AES.decrypt(this.state.encM , this.state.password)
          const mnemonic = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
          const byt  = CryptoJS.AES.decrypt(this.state.encA, mnemonic)
          var account = JSON.parse(byt.toString(CryptoJS.enc.Utf8))
          console.log(account)
          const db = await this.props.value.orbitdb.docs(account.address,{indexBy:'address'})
          await db.load()
          this.props.value.updateOrbit(db)
          this.setState({
            auth:true
          })
          this.props.value.updateAccount(account)
      } catch(error){
          console.log(error)
          alert('Incorrect Password')
      }
    }

    handleUpload = (event)=>{
      event.preventDefault()
      this.setState({upload:true})
    }

    handleWatch = async(event)=>{
      console.log(this.props.value.ipfs)
      const db = await this.props.value.orbitdb.docs('library',{indexBy:'hash'})
      console.log('db :',db)
      await db.load()
      console.log('db loaded')
      // db.events.on('replicated', (address) => {
      //   console.log(db.iterator({ limit: -1 }).collect())
      // })

      await this.setState({db:db})
      event.preventDefault()
        // const result = await db.iterator({ limit: -1 }).collect()
        const result = this.state.db.get('')
        console.log(result)
        
        const videos = await result.map(vid =>{
          console.log(vid)
          return <Watch vid={vid} />
        })
        this.setState({videos:videos})
        // this.setState({videos: result[0].hash},()=>{
          //   console.log(this.state.videos)
          // })
        this.setState({watch:true})
        
    }

    render() {
      if(!this.state.auth){
        return (
          <div>
              <form>
                <input type="password" id='password' placeholder="Enter Password" value={this.state.password} onChange={this.handleChange} />
                <button onClick={this.handleLogin}>
                  LOG IN 
                </button>
              </form>
              <Link type="button" to='/import'>
                 IMPORT FROM SEED
              </Link>
              <br/>
              <Link to='/register'>
                 REGISTER
              </Link>
          </div>
        )
      } else if(this.state.watch) {
        return(
          <div>
            {this.state.videos}
          </div>
        )
      } else if(this.state.upload) {
        return(
          <Redirect to={{
            pathname:'/upload',
            state:{account:JSON.stringify(this.state.user)}
          }} />  
          // <Upload />
        )
      } else if(this.state.search) {
        return(
          <Redirect to={{
            pathname:'/search',
            state:{account:JSON.stringify(this.state.query)}
          }} />  
          // <Upload />
        )
      } else {
        return(
          <div>
            <h1> Welcome </h1>
            <form>
                  <input type="text" id='query' placeholder="Search" value={this.state.query} onChange={this.handleChange} />
                  <button  onSubmit={
                    (event)=>{
                      event.preventDefault()
                      this.setState({search:true})
                    }}>
                  SEARCH
                  </button>
              </form>
            <button onClick={this.handleWatch}>
              Watch
            </button>

            <button onClick={this.handleUpload}>
              Upload
            </button>
          </div>
        )
      }
    }
  }