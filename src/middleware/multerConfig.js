const multer = require('multer');
const path = require('path');
const fs = require('fs');

const dir = 'uploads'

const upload = multer({ dest: dir });

// Función para eliminar un archivo
async function deleteFile(nombreArchivo) {
    const fileRoute = path.join(dir, nombreArchivo);
  
    fs.unlink(fileRoute, (error) => {
      if (error) {
        console.error('Error al eliminar el archivo:', error);
      } else {
        console.log('Archivo eliminado correctamente');
      }
    });
  }

module.exports = { upload, deleteFile }