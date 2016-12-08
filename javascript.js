$( document ).ready(function() {
var num = 0;

  $(".create-oven").click(function(event){
      $(this).hide();
      event.preventDefault();      
      $(".oven").css("visibility","visible");
      $(".oven").append("<div id='horno-title'>Horno</div>");

      $(".oven").append("<form method='post' id='form_oven'>"+
          "<input type='text' name='type' placeholder='Tipo'>"+
          "<input type='text' name='time' placeholder='Tiempo'>"+
            "<input type='submit' value='Cocinar' id='enviar'>"+
        "</form>");


   $("#form_oven").submit(function(event){ 
    event.preventDefault(); 
    
    if ($("input[type=text]:first").val() == "" || $("input[type=text]:last").val() == "")
      alert("no dejes ning&uacute;n campo vacio!");
    else{
      var type = $('input[name="type"]').val();
      var time = $('input[name="time"]').val();
        $("input[type=text]").val("");
        $("#timer").append("<div id='countdown'></div>"+
                           "<div id='status'></div>");
        proceso(type, time, num);
        num += 1;
    }
   });    // cierre form-oven

  });     // cierre de create-oven

});       // cierre de ready


  function proceso(type, time, num){
    var time_interval = setInterval(tiempo, 1000);
    var contador = 0;

         function tiempo(){
         orden = status(type, contador);
           $("#countdown").text(time);
           $("#status").text(orden);

        console.log(orden);
         if (orden == "Crudo")

             $("#timer").removeClass().addClass("Crudo");

         else if(orden == "Casi listo")

             $("#timer").removeClass().addClass("Casi-listo");

         else if(orden == "LISTO")

             $("#timer").removeClass().addClass("Listo");

         else if(orden == "QUEMADO")

             $("#timer").removeClass().addClass("Quemado");

        if (time == 0 && num == 0){
          clearInterval(time_interval);
            $("#history").css("visibility","visible");
            $("#history").append("<h1 class='recien-salidas'>Reci&eacute;n Salidas</h1>");
            $("#history").append("<li>"+ type + " " + orden +"</li>");
        }else if(time == 0 && num != 0){
          clearInterval(time_interval);
            $("#history").append("<li>"+ type + " " + orden +"</li>");
        }
          contador += 1;   //back-end
          time -= 1;      //front-end
         

   }
   function status(type, time){
        var miOrden = new Torta(type, time);
          return miOrden.status();
        // var salida = (miOrden.que_tipo() + " " + miOrden.status());
   }

}

// Class Torta


// Class TortaBatch


// Class Oven


var TortaBatch = function(type){
  this.type = type
}

TortaBatch.prototype.que_tipo = function() {
return this.type
};

function Torta(type, time){
  TortaBatch.call(this, type);
  this.time = time;
}

Torta.prototype = Object.create(TortaBatch.prototype)

Torta.prototype.tiempo_preparacion = function(){
  console.log("se cocina en: "+ this.time + " la torta de: "+ this.type)
}

Torta.prototype.status = function(){
  var recetas = { "jamon": 3, "queso": 8, "milanesa": 10}
  time = this.time
  type = this.type

  state = parseFloat(time) / recetas[type]
  if (state < 0.1)
    return "Crudo"
  else if(state < 1.0)
    return "Casi listo"
  else if(state == 1.0)
    return "LISTO"
  else if(state > 1.0)
    return "QUEMADO"
}

// var miOrden = new Torta("milanesa" , 5);
// miOrden.que_tipo();
// miOrden.tiempo_preparacion();
// miOrden.status();