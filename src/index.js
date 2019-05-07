/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable class-methods-use-this */
import { Component } from 'react';
import merge from 'deepmerge';
import uuidv1 from 'uuid/v1';

import Store from './store';

export default class StateComponent extends Component {
  constructor(props) {
    super(props);
    this.id = uuidv1();
    this.state = Store.state;
    Store.set(this);
  }

  componentWillUnmount() {
    Store.remove(this.id);
  }

  updateState(obj) {
    Store.state = merge(Store.state, obj);
  }

  render() {
    return (
      this.props.children
    );
  }
}
