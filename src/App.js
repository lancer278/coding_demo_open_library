import React, { Component } from 'react';
import './App.css';
import { Grid, Row, Col } from 'react-bootstrap';
import Book from './components/book';
import Helmet from 'react-helmet';
import fetch from 'isomorphic-fetch';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
        booklist: [],
        value: '',
        start:0,
        limit:5,
        frontpage:true};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getfive = this.getfive.bind(this);
    this.nextfive = this.nextfive.bind(this);
    this.prevfive = this.prevfive.bind(this);
  }

  componentDidMount = () => {
        fetch('http://localhost:8080/api/booklist')
        .then(response => response.json())
        .then(data => {
          this.setState({booklist:data, frontpage:true})
        })
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      let newval = this.state.value
      if(newval.length > 0){
        if(newval === "Easter Egg"){
          window.location = "/bouncy.html"
          event.preventDefault();
          return
        } else if(this.state.value.search(new RegExp(/OL[0-9]+M/))>-1){
          fetch('http://localhost:8080/api/search/olid/'+this.state.value)
          .then(response => response.json())
          .then(data => {
              this.setState({booklist: data, start:0, limit:1});
            })
        }else{
          let title = this.state.value.split(" ").join("+")
          console.log(title)
          fetch('http://localhost:8080/api/search/title/'+title)
          .then(response => response.json())
          .then(data => {
              this.setState({booklist: data, start:0, limit:5, frontpage:false});
            })
        }
      }
      event.preventDefault();
    } 

    nextfive(e){
        let newstart = this.state.start + this.state.limit
        this.getfive(newstart)
        e.preventDefault()
    }

    prevfive(e){
        let newstart = this.state.start - this.state.limit - 1
        newstart = newstart <=0 ? 0 : newstart
        this.getfive(newstart)
        e.preventDefault()
    }

    getfive(newstart, limit = 5){
        fetch('http://localhost:8080/api/search/next/'+newstart+'/'+this.state.limit)
          .then(response => response.json())
          .then(data => {
              this.setState({booklist: data, start: newstart, frontpage:false});
            })
    }

  render() {
    const showprevnext = this.state.frontpage ? {display:"none"} : {display:"block"}
    const showprev = this.state.start === 0 ? {display:"none"} : {display:"block"}

    return (
      <div>
        <Helmet
          title="Open Library Search"
        />
        <div className="App">
          <header className="App-header">
            <a href="/">
              <img className="App-logo" src="https://openlibrary.org/static/images/openlibrary-logo-tighter.svg" alt="Open Library logo"></img>
            </a>
          <h1 className="App-title">Open Library Search Tool</h1>
          </header>
          <a href="https://openlibrary.org">
            <h4>
              What is Open Library?
            </h4>
          </a>
          <p className="App-intro">
            Our goal is to provide a page on the web for every book ever published.
          </p>
          <p className="App-intro">
            Open Library is a catalog. The project began in November 2007 and has been inhaling catalog records from some of the biggest libraries in the world ever since. We have well over 20 million edition records online, provide access to 1.7 million scanned versions of books, and link to external sources like WorldCat and Amazon when we can.
          </p>
          <form onSubmit={this.handleSubmit}>
            <label>
              Search whole library by Book Name or Open Library ID:
              <input type="text" value={this.state.value} onChange={this.handleChange} name="name" />
            </label>
            <input className="btn btn-primary" type="submit" value="Search" />
          </form>
          <Grid>
            <Row className="show-grid">
                {
                  Object.keys(this.state.booklist).map( (book) => 
                    {return <Book 
                      book={this.state.booklist[book]} key={book} olid={book}
                      />
                    })
                }
            </Row>
            <Row style={showprevnext} >
              <Col xs={3} style={showprev}>
                <a href="#" onClick={this.prevfive}>Prev</a>
              </Col>
              <Col xs={3} xsOffset={6}>
                <a href="#" onClick={this.nextfive}>Next</a>
              </Col>
            </Row>
            </Grid>
        </div>
      </div>
    );
  }
}

export default App;
