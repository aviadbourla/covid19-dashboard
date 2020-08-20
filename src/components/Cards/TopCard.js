import React from 'react'
import './topCard.css'
import {
    Card,
    CardHeader,
    CardBody,
    CardText,
} from "reactstrap";
import PortableWifiOffIcon from '@material-ui/icons/PortableWifiOff';
import ShowSpiner from '../Spiner/ShowSpiner'

const TopCard = ({ title, cardText, isLoading }) => {
    return (
        <React.Fragment>
            <Card className="topCard">

                <CardHeader>
                    <p className="title-card">
                        {title}
                    </p>
                </CardHeader>
                <CardBody >
                    {isLoading ? <ShowSpiner /> :
                        <CardText className="cardText"  >
                            {
                                cardText ?
                                    <div className="over-flow">
                                        {cardText.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                    </div>
                                    :
                                    <div>
                                        <PortableWifiOffIcon fontSize="large" />
                                        <p style={{ fontSize: '20px', display: 'inline' }}> No data  </p>
                                    </div>

                            }
                        </CardText>
                    }
                </CardBody>

            </Card>
        </React.Fragment>
    )
}
export default TopCard