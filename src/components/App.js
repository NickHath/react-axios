import React, { Component } from 'react';
import './App.css';
import {getCustomerList} from '../customers.js'
import {postCustomer} from '../customers.js'
import Header from './Header/Header';
import List from './List/List';
import Workspace from './Workspace/Workspace';


class App extends Component {
  constructor() {
    super()
    this.state = {
      customerList: undefined,
      initialLoad: true,
      creating: false,
      currentCustomer: null
    }
    this.startNewCustomer = this.startNewCustomer.bind(this);
    this.createCustomer = this.createCustomer.bind(this);
  }
  componentDidMount() {
    getCustomerList().then ( (customerList) => { 
      this.setState({ customerList: customerList
      })});
  }

  startNewCustomer() {
    this.setState({
      creating: true,
      initialLoad: false,
      currentCustomer: null
    })
  }

  createCustomer(customer) {
    postCustomer(customer).then(() => {
      getCustomerList().then((response) => {
        this.setState({
          customerList: response,
          initialLoad: true,
          creating: false
        })});
    });
  }


  render() {
    return (
      <div>
        <Header />
        <div className="App__container">
          {
            this.state.customerList ?
            <List
              customerList={this.state.customerList || []}
              startNewCustomer={this.startNewCustomer}
              />
            : null
          }
          <Workspace initialLoad={this.state.initialLoad}
                    currentCustomer={this.state.currentCustomer}
                    creating={this.state.creating}
                    createCustomer={this.createCustomer}
                  />
        </div>
      </div>
    )
  }
}

export default App;
