import store from './store.js';

const print = () => {
  console.log(`${store.state.name}, ${store.state.count}`)
};
const change = () => {
  document.getElementById('demo').innerText = `${store.state.name}, ${store.state.count}`;
  document.getElementById('count-size').innerText = `${store.getters.bigCount}`
};

store.observe(change);
store.observe(print);

async function mounted() {

  await store.commit('increment', 10, 20);

  await store.dispatch('incrementAsync', {
    amount: 23
  });

}


const older = () => {
  store.dispatch('incrementAsync', {
    amount: 1
  });
};

document.getElementById('older').onclick = older;

// console.log(store.getters.bigCount);

mounted();