
import React from "react";
import TableList from '../components/Tables/TableList'
import ChartGlobalyDays from '../Charts/ChartGlobalyDays'
import ChartPie from '../Charts/ChartPie'
import TopCard from '../components/Cards/TopCard'
import covidReqestes from '../HttpReq/covidReqestes'
import Showmap from "components/Map/Showmap";
import './dashboard.css'
import Footer from "components/Footer/Footer.js";
// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col,
} from "reactstrap";


class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      dataCovidGlobaly: [],
      dataCovidCountries: [],
      isloading: true,
      continentArr: []
    };
  }

  componentDidMount() {
    this.getApi();
  }

  getApi = async () => {
    try {
      let requests = this.getRquests();
      let promiseDataArr = []
      await Promise.all(requests).then((values) => {
        promiseDataArr = values;
      });
      this.setState({
        countries: promiseDataArr[0].data.Countries,
        dataCovidGlobaly: promiseDataArr[1].data,
        dataCovidCountries: promiseDataArr[2].data,
        continentArr: promiseDataArr[3].data,
        isloading: false,
      })
    } catch (e) {
      console.log(e)
    }
  }

  getRquests() {
    let temp = []
    temp.push(covidReqestes.getSummary())
    temp.push(covidReqestes.getAll())
    temp.push(covidReqestes.getCountriesArr())
    temp.push(covidReqestes.getContinents())
    return temp
  }

  render() {

    let spiner = <div className="spiner-continer">
      <div className="spinner">
        <div className="lds-dual-ring">
        </div>
      </div>
    </div>

    return (
      <>{
        this.state.isloading ?
          spiner :
          <div className="content">
            <Row>
              <Col lg="12">
                <div className="header-div">
                  <h1>World live Statistics</h1>
                  {this.state.dataCovidGlobaly.updated
                    &&
                    <h4 style={{}} >
                      last updated:
                   {
                        ' ' + new Date(this.state.dataCovidGlobaly.updated).toLocaleDateString("en-IE").substring(0, 4)
                        + ' ' +
                        new Date(this.state.dataCovidGlobaly.updated).toUTCString().substring(18, 22)
                      }
                    </h4>
                  }
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg="2" className="centerDiv">
                <TopCard
                  title={'Today Confirmed'}
                  cardText={this.state.dataCovidGlobaly.todayCases}
                />
              </Col>
              <Col lg="2">
                <TopCard
                  title={'Total Confirmed'}
                  cardText={this.state.dataCovidGlobaly.cases}
                />
              </Col>
              <Col lg="2">
                <TopCard
                  title={'Total Recovered'}
                  cardText={this.state.dataCovidGlobaly.recovered}
                />
              </Col>
              <Col lg="2">
                <TopCard
                  title={'Today Deaths'}
                  cardText={this.state.dataCovidGlobaly.todayDeaths}
                />
              </Col>
              <Col lg="2">
                <TopCard
                  title={'Total Deaths'}
                  cardText={this.state.dataCovidGlobaly.deaths}
                />
              </Col>
              <Col lg="2">
                <TopCard
                  title={'critical '}
                  critical
                  cardText={this.state.dataCovidGlobaly.critical}
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <ChartGlobalyDays
                />
              </Col>
            </Row>
            <Row>
              <Col lg="4">
                <ChartPie
                  header={'Globaly'}
                  globalData={this.state.dataCovidGlobaly}
                />
              </Col>
              <Col lg="4">
                <ChartPie
                  header={'By continent'}
                  continentsArr={this.state.continentArr}
                />
              </Col>
              <Col lg="4">
                <ChartPie
                  header={'By country'}
                  globalDataCountries={this.state.dataCovidCountries}
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
                    <TableList countries={this.state.countries} />
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Footer />
          </div >}
      </>
    );
  }
}

export default Dashboard;
