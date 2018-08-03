import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import './BookShelves.css'
import Book from './Book'

class BookShelves extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        shelves: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    // Function to give to user information about loading or when the current shelf doesn't has books to show
    renderShelfUIInformation (books, filteredBooks) {
        if(books.length < 1) 
            return  <div className="book-shelf__loader-container">
                        <div className="book-shelf__loader"></div>
                    </div>

        else if(filteredBooks.length < 1) 
            return  <div className="book-shelf__info">
                        No books on this shelf
                    </div>
    }

    render(){

        const { books, shelves, onChangeShelf } = this.props

        return(
            <div className="list-books">
                <div className="list-books__container">

                    {/* Create shelves based on shelves array */}
                    {shelves.map((shelf) => {

                        // Sorting books by title 
                        let sortedBooks = books
                        sortedBooks.sort(sortBy('title'))

                        return  <div key={shelf.slug} className="book-shelf">
                                    <div className="book-shelf__header">
                                        <h2 className="book-shelf__title">{shelf.title} ({books.filter(books => books.shelf === shelf.slug).length})</h2>
                                    </div>
                                    <div className="book-shelf__container">
                                        
                                        {/* Call renderShelfUIInformation */}
                                        {this.renderShelfUIInformation(books, books.filter(books => books.shelf === shelf.slug))}
                                        
                                        {/* Display books from the current shelf */}
                                        {sortedBooks.filter(books => books.shelf === shelf.slug).map((singleBook) =>(
                                            <div key={singleBook.id} className="book-shelf__column">
                                                <Book
                                                    book={singleBook}
                                                    currentShelf={books.filter((book) => book.id === singleBook.id).reduce((prev, book) => book.shelf, 'none')}
                                                    shelfs={shelves}
                                                    onChangeShelf={onChangeShelf}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                    })}
                </div>
                {/* Link for send the user to the search page */}
                <Link className="app-add-book" to="/search"></Link>
            </div>
        )
    }
}

export default BookShelves