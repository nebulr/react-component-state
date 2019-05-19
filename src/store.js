/* eslint-disable no-underscore-dangle */
/**
 * Store - manage the state across the application.
 */
class Store {
  constructor() {
    this.__state = {};
    this.__storage = null;
    this.components = new Map();
  }

  set(component) {
    this.components.set(component.id, component);
    this.__updateStore('react-component-state_components', this.components);
  }

  config(opt) {
    if (opt.storage != null) {
      this.__storage = opt.storage;
    }
  }

  remove(id) {
    this.components.delete(id);
  }

  __updateStore(key, value) {
    if (this.__storage != null) {
      if (this.__storage === 'local') {
        // eslint-disable-next-line no-undef
        window.localStorage.setItem(key, value);
      }
    }
  }

  __propagate() {
    this.components.forEach((component) => {
      component.setState(this.__state);
    });
  }

  set state(obj) {
    this.__state = obj;
    this.__updateStore('react-component-state_state', this.__state);
    this.__propagate();
  }

  get state() {
    return this.__state;
  }
}

export default new Store();
