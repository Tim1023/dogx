import store from './store.js';

const print = () => {
  // console.log(`${store.state.name}, ${store.state.count}`)
};
const change = () => {
  document.getElementById('demo').innerText = `${store.state.name}, ${store.state.count}`;
  document.getElementById('count-size').innerText = `${store.getters.bigCount}`;
  console.log('updated')
};

store.observe(change);
store.observe(print);

function mounted() {

  // console.log('incrementAsyncTest')
  // store.dispatch('incrementAsyncTest', {
  //   amount: 23
  // });
  // store.commit('increment', 10, 20);
  // store.commit('increment', 5);
  console.log('incrementAsync');
  store.dispatch('incrementAsync', {
    amount: 2
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