<?php

  require('libreria.php');

  session_start();

  if (isset($_SESSION['username'])) {
    $con = new ConectorBD('localhost','userCalendario','Hola1234');

    if ($con->initConexion('calendario_bd')=='OK') {

      //eliminar de evento_usuario
      if ($con->eliminarRegistro('evento_usuario', 'fk_eventos = "'.$_POST['id'].'" AND fk_usuarios = "'.$_SESSION['username'].'"')) {
        $response['msg']= 'OK';
      }else $response['msg']= 'No se pudo realizar la inserción de los datos';

      //si el evento_usuario se elimino correctamente
      if($response['msg']=='OK'){
        //eliminar de evento
        if ($con->eliminarRegistro('eventos', 'id = "'.$_POST['id'].'"')) {
          $response['msg']= 'OK';
        }else $response['msg']= 'No se pudo realizar la inserción de los datos';
      }

    }else $response['msg']= 'No se pudo conectar a la base de datos';

  }else $response['msg']= 'No se ha iniciado una sesión';


  echo json_encode($response);

  $con->cerrarConexion();

 ?>
