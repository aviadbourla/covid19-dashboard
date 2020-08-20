import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { chartExample3 } from "../varibales/charts.js";
import covidReqestes from '../HttpReq/covidReqestes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'
import { faBriefcaseMedical } from '@fortawesome/free-solid-svg-icons'
import { faStethoscope } from '@fortawesome/free-solid-svg-icons'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
import ShowSpiner from '../components/Spiner/ShowSpiner'
import { useHistory } from "react-router-dom";
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


    const [bigChartData, setbigChartDataFilter] = useState('combine')
    const [chartColor, setChartColor] = useState('')
    const [isLoading, setisLoading] = useState(true);
    const [eror, setEror] = useState(false)
    let history = useHistory();

    const [dataLine, setdataLine] = useState({
        labels: [],
        datasets: [{
            label: '',
            backgroundColor: '',
            borderColor: '',
            data: []
        }]
    })

    const { country } = useParams();

    useEffect(() => {
        handelSubmitSingleCountryChart();
    }, [bigChartData, country])

    const handelSubmitSingleCountryChart = async (e) => {
        try {
            const response4 = await covidReqestes.historicalCountryDays(country);
            if (bigChartData === 'combine') {
                setisLoading(false)
                const { dailyDataDate, dailyData } = fetchTimeLineByCountry("deaths", response4.data.timeline)
                const { dailyData: recoverdData } = fetchTimeLineByCountry("recovered", response4.data.timeline)
                const { dailyData: casesData } = fetchTimeLineByCountry("cases", response4.data.timeline)
                setdataLine({
                    labels: dailyDataDate,
                    datasets: [
                        {
                            label: "deaths",
                            fill: true,
                            borderColor: "red",
                            pointBackgroundColor: "red",
                            pointRadius: 4,
                            data: dailyData
                        },
                        {
                            label: "recovered",
                            fill: true,
                            borderColor: "green",
                            pointBackgroundColor: "green",
                            pointRadius: 4,
                            data: recoverdData
                        },
                        {
                            label: "cases",
                            fill: true,
                            borderColor: "#1f8ef1",
                            pointBackgroundColor: "#1f8ef1",
                            pointRadius: 4,
                            data: casesData
                        }
                    ],
                },
                )
            }
            else {
                const { dailyDataDate, dailyData } = fetchTimeLineByCountry(bigChartData, response4.data.timeline)
                setdataLine({
                    labels: dailyDataDate
                    , datasets: [
                        {
                            label: bigChartData,
                            fill: true,
                            borderColor: chartColor,
                            pointHoverBorderWidth: 15,
                            pointRadius: 4,
                            data: dailyData
                        }
                    ]
                })
            }
        } catch (e) {
            setEror(true)
        }
    }
    const fetchTimeLineByCountry = (filterBy, response) => {
        let daily = response[`${filterBy}`]
        let dailyDataDate = []
        let dailyData = []
        for (let [key, value] of Object.entries(daily)) {
            dailyDataDate.push(new Date(key).toLocaleDateString("en-IE"))
            dailyData.push(value)
        }
        return { dailyDataDate, dailyData }
    }
    const handleClick = (filter) => {
        const chartColor =
        {
            recovered: 'green',
            deaths: 'red',
            cases: '#1f8ef1'
        }
        setbigChartDataFilter(filter)
        setChartColor(chartColor[filter])
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
                        <ButtonGroupChartTypeChooser value={bigChartData} onChange={handleClick} />
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <div className="chart-area">
                    {
                        isLoading || eror ? <ShowSpiner />
                            : <Line
                                options={chartExample3.options}
                                data={dataLine}
                            />
                    }
                </div>
            </CardBody>
        </Card>
    )
}

export default ChartHistoryContry;



const ButtonGroupChartTypeChooser = ({ value, onChange }) => {
    return <ButtonGroup
        className="btn-group-toggle float-right"
        data-toggle="buttons"
    >
        <Button
            tag="label"
            className={classNames("btn-simple", {
                active: value === "combine"
            })}
            color="info"
            id="0"
            size="sm"
            onClick={() => onChange("combine")}
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
                active: value === "cases"
            })}
            color="info"
            id="0"
            size="sm"
            onClick={() => onChange("cases")}
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
                active: value === "deaths"
            })}
            onClick={() => onChange("deaths")}
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
                active: value === "recovered"
            })}
            onClick={() => onChange("recovered")}
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

}
