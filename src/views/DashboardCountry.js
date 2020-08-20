import React, { useState, useEffect } from "react";
import TableSingleCountry from '../components/Tables/TableSingleCountry'
import TableSingleCountryHistory from '../components/Tables/TableSingleCountryHistory'
import ChartHistoryContry from '../Charts/ChartHistoryContry'
import TopCard from '../components/Cards/TopCard'
import { useHistory } from "react-router-dom";
import covidReqestes from '../HttpReq/covidReqestes'
import Footer from "components/Footer/Footer.js";
import ShowSpiner from '../components/Spiner/ShowSpiner'
import CardsCountry from '../components/Cards/CardsCountry'
import {
    Card,
    CardBody,
    Row,
    Col,
    Spinner,
} from "reactstrap";


import { useParams } from "react-router-dom";

const DashboardCountry = (props) => {

    const [countryObj, setCountryObj] = useState('');
    const [countryObjHistory, setCountryObjHistory] = useState('');
    const { country } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingHistory, setIsLoadingHistory] = useState(true);
    let history = useHistory();

    const getCountries = async () => {
        let temp = []
        try {
            await Promise.all([
                covidReqestes.getSpecificCountry(country),
                covidReqestes.getSpecificCountryHistory(country)])
                .then((values) => {
                    temp = values;
                });
            const response = temp[0]
            const response2 = temp[1]
            setCountryObj(response.data)
            setCountryObjHistory(response2.data.timeline)
            setIsLoading(false)
        } catch (error) {
            alert("Country doesn't have any historical data")
            history.push('./')
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

    return (
        <>
            <div className="content">
                <Row>
                    <Col lg="12">
                        <div className="header-div">
                            <h1>{country} live Statistics </h1>
                            {
                                getLastUpdated()
                            }
                        </div>
                    </Col>
                </Row>
                <Row>
                    <CardsCountry countryObj={countryObj} />
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
                                {isLoading ? <ShowSpiner /> :
                                    <TableSingleCountry
                                        countryData={countryObj}
                                        isLoading={isLoading}
                                    />}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" md="12">
                        <Card>
                            <CardBody>
                                {isLoading ? <ShowSpiner /> :
                                    <TableSingleCountryHistory
                                        countryObjHistory={countryObjHistory} />}
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
