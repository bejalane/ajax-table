<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Table</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
	<link rel="stylesheet" href="style.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
	<script src="main.js"></script>
</head>
<body>

<div class="container">

	<div style="display:none;">this is just for git
		<p>This is new change</p>
	</div>


    	<h1>MySQL Ajax Table</h1>      
    	<p>My small portfolio application. Wrote on HTML/PHP/MySQL/jQuery AJAX/Bootstrap. </p>


  	<div class="face">
    	<h2>Session time</h2>
    	<p id="lazy">00:00:00</p>  
  	</div>

	<div class="row">
		<div class="col-lg-12">
			<div class="table-wrapper">
				<table class="table">
				    <thead>
				      <tr>
				      	<th>id</th>
				        <th>Firstname</th>
				        <th>Lastname</th>
				        <th>Email</th>
				        <th>Action</th>
				        
				      </tr>
				    </thead>
				    <tbody class="table-body">
				    	<!--include query file loop-->
				        <?php include 'query.php';?>
				        <tr>
				        	<td></td>
				        	<td></td>
				        	<td></td>
				        	<td></td>
				        	<td>
				        		<button type="button" class="btn btn-default button-add" data-toggle="modal" data-target="#myModal2">
					        	  <span class="glyphicon glyphicon-plus"></span>
					        	</button>
					        </td>
				        </tr>
				    </tbody>
				  </table>
			</div>
		</div>
	</div>
</div>






<!-- Modal -->
<div id="myModal2" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Add row</h4>
      </div>

      <div class="modal-body">

		<button type="button" class="btn btn-default modal-clear">Clear fields</button>
		<br>
		<br>
		
		
			<div class="form-group insert-place-select">
			  <label for="insert-place">Insertion place:</label>
				<select class="form-control" id="insert-place" name="selposition">
					<option value="0">last</option>
					<option value="-1">first</option>
				</select>
			</div>


		<form role="form" class="form-add">

			<div class="form-group">
			  <label for="firstname">First Name:</label>
			  <input type="text" class="form-control" id="firstname" name="firstname">
			</div>
			<div class="form-group">
			  <label for="lastname">Last Name:</label>
			  <input type="text" class="form-control" id="lastname" name="lastname">
			</div>
			<div class="form-group">
			  <label for="email">Email:</label>
			  <input type="text" class="form-control" id="email" name="email">
			</div>
			<div class="form-group">        
	   		  <div class="">
	   		    <button type="button" class="btn btn-default form-add-submit">Add</button>
	   		  </div>
	   		</div>
	   		<div class="form-group">        
	   		  <div class="">
	   		    <button type="button" class="btn btn-default form-edit-submit">Edit</button>
	   		  </div>
	   		</div>
	   	</form>

      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-default modal-close" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
</body>
</html>