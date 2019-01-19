const mongoose = require('mongoose'),
      Usuario = require('./modelUsuario.js');

module.exports.CrearUsuarioAdmin = function(respuesta){
  let admin = new Usuario({
    user: 'admin',
    pass: 'admin',
    nombre: 'Administrador'
  })

  admin.save(function(error) {
    if (error) {
      console.log(error);
      respuesta("Erro al insertar");
    }
    respuesta("OK");
  })
}
