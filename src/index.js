const queuedObservers = new Set();

let staging = null;

const store = obj => new Proxy(
  {
    ...constructor,
    ...obj,
    getters: new Proxy({...obj.getters}, {get: gettersGet})
  },
  {set, get}
);
const _done = () => queuedObservers.forEach(observer => observer());
const constructor = {
  commit(mutation, ...payload) {
    staging.mutations[mutation](staging.state, ...payload);
    _done();
  },
  dispatch(action, ...payload) {
    this.actions[action](this, ...payload);
  },
  observe(fn) {
    queuedObservers.add(fn);
  },

};

function gettersGet(target, key) {

  return target[key](staging.state);
}

function set(target, key, value, receiver) {
  if (!target.hasOwnProperty(key)) {
    console.error(`Please declare the "${key}" property name before using it`);
  }
  return Reflect.set(target, key, value, receiver);
}

function get(target, key, receiver) {
  staging = target;
  if (key === 'commit') {
  }
  if (key in target) {
    return Reflect.get(target, key, receiver);
  } else {
    throw new ReferenceError(`Property "${key}" does not exist.`);
  }
}

export default {
  store,
}