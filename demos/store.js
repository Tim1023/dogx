import dogx from '../src/index.js';

const store = dogx.store({
  state: {
    name: '张三',
    count: 10,
    todos: [
      {id: 1, text: '...', done: true},
      {id: 2, text: '...', done: false}
    ],
  },
  getters: {
    bigCount: state => {
      const size = state.count > 100 ? 'BIG' : 'SMALL';
      console.log('CALLED GETTER');
      console.log(size);
      return size
    }
  },
  mutations: {
    increment(state, ...num) {
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
    }
  }
});

export default store;