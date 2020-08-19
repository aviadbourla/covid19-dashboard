
import React, { useState, useEffect } from "react";
import Spiner from '../Spiner/Spiner'
import covidReqestes from '../../HttpReq/covidReqestes'
import './table.css'
// reactstrap components
import {
  FormGroup,
  Input,
  Table
} from "reactstrap";


const TableList = (props) => {

  const [filterBy, setFilterBy] = useState('');
  const [countriesArr, setCountriesArr] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [eror, setEror] = useState(false)



  const changeText = (text) => {
    return text.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  useEffect(() => {
    getDataApi();
  }, [])

  const getDataApi = async () => {
    try {
      const respone = await covidReqestes.getCountriesArr()
      setCountriesArr(respone.data)
      setisLoading(false)
    } catch (e) {
      setEror(true);
    }
  }

  let filterArr = countriesArr.filter(c => c.country.includes(filterBy))


  if (isLoading || eror) {
    return <Spiner />
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
            <th>continent</th>
            <th>active</th>
            <th>active Per 1M</th>
            <th>cases</th>
            <th>cases Per 1M</th>
            <th>critical</th>
            <th>deaths</th>
            <th>deaths Per 1M</th>
            <th>population</th>
          </tr>
        </thead>
        <tbody> {
          filterArr.map((c, key) => {
            return (
              <tr key={key}>
                <td>{c.country}</td>
                <td>{c.continent}</td>
                <td>{changeText(c.active)}</td>
                <td>{changeText(c.activePerOneMillion)}</td>
                <td>{changeText(c.cases)}</td>
                <td>{changeText(c.casesPerOneMillion)}</td>
                <td >{changeText(c.critical)}</td>
                <td >{changeText(c.deaths)}</td>
                <td >{changeText(c.deathsPerOneMillion)}</td>
                <td >{changeText(c.population)}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  );
}

export default TableList;
