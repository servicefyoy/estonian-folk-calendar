import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchEvents } from '../actions/eventActions'

const days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const week = days.length

const addTime = (day) => (day * 24 * 60 * 60 * 1000)

const updateDayOptions = (date) => {
    let weekDays = []
    const currentWeek = date.getTime();
    const startDay = new Date(currentWeek).getTime()
    days.map((day, index) => {
        weekDays.push(new Date(date.setTime(startDay + addTime(index))))
    })
    return weekDays
}

const currentWeek = (date) => {
    let weekDays = []
    const currentWeek = date.getTime();
    const startDay = new Date(currentWeek).getTime()
    days.map((day, index) => {
        weekDays.push(new Date(date.setTime(startDay + addTime(index))))
    })
    return {range:weekDays, newDate: new Date(currentWeek)}
}
const nextWeek = (date) => {
    let weekDays = []
    const nextWeek = date.getTime() + addTime(week);
    const startDay = new Date(nextWeek).getTime()
    days.map((day, index) => {
        weekDays.push(new Date(date.setTime(startDay + addTime(index))))
    })
    return {range:weekDays, newDate: new Date(nextWeek)}
}
const previousWeek = (date) => {
    let weekDays = []
    const prevWeek = date.getTime() - addTime(week);
    const startDay = new Date(prevWeek).getTime()
    days.map((day, index) => {
        weekDays.push(new Date(date.setTime(startDay + addTime(index))))
    })
    return {range:weekDays, newDate: new Date(prevWeek)}
}

const getFullStringMonth = (date) => {
    const pad = (n) => (n<10 ? '0'+n : n)

    return `${date.getFullYear()}-${pad(date.getMonth())}`
}

const getFullStringDate = (date) => {
    const pad = (n) => (n<10 ? '0'+n : n)

    return `${date.getFullYear()}-${pad(date.getMonth())}-${pad(date.getDate())}`
}
const calendarDate = (date) => {
    const pad = (n) => (n<10 ? '0'+n : n)

    return `${pad(date.getDate())}`
}
const calendarMonthYear = (date) => {
    const pad = (n) => (n<10 ? '0'+n : n)
    const month = ['January', 'February', 'March', 'April','May', 'June', 'July', 'August', 'September','October','November', 'December']
    return `${month[date.getMonth()]} ${date.getFullYear()}`
}
/////
const calendarFullDateString = (date) => {
    const pad = (n) => (n<10 ? '0'+n : n)

    return `${pad(date.getDate())}.${pad(date.getMonth())}.${date.getFullYear()}`
}

const getEvents = (date, events) => {
    let list = []
    if(events) {
        Object.keys(events).map((item)=>{
            if(date === item) {
                console.log('test->',date, item, events[item])
                //list.push({date: date, events: events[item]})
                list = events[item]
            }
        })
    }
    console.log('list->',list)
    return list
    //return [{name:'test', type:'folk'}, {name:'test2', type:'folk'}, {name:'test3', type:'folk'}, {name:'test4', type:'folk'}]
}

export class Calendar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            months: [getFullStringMonth(new Date())],
            date: new Date(),
            weekCalendar: currentWeek(new Date(), this.props.events.holidays).range,
            daysOption: updateDayOptions(new Date())
        }

        this.handleChange=this.handleChange.bind(this)
        this.nextWeek=this.nextWeek.bind(this)
        this.prevWeek=this.prevWeek.bind(this)
    }

    componentDidMount() {
        this.props.fetchEvents(new Date())
    }

    handleChange = (event) => {
        const newDate = new Date(event.target.value)
        const ds = currentWeek(newDate)
        this.setState({ date: ds.newDate })
        this.setState({ weekCalendar: ds.range })
    }

    nextWeek = (event) => {
        event.preventDefault()

        this.updateEvents()

        const nextW = nextWeek(this.state.date)
        this.setState({ date: nextW.newDate })
        this.setState({ weekCalendar: nextW.range })

        // Update first day select menu
        const updatedDaysList = updateDayOptions(new Date(nextW.newDate))
        this.setState({daysOption: updatedDaysList})
    }
    prevWeek = (event) => {
        event.preventDefault()

        this.updateEvents()
        console.log('holidays->', this.props.events.holidays)


        const prevW = previousWeek(this.state.date)
        this.setState({ date: prevW.newDate })
        this.setState({ weekCalendar: prevW.range })

        // Update first day select menu
        const updatedDaysList = updateDayOptions(new Date(prevW.newDate))
        this.setState({daysOption: updatedDaysList})
    }
    // update events
    updateEvents = () => {
        let mList = this.state.months
        if(!mList.includes(getFullStringMonth(this.state.date))) {
            mList.push(getFullStringMonth(this.state.date))
            this.setState({ months: mList })
            this.props.fetchEvents(this.state.date)
        }
    }

    render() {

        const holidays = this.props.events.holidays
        console.log(this.props.events)

        return (
            <div className="calendar">
            <div>
                <div className="calendar__nav">
                    <button className="calendar__button" onClick={this.prevWeek}>Previous Week</button>
                    <button className="calendar__button" onClick={this.nextWeek}>Next Week</button>
                    First Day: 
                    {<select onChange={this.handleChange}>
                        {this.state.daysOption.map((day, index) =>
                            <option key={index} value={day}>{days[day.getDay()]}</option>
                        )}
                    </select>}
                </div>

                
            </div>
            <div className="calendar__title">{calendarMonthYear(this.state.date)}</div>
            <ul className="calendar__days">
                {this.state.weekCalendar.map((date, index) =>
                    <li key={index}>
                        <div className="calendar__header">
                            <span className="calendar__date">{calendarDate(date)}</span>
                            <span className="calendar__day">{days[date.getDay()]}</span>
                        </div>
                        <div className="calendar__body">
                        {getEvents(getFullStringDate(date), holidays).map((event, index)=>
                            <span className={event.type} key={index}>{event.name}</span>
                        )}
                        </div>
                    </li>
                )}
            </ul>
        </div>
        )
    }
}

Calendar.propTypes = {
    fetchEvents: PropTypes.func.isRequired,
    events: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    events: state.events.items
})

export default connect(mapStateToProps, {fetchEvents})(Calendar)
