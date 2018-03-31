import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import moment from 'moment';
import { connect } from 'react-redux';
import { setField, resetField } from './redux';

const initialState = {
  name: 'aaa',
  email: '',
  ticketType: 'standard',
  food: false,
  agree: false,
  countDown: '',
};

const closeTime = moment('2018-04-01 12:00');

class App extends Component {
  state = initialState;

  componentDidMount() {
    setInterval(() => {
      const millis = closeTime.diff(moment());
      const duration = moment.duration(millis);
      this.setState({
        countDown: `${duration.hours()} hours ${duration.minutes()} minutes ${duration.seconds()} seconds`,
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const { name, email, ticketType, food, agree, countDown, setField, resetField } = this.props;
    return (
      <section className="section">
        <section className="container">
          <h1 className="title">Evenn Registration Form</h1>
          <p>Registration expired in {countDown}</p>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                onChange={e => setField('name', e.target.value)}
                value={name}
                placeholder="Text input"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input is-danger"
                type="email"
                placeholder="Email input"
                onChange={e => setField('email', e.target.value)}
                value={email}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle" />
              </span>
            </div>
            <p className="help is-danger">This email is invalid</p>
          </div>

          <div className="field">
            <label className="label">Ticket Type</label>
            <div className="control">
              <div className="select">
                <select onChange={e => setField('ticketType', e.target.value)}>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Add food?</label>
            <div className="control">
              <label className="radio">
                <input
                  type="radio"
                  name="question"
                  checked={food}
                  onChange={e => setField('food', true)}
                />
                Yes +50THB
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="question"
                  onChange={e => setField('food', false)}
                  checked={!food}
                />
                No
              </label>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input type="checkbox" onChange={e => setField('agree', !agree)} />
                I agree to the <a href="#">terms and conditions</a>
              </label>
            </div>
          </div>

          <p>Price: 100THB</p>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
            <div className="control">
              <button className="button is-text" onClick={resetField}>
                Cancel
              </button>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

export default connect(state => state, { setField: setField, resetField: resetField })(App);
