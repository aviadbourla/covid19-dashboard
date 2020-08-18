
import React from "react";
import classNames from "classnames";
import { withRouter } from 'react-router-dom'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import HomeIcon from '@material-ui/icons/Home';
// reactstrap components
import {
  Button,
  Collapse,
  Input,
  InputGroup,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal,
} from "reactstrap";

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      modalSearch: false,
      color: "navbar-transparent",
      filterCountry: ''
    };
  }
  // this function opens and closes the collapse on small devices
  toggleCollapse = () => {
    if (this.state.collapseOpen) {
      this.setState({
        color: "navbar-transparent"
      });
    } else {
      this.setState({
        color: "bg-white"
      });
    }
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };

  // this function is to open the Search modal
  toggleModalSearch = () => {
    this.setState({
      modalSearch: !this.state.modalSearch
    });
  };

  goCountryDashBoard = () => {
    this.props.history.push(`/admin/countryDashboard/${this.state.filterCountry}`)
  }

  render() {
    return (
      <>
        <Navbar
          className={classNames("navbar-absolute", this.state.color)}
          expand="lg"
        >
          <Container fluid>
            <button
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navigation"
              data-toggle="collapse"
              id="navigation"
              type="button"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
            </button>
            <Collapse navbar isOpen={this.state.collapseOpen}>
              <Nav />
              <div style={{ display: 'flex' }}>
                <NavLink href="/admin/dashboard"><HomeIcon />  </NavLink>
                <NavLink href="https://www.linkedin.com/in/aviad-bourla/"><LinkedInIcon /></NavLink>
                <NavLink href="https://github.com/aviadbourla"> <GitHubIcon /></NavLink>
              </div>
              <Nav />
              <Nav className="ml-auto" navbar>
                <InputGroup className="search-bar">
                  <Button
                    color="link"
                    data-target="#searchModal"
                    data-toggle="modal"
                    id="search-button"
                    onClick={this.toggleModalSearch}
                  >
                    <i className="tim-icons icon-zoom-split" />
                    <span className="d-lg-none d-md-block">Search by country</span>
                  </Button>
                </InputGroup>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        <Modal
          modalClassName="modal-search"
          isOpen={this.state.modalSearch}
          toggle={this.toggleModalSearch}
        >
          <div className="modal-header">
            <Input id="inlineFormInputGroup"
              value={this.state.filterCountry}
              placeholder="Search by country"
              type="text"
              onChange={(e) => this.setState({ filterCountry: e.target.value })}
            />
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={this.goCountryDashBoard}
            >
              <i className="tim-icons icon-check-2" />
            </button>
          </div>
        </Modal>

      </>
    );
  }
}

export default withRouter(AdminNavbar);
