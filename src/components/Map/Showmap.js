import React, { useState, useEffect } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import Cardui from './Cardui'
import { Card, Row, Col } from "reactstrap";
import covidReqestes from '../../HttpReq/covidReqestes'
import './map.css';


const Showmap = () => {


    const [countries, setCountries] = useState([])
    const [activeCountry, setActiveCountry] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (countries.length < 1) {
            mapEffect();
        }
    })

    const mapEffect = async () => {
        let response;
        try {
            response = await covidReqestes.mapCountries();
            setIsLoading(false)
        } catch (e) {
            console.log(`Failed to fetch countries: ${e.message}`, e);
            return;
        }
        const { data = [] } = response;
        setCountries(data)
    }

    const mapSettings = {
        center: [31.955075, 34.814135],
        defaultBaseMap: 'OpenStreetMap',
        zoom: 3,
        tileLayerUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    }

    let spiner = <div className="spiner-continer">
        <div className="spinner">
            <div className="lds-dual-ring">
            </div>
        </div>
    </div>


    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card   >
                        {isLoading ? spiner :
                            <Map {...mapSettings} >
                                <TileLayer
                                    url={mapSettings.tileLayerUrl}
                                />
                                {countries.map(cont => (
                                    <Marker
                                        key={cont.countryInfo._id}
                                        position={[
                                            cont.countryInfo.lat,
                                            cont.countryInfo.long
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
                                            country={activeCountry.country}
                                            cases={activeCountry.cases}
                                            deaths={activeCountry.deaths}
                                            recovered={activeCountry.recovered}
                                            todayRecovered={activeCountry.todayRecovered}
                                            active={activeCountry.active}
                                            imageurl={activeCountry.countryInfo.flag}
                                        />
                                    </Popup>
                                }
                            </Map>

                        }
                    </Card>
                </Col>
            </Row>
        </div >


    )
}
export default Showmap