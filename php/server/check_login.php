<?php

  require('libreria.php');

  $con = new ConectorBD('localhost','LoginCalendario','Hola1234');
  $response['conexion'] = $con->initConexion('calendario_bd');

  if ($response['conexion']=='OK') {

    $resultado_consulta = $con->consultar(['usuarios'],
    ['usuario', 'contrasena'], 'WHERE usuario="'.$_POST['username'].'"');

    if ($resultado_consulta->num_rows != 0) {
      $fila = $resultado_consulta->fetch_assoc();
      if (password_verify($_POST['password'], $fila['contrasena'])) {
        $response['msg'] = 'OK';
        session_start();
        $_SESSION['username']=$fila['usuario'];
      }else $response['msg'] = 'Contraseña Invalida';
    }else $response['msg'] = 'Usuario no existe';
  }else $response['msg']= "Ocurrio un problema al conectar con el servidor de base de datos";

  echo json_encode($response);

  $con->cerrarConexion();

 ?>
