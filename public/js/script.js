const burguer = document.getElementById("burguer")
console.log(burguer)
burguer.addEventListener('click', function() {
  this.classList.toggle('open');
  document.querySelector("header nav").classList.toggle('open')

});

