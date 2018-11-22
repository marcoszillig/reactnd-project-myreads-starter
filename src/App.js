import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import './App.css'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'

class BooksApp extends React.Component {
  state = {  
    books: [],
    read: [],
    wantToRead: [],
    currentlyReading: [],
    filteredList: [],
    query: ''
  }

// E quando você retornar os livros, você filtra eles e coloca em cada local apropriado:
// this.setState(prevState => ({
//   read: books.filter(book => book.shelf === 'read'),
//   wantToRead: books.filter(book => book.shelf === 'wantToRead'),
//   currentlyReading: books.filter(book => book.shelf === 'currentlyReading')
// }))
  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filteredList:nextProps.books.filter(book => book.title.startsWith(nextProps.query))
    })
  }

  onSearch = (e) => {
    this.setState({
      query:e.target.value,
      filteredList:this.state.books.filter(book => book.title.toLowerCase().startsWith(e.target.value.toLowerCase()))
    })
  }
  render() {
    const { filteredList } = this.state
    const { query } = this.state
    
    return (
      <div className="app">
          <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <ListBooks 
                books={filteredList}
              />
            </div>
          )} />
        <Route path='/search' render={() => (
          <SearchBook
            books={filteredList}
            onSearch={this.onSearch}
            query={this.state.query}
          />
        )} />  
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
