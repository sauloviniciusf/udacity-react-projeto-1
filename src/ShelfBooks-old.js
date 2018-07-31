import React, {Component} from 'react'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'
import './ShelfBooks.css';

class ShelfBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        shelfs: PropTypes.array.isRequired,
        shelfTitle: PropTypes.string.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    render(){

        const { books, shelfs, shelfTitle, onChangeShelf } = this.props

        return(
            <div className="books-shelf">
                <div className="books-shelf__header">
                    <h2 className="books-shelf__title">{shelfTitle}</h2>
                </div>
                <div className="books-shelf__container">
                    {books.map((book, index) =>(
                        <div key={book.id} className="books-shelf__column">
                            <div className="book">
                                <div className="book__cover">
                                    <img src={book.imageLinks.smallThumbnail} alt={book.title}/>

                                    <label className="book__button">
                                        <select value={book.shelf} onChange={(event) => onChangeShelf(book.id, event.target.value)}>

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
                                    <div className="book__authors">
                                        {book.authors.map((author, index) =>(
                                            <p key={index}>{author}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default ShelfBooks