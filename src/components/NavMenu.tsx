import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {
        return (
            <nav className="navbar navbar-light bg-light static-top">
                <div className="container">
                    <Link className="logo mr-auto" to="/"><img src="./img/omnifreight-logo.png" alt="omnifreight" /></Link>
                    {/*<a className="btn btn-primary" href="#signup">Sign Up</a>*/}
                </div>
            </nav>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
