// export default function name1() {
//     alert('I am from simpale js file');
// }
window.onload = function(){ 
    // your code 
    document.getElementById("btn").onclick = function () {
        fn1();
      };
      function fn1() {
        alert("Hello, I am from external js");
      }
};

