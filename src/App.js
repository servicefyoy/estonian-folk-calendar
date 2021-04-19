import React, { Component } from 'react'
import { Provider } from 'react-redux'


import Header from './components/Header'
import Footer from './components/Footer'
import WeekCalendar from './components/WeekCalendar'

import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="container">
        <Header title="Estonian Folk Calendar" />
        <div className="page__container">
          <WeekCalendar />
        </div>
        <Footer copyright="Estonian Folk Calendar &copy;" year={2021} />
      </div>
    </Provider>
    )
  }
}

export default App

