import YourComponent from './YourComponent.jsx';
export default function Navbar(){
    return(
        <nav className="nav">
            <a href="/" className="Title">
                {<YourComponent/>}
            </a>
            <ul>
                <li>
                    <a href="/Contact-us">Contact-us</a>
                </li>
                <li>
                    <a href="/">Home</a>
                </li>
            </ul>
        </nav>
    )
}