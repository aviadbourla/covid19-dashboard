
import React from "react";
import './table.css'

import {
    Table,
    Row,
    Col
} from "reactstrap";


const TableSingleCountry = ({ countryData }) => {
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
                                    <td>{changeText(countryData.active)}</td>
                                    <td>{changeText(countryData.activePerOneMillion)}</td>
                                    <td>{changeText(countryData.cases)}</td>
                                    <td>{changeText(countryData.casesPerOneMillion)}</td>
                                    <td>{changeText(countryData.continent)}</td>
                                    <td>{changeText(countryData.critical)}</td>
                                    <td>{changeText(countryData.deaths)}</td>
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
