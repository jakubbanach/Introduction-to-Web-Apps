document.addEventListener('DOMContentLoaded', function() {
    var boisko = document.getElementById('boisko');
    var pilka = document.getElementById('pilka');
    var plansza = document.getElementById('plansza');
    var poza = document.getElementById('text');
  

    boisko.addEventListener('click', function(event) {
        var rect = boisko.getBoundingClientRect();
        var mouseX = event.clientX - rect.left;
        var mouseY = event.clientY - rect.top;

        pilka.style.left = mouseX + 'px';
        pilka.style.top = mouseY - 10 + 'px';
    });

    plansza.addEventListener('click', function(event) {
      var clickedElement = event.target;

      if (clickedElement === plansza && clickedElement !== boisko) {
        poza.style.left = event.clientX+'px';
        poza.style.top = event.clientY-15+'px';
      }
    });
  });