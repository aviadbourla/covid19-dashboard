import React, { useEffect, useState } from 'react'
import covidReqestes from '../../HttpReq/covidReqestes'
import TopCard from './TopCard'
import Spiner from '../Spiner/Spiner'
import './topCard.css'
import {
    Col
} from "reactstrap";

const Cards = () => {

    const [dataCards, setDataCards] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [eror, setEror] = useState(false)


    useEffect(() => {
        getDataApi();
    }, [])

    const getDataApi = async () => {
        try {
            const respone = await covidReqestes.getAll()
            setDataCards(respone.data)
            setisLoading(false)
        } catch (e) {
            setEror(true)
        }
    }

    const getTopCards = () => {
        const { todayCases, cases, recovered, todayDeaths, deaths, critical } = dataCards
        return [
            {
                title: 'Today Confirmed',
                value: todayCases
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
                        eror={eror}
                    />
                </Col>
            })}
        </React.Fragment>
    )
}
export default Cards