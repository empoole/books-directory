import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import './bookForm.css'

const BookForm = ({allBooks}) => {
    // const [book, setBook] = useState({})
    const [bookTitle, setBookTitle] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [bookRead, setBookRead] = useState(false);

    const {id} = useParams()

    useEffect(() => {
        const fetchBook = async () => {
            const bookResponse = await fetch(`http://localhost:9000/catalog/book/${id}`)
            const bookJson = await bookResponse.json()
            // setBook(bookJson)
            setBookTitle(bookJson.title)
            setBookAuthor(bookJson.author)
            setBookRead(bookJson.read)
        }
        fetchBook()
    }, [id])

    // if(!book) return (<div>Book not found.</div>)

    return (
        <section className="BookForm">
            <form name="add-book" method="post" action="">
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Book Title"
                        name="title"
                        required={true}
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="author">Author: </label>
                    <input
                        type="text"
                        id="author"
                        placeholder="Author"
                        name="author"
                        required={true}
                        value={bookAuthor}
                        onChange={(e) => setBookAuthor(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="genre">Genre:</label>
                </div>

                <div className="form-group">
                    <label htmlFor="read">Read:</label>
                    {
                        [{text:'Yes', value: true}, {text: 'No', value: false}].map((answer) => {
                            return (
                                <div key={answer.text} className="checkbox-wrapper">
                                    <input 
                                        type="checkbox"
                                        name="read"
                                        id={answer.text}
                                        className="checkbox-input"
                                        value={answer.value}
                                        checked={bookRead === answer.value}
                                        onChange={(e) => setBookRead(e.target.value)}
                                    />
                                    <label htmlFor={answer.text}>{answer.text}</label>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="form-group">
                    <button type="submit">Submit</button>
                </div>

            </form>
        </section>
    )
}

export default BookForm
