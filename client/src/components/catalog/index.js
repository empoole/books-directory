import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import BookList from '../bookList';
import BookForm from '../bookForm';
import Header from '../header';

import './catalog.css';

function App() {

  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('http://localhost:9000/catalog/books')
      const responseJson = await response.json()
      setBooks(responseJson.book_list)
    }
    fetchBooks()
}, []);

  return (

    <Router>
      <div className="App">
        <Header totalBooks={books.length} />
        <Switch>
          <Route path="/book/:id">
            <BookForm allBooks={books} />
          </Route>



          <Route path="/">
            <BookList allBooks={books} />
          </Route>
        </Switch>
      </div>
    </Router>
    

  );
}

export default App;
