
import React from 'react';
import './map.css';

export default function RecipeReviewCard({ imageurl, country, cases, deaths, recovered, todayRecovered, active }) {

    const changeText = (text) => {
        return text.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    const content =
        <div className="card-map">
            <img src={imageurl} alt="..." />
            <div className="card-map-text">
                <h4 className="card-country-text">
                    {country}
                </h4>
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
        </div>

    return (
        content
    );
}