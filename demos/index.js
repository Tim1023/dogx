import {observable, observe} from '../src/index.js';

const person = observable({
  name: '张三',
  age: 20
});

const print = () => {
  console.log(`${person.name}, ${person.age}`)
  document.getElementById('demo').innerText = `${person.name}, ${person.age}`
}

observe(print);
person.name = '李四';
person.age = 24;

const older = () => {
  person.age++
}
document.getElementById('older').onclick = older;