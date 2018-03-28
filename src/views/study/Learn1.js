import React, { Component } from 'react';
import {Button, Collapse} from 'antd';

const {Panel} = Collapse;

/* eslint-disable no-unused-vars,no-new-object */
export default class Learn1 extends Component {

  test1 = () => {
    const MyClass = function() {};
    const obj = new MyClass();

    console.log(MyClass.prototype);
    console.log(obj.prototype);
    console.log(obj.__proto__);
    console.log(obj.__proto__ === MyClass.prototype); // true
    console.log(obj.prototype === MyClass.prototype); // false
    
    MyClass.prototype.a_member = "abc";
    console.log(obj.a_member);
    console.log(obj.__proto__.a_member);
  }

  test2 = () => {
    var MyClass = function() {};
    var obj1 = new MyClass();
    var obj2 = new MyClass();
    obj1.__proto__.a_member = 'abc';

    console.log(MyClass.prototype.a_member); // abc
    console.log(obj2.a_member); // abc
  }

  test3 = () => {
    var MyClass = function () {
      this.a = "a";
      this.b = "b";
    };
    
    var obj = new MyClass();
    function f1() {
      alert("something");
    };

    console.log(MyClass.prototype); // [object Object]
    console.log(MyClass.__proto__); // function () {}

    console.log(obj.prototype); // undefined
    console.log(obj.__proto__); // [object Object]

    console.log(f1.prototype); // [object Object]
    console.log(f1.__proto__); // function () {}
  }

  test4 = () => {
    var LaoWang = function() {
      // 构造函数内部: 实现属性的继承
      this.aproperty = 'aa';
      this.amethod = function() {
        console.log('b');
        return 'b';
      };
    };

    // prototype 上: 方法的继承
    LaoWang.prototype.bmethod = function() {
      console.log('bbbb');
    };

    var XiaoMing = function() {};

    XiaoMing.prototype = LaoWang.prototype;  // 只是实现的方法的继承
    var obj = new XiaoMing();

    console.log(obj instanceof LaoWang); // true
    console.log(obj.aproperty); // undefined
    console.log(obj.amethod); // undefined
    // console.log(obj.amethod()); // Uncaught TypeError: obj.amethod is not a function
    console.log(obj.bmethod())
  }

  test5 = () => {
    var LaoWang = function() {
      this.aproperty = 'aa';
      this.amethod = function() {
        console.log('b');
        return 'b';
      };
    };

    var XiaoMing = function() {
      // this 的指向不对
      // LaoWang(); // Cannot set property 'aproperty' of undefined

      // apply, call 指定this
      LaoWang.call(this);
    };

    XiaoMing.prototype = LaoWang.prototype;
    XiaoMing.prototype.constructor = XiaoMing; // 重新指定父类的构造函数
    var obj = new XiaoMing();

    console.log(obj instanceof LaoWang); // true
    console.log(obj.aproperty); // a
    console.log(obj.amethod()); // b
  }

  test6 = () => {
    var LaoWang = function() {
      this.aproperty = 'aa';
      this.amethod = function() {
        console.log('b');
        return 'b';
      };
    };

    var XiaoMing = function() {
      LaoWang.call(this);
    };

    XiaoMing.prototype = LaoWang.prototype;
    XiaoMing.prototype.constructor = XiaoMing; // 重新指定父类的构造函数

    XiaoMing.prototype.another_property = 'c';
    var subobj = new XiaoMing();
    var superobj = new LaoWang();

    // 原型链的污染: 耦合在一起
    // console.log(subobj.another_property); // c
    // console.log(superobj.another_property); // c

    console.log(subobj instanceof LaoWang); // true
    console.log(subobj instanceof XiaoMing); // true
    console.log(subobj.aproperty);
    console.log(subobj.amethod());
    console.log(subobj.another_property); // c

    console.log(superobj instanceof LaoWang); // true
    console.log(superobj instanceof XiaoMing); // true  这说明 LaoWang 和 XiaoMing 指向同一个 prototype, 耦合起来
    console.log(superobj.aproperty);
    console.log(superobj.amethod());
    console.log(superobj.another_property); // c
  }

  // 原型解耦1: 用两个实体，一个中间类（其实也是一个对象，第一等）和一个中间对象（普通），来解耦
  test7 = () => {
    var LaoWang = function() {
      this.aproperty = 'aa';
      this.amethod = function() {
        console.log('b');
        return 'b';
      };
    };
    var XiaoMing = function() {
      LaoWang.call(this);
    };

    function IntermediateClass() {}
    IntermediateClass.prototype = LaoWang.prototype;
    XiaoMing.prototype = new IntermediateClass();
    XiaoMing.prototype.constructor = XiaoMing;

    XiaoMing.prototype.another_property = 'cc';
    var subobj = new XiaoMing();
    var superobj = new LaoWang();

    console.log(subobj instanceof LaoWang); // true
    console.log(subobj instanceof XiaoMing); // true
    console.log(subobj.aproperty);
    console.log(subobj.amethod());
    console.log(subobj.another_property);

    console.log(superobj instanceof LaoWang); // true
    console.log(superobj instanceof XiaoMing); // false
    console.log(superobj.aproperty);
    console.log(superobj.amethod());
    console.log(superobj.another_property); // undefined
  }

  // 原型解耦1: Object.create()
  test8 = () => {
    var LaoWang = function() {
      this.aproperty = 'aa';
      this.amethod = function() {
        console.log('b');
        return 'b';
      };
    };
    var XiaoMing = function() {
      LaoWang.call(this);
    };

    // Object.create(pro): 以 pro 为原型创建的对象实例
    XiaoMing.prototype = Object.create(LaoWang.prototype); // prototype 实现方法的继承
    XiaoMing.prototype.constructor = XiaoMing;  // constructor 构造函数实现了属性的继承

    XiaoMing.prototype.another_property = 'cc';
    var subobj = new XiaoMing();
    var superobj = new LaoWang();

    console.log(subobj instanceof LaoWang); // true
    console.log(subobj instanceof XiaoMing); // true
    console.log(subobj.aproperty);
    console.log(subobj.amethod());
    console.log(subobj.another_property);
    console.log(XiaoMing.prototype);

    console.log('子类实例--------------')
    console.log(subobj.prototype); // undefined, 函数才有 prototype
    console.log(subobj.__proto__);
    console.log(subobj.__proto__ === XiaoMing.prototype); // true
    console.log(subobj.__proto__ === LaoWang);
    console.log(XiaoMing.prototype === LaoWang);
    console.log(LaoWang.constructor);
    console.log(LaoWang.prototype);
    console.log(LaoWang.prototype.constructor);
    console.log(LaoWang.prototype.constructor === XiaoMing.prototype);
    console.log(LaoWang.__proto__);

    console.log('--------------------')

    console.log(superobj instanceof LaoWang); // true
    console.log(superobj instanceof XiaoMing); // false
    console.log(superobj.aproperty);
    console.log(superobj.amethod());
    console.log(superobj.another_property); // undefined
    console.log(LaoWang.prototype);
    console.log(superobj.prototype); // undefined, 函数才有 prototype
    console.log(superobj.__proto__);
  }

  test9 = () => {
    //
    const A = function() {};
    const B = {};

    // __prototo__: 隐式原型， 一个对象的隐式原型指向构造该对象的构造函数的原型，这也保证了实例能够访问在构造函数原型中定义的属性和方法。
    // ƒ () { [native code] }，A函数的__prototo__
    console.log(A.__proto__);
    // {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: …}: B对象的__proto__
    console.log(A.__proto__.__proto__);
    console.log(B.__proto__);

    // prototype: 显示原型,这个属性是一个指针，指向一个对象，这个对象的用途就是包含所有实例共享的属性和方法（我们把这个对象叫做原型对象）。
    // 原型对象也有一个属性，叫做constructor，这个属性包含了一个指针，指回原构造函数
    console.log(A.prototype); // {constructor: ƒ}, 只有函数才有 prototype
    console.log(B.prototype); // undefined, 对象没有prototype
  }

  // 对象的 prorotype 和 __proto__
  test10 = () => {
    // js 中对象的 prototype 和 proto 分为三种情况:
    // 1. 对象的 prototype 和 __proto__
    const obj1 = new Object(); // 方法的本质是由构造函数 function Object(){} 产生的;

    const func1 = function() {}

    // 对象具有属性__proto__，可称为隐式原型，一个对象的隐式原型指向构造该对象的构造函数的原型，
    // 这也保证了实例能够访问在构造函数原型中定义的属性和方法。
    console.log(obj1.__proto__);  // 对象实例的 __proto__ 指向构造函数 Object.prototype
    console.log(Object.prototype); // 同上
    console.log(Object.__proto__); // Object() 函数的构造函数 Function() 的 Function.prototype
    console.log(Function.prototype) // Function.prototype 是原型对象，是一个对象
    console.log(Object.prototype.__proto__);  // 对象构造函数的原型对象，它的 __proto__ 是 null
    console.log(Function.prototype.__proto__); // 函数构造函数的原型对象，它的 __proto__ 是对象构造函数的 prototype
    console.log(obj1.__proto__); // Object.prototype
    console.log(func1.__proto__); // 构造函数 Function() 的 prototype
    console.log(func1.__proto__.__proto__); // Function.prototype 原型对象de __proto__ 是 Object.prototype
  }

  // 函数的 prorotype 和 __proto__
  test11 = () => {
    function Foo() {
      this.name = 'foo'
      this.sayHi = function(){
        console.log('hi');
      }
    }

    const func1 = new Foo();
    const func2 = new Foo(); // 函数的实例

    // 方法这个特殊的对象，拥有 prototype(原型属性) 和 __proto__(隐式原型) 两个属性
    // 1. prototype: 这个属性是一个指针，指向一个对象，
    // 这个对象的用途就是包含所有实例共享的属性和方法（我们把这个对象叫做原型对象）。
    // 原型对象也有一个属性，叫做constructor，这个属性包含了一个指针，指回原构造函数。

    // 2. __proto__ 和 对象的 __proto__ 一样

    // 分析
    // 1. 构造函数Foo()
    // 构造函数的原型属性Foo.prototype指向了原型对象，在原型对象里有共有的方法，所有构造函数声明的实例（这里是f1，f2）都可以共享这个方法。
    console.log(Foo.prototype); // 构造函数 Foo 的原型对象
    console.log(Foo.__proto__); // Foo 函数的本质是: 构造函数function Function()的实例, 这里是: Function.prototype
    console.log(Function.prototype);  // 同上
    console.log(Function.prototype.__proto__); // Function() 构造函数的原型对象的 __proto__ 是 Object.prototype
    console.log(Foo.prototype.__proto__); // 同上

    // 2. 原型对象Foo.prototype
    // Foo.prototype保存着实例共享的方法，有一个指针constructor指回构造函数。    

    // 3. 实例
    // f1和f2是Foo这个对象的两个实例，这两个对象也有属性__proto__，指向构造函数的原型对象，这样子就可以像上面1所说的访问原型对象的所有方法啦。


    // 总结:
    // 1. 对象有属性__proto__,指向该对象的构造函数的原型对象。
    // 2. 方法除了有属性__proto__,还有属性prototype，prototype指向该方法的原型对象。
  }

  // prototype 和 __proto__ 在继承中的使用
  test12 = () => {
    function Foo() {
      this.name = 'foo';
    }

    function Bar() {
      this.age = 0;
    }

    console.log(Foo.prototype); // 构造函数Foo的原型对象
    console.log(Foo.prototype.__proto__); // Object.prototype 构造函数 Object 的原型对象

    // tips: 完全重写了Foo.prototype，所以Foo.prototype.constructor也跟着改变了，
    // 于是乎constructor这个属性和原来的构造函数Foo（）也就切断了联系。
    Foo.prototype = new Bar();

    const foo1 = new Foo();

    console.log(Foo.prototype); // Bar 构造函数的实例对象
    console.log(Bar); // 构造函数 Bar
    console.log(Foo.prototype.__proto__); // 构造函数 Bar 的原型对象
    console.log(foo1.prototype); // undefined, 函数才有 prototype 属性
    console.log(foo1.__proto__); // 构造函数 Foo(){} 的原型对象： Bar 的实例对象
  }

  test13 = () => {
    var big = '万达老师';

    var obj = {
      big: '松卫老师',
      showBig: function() {
        console.log(this)
        console.log(this.big)
        console.log(this.big())
        return this.big;
      }
    };

    obj.showBig.call(big);
    console.log(obj.showBig.call(big));
  }

  test14 = () => {
    function a(a, b, c) {
      console.log(this);
      console.log(this.length);
      console.log(this.callee);
      console.log(this.callee.length);
    }
    function fn(d) {
      arguments[0](10, 20, 30, 40, 50);
    }

    fn(a, 10, 20, 30);
  }

  test15 = () => {
    var a = function(){
      console.log(this);
      // console.log(this.name);
    };
    var b = function(fn) {
      // fn(); // this 指向 window
      arguments[0]();  // this 指向arguments
    }

    b(a);
  }

  render() {
    return (
      <div>
        <Collapse defaultActiveKey="6">
          <Panel header="玩转Prototype(上)" key="1">
            <Button onClick={this.test1}>learn1</Button>
            <Button onClick={this.test2}>learn2</Button>
            <Button onClick={this.test3}>learn3</Button>
          </Panel>
          <Panel header="玩转Prototype(下)" key="2">
            <Button onClick={this.test4}>learn4</Button>
            <Button onClick={this.test5}>learn5</Button>
            <Button onClick={this.test6}>learn6</Button>
          </Panel>
          <Panel header="原型解耦" key="3">
            <Button onClick={this.test7}>中间类</Button>
            <Button onClick={this.test8}>Object.create()</Button>
          </Panel>
          <Panel header="prototype和__proto__" key="4">
            <Button onClick={this.test9}>展示</Button>
            <Button onClick={this.test10}>对象的__proto__</Button>
            <Button onClick={this.test11}>函数的prototype和__proto__</Button>
          </Panel>
          <Panel header="prototype和__proto__的继承" key="5">
            <Button onClick={this.test12}>展示</Button>
          </Panel>
          <Panel header="this指向" key="6">
            <Button onClick={this.test13}>111</Button>
            <Button onClick={this.test14}>222</Button>
            <Button onClick={this.test15}>333</Button>
          </Panel>
        </Collapse>
      </div>
    )
  }
}