import React, { PureComponent } from 'react';
import { Button, Tabs, Icon } from 'antd';

const { TabPane } = Tabs;
/* eslint-disable no-unused-vars */
export default class Learn2 extends PureComponent {

  test1 = () => {
    // extends 简单继承
    class Point {
      // 构造函数
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }

      // 类的原型上的方法
      toString() {
        return `x: ${this.x}, y: ${this.y}`;
      }

      // 类的静态方法也可以继承
      static hello() {
        console.log('Hello, world!');
      }
    }
    class ColorPoint extends Point {
      constructor(x, y, color) {
        // 子类必须在constructor方法中调用super方法: 它在这里表示父类的构造函数，用来新建父类的this对象。
        /* 
        tips: 
          1. super虽然代表了父类Point的构造函数，但是返回的是子类ColorPoint的实例，即super内部的this指的是ColorPoint，
            因此super()在这里相当于Point.prototype.constructor.call(this)。
          2. 在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。
        */
        super(x, y); // 调用父类的constructor(x, y)
        this.color = color; // 只有调用 super() 改造 this 后，才能使用 this 关键字
      }

      toString() {
        return this.color + ' ' + super.toString(); //  调用父类的toString()
      }
    }

    const point1 = new Point(1, 1);
    const point2 = new ColorPoint(2, 2, 'red');
    console.log(point1);
    console.log(point2);
    console.log(point1.toString());
    console.log(point2.toString());
    Point.hello();
    ColorPoint.hello();
    console.log(point1 instanceof ColorPoint); // false  这说明父类和prototype和子类的prototype是解耦的;
    console.log(point1 instanceof Point);
    console.log(point2 instanceof ColorPoint);
    console.log(point2 instanceof Point);

    // Object.getPrototypeOf方法可以用来从子类上获取父类。
    console.log(Object.getPrototypeOf(point1)); // Point
    console.log(Object.getPrototypeOf(point2)); // ColorPoint
    console.log(Object.getPrototypeOf(Point)); // [object Object]
    console.log(Object.getPrototypeOf(ColorPoint)); // Point
    //可以使用这个方法判断，一个类是否继承了另一个类。
    console.log(Object.getPrototypeOf(ColorPoint) === Point) // true
  }

  test2 = () => {
    class A {
      constructor() {
        console.log('调用A的构造函数');
        // new.target指向当前正在执行的函数
        console.log(new.target && new.target.name);
        // console.log(new.target.name);

        // 实例属性
        this.msg = 'A实例属性';
        // 实例方法
        this.sayMsg = function () {
          console.log(this.msg);
        }
      }

      sayHi() {
        console.log('hi');
      }

      static myMethod(msg) {
        console.log('A的静态方法' + msg);
      }

      myMethod(msg) {
        console.log('A的原型方法' + msg);
      }
    }

    // 如果属性定义在父类的原型对象上，super就可以取到。
    A.prototype.msg2 = 'prototype上的属性';

    class B extends A {
      constructor() {
        // 使用方式1： super作为函数调用时，代表父类的构造函数。
        // super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B，
        // 因此super()在这里相当于A.prototype.constructor.call(this)。
        super();
        console.log(new.target && new.target.name);

        // 使用方式2： super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
        super.sayHi(); // hi
        // console.log(super); // 报错

        // 由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。
        this.msg = 'B实例msg';
        // 由于this指向子类，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。
        super.msg = 'B中super.msg';
        // 定义在父类的原型对象 prototype 上，super就可以取到
        console.log(super.msg2); // prototype上的属性
        console.log(super.msg);
        console.log(this.msg);
      }

      sayHillo() {
        // console.log(super);
        super.sayHi();
        console.log('hello');
        console.log(A.prototype); // 父类的原型对象, 类型是对象，拥有 constructor，sayHi 等方法和属性
        console.log(A); // 函数类A
        A.prototype.sayHi(); // 和 super.sayHi() 是一样的;

        console.log(this.msg)
      }

      static myMethod(msg) {
        // super在静态方法之中指向父类
        super.myMethod(` B中：${msg}`);
      }

      myMethod(msg) {
        // 在普通方法之中指向父类的原型对象。
        super.myMethod(` B中: ${msg}`);
      }
    }

    const a = new A();
    const b = new B();

    b.sayHi(); // hi
    b.sayHillo(); // hi hello

    b.myMethod('bbb'); // A的原型方法 B中: bbb
    B.myMethod('BBB'); // A的静态方法 B中：BBB
  }

  test3 = () => {
    class A {
      constructor() {
        this.x = 1;
      }
    }

    class B extends A {
      constructor() {
        super();
        this.x = 2;
        super.x = 3;
        console.log(super.x); // undefined
        console.log(this.x); // 2
      }
    }

    let b = new B();
  }

  test4 = () => {
    // ES5: 每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。
    // ES6: Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。
    //  1. 子类的__proto__属性，表示构造函数的继承，总是指向父类。
    //  2. 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
  }

  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane tab={<span><Icon type="apple" />基础</span>} key="1">
            <Button onClick={this.test1}>extends</Button>
            <Button onClick={this.test2}>super</Button>
            <Button onClick={this.test3}>super赋值</Button>
            <Button onClick={this.test4}>prototype</Button>
          </TabPane>
          <TabPane tab={<span><Icon type="apple" />222</span>} key="2">
            <Button>2222</Button>
          </TabPane>
          <TabPane tab={<span><Icon type="apple" />333</span>} key="3">
            <Button>3333</Button>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}