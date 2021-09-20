import './nav.css';

const Navigation = () => (
    <nav className="Navigation">
        <ul>
            <li><a href="/">All Books</a></li>
            <li><a href="/book/add">Add a Book</a></li>
            <li><a href="/genre/add">Add a Genre</a></li>
        </ul>
    </nav>
)

export default Navigation