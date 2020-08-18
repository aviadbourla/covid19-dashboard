
import React from "react";

import {
    Table,
    Row,
    Col
} from "reactstrap";

const TableSingleCountry = ({ countryData }) => {
    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Table className="tablesorter" responsive  >
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
                                    <td>{countryData.active}</td>
                                    <td>{countryData.activePerOneMillion}</td>
                                    <td>{countryData.cases}</td>
                                    <td>{countryData.casesPerOneMillion}</td>
                                    <td>{countryData.continent}</td>
                                    <td>{countryData.critical}</td>
                                    <td>{countryData.deaths}</td>
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
