const queuedObservers = new Set();

let staging = null;

const Dep = {
  updateIndex: 0
};

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
    console.log('commit');
    Dep.updateIndex++;
    staging.mutations[mutation](staging.state, ...payload);
    new Promise(a => a()).then(() => {
      _done();
    })
  },
  dispatch(action, ...payload) {
    new Promise(a => a()).then(() => {
      console.log('dispatch');
      Dep.updateIndex = 0;
      this.actions[action](this, ...payload);
    })
  },
  observe(fn) {
    console.log('observe');
    queuedObservers.add(fn);
  },
};

function gettersGet(target, key, receiver) {
//   console.log(staging.state)
  console.log('gettersGet');
//   console.log(key)
//   console.log(target[key]);
// console.log(target[key](staging.state))
  const updateIndex = target._updateIndex;
  new Promise(a => a()).then(() => {
    // console.log(updateIndex);
    // console.log(Dep.updateIndex);
    if (updateIndex === Dep.updateIndex) {
      return target[key](staging.state)
    }
  })
}

function set(target, key, value, receiver) {
  if (!target.hasOwnProperty(key)) {
    console.error(`Please declare the "${key}" property name before using it`);
  }
  return Reflect.set(target, key, value, receiver);
}

function get(target, key, receiver) {
  staging = target;
  if (key === 'getters') {
    target.getters._updateIndex = Dep.updateIndex;
    return Reflect.get(target, key, receiver);
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