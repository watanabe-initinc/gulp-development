'use strict';

class Hello {

  constructor() {
    this.hello = 'hello!';
  }

  init() {
    this.say();
  }

  say() {
    console.log(this.hello);
  }
}

export default new Hello();