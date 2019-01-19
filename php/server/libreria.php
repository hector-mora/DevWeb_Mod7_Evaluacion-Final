<?php

  class ConectorBD
  {
    private $host;
    private $user;
    private $password;
    private $conexion;

    function __construct($host, $user, $password){
      $this->host = $host;
      $this->user = $user;
      $this->password = $password;
    }

    function initConexion($nombre_db){
      $this->conexion = new mysqli($this->host, $this->user, $this->password, $nombre_db);
      if ($this->conexion->connect_error) {
        return "Error:" . $this->conexion->connect_error;
      }else {
        return "OK";
      }
    }

    function getConexion(){
      return $this->conexion;
    }

    function ejecutarQuery($query){
      return $this->conexion->query($query);
    }

    function cerrarConexion(){
      $this->conexion->close();
    }

    function insertData($tabla, $data){
      $sql = 'INSERT INTO '.$tabla.' (';
      $i = 1;
      foreach ($data as $key => $value) {
        $sql .= $key;
        if ($i<count($data)) {
          $sql .= ', ';
        }else $sql .= ')';
        $i++;
      }
      $sql .= ' VALUES (';
      $i = 1;
      foreach ($data as $key => $value) {
        $sql .= $value;
        if ($i<count($data)) {
          $sql .= ', ';
        }else $sql .= ');';
        $i++;
      }

      return $this->ejecutarQuery($sql);
      //echo $sql;

    }

    function consultar($tablas, $campos, $condicion = ""){
      $sql = "SELECT ";
      $i = 1;
      foreach ($campos as $key => $value) {
        $sql .= $value;
        if ($i<count($campos)) {
          $sql.=", ";
        }else $sql .=" FROM ";
        $i++;
      }

      $i = 1;
      foreach ($tablas as $key => $value) {
        $sql .= $value;
        if ($i<count($tablas)) {
          $sql.=", ";
        }else $sql .= " ";
        $i++;
      }

      if ($condicion == "") {
        $sql .= ";";
      }else {
        $sql .= $condicion.";";
      }

      return $this->ejecutarQuery($sql);
      //echo $sql;
    }

    function eliminarRegistro($tabla, $condicion){
      $sql = "DELETE FROM ".$tabla." WHERE ".$condicion.";";

      return $this->ejecutarQuery($sql);
      //echo $sql;
    }

    function actualizarRegistro($tabla, $data, $condicion){
      $sql = 'UPDATE '.$tabla.' SET ';
      $i=1;
      foreach ($data as $key => $value) {
        $sql .= $key.'='.$value;
        if ($i<count($data)) {
          $sql .= ', ';
        }else $sql .= ' WHERE '.$condicion.';';
        $i++;
      }

      return $this->ejecutarQuery($sql);
      //echo $sql;
    }


  }


 ?>
