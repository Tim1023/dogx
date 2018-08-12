import dogx from '../src/index.js';

const store = dogx.store({
  state: {
    name: '张三',
    count: 20
  },
  mutations: {
    increment (state, num, numTwo) {
      state.count = state.count + num +numTwo;
      console.log(state)
    }
  }
});

console.log(store.state);
store.commit('increment',10,20);