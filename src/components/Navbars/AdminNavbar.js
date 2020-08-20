
import React from "react";
import classNames from "classnames";
import { withRouter } from 'react-router-dom'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import HomeIcon from '@material-ui/icons/Home';
import { Typeahead } from 'react-bootstrap-typeahead';
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
import './nav.css'
const contriesNamesArrHardCoded = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Cayman Islands", "Central African Republic", "Chad", "Channel Islands", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czechia", "Côte d'Ivoire", "DRC", "Denmark", "Diamond Princess", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "MS Zaandam", "Macao", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Réunion", "S. Korea", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin", "Saint Pierre Miquelon", "Saint Vincent and the Grenadines", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten", "Slovakia", "Slovenia", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "St. Barth", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Trinidad and Tobago", "Tunisia", "Turkey", "Turks and Caicos Islands", "UAE", "UK", "USA", "Uganda", "Ukraine", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"]

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
          <Typeahead
            id="pagination-example"
            maxResults={false}
            options={contriesNamesArrHardCoded}
            paginate={false}
            placeholder="Pick a country..."
            onChange={(selected) => this.setState({ filterCountry: selected })}
            selected={this.state.filterCountry}
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
        </Modal>

      </>
    );
  }
}

export default withRouter(AdminNavbar);

