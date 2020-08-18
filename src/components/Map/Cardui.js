
import React from 'react';
import './map.css';

import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    CardImg
} from "reactstrap";




export default function RecipeReviewCard(props) {
    return (
        <Card>
            <CardImg top src={props.imageurl} alt="..." />
            <CardBody>
                <CardTitle>{props.country}</CardTitle>
                <CardText>
                    <div>
                        <p className="p-map">
                            Cases:
                             {props.cases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                        </p>
                        <p className="p-map">
                            Deaths:
                         {props.deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                        </p>
                        <p className="p-map">
                            Recovered:
                             {props.recovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                        </p>
                        <p className="p-map">
                            Today Recovered:
                              {props.todayRecovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                        </p>
                        <p className="p-map">
                            Active:
                              {props.active.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                        </p>
                    </div>
                </CardText>
            </CardBody>
        </Card>
    );
}