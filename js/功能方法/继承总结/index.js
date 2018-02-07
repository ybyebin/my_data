/**
 *  原型链继承
 * 
 * 问题：
 * 1.引用类型的属性被所有实例共享
 * 2.在创建 Child 的实例时，不能向Parent传参
 */

var a = function() {
    function parent() {
        this.name = 'parent';
        this.num = [1, 2, 3];

    }
    parent.prototype.getName = function() {
        return this.name;
    }

    function child(age) {
        this.age = age;
    }

    child.prototype = new parent();
    child.prototype.getAge = function() {
        return this.age;
    }

    var child1 = new child(1);
    var child2 = new child(2);
}





/** 
 * 借用构造函数继承(经典继承)
 * 优点：去掉了1的缺点
 * 缺点：
 *  方法都在构造函数中定义，每次创建实例都会创建一遍方法。
 * 
 */

var b = function() {


    function parent(name) {
        this.name = name;
        this.arr = [1, 2, 3, 4, 5];
    }

    function child(name) {

        // 继承属性
        parent.call(this, name);

        // 自定义属性
        this.age = 2;
    }


    var child1 = new child('tom');
    child1.arr.push('child1');
    console.log(JSON.stringify(child1.arr))
    var child2 = new child('jerry');
    child2.arr.push('child2');
    console.log(JSON.stringify(child2.arr))
}


/** 
 *  组合继承  (原型链+构造函数)
 * ()
 */

var c = function() {
    function parent(name) {
        this.name = name;
        this.arr = [1, 2, 3, 4, 5];
    }
    parent.prototype.getName = function() {
        return this.name;
    }


    function child(name) {
        // 继承属性
        parent.call(this, name);

        // 自定义属性
        this.age = 2;
    }


    // 继承方法
    child.prototype = new parent();

    child.prototype.getAge = function() {
        return this.age;
    }

    var child1 = new child('tom');
    child1.arr.push('child1');
    console.log(JSON.stringify(child1.arr))
    console.log(child1.getName())
    var child2 = new child('jerry');
    child2.arr.push('child2');
    console.log(JSON.stringify(child2.arr))
    console.log(child2.getName())

}

// c();



/** 
 * 寄生+组合
 * 
 * 
 * 
 */


function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function prototype(child, parent) {

    var prototype = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}


var d = function() {
    function parent(name) {
        this.name = name;
        this.arr = [1, 2, 3, 4, 5];
    }
    parent.prototype.getName = function() {
        return this.name;
    }


    function child(name) {
        // 继承属性
        parent.call(this, name);

        // 自定义属性
        this.age = 2;
    }


    // 继承方法
    // child.prototype = new parent();
    prototype(child, parent);

    child.prototype.getAge = function() {
        return this.age;
    }

    var child1 = new child('tom');
    child1.arr.push('child1');
    console.log(JSON.stringify(child1.arr))
    console.log(child1.getName())
    var child2 = new child('jerry');
    child2.arr.push('child2');
    console.log(JSON.stringify(child2.arr))
    console.log(child2.getName())

}

d();












function tt() {
    function parent(name) {
        this.name = name;
        this.pro = {
            num: 1,
            money: 100
        }
    }
    parent.prototype.getName = function() {
        return this.name;
    }


    function child(name, age) {
        parent.call(this, name);
        this.age = age;
    }

    function prototype(parent, child) {
        function f() {};
        f.prototype = parent.prototype;
        var proto = new f();
        proto.constructor = child;
        child.prototype = proto;
    }

    prototype(parent, child);

    child.prototype.getAge = function() {
        return this.age;
    }

    var child1 = new child('Tom', 12);
    var child2 = new child('Jery', 23);
    child1.pro.money = 1000;
    console.log('child1:' + JSON.stringify(child1.pro));
    console.log('child2:' + JSON.stringify(child2.pro));

}

tt();

for (let i = 1; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i);
    }, i * 1000);
}


for (var i = 1; i <= 5; i++) {
    (function(i) {
        setTimeout(function timer() {
            console.log(i)

        }, i * 1000);
    })(i)
}



for (var i = 1; i <= 5; i++) {
    setTimeout(function timer(i) {
        return function() {
            console.log(i)
        }

    }(i), i * 1000);


}



