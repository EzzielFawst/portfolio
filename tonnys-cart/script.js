const app = async () => {
  const hamburFetch = await fetch("/tonnys-cart/hamburguesas.json");
  const hamburguesasMenu = await hamburFetch.json();
  const papasFetch = await fetch("/tonnys-cart/papas.json");
  const papasMenu = await papasFetch.json();

  let hamburguesas = "";
  let papas = "";
  let carrito = "";
  let total = 0;

  hamburguesasMenu.map((item) => {
    hamburguesas += `
            <div class="card">
                <img src="${item.img}">
                <h5>${item.nombre} <span>$${item.precio}</span></h5>
                <p>${item.descripcion}</p>
                <input id="inputHamburguesas" data-name="${item.nombre}" data-price="${item.precio}" type="number" placeholder="Cantidad: 0" min="0" >
            </div>
        `;
  });

  papasMenu.map((item) => {
    papas += `
            <div class="card">
                <img src="${item.img}">
                <h5>${item.nombre} <span>$${item.precio}</span></h5>
                <p>${item.descripcion}</p>
                <input id="inputPapas" data-name="${item.nombre}" data-price="${item.precio}" type="number" placeholder="Cantidad: 0" min="0">
            </div>
        `;
  });

  document.getElementById("hamburguesas").innerHTML = hamburguesas;
  document.getElementById("papas").innerHTML = papas;

  const form1 = document.getElementById("form1");
  const form2 = document.getElementById("form2");
  const form3 = document.getElementById("form3");
  const form4 = document.getElementById("form4");

  const next1 = document.getElementById("next1");
  const next2 = document.getElementById("next2");
  const next3 = document.getElementById("next3");
  const back1 = document.getElementById("back1");
  const back2 = document.getElementById("back2");
  const back3 = document.getElementById("back3");

  const enviar = document.getElementById("enviar");

  const progress = document.getElementById("progress");

  const tipoDePedido = document.getElementById("tipoDePedido");
  const envio = document.getElementById("envio");

  const carro = document.getElementById("carrito");
  const totalCarro = document.getElementById("total");

  let pedidoHamburguesas = [];
  let pedidoPapas = [];

  next1.onclick = function () {
    form1.style.left = "-450px";
    form2.style.left = "20px";
    progress.style.width = "180px";
    var inputs = document.querySelectorAll("#inputHamburguesas");
    pedidoHamburguesas = [];
    inputs.forEach((input) => {
      if (input.value > 0) {
        pedidoHamburguesas.push({
          nombre: input.dataset.name,
          precio: input.dataset.price,
          quantity: input.value,
        });
      }
    });
  };
  back1.onclick = function () {
    form1.style.left = "20px";
    form2.style.left = "450px";
    progress.style.width = "90px";
  };
  next2.onclick = function () {
    form2.style.left = "-450px";
    form3.style.left = "20px";
    progress.style.width = "270px";
    var inputs = document.querySelectorAll("#inputPapas");
    pedidoPapas = [];
    inputs.forEach((input) => {
      if (input.value > 0) {
        pedidoPapas.push({
          nombre: input.dataset.name,
          precio: input.dataset.price,
          quantity: input.value,
        });
      }
    });

    total = 0;

    pedidoHamburguesas.map((hambur) => {
      carrito += `
                <tr>
                    <td>${hambur.nombre}</td>
                    <td>x${hambur.quantity}</td>
                    <td>$${hambur.precio}</td>
                    <td>$${hambur.precio * hambur.quantity}</td>
                </tr>
            `;
      total += hambur.precio * hambur.quantity;
    });

    pedidoPapas.map((papas) => {
      carrito += `
                <tr>
                    <td>${papas.nombre}</td>
                    <td>x${papas.quantity}</td>
                    <td>$${papas.precio}</td>
                    <td>$${papas.precio * papas.quantity}</td>
                </tr>
            `;
      total += papas.precio * papas.quantity;
    });
    carro.innerHTML = carrito;
    totalCarro.innerHTML = `Total: $<span><strong>${total}</strong></span>`;
  };
  back2.onclick = function () {
    form2.style.left = "20px";
    form3.style.left = "450px";
    progress.style.width = "180px";
    carrito = "";
  };
  next3.onclick = function () {
    form3.style.left = "-450px";
    form4.style.left = "20px";
    progress.style.width = "360px";
  };
  back3.onclick = function () {
    form3.style.left = "20px";
    form4.style.left = "450px";
    progress.style.width = "270px";
  };

  const nombreApellido = document.getElementById("nombreApellido");
  var direccion = document.getElementById("direccion");
  var comentario = document.getElementById("comentario");

  tipoDePedido.addEventListener("change", () => {
    if (tipoDePedido.value == 1) {
      envio.innerHTML = "";
    } else {
      envio.innerHTML = `
            <label class="label" for="direccion">Dirección</label>
            <input id="direccion" class="envioInput" type="text" placeholder="*Obligatorio" required>
            <label class="label" for="comentario">Comentario</label>
            <input id="comentario" class="envioInput" type="text" placeholder="Información adicional">
            `;
      direccion = document.getElementById("direccion");
      comentario = document.getElementById("comentario");
    }
  });

  enviar.onclick = function () {
    const espacio = "%20";
    const breakLine = "%0a";

    var nombre = nombreApellido.value.replace(" ", espacio);
    if (tipoDePedido.value == 0) {
      var direccionEnvio = direccion.value.replace(" ", espacio);
      var comentarioEnvio = comentario.value.replace(" ", espacio);
      var envioText = `Dirección:%20${direccionEnvio}${breakLine}Comentario:${espacio}${comentarioEnvio}`;
      total += 100;
      var subtotal = `${breakLine}*Subtotal${espacio}con${espacio}envío${espacio}incluído:${espacio}`;
    } else {
      var envioText = `Retiro${espacio}por${espacio}el${espacio}local.`;
      var subtotal = `${breakLine}*Subtotal:${espacio}`;
    }

    var mensaje = "";

    pedidoHamburguesas.map((hambur) => {
      mensaje += `-${hambur.quantity}${espacio}x${espacio}${
        hambur.nombre
      }${espacio}($${hambur.precio}):${espacio}$${
        hambur.quantity * hambur.precio
      }${breakLine}`;
    });

    pedidoPapas.map((papas) => {
      mensaje += `-${papas.quantity}${espacio}x${espacio}${
        papas.nombre
      }${espacio}($${papas.precio}):${espacio}$${
        papas.quantity * papas.precio
      }${breakLine}`;
    });

    location.href = `https://api.whatsapp.com/send?phone=+2241470235&text=Hola!%20Soy%20*${nombre.trim()}*%20y%20quiero%20hacer%20el%20siguiente%20pedido:%0a%0a${mensaje}${subtotal}$${total}*%0a%0a${envioText}`;
  };
};
app();
