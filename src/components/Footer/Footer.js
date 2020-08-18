
import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import HomeIcon from '@material-ui/icons/Home';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Nav>
          <NavItem>
            <NavLink href="/admin/dashboard"><HomeIcon /></NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://www.linkedin.com/in/aviad-bourla/"><LinkedInIcon /></NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/aviadbourla"> <GitHubIcon /></NavLink>
          </NavItem>
        </Nav>
      </footer>
    );
  }
}

export default Footer;
