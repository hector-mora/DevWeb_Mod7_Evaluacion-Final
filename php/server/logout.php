<?php

  session_start();

  if (isset($_SESSION['username'])) {
    session_destroy();

    header('location: ../client/index.html');
  }


 ?>
