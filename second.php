<?php
$con=mysqli_connect("localhost","root","","table");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$sql="SELECT * FROM details ORDER BY lastname";
$result=mysqli_query($con,$sql);

// Numeric array
while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){
	echo '<td>'.$row["firstname"].'</td><td>'.$row["lastname"].'</td><td>'.$row["email"].'</td>';
}

// Free result set
mysqli_free_result($result);

mysqli_close($con);
?>