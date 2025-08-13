// let a = 10
// console.log(this.a)
// console.log(this,"global calling of this")
// let person = {
//     name:"bob",
//     greet:function(){
//         console.log(this,"this is a method")
//     }
// }

// person.greet()

// function name(){
//     console.log(this,"this is stand alone funtion")
// }
// name()
// "use strict"
// x=10
// console.log(x)
"use strict"
// function name(a,a,a){
//     sum = a+a+a
//     console.log(sum)
// }
// name(1,2,3)
// "use strict"
// function name(){
//     console.log(this)
// }
// name()
// const arrow = ()=>{
//     console.log(this)
// }
// arrow();

// call() method

function name(message,value){
    console.log(`${this.name} ${message} ${value}`)
} 
let person = {
    name:"bob"
}
const bindFun =name.bind(person,"hello world","value")
bindFun()
