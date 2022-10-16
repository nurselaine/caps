'use strict';

class Queue {
  constructor(){
    this.data = {};
  }

  store(key, value){
    this.data[key] = value;
    return key;
  }

  read(key){
    return this.data[key];
  }

  remove(key){
    console.log('something got removed');
    let value = this.data[key];
    delete this.data[key]; // delete is a JS keyword
    return value;
  }
}

module.exports = Queue;