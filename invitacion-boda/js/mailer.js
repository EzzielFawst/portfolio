const form = document.getElementById("rsvpForm");

form.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("rsvpFormName").value,
    number = document.getElementById("rsvpFormNumber").value,
    events = document.getElementById("rsvpFormEvents").value,
    quantity = document.getElementById("rsvpFormQuantity").value,
    mailBody = document.getElementById("rsvpFormMessage").value;

  var params = {
    name,
    number,
    quantity,
    events,
    mailBody,
  };

  emailjs.send("service_f95vqrh", "template_htjya3e", params).then((res) => {
    if (res.status == 200) {
      //alert("Mensaje enviado!")
      Swal.fire({
        icon: 'success',
        title: 'Mensaje enviado',
        showConfirmButton: true
      })
      document.getElementById("rsvpFormName").value = "";
      document.getElementById("rsvpFormNumber").value = "";
      document.getElementById("rsvpFormEvents").value = "";
      document.getElementById("rsvpFormQuantity").value = "";
      document.getElementById("rsvpFormMessage").value = "";
    } else {
      //alert('Error, intente nuevamente.')
      Swal.fire({
        icon: 'error',
        title: 'Error, intente nuevamente.',
        showConfirmButton: true
      })
    }
  });
});
