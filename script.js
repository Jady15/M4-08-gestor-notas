const fs = require('fs');

// Ruta del archivo de notas
const filePath = './notas.json';

/**
 * Agrega una nueva nota al archivo.
 * @param {string} titulo - El título de la nota.
 * @param {string} contenido - El contenido de la nota.
 */

function agregarNota(titulo, contenido) {
  let notas = [];
  if (fs.existsSync(filePath)) {
    // Leer las notas existentes
    const data = fs.readFileSync(filePath, {encoding:'utf8', flag:'r'});
    notas = JSON.parse(data);
  }

  const nuevaNota = { titulo, contenido };
  notas.push(nuevaNota);

  // Sobreescribir el archivo con las notas actualizadas
  fs.writeFileSync(filePath, JSON.stringify(notas, null, 2), function(err){
    if (err) throw err;
    console.log('Nota agregada con éxito.');
  });

}

/**
 * Lista todas las notas guardadas.
 */
function listarNotas() {
  if (fs.existsSync(filePath)) {
    // Leer el contenido del archivo.
    const data = fs.readFileSync(filePath, {encoding:'utf8', flag: 'r'});
    const notas = JSON.parse(data);

    console.log("LISTADO DE NOTAS");
    console.log(`---------------`);
    notas.forEach(nota => {
        console.log(`Título: ${nota.titulo}`);    
        console.log(`Contenido: ${nota.contenido}`);    
        console.log(`---------------`);    
    });

  } else {
    console.log('No hay notas guardadas.');
  }
}

/**
 * Elimina una nota por su título.
 * @param {string} titulo - El título de la nota a eliminar.
 */

function eliminarNota(titulo) {
  if (fs.existsSync(filePath)) {
    // Lee todas las notas.
    const data = fs.readFileSync(filePath, {encoding:'utf8', flag:'r'});
    let notas = JSON.parse(data);

    // Filtra las notas y elimina la que coincida con el título.
    const notasRestantes = notas.filter((nota) => nota.titulo !== titulo);

    // Sobrescribe el archivo con las notas actualizadas.
    fs.writeFileSync(filePath, JSON.stringify(notasRestantes, null, 2));

    console.log(`Nota con título "${titulo}" eliminada.`);
  } else {
    console.log('No hay notas para eliminar.');
  }
}

// Ejecución
agregarNota('Compras', 'Comprar leche y pan.');
agregarNota('Tareas', 'Realizar mi tarea de programación.');
agregarNota('Limpieza', 'Barrer y trapear la casa.');
agregarNota('Mascotas', 'Alimentar a mis perros antes de la noche.');
listarNotas();
eliminarNota('Compras');
