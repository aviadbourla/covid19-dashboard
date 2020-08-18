
import React, { useState, useEffect } from "react";
import './table.css'

import {
    Table,
    Row,
    Col
} from "reactstrap";


const TableSingleCountryHistory = (props) => {

    const [countryHistoryByDate, setCountryHistoryByDate] = useState([]);

    useEffect(() => {
        if (props.countryObjHistory) {
            getCountryHistory();
        }
    }, [props.countryObjHistory])

    const getCountryHistory = () => {
        let casesArr = props.countryObjHistory[`cases`]
        const temp = Object.keys(casesArr).map((key) => {
            const cases = props.countryObjHistory['cases'][key];
            const deaths = props.countryObjHistory['deaths'][key];
            const recovered = props.countryObjHistory['recovered'][key];
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
