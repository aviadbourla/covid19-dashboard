
import React, { useState, useEffect } from "react";
// reactstrap components
import {
  FormGroup,
  Input,
  Table
} from "reactstrap";


const TableList = (props) => {

  const [filterBy, setFilterBy] = useState('');

  let spiner =
    <div className="spiner-continer">
      <div className="spinner">
        <div className="lds-dual-ring">
        </div>
      </div>
    </div>

  let filterArr = props ? props.countries.filter(c => c.Country.includes(filterBy)) : [];

  return (
    <>
      <form>
        <FormGroup>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="Enter country name"
            onChange={(e) => setFilterBy(e.target.value)}
          />
        </FormGroup>
      </form>
      <Table className="tablesorter" responsive     >
        <thead className="text-primary" >
          <tr>
            <th>Country</th>
            <th>New Confirmed</th>
            <th>Total Confirme</th>
            <th>New Deaths</th>
            <th>Total Deaths</th>
          </tr>
        </thead>
        <tbody>
          {!props.countries ? spiner :
            filterArr.map((c, key) => {
              return (
                <tr key={key}>
                  <td>{c.Country}</td>
                  <td>{c.NewConfirmed}</td>
                  <td>{c.TotalConfirmed}</td>
                  <td>{c.NewDeaths}</td>
                  <td >{c.TotalDeaths}</td>
                </tr>
              )
            })}
        </tbody>
      </Table>
    </>
  );
}

export default TableList;
