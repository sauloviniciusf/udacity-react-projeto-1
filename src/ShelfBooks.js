import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'
import './ShelfBooks.css';
import noThumbnail from './images/no-thumbnail.jpg';

class ShelfBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        shelfs: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    renderShelfUIInformation (books, filteredBooks) {
        if(books.length < 1) 
            return  <div className="books-shelf__loader-container">
                        <div className="books-shelf__loader"></div>
                    </div>

        else if(filteredBooks.length < 1) 
            return  <div className="books-shelf__info">
                        No books on this shelf
                    </div>
    }

    render(){

        const { books, shelfs, onChangeShelf } = this.props

        return(
            <div className="list-books">
                <div className="list-books__container">

                    {/* TODO: Create shelfs based on shelfs array */}
                    {shelfs.map((shelf,index) => (
                        <div key={index} className="books-shelf">
                            <div className="books-shelf__header">
                                <h2 className="books-shelf__title">{shelf.title} ({books.filter(books => books.shelf === shelf.slug).length})</h2>
                            </div>
                            <div className="books-shelf__container">
                                
                                {/* TODO: Call renderShelfUIInformation to give to user information about loading or when the current shelf doesn't has books to show */}
                                {this.renderShelfUIInformation(books, books.filter(books => books.shelf === shelf.slug))}
                                
                                {/* TODO: Display books from the current shelf */}
                                {books.filter(books => books.shelf === shelf.slug).map((book) =>(

                                    <div key={book.id} className="books-shelf__column">
                                        <div className="book">
                                            <div className="book__cover">
                                                <img src={((book.imageLinks !== undefined) ? book.imageLinks.smallThumbnail : noThumbnail)} alt={book.title}/>

                                                <label className="book__button">
                                                    <select value={book.shelf} onChange={(event) => onChangeShelf(book, event.target.value)}>

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
                                                <h3 className="book__title">{book.title}</h3>
                                                {book.authors !== undefined && (
                                                    <div className="book__authors">
                                                        {book.authors.map((author, index) =>(
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
                    ))}
                </div>
                <Link className="app-add-book" to="/search"></Link>
            </div>
        )
    }
}

export default ShelfBooks