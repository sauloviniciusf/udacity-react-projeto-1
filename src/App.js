import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import BookShelves from './BookShelves'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

// Array with shelves being used by the app
const shelves = [
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

  // Fill the state books with books data from BooksAPI
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  // Function for changing a book to other shelf or remove it from the existing shelves
  changeShelf = (selectedBook, selectedShelf) => {
    BooksAPI.update(selectedBook,selectedShelf).then((response) => {
      if (selectedShelf !== 'none'){
        BooksAPI.get(selectedBook.id).then((selectedBook) => {
          this.setState((state) => ({
            books: state.books.filter((book) => book.id !== selectedBook.id).concat(selectedBook)
          }))
        })
      }else{
        this.setState((state) => ({
          books: state.books.filter((book) => book.id !== selectedBook.id)
        }))
      }
    })
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
            // Link for send user back to home of the app
            <Link className="app-header__back-button" to="/"></Link>
          )}/>

        </div>

        <div className="app-container">
          {/* Route - Books List */}
          <Route exact path="/" render={() => (
            <BookShelves
              books={this.state.books}
              shelves={shelves}
              onChangeShelf={(book, shelf) => {
                this.changeShelf(book, shelf)
              }}
            />
          )}/>

          {/* Route - Books Search */}
          <Route path="/search" render={() => (
            <SearchBooks
              books={this.state.books}
              shelves={shelves}
              onChangeShelf={(book, shelf) => {
                this.changeShelf(book, shelf)
              }}
            />
          )}/>
        </div>
      </div>
    )
  }
}

export default App
