import React from 'react'
import './topCard.css'
import {
    Card,
    CardHeader,
    CardBody,
    CardText,
    CardImg

} from "reactstrap";
import PortableWifiOffIcon from '@material-ui/icons/PortableWifiOff';
let spiner = <div className="spiner-continer">
    <div className="spinner">
        <div className="lds-dual-ring">
        </div>
    </div>
</div>

const TopCard = ({ title, cardText }) => {
    return (
        <React.Fragment>
            <Card className="topCard">
                <CardHeader>
                    <p className="title-card">
                        {title}
                    </p>
                </CardHeader>
                <CardBody >
                    <CardText className="cardText"  >
                        {
                            cardText ?
                                <div className="over-flow">
                                    {cardText.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                </div>
                                :
                                <div  >
                                    <PortableWifiOffIcon fontSize="large" />
                                    <p style={{ fontSize: '20px', display: 'inline' }}> No data  </p>
                                </div>

                        }
                    </CardText>
                </CardBody>
            </Card>
        </React.Fragment>
    )
}
export default TopCard