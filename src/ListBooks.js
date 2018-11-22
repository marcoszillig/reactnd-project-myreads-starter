import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import { Link } from 'react-router-dom'

export default class ListBooks extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired,
  }
  render(){
    const { books } = this.props
     
    return(
      <div className="bookshelf-books">
        <ol className="books-grid">
        {books.map((book) => (
          <li key={book.id} className='book-list-item'>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                <div className="book-shelf-changer">
                  <select>
                    {console.log(book.shelf)}
                    <option value="move" disabled>Move to...</option>                    
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{ book.title }</div>
              <div className="book-authors">{ book.authors }</div>
              <div className="books-authors">{ book.shelf }</div>
            </div>
          </li>
        ))}
        </ol>
      </div>
    )
  }
}