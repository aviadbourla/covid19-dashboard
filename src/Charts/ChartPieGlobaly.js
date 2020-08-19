import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { chartExample4 } from "../varibales/charts.js";
import ShowSpiner from '../components/Spiner/ShowSpiner'
import covidReqestes from '../HttpReq/covidReqestes'

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
} from "reactstrap";

const filterChart = ['active', 'cases', 'deaths', 'recovered']

const ChartPieGlobaly = (props) => {

    const [dataCovidGlobaly, setDataCovidGlobaly] = useState([])
    const [isLoading, setisLoading] = useState(true);
    const [eror, setEror] = useState(false)
    const [dataPie, setdataPie] = useState({
        labels: [],
        datasets: [{
            label: '',
            backgroundColor: '',
            borderColor: '',
            data: []
        }]
    })


    useEffect(() => {
        createLine()
    }, []);

    const createLine = async () => {
        try {
            const respone = await covidReqestes.getAll()
            let dataTempGlobaly = respone.data
            setDataCovidGlobaly(respone.data)
            setisLoading(false)
            let filterChartValue =
                [
                    dataTempGlobaly['active'],
                    dataTempGlobaly['cases'],
                    dataTempGlobaly['deaths'],
                    dataTempGlobaly['recovered']
                ];

            setdataPie({
                labels: filterChart,
                datasets: [
                    {
                        label: "pie",
                        fill: true,
                        borderColor: "#1f8ef1",
                        borderWidth: 0,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        data: filterChartValue,
                        backgroundColor: [
                            'rgb(60, 186, 146)',
                            'rgb(27, 85, 130)',
                            'rgb(231, 81, 90)',
                            'rgb(226, 160, 63)',
                        ],
                    },
                ],
            },
            )
        } catch (e) {
            setEror(true)
        }
    }

    return (
        <Card className="card-chart">
            <CardHeader>
                <h5 className="card-category"> Globaly </h5>
                <CardTitle tag="h3">
                    <i className="tim-icons icon-chart-pie-36" />
                    {props.header}
                </CardTitle>
            </CardHeader>
            <CardBody>
                <div className="chart-area">
                    {eror || isLoading ? <ShowSpiner /> :
                        <Pie
                            options={chartExample4.options}
                            data={dataPie}
                        />
                    }
                </div>
            </CardBody>
        </Card>
    )
}

export default ChartPieGlobaly;




