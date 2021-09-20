import Navigation from "../nav"

const Header = ({totalBooks}) => (
    <header className="Header">
        <h1>Eric's Book Directory</h1>
        <p>There are {totalBooks} books in the directory</p>
        <Navigation />
    </header>
)

export default Header