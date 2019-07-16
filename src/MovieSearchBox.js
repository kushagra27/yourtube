import React, { Component } from 'react';
import axios from 'axios'

export default class MovieSearchBox extends Component {
  constructor(){
    super()
    this.state = {
      query:'',
      uploadType:'',
      seriesOn:'',
      optionsOn:false,
    }
  }

  handleChange = (event)=>{
    const {id,value} = event.target
    this.setState({[id]: value},()=>{
        if (id ==='query'){
            console.log('query')
            axios({
                method:'get',
                url:'https://movie-database-imdb-alternative.p.rapidapi.com/?r=json'+(this.state.uploadType==='series'?'&page=1&type=series&s=':'&type=movie&s=')+this.state.query,
                headers: {
                    'X-RapidAPI-Host': 'movie-database-imdb-alternative.p.rapidapi.com',
                    'X-RapidAPI-Key':'fbdec64e54msh8fbc8ff5b1064c3p1e5820jsn460c5e7c18fc'
                }
            })
            .then((response)=>{
                console.log(response.data.Search)
                this.setState({
                  optionsOn : true
                })
                if(response.data.Search !== undefined){
                  const optionItems = response.data.Search.map((item) =>
                    <option value={item.Title}>{item.Title}</option>
                  )
                  console.log(optionItems)
                  this.setState({
                    optionItems
                  })
                }
            });
        }
    });    
  }

  handleMovieSelect = (event)=>{
    console.log(event.target.value)
  }

  render() {
    return (
      <div>
        <select onChange={(e)=>{this.setState({uploadType:e.target.value})}} >
          <option value='movie'>Movie</option>
          <option value='series'>Series</option>
        </select>
        <form>
          <input type="text" id="query" placeholder="Enter Name" value={this.state.query} onChange={this.handleChange} />          
        </form>
        <select style={this.state.optionsOn?{display:'block'}:{display:'none'}} onChange={this.handleMovieSelect} >
          <option value='Select'>Select</option>
          {this.state.optionItems}
        </select>
      </div>
    );
  }
}
