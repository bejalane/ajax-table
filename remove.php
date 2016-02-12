<?php


$idn = $_POST['id'];


// Connect to database

$con=mysqli_connect("localhost","root","","table");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }


$sql="DELETE FROM details WHERE id='$idn'";

if ($con->query($sql) === TRUE) {
    echo 1;
} else {
    echo "Error: " . $sql . "<br>" . $con->error;
}

mysqli_close($con);


?>