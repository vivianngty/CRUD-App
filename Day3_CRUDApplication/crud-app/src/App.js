// installed axios - npm i axios. What does axios do? axios make HTTP requests (calls)
  // import axios
// installed react router - npm i react-router-dom. What does router do? Router generates urls
  // import react-router-dom
  import React from 'react';
  import axios from 'axios';
  import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  const WINES_URL = 'http://myapi-profstream.herokuapp.com/api/1fd331/wines/'
  const BOOKS_URL = 'http://myapi-profstream.herokuapp.com/api/e946db/books/'
  
  class App extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/wines">Wines</Link>
              </li>
              <li>
                <Link to ="/books">Books</Link>
              </li>
            </ul>

            <Switch>
              <Route path="/wines">
                <Wines />
              </Route>
              <Route path="/books">
                <Books />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      );
    }
  }
  class Home extends React.Component {
    render() {
      return(
        <h1>Home component works!</h1>
      )
    }
  }

  /* ----------------------------------------------------- WINE --------------------------------------------------------- */

  class Wines extends React.Component {
    constructor(props) {
      super(props);
      this.state = {}
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    async getWines() {
      try {
        const res = await axios.get(WINES_URL);
        this.setState({ wines: res.data });
      } catch(e) {
        console.error(e);
      }
    }
    componentDidMount() {
      this.getWines();
    }
    handleChange(e) {
      const { name, value } = e.target;
      // e.target.name
      // e.target.value
      this.setState({ [name]: value })
    }
    async handleSubmit(e) {
      e.preventDefault();
      // this.state.name
      // this.state.year
      // this.state.grapes
      const { name, year, grapes, country, region, description, picture, price } = this.state;
      const wine = { name, year, grapes, country, region, description, picture, price };
      try {
        const res = await axios.post(WINES_URL, wine);
        console.log(res.data);
        const updateRes = await axios.get(WINES_URL);
        this.setState({ wines: updateRes.data });
      } catch(e) {
        console.error(e.message);
      }
    }
    async handleDelete(id) {
      try {
        const res = await axios.delete(WINES_URL + id); // target wine id
        console.log(res.data);
        const updateRes = await axios.get(WINES_URL);
        this.setState({ wines: updateRes.data });
      } catch(er) {
        console.error(er.message)
      }
    }
    render() {
      return (
        <div className="wines">
          <ul>
            {/* render info */}
            {
              this.state.wines && this.state.wines.map(wine => (
                <li>
                  { wine.name }: price { wine.price } <button onClick={ () => this.handleDelete(wine.id) }>Delete wine</button>
                </li>
              ))
            }
          </ul>
          <form className="new-wine-form"
            onChange={ this.handleChange }
            onSubmit={ this.handleSubmit }>
            <label>
              Wine name:
              <input type="text" name="name" />
            </label>
            <label>
              Year wine was made:
              <input type="text" name="year" />
            </label>
            <label>
              Grapes used:
              <input type="text" name="grapes" />
            </label>
            <label>
              Country of wine:
              <input type="text" name="country" />
            </label>
            <label>
              Wine region:
              <input type="text" name="region" />
            </label>
            <label>
              Description of wine:
              <input type="text" name="description" />
            </label>
            <label>
              Picture url:
              <input type="text" name="picture" />
            </label>
            <label>
              Price:
              <input type="text" name="price" />
            </label>
            <input type="submit" />
          </form>
        </div>
      )
    }
  }
/* ----------------------------------------------------------BOOK------------------------------------------------------------------- */
  class Books extends React.Component{
    constructor(props){
      super(props)
      this.state = {}
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    async getBooks(){
      try {
        const res = await axios.get (BOOKS_URL);
        this.setState ({ books: res.data })
      } catch(e){
        console.log (e);
      }
    }
    componentDidMount(){
      this.getBooks()
    }

    handleChange(e){
      const { name, value } = e.target;
      this.setState ({ [name] : value})
    }

    async handleSubmit(e) {
      e.preventDefault();
      // this.state.name
      // this.state.year
      // this.state.grapes
      const { title, author, release_date } = this.state;
      const book = { title, author, release_date };
      try {
        const res = await axios.post(BOOKS_URL, book);
        console.log(res.data);
        const updateRes = await axios.get(BOOKS_URL);
        this.setState({ books: updateRes.data });
      } catch(e) {
        console.error(e.message);
      }
    }

    async handleDelete(id) {
      try {
        const res = await axios.delete(BOOKS_URL + id); 
        console.log(res.data);
        const updateRes = await axios.get(BOOKS_URL);
        this.setState({ wines: updateRes.data });
      } catch(er) {
        console.error(er.message)
      }
    }

    render(){
      return(
        <div>
          <ul>
            {
              this.state.books && this.state.books.map(book => (
                <li>
                  title: { book.title }: author { book.author } <button onClick={ () => this.handleDelete(book.id) }>Delete book</button>
                </li>
              ))
            }
          </ul>
          <form className="new-book-form"
            onChange={ this.handleChange }
            onSubmit={ this.handleSubmit }>
            <label>
              Book title:
              <input type="text" name="title" />
            </label>
            <label>
              Author:
              <input type="text" name="author" />
            </label>
            <label>
              Release date:
              <input type="text" name="release_date" />
            </label>
            
            <input type="submit" />
          </form>
        </div>
      )
    }
  }


  export default App;