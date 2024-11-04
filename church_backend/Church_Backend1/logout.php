<?php
session_start();
 

$_SESSION = array();
 

session_destroy();
 
// end the redirect
header("location: login.php");
exit;
?>