import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './Book.css'
import noThumbnail from './images/no-thumbnail.jpg'

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        currentShelf: PropTypes.string.isRequired,
        onChangeShelf: PropTypes.func.isRequired,
        shelfs: PropTypes.array.isRequired
    }

    render() {
        
        const { book, currentShelf, onChangeShelf, shelfs } = this.props

        return (
            <div className="book">
                <div className="book__cover">
                    <img src={((book.imageLinks !== undefined) ? book.imageLinks.smallThumbnail : noThumbnail)} alt={book.title}/>
                    <label className="book__button">
                        <select value={currentShelf} onChange={(event) => onChangeShelf(book, event.target.value)}>
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
        )
    }
}

export default Book