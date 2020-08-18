
import React from 'react';
import './map.css';

import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    CardImg
} from "reactstrap";

export default function RecipeReviewCard({ imageurl, country, cases, deaths, recovered, todayRecovered, active }) {

    const changeText = (text) => {
        return text.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    const content = <div>
        <p className="p-map">
            Cases:
         {changeText(cases)}
        </p>
        <p className="p-map">
            Deaths:
        {changeText(deaths)}
        </p>
        <p className="p-map">
            Recovered:
         {changeText(recovered)}
        </p>
        <p className="p-map">
            Today Recovered:
          {changeText(todayRecovered)}
        </p>
        <p className="p-map">
            Active:
          {changeText(active)}
        </p>
    </div>

    return (
        <Card>
            <CardImg top src={imageurl} alt="..." />
            <CardBody>
                <CardTitle>{country}</CardTitle>
                <CardText>
                    {content}
                </CardText>
            </CardBody>
        </Card>
    );
}