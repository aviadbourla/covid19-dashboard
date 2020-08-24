import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { chartExample4 } from "../varibales/charts.js";
import ShowSpiner from '../components/Spiner/ShowSpiner'
import covidReqestes from '../HttpReq/covidReqestes'


import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Dropdown

} from "reactstrap";

const continentsArrNames = ["North America", "Asia", "South America", "Europe", "Africa", "Australia/Oceania"]
const filterChart = ['active', 'cases', 'deaths', 'recovered']
const contriesNamesArrHardCoded = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Caribbean Netherlands", "Cayman Islands", "Central African Republic", "Chad", "Channel Islands", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czechia", "Côte d'Ivoire", "DRC", "Denmark", "Diamond Princess", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "MS Zaandam", "Macao", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Réunion", "S. Korea", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin", "Saint Pierre Miquelon", "Saint Vincent and the Grenadines", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten", "Slovakia", "Slovenia", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "St. Barth", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Trinidad and Tobago", "Tunisia", "Turkey", "Turks and Caicos Islands", "UAE", "UK", "USA", "Uganda", "Ukraine", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"]


const ChartPieByCountry = (props) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [countryName, setCountry] = useState('');
    const [countriesArr, setCountriesArr] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [eror, setEror] = useState(false)

    const [dataPie, setdataPie] = useState({
        labels: [],
        datasets: [{
            label: '',
            backgroundColor: '',
            borderColor: '',
            data: []
        }]
    })

    const toggle = () => setDropdownOpen(prevState => !prevState);

    useEffect(() => {
        createLine()
    }, []);

    const createLine = async () => {
        try {
            const respone = await covidReqestes.getCountriesArr()
            const countryObj = respone.data.find(element => element.country === "Israel")
            setCountriesArr(respone.data)
            setCountry("Israel")
            setisLoading(false)
            let filterChartValue = [
                countryObj['active'],
                countryObj['cases'],
                countryObj['deaths'],
                countryObj['recovered']
            ];
            setdataPie({
                labels: filterChart,
                datasets: [
                    {
                        label: "pie",
                        fill: true,
                        borderColor: "#1f8ef1",
                        borderWidth: 0,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        data: filterChartValue,
                        backgroundColor: [
                            'rgb(60, 186, 146)',
                            'rgb(27, 85, 130)',
                            'rgb(231, 81, 90)',
                            'rgb(226, 160, 63)',
                        ],
                    },
                ],
            },
            )
        } catch (e) {
            setEror(true)
        }
    }
    const handleDropDownItemContry = (e) => {
        const countryObjTemp = countryObjFun(e.target.value)
        setCountry(e.target.value)
        console.log(countryObjTemp)
        console.log(e.target.value)

        let filterChartValue =
            [
                countryObjTemp['active'],
                countryObjTemp['cases'],
                countryObjTemp['deaths'],
                countryObjTemp['recovered']]
            ;
        setdataPie({
            labels: filterChart,
            datasets: [
                {
                    label: "pie",
                    fill: true,
                    data: filterChartValue,
                    backgroundColor: [
                        'rgb(60, 186, 146)',
                        'rgb(27, 85, 130)',
                        'rgb(231, 81, 90)',
                        'rgb(226, 160, 63)',
                    ]
                },
            ],
        },
        )
    }

    const countryObjFun = (country) => {
        const found = countriesArr.find(element => element.country === country)
        return found;
    }

    const WithDropDown = () => {
        return (
            <>
                <Dropdown isOpen={dropdownOpen} toggle={toggle} size="sm"  >
                    <DropdownToggle>
                        {'Choose Country'}
                    </DropdownToggle>
                    <DropdownMenu
                        modifiers={{
                            setMaxHeight: {
                                enabled: true,
                                order: 890,
                                fn: (data) => {
                                    return {
                                        ...data,
                                        styles: {
                                            ...data.styles,
                                            overflow: 'auto',
                                            maxHeight: 200,
                                            maxWidth: 50,
                                        },
                                    };
                                },
                            },
                        }}
                    >
                        {contriesNamesArrHardCoded.map((country, i) =>
                            <DropdownItem
                                onClick={handleDropDownItemContry}
                                key={i}
                                value={country}
                            >
                                {country.length > 20 ? country.substring(0, 20) : country}
                            </DropdownItem>)

                        }
                    </DropdownMenu>
                </Dropdown>
            </>
        )
    }
    const header = () => {
        if (!countryName) {
            return 'Israel'
        } else if (countryName) {
            return countryName
        } else {
            return props.header
        }
    }

    return (
        <Card className="card-chart">
            <WithDropDown />
            <CardHeader>
                <h5 className="card-category">By Country </h5>
                <CardTitle tag="h3">
                    <i className="tim-icons icon-chart-pie-36" />
                    {header()}
                </CardTitle>
            </CardHeader>
            <CardBody>
                <div className="chart-area">
                    {eror || isLoading ? <ShowSpiner /> :
                        <Pie
                            options={chartExample4.options}
                            data={dataPie}
                        />
                    }
                </div>
            </CardBody>
        </Card>
    )
}

export default ChartPieByCountry;




