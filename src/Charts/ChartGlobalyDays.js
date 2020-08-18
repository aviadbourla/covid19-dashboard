import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import covidReqestes from '../HttpReq/covidReqestes'
import classNames from "classnames";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'
import { faBriefcaseMedical } from '@fortawesome/free-solid-svg-icons'
import { faStethoscope } from '@fortawesome/free-solid-svg-icons'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
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


const ChartGlobalyDays = (props) => {

    const [bigChartDataFilter, setbigChartDataFilter] = useState('combine')

    const [dataLine, setdataLine] = useState({
        labels: [],
        datasets: [{
            label: '',
            backgroundColor: '',
            borderColor: '',
            data: []
        }]
    })

    useEffect(() => {
        handelSubmitSingleCountryChart();
    }, [bigChartDataFilter])

    const handelSubmitSingleCountryChart = async (e) => {
        if (bigChartDataFilter === 'combine') {
            const { dailyDataDate, dailyData } = await fetchTimeLineByFilter("deaths")
            const { dailyData: recoverdData } = await fetchTimeLineByFilter("recovered")
            const { dailyData: casesData } = await fetchTimeLineByFilter("cases")
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
            const { dailyDataDate, dailyData } = await fetchTimeLineByFilter(bigChartDataFilter)
            setdataLine({
                labels: dailyDataDate
                , datasets: [
                    {
                        label: bigChartDataFilter,
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

    const fetchTimeLineByFilter = async (filterBy) => {
        try {
            const historicalGlobalyData = await covidReqestes.historicalGlobaly();
            let daily = historicalGlobalyData.data[`${filterBy}`]
            let dailyDataDate = []
            let dailyData = []
            for (let [key, value] of Object.entries(daily)) {
                dailyDataDate.push(key)
                dailyData.push(value)
            }
            return { dailyDataDate, dailyData }
        }
        catch (error) {
            console.log(error);
        }
    }

    let spiner = <div className="spiner-continer">
        <div className="spinner">
            <div className="lds-dual-ring">
            </div>
        </div>
    </div>

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
                                    active: bigChartDataFilter === "combine"
                                })}
                                color="info"
                                id="0"
                                size="sm"
                                onClick={() => setbigChartDataFilter("combine")}
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
                                    <FontAwesomeIcon icon={faSlidersH} />
                                </span>
                            </Button>
                            <Button
                                tag="label"
                                className={classNames("btn-simple", {
                                    active: bigChartDataFilter === "cases"
                                })}
                                color="info"
                                id="0"
                                size="sm"
                                onClick={() => setbigChartDataFilter("cases")}
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
                                    <FontAwesomeIcon icon={faBriefcaseMedical} />
                                </span>
                            </Button>
                            <Button
                                color="info"
                                id="1"
                                size="sm"
                                tag="label"
                                className={classNames("btn-simple", {
                                    active: bigChartDataFilter === "deaths"
                                })}
                                onClick={() => setbigChartDataFilter("deaths")}
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
                                    <FontAwesomeIcon icon={faSkullCrossbones} />
                                </span>
                            </Button>
                            <Button
                                color="info"
                                id="2"
                                size="sm"
                                tag="label"
                                className={classNames("btn-simple", {
                                    active: bigChartDataFilter === "recovered"
                                })}
                                onClick={() => setbigChartDataFilter("recovered")}
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
                                    <FontAwesomeIcon icon={faStethoscope} />
                                </span>
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <div className="chart-area">
                    {!dataLine ? spiner
                        : <Line
                            options={chartExample3.options}
                            data={dataLine}
                        />}
                </div>
            </CardBody>
        </Card>
    )
}

export default ChartGlobalyDays;



