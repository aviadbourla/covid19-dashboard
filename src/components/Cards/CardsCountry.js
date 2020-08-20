import React, { useEffect, useState } from 'react'
import covidReqestes from '../../HttpReq/covidReqestes'
import TopCard from './TopCard'
import ShowSpiner from '../Spiner/ShowSpiner'
import './topCard.css'
import {
    Col, Spinner
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

const CardsCountry = ({ countryObj, isLoading }) => {

    const getTopCards = () => {
        const { todayCases, cases, recovered, todayDeaths, deaths, critical } = countryObj
        return [
            {
                title: 'Today Confirmed',
                value: todayCases,
            },
            {
                title: 'Total Confirmed',
                value: cases
            },
            {
                title: 'Total Recovered',
                value: recovered
            },
            {
                title: 'Today Deaths',
                value: todayDeaths
            },
            {
                title: 'Total Deathsd',
                value: deaths
            },
            {
                title: 'Critical',
                value: critical
            }
        ]
    }
    return (
        <React.Fragment>
            {getTopCards().map(({ title, value }) => {
                return <Col lg="2">
                    <TopCard
                        title={title}
                        cardText={value}
                        isLoading={isLoading}
                    />
                </Col>
            })}
        </React.Fragment>
    )
}
export default CardsCountry