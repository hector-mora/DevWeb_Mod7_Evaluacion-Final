<?php

  require('libreria.php');

  session_start();

  if (isset($_SESSION['username'])) {
    $con = new ConectorBD('localhost','userCalendario','Hola1234');

    if ($con->initConexion('calendario_bd')=='OK') {
      //obtengo datos para actualizar evento
      $evento['fecha_inicio'] = "'".$_POST['start_date']."'";
      $evento['hora_inicio'] = "'".$_POST['start_hour']."'";
      $evento['fecha_fin'] = "'".$_POST['end_date']."'";
      $evento['hora_fin'] = "'".$_POST['end_hour']."'";
      //Actualizar evento
      if ($con->actualizarRegistro('eventos', $evento,'id = "'.$_POST['id'].'"')) {
        $response['msg']= 'OK';
      }else $response['msg']= 'No se pudo realizar la inserción de los datos';

    }else $response['msg']= 'No se pudo conectar a la base de datos';

  }else $response['msg']= 'No se ha iniciado una sesión';


  echo json_encode($response);

  $con->cerrarConexion();

 ?>
