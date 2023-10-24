import { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/code-analyzer.png";
import "./navbar.css";

class Navbar extends Component {
  state = { clciked: false };
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };
  render() {
    return (
      <>
        <nav>
          <div className="logo">
            <Link to={"/"}>
              <img src={Logo} alt="" />
            </Link>
          </div>

          <div>
            <ul
              id="navbar"
              className={this.state.clicked ? "#navbar active" : "#navbae"}
            >
              <li>
                <a className="active" href="index.html">
                  Home
                </a>
              </li>
              <li>
                <a href="index.html">Blog</a>
              </li>
              <li>
                <a href="index.html">About</a>
              </li>
              <li>
                <a href="index.html">Contact</a>
              </li>
            </ul>
          </div>
          <div id="mobile" onClick={this.handleClick}>
            <i
              id="bar"
              className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
            ></i>
          </div>
        </nav>
      </>
    );
  }
}
export default Navbar;
