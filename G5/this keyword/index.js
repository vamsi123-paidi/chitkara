// 'use strict'

// console.log(this,"nomal global calling")

// function standAlone(){
//     console.log(this,"this is from standalone funtion")
// }
// standAlone()

// let person = {
//     name:"bob",
//     greet:function(){
//         console.log(this,"this is method")
//     }
// }
// person.greet()

// var value = 10;
// console.log(this.value)
// 'use strict'
// a = 10
// console.log(a)

// function add(a,a,c){
//     sum = a+a+c
//     console.log(sum)
    
// }
// add(1,2,3)
// "use strict"
// function name(){
//     console.log(this)
// }
// name()

// let arrow = ()=>{
//     console.log(this)
// }
// arrow()


// call method

function sample(message,a,b){
    console.log(`${this.name}  ${message} ${a} ${b}`)
}
let person = {name:"bob"}
const bindMethod = sample.bind(person)
bindMethod("hello","world","bind")