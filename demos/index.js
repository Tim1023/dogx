import dogx from '../src/index.js';

const store = dogx.store({
  state: {
    name: '张三',
    count: 20
  },
  mutations: {
    increment(state, ...num) {
      console.log(num);
      state.count = state.count + num.reduce((partial, value) =>
        partial + value
      );
      console.log(state)
    }
  },
  actions: {
    incrementAsync({commit}, {amount}) {
      setTimeout(() => {
        commit('increment', amount)
      }, 1000)
    }
  }
});

console.log(store.state);
store.commit('increment', 10, 20);
store.dispatch('incrementAsync', {
  amount: 23
});
