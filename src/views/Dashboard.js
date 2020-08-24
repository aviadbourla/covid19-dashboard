
import React from "react";
import TableList from '../components/Tables/TableList'
import ChartGlobalyDays from '../Charts/ChartGlobalyDays'
import Showmap from "components/Map/Showmap";
import './dashboard.css'
import Footer from "components/Footer/Footer.js";
import ChartPieGlobaly from '../Charts/ChartPieGlobaly'
import ChartPieByContinent from '../Charts/ChartPieByContinent'
import ChartPieByCountry from '../Charts/ChartPieByCountry'
import Cards from '../components/Cards/Cards'
import ShowDateUpdate from '../components/Date/ShowDateUpdate'

// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col,
} from "reactstrap";

class Dashboard extends React.Component {

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col lg="12">
              <div className="header-div">
                <h1>World live Statistics</h1>
                <ShowDateUpdate />
              </div>
            </Col>
          </Row>
          <Row>
            <Cards />
          </Row>
          <Row>
            <Col xs="12">
              <ChartGlobalyDays />
            </Col>
          </Row>
          <Row>
            <Col lg="4">
              <ChartPieGlobaly
                header={'Globaly'}
              />
            </Col>
            <Col lg="4">
              <ChartPieByContinent
                header={'By continent'}
              />
            </Col>
            <Col lg="4">
              <ChartPieByCountry
                header={'By country'}
              />
            </Col>
          </Row>
          <Row>
            <Col lg="12" md="12">
              <Showmap />
            </Col>
          </Row>
          <Row>
            <Col lg="12" md="12">
              <Card>
                <CardBody>
                  <TableList />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Footer />
        </div >
      </>
    );
  }
}

export default Dashboard;
