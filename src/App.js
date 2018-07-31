import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ShelfBooks from './ShelfBooks'
import * as BooksAPI from './BooksAPI'
import './App.css';

class App extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <div className="app-header__title">
            My Reads
          </div>
        </div>
        <div className="list-books">
          <div className="list-books__container">
            {/* Shelf - Currently Reading */}
            <ShelfBooks
              shelfTitle="Currently Reading"
              books={this.state.books.filter(books => books.shelf === 'currentlyReading')}
            />
            {/* Shelf - Want to Read */}
            <ShelfBooks
              shelfTitle="Want to Read"
              books={this.state.books.filter(books => books.shelf === 'wantToRead')}
            />
            {/* Shelf - Read */}
            <ShelfBooks
              shelfTitle="Read"
              books={this.state.books.filter(books => books.shelf === 'read')}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App
