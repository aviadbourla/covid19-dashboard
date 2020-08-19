import React, { useEffect, useState } from 'react'
import covidReqestes from '../../HttpReq/covidReqestes'

const ShowDateUpdate = () => {

    const [date, setDate] = useState('');

    useEffect(() => {
        getDataApi();
    }, [])

    const getDataApi = async () => {
        try {
            const respone = await covidReqestes.getAll()
            const { updated } = respone.data
            setDate(updated)
        } catch (e) {
            console.log(e)
        }
    }

    const getLastUpdated = () => {
        if (!date) {
            return null
        }
        return <h4>last updated: {new Date(date).toLocaleDateString("en-IE").substring(0, 4)
            + ' ' +
            new Date(date).toUTCString().substring(18, 22)}</h4>
    }

    return (
        <React.Fragment>
            {getLastUpdated()}
        </React.Fragment>
    )
}
export default ShowDateUpdate