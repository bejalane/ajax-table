<?php

$id = $_POST['id'];
$position = $_POST['position'];
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$email = $_POST['email'];


// Connect to database

$con=mysqli_connect("localhost","root","","table");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$sql="UPDATE details SET firstname='$firstname', lastname='$lastname', email='$email', position='$position' WHERE id='$id'";

if ($con->query($sql) === TRUE) {

    $sql2="SELECT * FROM details WHERE id='$id'";
    $result=mysqli_query($con,$sql2);

      while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){
        // Include loop file
        include 'loop.php';
      }
} else {
    echo "Error: " . $sql . "<br>" . $con->error;
}

mysqli_close($con);


?>