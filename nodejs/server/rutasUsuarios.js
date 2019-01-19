const RouterUsuarios = require('express').Router();
const Usuario = require('./modelUsuario.js');
const NewUser = require('./datos.js');
//let ObjectId = require('mongoose').Types.ObjectId;

//crear si no existe un usuario
RouterUsuarios.post('/newUsers', function(req, res) {
  Usuario.find({user: req.body.user}).count({}, function(err, count) {
    console.log(count)
    if(count>0){
        res.send("OK")
    }else{
      NewUser.CrearUsuarioAdmin((result) => {
        res.send(result);
      })
    }
  })

})


//validar un usuario
RouterUsuarios.post('/login', function(req, res) {
  let sess = req.session;

  Usuario.find({user: req.body.user}).count(function(err, count){
    console.log(count);
    if (err) {
      res.status(500)
      res.json(err)
    }
    if(count>0){
      Usuario.findOne({user: req.body.user}).exec(function(err, doc){
        if(doc.pass == req.body.pass){
          sess.user = req.body.user;
          res.send("Validado");
        }else res.send("Contraseña invalida")
      })
    }else res.send("Usuario invalido")

  });
})

//cerrar sesion de usuario
RouterUsuarios.post('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
      res.json(err)
    } else {
      req.session = null
      res.send('logout')
      res.end()
    }
  });

})

module.exports = RouterUsuarios
