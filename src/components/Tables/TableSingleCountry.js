
import React from "react";
import './table.css'

import {
    Table,
    Row,
    Col
} from "reactstrap";


const TableSingleCountry = ({ countryData }) => {

    const changeText = (text) => {
        if (text !== undefined && text !== null) {
            return text.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        } else {
            return text
        }
    }
    const { active, activePerOneMillion, cases, casesPerOneMillion, continent, critical, deaths } = countryData

    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Table className="table-sticky" responsive  >
                            <thead className="text-primary">
                                <tr>
                                    <th>active</th>
                                    <th>active Per 1M</th>
                                    <th>cases</th>
                                    <th>cases Per 1M</th>
                                    <th>continent</th>
                                    <th>critical</th>
                                    <th>deaths</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{changeText(active)}</td>
                                    <td>{changeText(activePerOneMillion)}</td>
                                    <td>{changeText(cases)}</td>
                                    <td>{changeText(casesPerOneMillion)}</td>
                                    <td>{changeText(continent)}</td>
                                    <td>{changeText(critical)}</td>
                                    <td>{changeText(deaths)}</td>
                                </tr>
                            </tbody>
                        </Table>

                    </Col>
                </Row>
            </div>
        </>
    );
}


export default TableSingleCountry;
