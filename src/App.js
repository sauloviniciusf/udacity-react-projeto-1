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
            <Link className="app-header__back-button" to="/"></Link>
          )}/>

        </div>

        <div className="app-container">

          {/* Route - Books List */}
          <Route exact path="/" render={() => (
            <ShelfBooks
              books={this.state.books}
              shelfs={shelfs}
              onChangeShelf={(book, shelf) => {
                this.changeShelf(book, shelf)
              }}
            />
          )}/>

          {/* Route - Books Search */}
          <Route path="/search" render={() => (
            <SearchBooks
              books={this.state.books}
              shelfs={shelfs}
              onChangeShelf={(book, shelf) => {
                this.changeShelf(book, shelf)
              }}
            />
          )}/>
        </div>
      </div>
    );
  }
}

export default App
