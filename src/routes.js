
import Dashboard from "views/Dashboard.js";
import DashboardCountry from "views/DashboardCountry.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/countryDashboard/:country",
    name: "Dashboard Country",
    component: DashboardCountry,
    layout: "/admin"
  },

];
export default routes;
