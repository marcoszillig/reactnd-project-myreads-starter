import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
export default class AddBook extends Component {
  static PropTypes = {
    booksList: PropTypes.array.isRequired
  }
  state = {
    books: [],
    query: ''
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
  }

  clearQuery = () => {
    this.updateQuery('')
  }
  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }
  render () {
    const { query } = this.state
    const { booksList } = this.props

    const searchingBooks = query === ''
    ? booksList
    : booksList.filter((b) => (
      b.title.toLowerCase().includes(query.toLowerCase())
    ))

  
    return(
      <div>
        <div className="search-books-bar">
          <Link
            className='close-search'
            to='/'>
            Close
          </Link>
           <div className="search-books-input-wrapper">
             {/*
               NOTES: The search from BooksAPI is limited to a particular set of search terms.
               You can find these search terms here:
               https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
             However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
               you don't find a specific author or title. Every search is limited by search terms.
             */}
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => this.updateQuery(e.target.value)} 
            />
          </div>
          {searchingBooks.length !== booksList.length && (
            <div className='showing-contacts'>
              <span>Now showing {searchingBooks.length} of {booksList.length}</span>
              <button onClick={this.clearQuery}>Show all</button>
            </div>
          )}
        </div>
        <div className="search-books-results">
           <ol className="books-grid">
           {this.state.books.map((book) => (
             <li key={book.id} className='book-list-item'>
               <div className="book">
                 <div className="book-top">
                   <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                 </div>
                 <div className="book-title">{ book.title }</div>
                 <div className="book-authors">{ book.authors }</div>
               </div>
             </li>
           ))}
           </ol>
        </div>
      </div>
    )
  }
}
