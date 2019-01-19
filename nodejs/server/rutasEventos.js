const RouterEventos = require('express').Router();
const Usuario = require('./modelUsuario.js');
const Evento = require('./modelEventos.js');
let ObjectId = require('mongoose').Types.ObjectId;

//Obtener todos los eventos
RouterEventos.get('/all', function(req, res) {
  req.session.reload(function(err) {
      if(req.session.user){
        if(err){
          res.send('logout');
        }else{
          Usuario.findOne({user: req.session.user}).exec({}, function(error, doc){
            if(error){
              res.send('logout');
            }else{
              Evento.find({user: doc._id},{_id:true,title:true,start:true,end:true,allDay:true}).exec(function(err, docs) {
                if (err) {
                    res.sendStatus(500)
                    res.json(err)
                }
                res.json(docs)
              })
            }
          })
        }
      }else{
        res.send('logout'); //Devolver mensaje "logout"
        res.end()
      }
    })

})


// Agregar un evento
RouterEventos.post('/new', function(req, res) {
  req.session.reload(function(err) {
    if(err){
      console.log(err);
      res.json("logout");
    }else{
      Usuario.findOne({user:req.session.user}).exec({}, function(error, doc){
        let evento = new Evento({
          title: req.body.title,
          start: req.body.start,
          end: req.body.end,
          allDay: req.body.allDay,
          user: doc._id
        })
        console.log(evento);
        evento.save(function(error) {
          if (error) {
            console.log(error)
            res.sendStatus(500)
            res.json(error)
          }
          res.sendStatus("OK")
        })
      })
    }
  })
})

// Eliminar un evento por su id
RouterEventos.post('/delete/:id', function(req, res) {
  let id = req.params.id
  console.log(req.params);

  req.session.reload(function(err) {
    if(err){
      console.log(err)
      res.send("logout")
    }else{
      Evento.deleteOne({_id: id}, function(error) {
          if(error) {
            console.log(error)
            res.sendStatus(500)
            res.json(error)
            res.send("No se pudo realizar la eliminacion de los datos")
          }
          res.send("Se ha eliminado el evento exitosamente")
      })
    }
  })
})

//Actualizar evento
RouterEventos.post('/update/:_id&:start&:end', function(req, res) {
  req.session.reload(function(err) {
    if(err){
      console.log(err)
      res.send("logout")
    }else{
      Evento.findOne({_id:req.params._id}).exec((error, result) => {
        let id = req.params._id,
            start = req.params.start,
            end = req.params.end

        if (error){
          res.send(error)
        }else{
          Evento.update({_id: id}, {start:start, end:end}, (error, result) => {
            if (error){
              res.send(error )
            }else{
              res.send("Evento ha sido actualizado")
            }
          })
        }
      })
    }
  })
})


module.exports = RouterEventos
