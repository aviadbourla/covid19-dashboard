
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import routes from "routes.js";


class Admin extends React.Component {
  constructor(props) {
    super(props);
  }

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  render() {
    return (
      <>
        <div className="wrapper">
          <div
            className="main-panel"
            ref="mainPanel"
          >
            <AdminNavbar />
            <Switch>
              {this.getRoutes(routes)}
              <Redirect from="*" to="/admin/dashboard" />
            </Switch>
            <Footer />
          </div>
        </div>
      </>
    );
  }
}

export default Admin;
