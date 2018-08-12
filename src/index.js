const constructor = {
  commit(mutation){
    this.mutations[mutation](this.state);
  }
};
const store = obj => new Proxy({...obj, ...constructor}, {set, get});

function set(target, key, value) {
  if (!target.hasOwnProperty(key)) {
    console.error(`Please declare the "${key}" property name before using it`);
  }
  target[key] = value;
}
function get(target, key, receiver) {

  if (key in target) {
    return target[key];
  } else {
    throw new ReferenceError(`Property "${key}" does not exist.`);
  }
}
export default {
  store,
}