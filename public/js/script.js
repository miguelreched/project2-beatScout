// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
// document.addEventListener("DOMContentLoaded", () => {
//   console.log("name-of-your-app JS imported successfully!");
// });

// document.querySelector("#show-form").addEventListener("click",()=>{

//   if(document.querySelector("#form-profile-picture").classList.contains("display")){

//     document.querySelector("#form-profile-picture").classList.remove("display")

//   }else {

//     document.querySelector("#form-profile-picture").classList.add("display")

//   }
// })



const burguer = document.getElementById("burguer")
console.log(burguer)
burguer.addEventListener('click', function() {
  this.classList.toggle('open');
  document.querySelector("header nav").classList.toggle('open')

});

