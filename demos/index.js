import store from './store.js';

console.log(store.state);
store.commit('increment', 10, 20);
store.dispatch('incrementAsync', {
  amount: 23
});
