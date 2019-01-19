<?php

require('libreria.php');

session_start();

if (isset($_SESSION['username'])) {
  $con = new ConectorBD('localhost','userCalendario','Hola1234');

  if ($con->initConexion('calendario_bd')=='OK') {
    $resultado_consulta = $con->consultar(['evento_usuario eu', 'eventos e'],
    ['e.id',
    'e.titulo as title',
    'case e.dia_completo when 1 then e.fecha_inicio else CONCAT(convert(e.fecha_inicio, CHAR),"T",e.hora_inicio) end as start',
    'case e.dia_completo when 1 then e.fecha_fin else CONCAT(convert(e.fecha_fin, CHAR),"T",e.hora_fin) end as end',
    'e.dia_completo as allDay'],
    'WHERE eu.fk_eventos = e.id AND eu.fk_usuarios="'.$_SESSION['username'].'"');

    $i=0;
    while ($fila = $resultado_consulta->fetch_assoc()) {
      $response['eventos'][$i]['id'] = $fila['id'];
      $response['eventos'][$i]['title'] = $fila['title'];
      $response['eventos'][$i]['start'] = $fila['start'];
      $response['eventos'][$i]['end'] = $fila['end'];
      if($fila['allDay']=="1"){
        $response['eventos'][$i]['allDay'] = true;
      }else $response['eventos'][$i]['allDay'] = false;
      $i++;
    }
    $response['msg'] = 'OK';


  }else $response['msg']= "Ocurrio un problema al conectar con el servidor de base de datos";

}else $response['msg']= 'No se ha iniciado una sesión';

echo json_encode($response);

$con->cerrarConexion();


 ?>
