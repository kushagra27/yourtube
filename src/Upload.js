import React from 'react'
// import web3 from './web3'
// import { sha256 } from 'js-sha256';
export default class Watch extends React.Component{
    constructor(){
      super()
      this.state = {
        ipfsHash:null,
        buffer:'',
        title:'',
        category:'',
        description:'',
        price:'',
        verified:true,
      };
    }

    handleChange = (event) => {
      const {id,value} = event.target
      this.setState({[id]:value})
    }

    async componentDidMount(){

    }

    convertToBuffer = async(reader) => {
        //file is converted to a buffer for upload to IPFS
          const buffer = await Buffer.from(reader.result);
        //set this buffer -using es6 syntax
          this.setState({buffer});
          console.log(buffer)
          // const hash = await sha256(JSON.stringify(this.state.buffer))
          // console.log(hash)
          // const res = await this.props.value.videoList.get(hash)
          // if(res.length === 0){
            // this.setState({vidHash:hash})
            this.setState({verified:false})
          // } else {
            // alert('This video has already been uploaded')
          // }
      };

    captureFile =async (event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)    
        console.log('ipfs',this.props.value.ipfs)
        console.log('orbitdb',this.props.value.orbitdb)
        console.log('library',this.props.value.library)
      };

      putAd = async ()=>{
        // const adList = await this.props.value.orbitdb.docs('toLet',{indexBy:'hash'})
      }

    onSubmit = async (event) => {
      event.preventDefault();
      await this.props.value.ipfs2.add(this.state.buffer, async(err, ipfsHash) => {
        console.log(err,ipfsHash);
        //setState by setting ipfsHash to ipfsHash[0].hash
        await this.setState({ ipfsHash:ipfsHash[0].hash });
        console.log(ipfsHash)
        const data = await {
          hash: this.state.ipfsHash,
          title:this.state.title,
          category:this.state.category,
          description:this.state.description,
          uploader:this.props.value.localAccount.channelInfo.channelName,
          views:'',
          upvotes:'',
        }
        const orbitHash = await this.props.value.library.put(data)
        // const orbitHash2 = await this.props.value.videoList.put({hash:this.state.vidHash})
        console.log('oribtHash : ',orbitHash)
        await this.props.value.newUpload(data.hash)
      }) 
    }


    render(){
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <input
                        type = "file"
                        onChange = {this.captureFile}
                    />
                    <input type="text" id='title' placeholder="Title" value={this.state.title} onChange={this.handleChange} />
                    <input type="text" id='description' placeholder="Description" value={this.state.description} onChange={this.handleChange} />
                    <input type="text" id='category' placeholder="Category" value={this.state.category} onChange={this.handleChange} />
                    <input type="text" id='price' placeholder="Base price per 1000 views in $ for a month" value={this.state.price} onChange={this.handleChange} />
                    <p>{this.state.category}</p>
                    <p>{this.state.description}</p>
                    <p>{this.state.title}</p>
                    <button 
                        bsStyle="primary" 
                        disabled = {this.state.verified}
                        type="submit"> 
                        Send it 
                    </button>
                </form>
            </div>
        )
    }
}