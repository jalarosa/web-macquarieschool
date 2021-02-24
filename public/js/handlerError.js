function loadMessage() {
  var status = window.location.search.substr(1);
  if (status) {
    if (status === "status=success") {
      alert("Gracias por contactarnos.") ;
    } else if (status === "status=fail"){
      alert("Hubo un error en el envio del mail. Por favor comuniquese telefonicamente.");
    }
  }
}