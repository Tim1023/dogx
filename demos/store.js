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
    },
    decrement(state, ...num) {
      console.log(num);
      state.count = state.count - num.reduce((partial, value) =>
        partial + value
      );
      console.log(state)
    }
  },
  actions: {
    async incrementAsync({commit}, {amount}) {
      await commit('increment', amount);
      await commit('decrement', 40);
    }
  }
});

export default store;