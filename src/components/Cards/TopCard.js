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

const TopCard = (props) => {
    return (
        <React.Fragment>
            <Card className="topCard">
                <CardHeader>
                    <h3 className="card-category">
                        {props.title}
                    </h3>
                </CardHeader>
                <CardBody >
                    <CardText className="cardText"  >
                        {
                            props.cardText ?
                                props.cardText.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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