const BASEURL = 'http://127.0.0.1:5000';

async function fetchData(url, method, data = null) {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : null,
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}

async function showAlumnos() {
  let alumnos = await fetchData(BASEURL + '/api/alumnos/', 'GET');
  const tableAlumnos = document.querySelector('#list-table-alumnos tbody');
  tableAlumnos.innerHTML = '';
  alumnos.forEach((alumno, index) => {
    let tr = `<tr>
                  <td>${alumno.nombre}</td>
                  <td>${alumno.apellido}</td>
                  <td>${alumno.email}</td>
                  <td><img src="${alumno.foto}" width="30%"></td>
                  <td>
                    <button class="btn-cac" onclick='updateAlumno(${alumno.id_alumno})'><i class="fa fa-pencil" ></button></i>
                    <button class="btn-cac" onclick='deleteAlumno(${alumno.id_alumno})'><i class="fa fa-trash" ></button></i>
                  </td>
                </tr>`;
    tableAlumnos.insertAdjacentHTML("beforeend", tr);
  });
}

async function saveAlumno() {
  const idAlumno = document.querySelector('#id-alumno').value;
  const nombre = document.querySelector('#nombre').value;
  const apellido = document.querySelector('#apellido').value;
  const email = document.querySelector('#email').value;
  const foto = document.querySelector('#foto').value;

  if (!nombre || !apellido || !email || !foto) {
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
  if (idAlumno !== "") {
    result = await fetchData(`${BASEURL}/api/alumnos/${idAlumno}`, 'PUT', alumnoData);
  } else {
    result = await fetchData(`${BASEURL}/api/alumnos/`, 'POST', alumnoData);
  }

  const formAlumno = document.querySelector('#form-alumno');
  formAlumno.reset();
  Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showAlumnos();
}

function deleteAlumno(id) {
  Swal.fire({
    title: "Esta seguro de eliminar el alumno?",
    showCancelButton: true,
    confirmButtonText: "Eliminar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      let response = await fetchData(`${BASEURL}/api/alumnos/${id}`, 'DELETE');
      showAlumnos();
      Swal.fire(response.message, "", "success");
    }
  });
}

async function updateAlumno(id) {
  let response = await fetchData(`${BASEURL}/api/alumnos/${id}`, 'GET');
  const idAlumno = document.querySelector('#id-alumno');
  const nombre = document.querySelector('#nombre');
  const apellido = document.querySelector('#apellido');
  const email = document.querySelector('#email');
  const foto = document.querySelector('#foto');

  idAlumno.value = response.id_alumno;
  nombre.value = response.nombre;
  apellido.value = response.apellido;
  email.value = response.email;
  foto.value = response.foto;
}

document.addEventListener('DOMContentLoaded', function() {
  const btnSaveAlumno = document.querySelector('#btn-save-alumno');
  btnSaveAlumno.addEventListener('click', saveAlumno);
  showAlumnos();
});