import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import ShelfBooks from './ShelfBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './utils/BooksAPI'
import './App.css';

const shelfs = [
  {
    slug: 'currentlyReading',
    title: 'Currently Reading'
  },
  {
    slug: 'wantToRead',
    title: 'Want to Read'
  },
  {
    slug: 'read',
    title: 'Read'
  }
]

class App extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  changeShelf = (bookId, bookShelf) => {
    let newState = this.state.books.filter(book => book.id === bookId)
    // let bookChanged = this.state.books.filter(book => book.id !== bookId)
    newState[0].shelf = bookShelf 

    this.setState((state) => ({
      books: state.books.filter((book) => book.id !== bookId).concat(newState)
    }))

    console.log(this.state.books)
  }

  searchBooks() {
    
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <div className="app-header__title">
            My Reads
          </div>

          {/* Route for show back button on /search route */}
          <Route path="/search" render={() => (
            <Link className="app-header__back-button" to="/"> Back </Link>
          )}/>

        </div>

        <div className="app-container">

          {/* Route - Books List */}
          <Route exact path="/" render={() => (

            <div className="list-books">
              <div className="list-books__container">

                {/* TODO: Create shelfs based on shelfs array */}
                {shelfs.map((shelf, index) => (
                  <ShelfBooks
                    key={index}
                    shelfTitle={shelf.title}
                    books={this.state.books.filter(books => books.shelf === shelf.slug)}
                    shelfs={shelfs}
                    onChangeShelf={(book, shelf) => {
                      this.changeShelf(book, shelf)
                    }}
                  />
                ))}

                {/* Shelf - Currently Reading */}
                {/* <ShelfBooks
                  shelfTitle="Currently Reading"
                  books={this.state.books.filter(books => books.shelf === 'currentlyReading')}
                /> */}
                {/* Shelf - Want to Read */}
                {/* <ShelfBooks
                  shelfTitle="Want to Read"
                  books={this.state.books.filter(books => books.shelf === 'wantToRead')}
                /> */}
                {/* Shelf - Read */}
                {/* <ShelfBooks
                  shelfTitle="Read"
                  books={this.state.books.filter(books => books.shelf === 'read')}
                /> */}
              </div>
              
              <Link className="app-add-book" to="/search"></Link>

            </div>
          )}/>

          {/* Route - Books Search */}
          <Route path="/search" render={() => (
            <SearchBooks/>
          )}/>
        </div>
      </div>
    );
  }
}

export default App
