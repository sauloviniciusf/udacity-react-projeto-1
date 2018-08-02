import React, {Component} from 'react'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './utils/BooksAPI'
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'
import './SearchBooks.css';
import noThumbnail from './images/no-thumbnail.jpg';

class SearchBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        shelfs: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    state = {
        query: '',
        searchedBooks: []
    }

    updateQuery = (query) => {
        this.setState({ query: query })
        
        BooksAPI.search(query).then((searchedBooks) => {
            if(searchedBooks !== undefined)
                this.setState({searchedBooks})
            else
                this.setState({searchedBooks: []})
        })
    }

    render(){

        const { books, shelfs, onChangeShelf } = this.props
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
                <div className="books-shelf__container">
                    {searchedBooks.map((searchedBook) =>(
                        <div key={searchedBook.id} className="books-shelf__column">
                            <div className="book">
                                <div className="book__cover">
                                    <img src={((searchedBook.imageLinks !== undefined) ? searchedBook.imageLinks.smallThumbnail : noThumbnail)} alt={searchedBook.title}/>
                                    <label className="book__button">
                                        <select value={books.filter((book) => book.id === searchedBook.id).reduce((prev, book) => book.shelf, 'none')} onChange={(event) => onChangeShelf(searchedBook, event.target.value)}>
                                            <option value="move" disabled>Move to...</option>
                                            {shelfs.map((shelf,index) => (
                                                <option 
                                                    key={index} 
                                                    value={shelf.slug}>{shelf.title}</option>
                                            ))}
                                            <option value="none">None</option>

                                        </select>
                                    </label>
                                </div>
                                <div className="book__details">
                                    <h3 className="book__title">{searchedBook.title}</h3>

                                    {searchedBook.authors !== undefined && (
                                        <div className="book__authors">
                                            {searchedBook.authors.map((author, index) =>(
                                                <p key={index}>{author}</p>
                                            ))}
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default SearchBooks