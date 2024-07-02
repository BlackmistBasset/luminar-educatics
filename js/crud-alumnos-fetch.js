const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function showAlumnos() {
    const alumnos = await fetchData(BASEURL + '/api/alumnos/', 'GET');
    const tableAlumnos = document.querySelector('#list-table-alumnos tbody');
    tableAlumnos.innerHTML = '';
    alumnos.forEach((alumno, index) => {
      const tr = `
        <tr>
          <td>${alumno.nombre}</td>
          <td>${alumno.apellido}</td>
          <td>${alumno.email}</td>
          <td>
            <img src="${alumno.foto}" width="30%">
          </td>
          <td>
            <button class="btn-cac" onclick="updateAlumno(${alumno.id})">
              <i class="fa fa-pencil"></i>
            </button>
            <button class="btn-cac" onclick="deleteAlumno(${alumno.id})">
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      `;
      tableAlumnos.insertAdjacentHTML("beforeend", tr);
    });
  }
  
  async function saveAlumno() {
    const idAlumno = document.querySelector('#id-alumno').value;
    const nombre = document.querySelector('#nombre').value;
    const apellido = document.querySelector('#apellido').value;
    const email = document.querySelector('#email').value;
    const foto = document.querySelector('#foto-form').value;
  
    if (!nombre ||!apellido ||!email ||!foto) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor completa todos los campos.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
      return;
    }
  
    const alumnoData = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      foto: foto,
    };
  
    let result = null;
    if (idAlumno!== "") {
      result = await fetchData(`${BASEURL}/api/alumnos/${idAlumno}`, 'PUT', alumnoData);
    } else {
      result = await fetchData(`${BASEURL}/api/alumnos/`, 'POST', alumnoData);
    }
  
    const formAlumno = document.querySelector('#form-alumno');
    formAlumno.reset();
    Swal.fire({
      title: 'Exito!',
      text: result.message,
      icon: 'uccess',
      confirmButtonText: 'Cerrar'
    });
    showAlumnos();
  }
  
  async function deleteAlumno(id) {
    Swal.fire({
      title: "Esta seguro de eliminar el alumno?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetchData(`${BASEURL}/api/alumnos/${id}`, 'DELETE');
        showAlumnos();
        Swal.fire(response.message, "", "success");
      }
    });
  }
  
  async function updateAlumno(id) {
    const response = await fetchData(`${BASEURL}/api/alumnos/${id}`, 'GET');
    const idAlumno = document.querySelector('#id-alumno');
    const nombre = document.querySelector('#nombre');
    const apellido = document.querySelector('#apellido');
    const email = document.querySelector('#email');
    const foto = document.querySelector('#foto-form');
  
    idAlumno.value = response.id;
    nombre.value = response.nombre;
    apellido.value = response.apellido;
    email.value = response.email;
    foto.value = response.foto;
  }