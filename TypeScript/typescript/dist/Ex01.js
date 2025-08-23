"use strict";
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    displayInfo() {
        console.log('Name: ' + this.name + ', Age: ' + this.age);
    }
}
const Person1 = new Person('Thái', 20);
Person1.displayInfo();
