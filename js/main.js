if (document.body.classList.contains("home")) {
  const nameInput = document.getElementById("nombre");
  const lastNameInput = document.getElementById("apellido");
  const mailInput = document.getElementById("email");
  const telInput = document.getElementById("telefono");
  const messageInput = document.getElementById("mensaje");

  const contactForm = document.getElementById("contact_form");

  const validarFormulario = (...inputs) => {
    let isValid = true;
    for (let input of inputs) {
      if (input.value === "") {
        alert("Por favor complete todos los campos");
        isValid = false;
        break;
      }
    }
    if (isValid) {
      alert("Su mensaje fue enviado satisfactoriamente");
      contactForm.submit();
    }
  };

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    validarFormulario(
      nameInput,
      lastNameInput,
      mailInput,
      telInput,
      messageInput
    );
  });
}
