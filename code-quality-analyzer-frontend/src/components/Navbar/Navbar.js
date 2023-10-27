import { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import "./navbar.css";

class Navbar extends Component {
    state = { clicked: false };
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }
    render() {
        return (
            <>
                <nav>
                    <div className="mylogo">
                        <Link to={'/dashboard'}>
                            <img src={Logo} alt="" />
                        </Link>
                    </div>

                    <div>
                        <ul id="navbar" className={this.state.clicked ? "#navbar active" : "#navbae"}>
                            <li><a className="active"
                                href="index.html">Home</a></li>
                            <li><a href="index.html">Blog</a></li>
                            <li><a href="index.html">About</a></li>
                            <li><a href="index.html">Contact</a></li>
                        </ul>
                    </div>
                </nav>
            </>
        )
    }
}
export default Navbar;