
import React, { useState, useEffect } from "react";
import './table.css'
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

  const changeText = (text) => {
    return text.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
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
      <Table responsive className="table-sticky"    >
        <thead className="text-primary"  >
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
                  <td>{changeText(c.NewConfirmed)}</td>
                  <td>{changeText(c.TotalConfirmed)}</td>
                  <td>{changeText(c.NewDeaths)}</td>
                  <td >{changeText(c.TotalDeaths)}</td>
                </tr>
              )
            })}
        </tbody>
      </Table>
    </>
  );
}

export default TableList;
