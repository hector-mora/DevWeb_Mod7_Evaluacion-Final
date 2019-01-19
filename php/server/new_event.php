<?php

  require('libreria.php');

  session_start();

  if (isset($_SESSION['username'])) {
    $con = new ConectorBD('localhost','userCalendario','Hola1234');

    if ($con->initConexion('calendario_bd')=='OK') {
      //obtengo datos para insertar el evento
      $evento['titulo'] = "'".$_POST['titulo']."'";
      $evento['fecha_inicio'] = "'".$_POST['start_date']."'";
      $evento['hora_inicio'] = "'".$_POST['start_hour']."'";
      $evento['fecha_fin'] = "'".$_POST['end_date']."'";
      $evento['hora_fin'] = "'".$_POST['end_hour']."'";
      $evento['dia_completo'] = $_POST['allDay'];
      //insertar el evento
      if ($con->insertData('eventos', $evento)) {
        $response['msg']= 'OK';
      }else $response['msg']= 'No se pudo realizar la inserción de los datos';

      //si el evento se inserto correctamente
      if($response['msg']=='OK'){
        //obtengo el nuevo id de evento
        $resultado_consulta = $con->consultar(['eventos'],['MAX(id) as id']);
        $fila = $resultado_consulta->fetch_assoc();
        //agrego los datos para insertar en la tabla evento_usuario
        $data['fk_eventos'] = $fila['id'];
        $data['fk_usuarios'] = "'".$_SESSION['username']."'";

        //inserto datos en evento_usuario
        if ($con->insertData('evento_usuario', $data)) {
          $response['msg']= 'OK';
        }else $response['msg']= 'No se pudo realizar la inserción de los datos';
      }

    }else $response['msg']= 'No se pudo conectar a la base de datos';

  }else $response['msg']= 'No se ha iniciado una sesión';


  echo json_encode($response);

  $con->cerrarConexion();

 ?>
