
import axios from 'axios'

const getSummary = () => {
    return axios.get('https://api.covid19api.com/summary')
}

const getAll = () => {
    return axios.get('https://corona.lmao.ninja/v3/covid-19/all');
}

const getCountriesArr = () => {
    return axios.get('https://corona.lmao.ninja/v3/covid-19/countries');
}

const getContinents = () => {
    return axios.get('https://disease.sh/v3/covid-19/continents?yesterday=false&sort=cases&allowNull=true');
}

const getSpecificCountry = (country) => {
    return axios.get(`https://disease.sh/v3/covid-19/countries/${country}?yesterday=false&strict=true&allowNull=true`);

}

const getSpecificCountryHistory = (country) => {
    return axios.get(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=20`);
}

const mapCountries = () => {
    return axios.get('https://corona.lmao.ninja/v2/countries');
}

const historicalGlobaly = () => {
    return axios.get(`https://disease.sh/v3/covid-19/historical/all?lastdays=30`);
}

const historicalCountryDays = (country) => {
    return axios.get(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=10`);
}

export default { mapCountries, getSummary, getAll, getCountriesArr, getContinents, getSpecificCountry, getSpecificCountryHistory, historicalGlobaly, historicalCountryDays }