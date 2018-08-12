const constructor = {
  commit(mutation, ...payload){
    staging.mutations[mutation](staging.state, ...payload);
  },
  dispatch(action, ...payload){
    this.actions[action](this, ...payload);
  },
};
let staging = null;
const store = obj => new Proxy({...obj, ...constructor}, {set, get});

function set(target, key, value, receiver) {
  if (!target.hasOwnProperty(key)) {
    console.error(`Please declare the "${key}" property name before using it`);
  }
  return Reflect.set(target, key, value, receiver);
}
function get(target, key, receiver) {
  staging = target;

  if (key in target) {
    return Reflect.get(target, key, receiver);
  } else {
    throw new ReferenceError(`Property "${key}" does not exist.`);
  }
}
export default {
  store,
}