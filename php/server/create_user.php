<?php

  require('libreria.php');

  $datos['usuario'] = "'xmora@mail.com'";
  $datos['nombre'] = "'Leiber Mora Campos'";
  $datos['contrasena'] = "'".password_hash('Hola123', PASSWORD_DEFAULT)."'";
  $datos['fecha_nacimiento'] = "'1956-05-24'";

  $con = new ConectorBD('localhost','LoginCalendario','Hola1234');
  $response['conexion'] = $con->initConexion('calendario_bd');

  if ($response['conexion']=='OK') {
    if ($con->insertData('usuarios', $datos)) {
      $response['msg']="exito en la insercion";
    }else $response['msg']= "Hubo un error y el usuario no pudo crearse";

  }else $response['msg']= "No se pudo conectar a la base de datos";


  echo json_encode($response);

  $con->cerrarConexion();

 ?>
