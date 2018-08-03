import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './utils/BooksAPI'
import './SearchBooks.css'
import Book from './Book'

class SearchBooks extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        shelves: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    state = {
        query: '',
        searchedBooks: []
    }

    // Function for save search data provided by the user on state query
    // and fill the state searchBooks with books data from BooksAPI based on saved query 
    updateQuery = (query) => {
        this.setState({ query: query })

        if(query.trim() !== '')
            BooksAPI.search(query).then((searchedBooks) => {
                if(searchedBooks.error === undefined)
                    this.setState({searchedBooks})
                else
                    this.setState({searchedBooks: []})
            })
        else
            this.setState({searchedBooks: []})
    }

    render(){

        const { books, shelves, onChangeShelf } = this.props
        const { query, searchedBooks } = this.state

        return(
            <div className="search-books">
                <div className="search-books__header">
                    <input
                        className='search-books__input'
                        type='text'
                        placeholder='Search books'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </div>
                <div className="search-books__container">
                    {/* Give information to user if the search does not match anything */}
                    {searchedBooks.length < 1 && (
                        <div className="search-books__info">
                            No books found
                        </div>
                    )}
                    {searchedBooks.map((searchedBook) =>(
                        <div key={searchedBook.id} className="search-books__column">
                            <Book
                                book={searchedBook}
                                currentShelf={books.filter((book) => book.id === searchedBook.id).reduce((prev, book) => book.shelf, 'none')}
                                shelfs={shelves}
                                onChangeShelf={onChangeShelf}
                            />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default SearchBooks