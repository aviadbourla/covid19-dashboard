
import React from "react";
import TableList from '../components/Tables/TableList'
import ChartGlobalyDays from '../Charts/ChartGlobalyDays'
import ChartPie from '../Charts/ChartPie'
import TopCard from '../components/Cards/TopCard'
import covidReqestes from '../HttpReq/covidReqestes'
import Showmap from "components/Map/Showmap";
import './dashboard.css'
import Footer from "components/Footer/Footer.js";
import Spiner from '../components/Spiner/spiner'
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
      continentArr: [],
      eror: ''
    };
  }

  componentDidMount() {
    this.getApi();
  }

  getApi = async () => {
    try {
      const requests = this.getRquests();
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
      //404 
    }
  }

  getRquests() {
    return [
      covidReqestes.getSummary(),
      covidReqestes.getAll(),
      covidReqestes.getCountriesArr(),
      covidReqestes.getContinents()
    ]
  }
  getLastUpdated() {
    const { updated } = this.state.dataCovidGlobaly
    if (!updated) {
      return null
    }
    return <h4>last updated: {new Date(updated).toLocaleDateString("en-IE").substring(0, 4)
      + ' ' +
      new Date(updated).toUTCString().substring(18, 22)}</h4>
  }

  getTopCards() {
    const { todayCases, cases, recovered, todayDeaths, deaths, critical } = this.state.dataCovidGlobaly

    return [
      {
        title: 'Today Confirmed',
        value: todayCases
      },
      {
        title: 'Total Confirmed',
        value: cases
      },
      {
        title: 'Total Recovered',
        value: recovered
      },
      {
        title: 'Today Deaths',
        value: todayDeaths
      },
      {
        title: 'Total Deathsd',
        value: deaths
      },
      {
        title: 'Critical',
        value: critical
      }
    ]
  }
  render() {

    if (this.state.isloading) {
      return <Spiner />
    }

    return (
      <>
        <div className="content">
          <Row>
            <Col lg="12">
              <div className="header-div">
                <h1>World live Statistics</h1>
                {
                  this.getLastUpdated()
                }
              </div>
            </Col>
          </Row>
          <Row>
            {this.getTopCards().map(({ title, value }) => {
              return <Col lg="2">
                <TopCard
                  title={title}
                  cardText={value}
                />
              </Col>
            })}
          </Row>
          <Row>
            <Col xs="12">
              <ChartGlobalyDays />
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
        </div >
      </>
    );
  }
}

export default Dashboard;
