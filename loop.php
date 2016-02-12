<?php

echo '<tr id="'.$row["id"].'" data-forceposition="'.$row["position"].'" data-preposition="'.$row["id"].'" class="row'.$row["id"].' info-row">
	<td class="textId">'.$row["id"].'</td>
	<td class="td-firstname">'.$row["firstname"].'</td>
	<td class="td-lastname">'.$row["lastname"].'</td>
	<td class="td-email">'.$row["email"].'</td>
	<td>
		<button type="button" class="btn btn-default btn-edit" data-id="'.$row["id"].'" data-toggle="modal" data-target="#myModal2">
			<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
		</button>
		<button type="button" class="btn btn-default btn-remove" data-idn="'.$row["id"].'">
			<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
		</button>
	</td>
	<tr>';

?>