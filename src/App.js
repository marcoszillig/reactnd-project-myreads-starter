import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import './App.css'
import ListBooks from './ListBooks'
import AddBook from './AddBook'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // showSearchPage: false
    books: [],
    shelf: ''
  }
  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }
  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <Route exact path='/' render={() => (
            <ListBooks 
              books={this.state.books}
            />
          )} />
        </div>
        <Route path='/search' rendercomponent={AddBook}/>
        <div className="open-search">
          <Link
          to='/search'
          className='add-book'
          >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksApp
