import React, { useState, useEffect } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import Cardui from './Cardui'
import { Card, Row, Col } from "reactstrap";
import covidReqestes from '../../HttpReq/covidReqestes'
import Spiner from '../Spiner/spiner'

import './map.css';

const mapSettings = {
    center: [31.955075, 34.814135],
    defaultBaseMap: 'OpenStreetMap',
    zoom: 3,
    tileLayerUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
}

const Showmap = () => {

    const [countries, setCountries] = useState([])
    const [activeCountry, setActiveCountry] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        mapEffect();
    }, [])

    const mapEffect = async () => {
        try {
            const response = await covidReqestes.mapCountries();
            const { data = [] } = response;
            setCountries(data)
        } catch (e) {
            console.log(`Failed to fetch countries: ${e.message}`, e);
            //404
            return;
        } finally {
            setIsLoading(false)
        }
    }



    let content = <Spiner />

    const { country, cases, deaths, recovered, todayRecovered, active, countryInfo } = activeCountry || {}

    if (!isLoading) {
        content = <Map {...mapSettings} >
            <TileLayer
                url={mapSettings.tileLayerUrl}
            />
            {countries.map(cont => (
                <Marker
                    key={cont.countryInfo._id}
                    position={[
                        cont.countryInfo?.lat,
                        cont.countryInfo?.long
                    ]}
                    onclick={() => {
                        setActiveCountry(cont)
                    }}
                />
            ))}
            {activeCountry &&
                <Popup
                    position={[
                        activeCountry.countryInfo.lat,
                        activeCountry.countryInfo.long
                    ]} onClose={() => {
                        setActiveCountry(null)
                    }}>
                    <Cardui
                        country={country}
                        cases={cases}
                        deaths={deaths}
                        recovered={recovered}
                        todayRecovered={todayRecovered}
                        active={active}
                        imageurl={countryInfo.flag}
                    />
                </Popup>
            }
        </Map>
    }

    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        {
                            content
                        }
                    </Card>
                </Col>
            </Row>
        </div >


    )
}
export default Showmap