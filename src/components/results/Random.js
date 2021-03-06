import React, { Component } from 'react';
import axios from 'axios';

export default class Random extends Component {
  constructor(props) {
    super(props);
    this.state={
      location: '',
      randomPick: ''
    }

    this.handleRandom=this.handleRandom.bind(this);
    this.formatAddress=this.formatAddress.bind(this);
    this.displayCategories=this.displayCategories.bind(this);
  }



  handleRandom(e){
    console.log(this.refs.locationseed.value);
    let idLength = 50;
    axios.get(`https://yelpprox.herokuapp.com/search?limit=${idLength}&location=` + this.refs.locationseed.value)
    .then((res) => {
      //check each business' categories
      //remove businesses that

      let randomIndex = Math.floor(Math.random()*idLength)
      this.setState({
        randomPick: res.data.businesses[randomIndex]
      })
      console.log(this.state.randomPick);
      console.log(res)
    })
    .catch((error)=>{
      console.log('error');
    })
  }

    formatAddress(location){
      var address = '';
      if (location.address1){
        address += location.address1;
      } if (location.address2){
        address += location.address2;
      } if (location.address3){
        address += location.address3;
      }
      if (location.city){
        address += ', '+location.city;
      } if (location.state){
        address += ', '+location.state;
      } if (location.zip_code){
        address += ' '+location.zip_code;
      }
      return address
    }

    displayCategories(business){
      var categories = '';
      for(let i of business.categories){
        categories += i.title + ' ';
      }
      return categories
    }

    // this.setState({
    //   randomPick: this.refs.locationseed.value
    // })
    //set location state
    //do axios call to Yelp API
    //change state to display random pick


  render() {
    var business = this.state.randomPick;
    var location = '';
    var isOpened ='';
    var categories = '';
    var ramdomOutputContainer = {}, ramdomBusinessTitle;
    if (business) {
      location = (business.location)?this.formatAddress(business.location): '';
      isOpened = business.is_closed?<span>Closed</span>:<span>Opened</span>;
      categories = this.displayCategories(business);
      ramdomOutputContainer = {
          color: 'white',
          backgroundImage: 'url(' + business.image_url + ')',
          WebkitTransition: 'all', // note the capital 'W' here
          msTransition: 'all', // 'ms' is the only lowercase vendor prefix
          height: '500px',
          width: '75%',
          overflow: 'hidden',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',

          boxShadow: '1px 1px 2px #01579B'
          };
      ramdomBusinessTitle = {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.75)',
        padding: '3px 10px',

        textShadow: '1px 1px 2px #01579B'
      };
      this.displayCategories(business);
    }


    return (
      <div className='random-container'>
        <h1>Dont even care?</h1>
        <input type='text' placeholder='City and State OR Zipcode' ref='locationseed'/>
        <input type='button' value='Roll The Dice' onClick={this.handleRandom}/>
        <div style={ramdomOutputContainer}>
          <div style={ramdomBusinessTitle}>
            <a href={business.url} target="_blank" title={business.name}><h1>{business.name}</h1></a>
            <div>
              <h3>{business.price}</h3>
              <h3>{business.rating}</h3>
            </div>
          </div>

          <div style={ramdomBusinessTitle}>
            <p>{categories}</p>
            <p>{business.rating}</p>
            <p>{location}</p>
            <p>{business.phone}</p>
            <p>{isOpened}</p>
          </div>
        </div>
      </div>
    )
  }
}
