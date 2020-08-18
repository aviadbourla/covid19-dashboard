import React, { useState, useEffect } from "react";
import TableSingleCountry from '../components/Tables/TableSingleCountry'
import TableSingleCountryHistory from '../components/Tables/TableSingleCountryHistory'
import ChartHistoryContry from '../Charts/ChartHistoryContry'
import TopCard from '../components/Cards/TopCard'
import { useHistory } from "react-router-dom";
import covidReqestes from '../HttpReq/covidReqestes'
import Footer from "components/Footer/Footer.js";


import {
    Card,
    CardBody,
    Row,
    Col,
} from "reactstrap";


import { useParams } from "react-router-dom";

const DashboardCountry = (props) => {

    const [countryObj, setCountryObj] = useState('');
    const [countryObjHistory, setCountryObjHistory] = useState('');
    const { country } = useParams();

    let history = useHistory();

    const getCountries = async () => {
        try {
            const response = await covidReqestes.getSpecificCountry(country);
            const response2 = await covidReqestes.getSpecificCountryHistory(country)
            setCountryObj(response.data)
            setCountryObjHistory(response2.data.timeline)
        } catch (e) {
            alert('You enter invalid country name')
            history.push('./admin/dashboard')
        }
    }

    useEffect(() => {
        getCountries();
    }, [country])

    const getLastUpdated = () => {
        if (!countryObj.updated) {
            return null
        }
        return <h4>last updated: {new Date(countryObj.updated).toLocaleDateString("en-IE").substring(0, 4)
            + ' ' +
            new Date(countryObj.updated).toUTCString().substring(18, 22)}</h4>
    }

    const getTopCards = () => {

        const { todayCases, active, recovered, todayDeaths, deaths, critical } = countryObj
        return [
            {
                title: 'Today Confirmed',
                value: todayCases
            },
            {
                title: 'Total Confirmed',
                value: active
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
    return (
        <>
            <div className="content">
                <Row>
                    <Col lg="12">
                        <div className="header-div">
                            <h1>{countryObj.country} live Statistics </h1>
                            {
                                getLastUpdated()
                            }
                        </div>
                    </Col>
                </Row>
                <Row>
                    {getTopCards().map(({ title, value }) => {
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
                        <ChartHistoryContry />
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" md="12">
                        <Card>
                            <CardBody>
                                <TableSingleCountry
                                    countryData={countryObj}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" md="12">
                        <Card>
                            <CardBody>
                                <TableSingleCountryHistory
                                    country={country}
                                    countryObjHistory={countryObjHistory} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Footer />
            </div>
        </>
    );
}


export default DashboardCountry;
