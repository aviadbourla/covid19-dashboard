import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { chartExample3 } from "../varibales/charts.js";

import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,


} from "reactstrap";


const ChartHistoryContry = (props) => {
    const [dataLine, setdataLine] = useState({
        labels: [],
        datasets: [{
            label: '',
            backgroundColor: '',
            borderColor: '',
            data: []
        }]
    })
    const [bigChartData, setbigChartData] = useState('combine')

    const { country } = useParams();

    useEffect(() => {
        async function createLine() {
            const { dailyDataDate, dailyData } = await fetchTimeLineByCountry("deaths")
            const { dailyData: recoverdData } = await fetchTimeLineByCountry("recovered")
            const { dailyData: casesData } = await fetchTimeLineByCountry("cases")

            setdataLine({
                labels: dailyDataDate,
                datasets: [
                    {
                        label: "deaths",
                        fill: true,
                        borderColor: "#1f8ef1",
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: "#1f8ef1",
                        pointBorderColor: "rgba(255,255,255,0)",
                        pointHoverBackgroundColor: "#1f8ef1",
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data: dailyData
                    },
                    {
                        label: "recovered",
                        fill: true,
                        borderColor: "red",
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: "red",
                        pointBorderColor: "red",
                        pointHoverBackgroundColor: "red",
                        pointHoverBorderWidth: 15,
                        data: recoverdData
                    },
                    {
                        label: "cases",
                        fill: true,
                        borderColor: "green",
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: "green",
                        pointBorderColor: "green",
                        pointHoverBackgroundColor: "green",
                        pointHoverBorderWidth: 15,
                        data: casesData
                    }
                ],
            },
            )
        }
        createLine();
    }, []);

    useEffect(() => {
        handelSubmitSingleCountryChart();
    }, [bigChartData])

    const handelSubmitSingleCountryChart = async (e) => {
        if (bigChartData === 'combine') {
            const { dailyDataDate, dailyData } = await fetchTimeLineByCountry("deaths")
            const { dailyData: recoverdData } = await fetchTimeLineByCountry("recovered")
            const { dailyData: casesData } = await fetchTimeLineByCountry("cases")

            setdataLine({
                labels: dailyDataDate,
                datasets: [
                    {
                        label: "deaths",
                        fill: true,
                        borderColor: "red",
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: "red",
                        pointBorderColor: "rgba(255,255,255,0)",
                        pointHoverBackgroundColor: "#1f8ef1",
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data: dailyData
                    },
                    {
                        label: "recovered",
                        fill: true,
                        borderColor: "green",
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: "green",
                        pointBorderColor: "rgba(255,255,255,0)",
                        pointHoverBackgroundColor: "#1f8ef1",
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data: recoverdData
                    },
                    {
                        label: "cases",
                        fill: true,
                        borderColor: "#1f8ef1",
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: "#1f8ef1",
                        pointBorderColor: "rgba(255,255,255,0)",
                        pointHoverBackgroundColor: "#1f8ef1",
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data: casesData
                    }
                ],
            },
            )
        }
        else {
            const { dailyDataDate, dailyData } = await fetchTimeLineByCountry(bigChartData)
            setdataLine({
                labels: dailyDataDate
                , datasets: [
                    {
                        label: bigChartData,
                        fill: true,
                        borderColor: "#1f8ef1",
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: "#1f8ef1",
                        pointBorderColor: "rgba(255,255,255,0)",
                        pointHoverBackgroundColor: "#1f8ef1",
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data: dailyData
                    }
                ]
            })
        }
    }

    const fetchTimeLineByCountry = async (filterBy) => {
        try {
            const response4 = await axios.get(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=10`);
            let daily = response4.data.timeline[`${filterBy}`]
            let dailyDataDate = []
            let dailyData = []
            for (let [key, value] of Object.entries(daily)) {
                dailyDataDate.push(key)
                dailyData.push(value)
            }

            return { dailyDataDate, dailyData }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <Card className="card-chart">
            <CardHeader>
                <Row>
                    <Col className="text-left" sm="6">
                        <h5 className="card-category">Total stats</h5>
                        <CardTitle tag="h2">Covid 19</CardTitle>
                    </Col>
                    <Col sm="6">
                        <ButtonGroup
                            className="btn-group-toggle float-right"
                            data-toggle="buttons"
                        >
                            <Button
                                tag="label"
                                className={classNames("btn-simple", {
                                    active: bigChartData === "combine"
                                })}
                                color="info"
                                id="0"
                                size="sm"
                                onClick={() => setbigChartData("combine")}
                            >
                                <input
                                    defaultChecked
                                    className="d-none"
                                    name="options"
                                    type="radio"
                                />
                                <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                    combine
                               </span>
                                <span className="d-block d-sm-none">
                                    <i className="tim-icons icon-single-02" />
                                </span>
                            </Button>
                            <Button
                                tag="label"
                                className={classNames("btn-simple", {
                                    active: bigChartData === "cases"
                                })}
                                color="info"
                                id="0"
                                size="sm"
                                onClick={() => setbigChartData("cases")}
                            >
                                <input
                                    defaultChecked
                                    className="d-none"
                                    name="options"
                                    type="radio"
                                />
                                <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                    Cases
                                </span>
                                <span className="d-block d-sm-none">
                                    <i className="tim-icons icon-single-02" />
                                </span>
                            </Button>
                            <Button
                                color="info"
                                id="1"
                                size="sm"
                                tag="label"
                                className={classNames("btn-simple", {
                                    active: bigChartData === "deaths"
                                })}
                                onClick={() => setbigChartData("deaths")}
                            >
                                <input
                                    className="d-none"
                                    name="options"
                                    type="radio"
                                />
                                <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                    Deaths
                                </span>
                                <span className="d-block d-sm-none">
                                    <i className="tim-icons icon-gift-2" />
                                </span>
                            </Button>
                            <Button
                                color="info"
                                id="2"
                                size="sm"
                                tag="label"
                                className={classNames("btn-simple", {
                                    active: bigChartData === "recovered"
                                })}
                                onClick={() => setbigChartData("recovered")}
                            >
                                <input
                                    className="d-none"
                                    name="options"
                                    type="radio"
                                />
                                <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                    Recovered
                                </span>
                                <span className="d-block d-sm-none">
                                    <i className="tim-icons icon-tap-02" />
                                </span>
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <div className="chart-area">
                    <Line
                        options={chartExample3.options}
                        data={dataLine}
                    />
                </div>
            </CardBody>
        </Card>
    )
}

export default ChartHistoryContry;



