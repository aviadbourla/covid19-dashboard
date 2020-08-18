import React from 'react'
import './TopCard.css'
import {
    Card,
    CardHeader,
    CardBody,
    CardText,

} from "reactstrap";

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
                <CardBody>
                    <CardText className="cardText">
                        {
                            props.cardText ?
                                props.cardText.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                                :
                                <p>problem fech Data</p>
                        }
                    </CardText>
                </CardBody>
            </Card>
        </React.Fragment>
    )
}
export default TopCard