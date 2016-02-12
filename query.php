<?php
$con=mysqli_connect("localhost","root","","table");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }




$sql="SELECT * FROM details ORDER BY id";
$result=mysqli_query($con,$sql);

// Numeric array
while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){

	// Include loop file
	include 'loop.php';
}

// Free result set
mysqli_free_result($result);

mysqli_close($con);
?>