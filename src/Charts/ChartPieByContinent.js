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
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Dropdown

} from "reactstrap";

const continentsArrNames = ["North America", "Asia", "South America", "Europe", "Africa", "Australia/Oceania"]
const filterChart = ['active', 'cases', 'deaths', 'recovered']

const ChartPieByContinent = (props) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [continetName, setContinetName] = useState('');
    const [continentsArr, setContinentsArr] = useState('');
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

    const toggle = () => setDropdownOpen(prevState => !prevState);

    useEffect(() => {
        async function createLine() {
            try {
                let respone = await covidReqestes.getContinents()
                let continentsArrTemp = respone.data;
                setContinentsArr(continentsArrTemp)
                setisLoading(false)
                let filterChartValue =
                    [
                        continentsArrTemp[0]['active'],
                        continentsArrTemp[0]['cases'],
                        continentsArrTemp[0]['deaths'],
                        continentsArrTemp[0]['recovered']
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
        createLine();
    }, []);


    const handleDropDownItem = (e) => {
        const continetObj = continetObjFun(e.target.value)
        setContinetName(e.target.value)
        let filterChartValue =
            [
                continentsArr[continetObj]['active'],
                continentsArr[continetObj]['cases'],
                continentsArr[continetObj]['deaths'],
                continentsArr[continetObj]['recovered']
            ];
        setdataPie({
            labels: filterChart,
            datasets: [
                {
                    label: "pie",
                    fill: true,
                    borderColor: "#1f8ef1",
                    data: filterChartValue,
                    backgroundColor: [
                        'rgb(60, 186, 146)',
                        'rgb(27, 85, 130)',
                        'rgb(231, 81, 90)',
                        'rgb(226, 160, 63)',
                    ]
                },
            ],
        },
        )
    }

    const continetObjFun = (country) => {
        const indexContinent = (element) => element === country;
        let indexArr = (continentsArrNames.findIndex(indexContinent))
        return indexArr;
    }

    const WithDropDown = () => {
        return (
            <>
                <Dropdown isOpen={dropdownOpen} toggle={toggle} size="sm"  >
                    <DropdownToggle>
                        {'Chose continent'}
                    </DropdownToggle>
                    <DropdownMenu
                        modifiers={{
                            setMaxHeight: {
                                enabled: true,
                                order: 890,
                                fn: (data) => {
                                    return {
                                        ...data,
                                        styles: {
                                            ...data.styles,
                                            overflow: 'auto',
                                            maxHeight: 200,
                                            maxWidth: 50,
                                        },
                                    };
                                },
                            },
                        }}
                    >
                        {continentsArrNames.map((country, i) =>
                            <DropdownItem
                                onClick={handleDropDownItem}
                                key={i}
                                value={country}
                            >
                                {country}
                            </DropdownItem>)

                        }
                    </DropdownMenu>
                </Dropdown>
            </>
        )
    }
    const header = () => {
        if (props.header === 'By continent' && !continetName) {
            return 'Asia'
        } else if (continetName) {
            return continetName
        } else {
            return props.header
        }
    }

    return (
        <Card className="card-chart">
            <WithDropDown />
            <CardHeader>
                <h5 className="card-category">By Continent </h5>
                <CardTitle tag="h3">
                    <i className="tim-icons icon-chart-pie-36" />
                    {header()}
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

export default ChartPieByContinent;




