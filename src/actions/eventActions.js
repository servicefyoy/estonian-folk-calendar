import { FETCH_EVENTS} from './types'

export const fetchEvents = date => dispatch => {

    const pad = (n) => (n<10 ? '0'+n : n)
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDate = `${firstDay.getFullYear()}-${pad(firstDay.getMonth())}-${pad(firstDay.getDate())}`
    const endDate =  `${lastDay.getFullYear()}-${pad(lastDay.getMonth())}-${pad(lastDay.getDate())}`
    console.log(startDate, endDate)
    fetch('https://wozmx9dh26.execute-api.eu-west-1.amazonaws.com/api/holidays', {
        method: 'POST',
        //mode: 'no-cors',
        headers: {
            'Content-type':'application/json'
        },
        body: JSON.stringify({
            "apiKey": "6a4a694753d5ceb17a077f1878b7e4d2",
            "startDate": startDate,
            "endDate": endDate
          })
    })
    .then(res => res.json())
    .then(events => dispatch({
        type: FETCH_EVENTS,
        payload: events
    }))
}