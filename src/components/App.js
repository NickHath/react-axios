import React, { Component } from 'react';
import './App.css';
import {getCustomerList, postCustomer, getCustomer, updateCustomer, deleteCustomer} from '../customers.js'
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
    this.selectCustomer = this.selectCustomer.bind(this);
    this.removeCustomer = this.removeCustomer.bind(this);
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

  selectCustomer(id) {
    getCustomer(id).then((response) => this.setState({ currentCustomer: response, initialLoad: false }))
  }

  saveEdit(id, customer) {
    updateCustomer(id, customer).then(updatedCustomer => {
      getCustomerList().then(newList => {
        this.setState({
          customerList: newList,
          currentCustomer: updatedCustomer
        })
      })
    })
  }

  removeCustomer(id) {
    deleteCustomer(id).then(deletedCustomer => {
      getCustomerList().then(newList => {
        this.setState({
          customerList: newList,
          currentCustomer: null,
          initialLoad: true
        })
      })
    })
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
              selectCustomer={this.selectCustomer}
              />
            : null
          }
          <Workspace initialLoad={this.state.initialLoad}
                    currentCustomer={this.state.currentCustomer}
                    creating={this.state.creating}
                    createCustomer={this.createCustomer}
                    removeCustomer={this.removeCustomer}
                  />
        </div>
      </div>
    )
  }
}

export default App;
