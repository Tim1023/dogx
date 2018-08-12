import dogx from '../src/index.js';

const store = dogx.store({
  state: {
    name: '张三',
    count: 20
  },
  mutations: {
    increment (state) {
      state.count++;
      console.log(state)
    }
  }
});

console.log(store.state);
store.commit('increment');