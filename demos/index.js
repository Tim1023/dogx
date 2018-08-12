import store from './store.js';

const print = () => {
  console.log(`${store.state.name}, ${store.state.count}`)
};
const change = () => {
  document.getElementById('demo').innerText = `${store.state.name}, ${store.state.count}`
};
store.observe(print);
store.observe(change);

store.commit('increment', 10, 20);
store.dispatch('incrementAsync', {
  amount: 23
});
const older = () => {
  store.dispatch('incrementAsync', {
    amount: 1
  });
};


document.getElementById('older').onclick = older;
