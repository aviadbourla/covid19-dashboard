
import React, { useState, useEffect } from "react";
import './table.css'

import {
    Table,
    Row,
    Col
} from "reactstrap";


const TableSingleCountryHistory = ({ countryObjHistory }) => {

    const [countryHistoryByDate, setCountryHistoryByDate] = useState([]);
    console.log(countryObjHistory)

    useEffect(() => {
        if (countryObjHistory) {
            getCountryHistory();
        }
    }, [countryObjHistory])

    const getCountryHistory = () => {
        let casesArr = countryObjHistory[`cases`]
        const temp = Object.keys(casesArr).map((key) => {
            const cases = countryObjHistory['cases'][key];
            const deaths = countryObjHistory['deaths'][key];
            const recovered = countryObjHistory['recovered'][key];
            return {
                date: new Date(key).toLocaleDateString("en-IE"),
                cases: cases,
                deaths: deaths,
                recovered: recovered,
            }
        })
        setCountryHistoryByDate(temp)
    }
    const changeText = (text) => {
        if (text !== undefined) {
            return text.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
    }
    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Table className="table-sticky" responsive  >
                            <thead className="text-primary">
                                <tr>
                                    <th>Date</th>
                                    <th>cases</th>
                                    <th>deaths</th>
                                    <th>recovered</th>
                                </tr>
                            </thead>
                            <tbody>
                                {countryHistoryByDate.map((c, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{c.date}</td>
                                            <td>{changeText(c.cases)}</td>
                                            <td>{changeText(c.deaths)}</td>
                                            <td>{changeText(c.recovered)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        </>
    );
}


export default TableSingleCountryHistory;
