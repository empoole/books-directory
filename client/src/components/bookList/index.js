import './bookList.css';

const BookList = ({allBooks}) => {

    const bookRows = allBooks.map((book, i) => {
        
        const bookGenres = book.genre.map((genre, index) => (
            <span key={index}>
                <a href={genre.url}>{genre.name}</a>{index < book.genre.length - 1 ? ', ' :''}
            </span>
        ))
        
        return (
            <tr key={i}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{bookGenres}</td>
                <td>{book.read===true?'Yes':'No'}</td>
                <td><a href={book.url} className="edit-button">Edit</a></td>
            </tr>
        )
    })
    
    return (
        <section className="BookList">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Read</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {bookRows}
                </tbody>
            </table>
        </section>
    )
}

export default BookList;