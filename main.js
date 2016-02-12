$(document).ready(function(){


//NEED script for forceposition->last-> if sel = 0 else last child ... //NEED detect current place of element for select


function idTextChange() {
	var items = $('.info-row');
	for(var i=0; i<items.length; i++) {
		var item = items[i];
		var preposition = $(item).attr('data-preposition');
		var forceposition = $(item).attr('data-forceposition');
		if( forceposition != 0) {
			$(item).attr('data-position',forceposition);
		} else {
			$(item).attr('data-position',preposition);
		}
	}

	var $wrapper = $('.table-body');
		$wrapper.find('.info-row').sort(function (a, b) {
		    return -b.dataset.position - -a.dataset.position;
		})
		.prependTo( $wrapper );

	var items = $('.textId');
	for(var i=0; i<items.length; i++) {
		var item = items[i];
		$(item).text(i+1);
		$(item).attr('data-curposition',i+1);
	}
}

idTextChange();



//PROBLEM: it doesn't detect elems added with ajax
function insertPlaceSelect(){
	var select = $('#insert-place');

	var items = $('.select-option-after');
	for (var i=0; i<items.length; i++) {
		var item = items[i];
		$(item).remove();
	}

	var items = $('.textId');
	for (var i=0; i<items.length-1; i++) {
		var item = items[i];
		var option = parseInt($(item).text());
		select.append('<option class="select-option-after" data-selection="'+option+'" value="'+option+'">after '+option+'</option>');

	}
}
insertPlaceSelect();

function showHideSelectPlace(){
	if( $('.info-row').length == 0 ) {
		$('.insert-place-select').hide();
	} else {
		$('.insert-place-select').show();
	}
}
showHideSelectPlace();



//clear fields
$('.modal-clear').click(function(){
	var id = $(this).attr('data-id');
	var form_class = 'form-edit'+id;
	$('.'+form_class).find('#firstname').val('');
	$('.'+form_class).find('#lastname').val('');
	$('.'+form_class).find('#email').val('');

	var form_class2 = 'form-add';
	$('.'+form_class2).find('#firstname').val('');
	$('.'+form_class2).find('#lastname').val('');
	$('.'+form_class2).find('#email').val('');

});




//EDIT---------------------------- 
$(document).on('click', '.btn-edit', function(){

	$('.form-add-submit').hide();
	$('.form-edit-submit').show();

	var id = $(this).attr('data-id');
	$('.form-add').attr('data-id',id);
	$('.form-add').addClass('form-edit'+id);
	$('.modal-clear').attr('data-id',id);



//open modal window with existing rows
	var form_class = 'form-edit'+id;
	var rowclass = 'row'+id;

	var firstname = $('.'+rowclass).find('.td-firstname').text();
    var lastname = $('.'+rowclass).find('.td-lastname').text();
    var email = $('.'+rowclass).find('.td-email').text();

	$('.'+form_class).find('#firstname').val(firstname);
	$('.'+form_class).find('#lastname').val(lastname);
	$('.'+form_class).find('#email').val(email);

//select to current position
	var current = $(this).parent('td').parent('tr').find('.textId').attr('data-curposition');
	var items = $('.select-option-after');
	for (var i=0; i<items.length; i++) {
		var item = items[i];
		$(item).removeAttr('selected');
		if ($(item).attr('data-selection') == current) {
			$(item).attr('selected','selected');
		}
	}

});


function insertEdit(){
	var selPosition = $('#insert-place').val();
	var data;
	var sData = $('.form-add').serialize();


		if ( selPosition == 0 ) {
			var items = $('.textId');
			var last = items.length;
			console.log('LAST= '+last);
            for (var i = 0; i < items.length; i++) {
              	item = items[i];
              	if ( $(item).attr('data-curposition') == last ) {
              		var currentFirstId = parseInt($(item).parent('tr').attr('data-position'));
              		var position = currentFirstId + 0.5;
              		console.log('position= '+position);
              		break;
              	}
            }
		} else if ( selPosition == -1 ) {
			var items = $('.textId');
            for (var i = 0; i < items.length; i++) {
              	item = items[i];
              	if ( $(item).attr('data-curposition') == 1 ) {
              		var currentFirstId = $(item).parent('tr').attr('data-position');
              		var position = currentFirstId - 0.5;
              		console.log('position= '+position);
              		break;
              	}
            }
		} else if ( selPosition > 0 ) {
			var items = $('.textId');
            for (var i = 0; i < items.length; i++) {
              	item = items[i];
              	if ( $(item).attr('data-curposition') == selPosition ) {
              		var parrentId = $(item).parent('tr').attr('data-position');
              		var nextId = $(item).parent('tr').next().attr('data-position');

              		console.log('parrentId= '+parrentId);
              		console.log('nextId= '+nextId);
              		
              		function randomIntFromInterval(min1,max1) {
							var min = min1*1000;
						    var max = max1*1000;
								
						    x = (Math.floor(Math.random()*(max-min+1)+min))/1000;
						    return x;
						}

					var position = randomIntFromInterval(parrentId,nextId);
              		console.log('position= '+position);
              		break;
              	}
            }
		} 
		
		data = 'position='+position+'&'+sData;
		console.log(data);
		return data;

}



$('.form-edit-submit').click(function(e){
	e.preventDefault;
	var id = $('.form-add').attr('data-id');
	var rowclass = 'row'+id;

	var data1 = insertEdit();
	var data = 'id='+id+'&'+data1;
	console.log('EDITdata= '+data);

     $.ajax({
        data: data,
        type: "POST",       
        url: 'change.php',
        success: function(data){
              $('.modal-close').trigger('click');
              console.log(data);
              $('.'+rowclass).remove();
              $('.table-body').append(data);
              $('.'+rowclass).addClass('success-control');
              setTimeout(function(){
              	$('.'+rowclass).addClass('success-control-edit');
              },500);
              setTimeout(function(){
              	$('.'+rowclass).removeClass('success-control success-control-edit');
              },1000);


              idTextChange();
              showHideSelectPlace();
              insertPlaceSelect();
         }
  	}); //end of ajax

});






function insertAdd(){
	var selPosition = $('#insert-place').val();
	var data;
	var sData = $('.form-add').serialize();

	if( selPosition != 0 ) {

		//if selected first
		if ( selPosition == -1 ) {
			var items = $('.textId');
            for (var i = 0; i < items.length; i++) {
              	item = items[i];
              	if ( $(item).attr('data-curposition') == 1 ) {
              		var currentFirstId = $(item).parent('tr').attr('data-position');
              		var position = currentFirstId - 0.5;
              		console.log('position= '+position);
              		break;
              	}
            }
		} else if ( selPosition > 0 ) {
			var items = $('.textId');
            for (var i = 0; i < items.length; i++) {
              	item = items[i];
              	if ( $(item).attr('data-curposition') == selPosition ) {
              		var parrentId = $(item).parent('tr').attr('data-position');
              		var nextId = $(item).parent('tr').next().attr('data-position');

              		console.log('parrentId= '+parrentId);
              		console.log('nextId= '+nextId);
              		
              		function randomIntFromInterval(min1,max1) {
							var min = min1*1000;
						    var max = max1*1000;
								
						    x = (Math.floor(Math.random()*(max-min+1)+min))/1000;
						    return x;
						}

					var position = randomIntFromInterval(parrentId,nextId);
              		console.log('position= '+position);
              		break;
              	}
            }
		} 
		
		data = 'position='+position+'&'+sData;
		console.log(data);
		return data;
	} else {
		position = 0;
		data = 'position='+position+'&'+sData;
		console.log(data);
		return data;
	}
}


//ADD----------------------------
$('.button-add').click(function(){
	$('#firstname').val('');
	$('#lastname').val('');
	$('#email').val('');

	$('.form-add-submit').show();
	$('.form-edit-submit').hide();

	var items = $('.select-option-after');
	for (var i=0; i<items.length; i++) {
		var item = items[i];
		$(item).removeAttr('selected');
	}
});

$('.form-add-submit').click(function(e){
	e.preventDefault;

		var data = insertAdd();
	

	//var rowclass = 'row'+id;

     $.ajax({
        data: data,
        type: "POST",       
        url: 'add.php',
        success: function(data){
              $('.modal-close').trigger('click');
              console.log(data);
              $('.table-body').append(data);
              var highest = 0;
				$(".info-row").each(function() {
				    var id = $(this).attr('id');
				    if(id > highest) {
				        highest = id;
				    }
				});
				$('#'+highest).addClass('success-control');
              setTimeout(function(){
              	$('#'+highest).addClass('success-control-edit');
              },500);
              setTimeout(function(){
              	$('#'+highest).removeClass('success-control success-control-edit');
              },1000);
              idTextChange();
              showHideSelectPlace();
              insertPlaceSelect();
         }
  	}); //end of ajax
});







//REMOVE----------------------------

$(document).on('click', '.btn-remove', function(){
	var id = $(this).attr('data-idn');
	var data = 'id='+id;
	var toremove = $(this).parent().parent();


	$.ajax({
        data: data,
        type: "POST",       
        url: 'remove.php',
        success: function(data){
              console.log(data);

              if ( data === '1' ) {
              	toremove.addClass('danger').fadeOut(400);
              	setTimeout(function(){toremove.remove();},400);
              } else {
              	alert('smth went wrong');
              }
				showHideSelectPlace();
				insertPlaceSelect();


         }
  	}); //end of ajax



});









//CLOCKS
var defaults = {}
  , one_second = 1000
  , one_minute = one_second * 60
  , one_hour = one_minute * 60
  , one_day = one_hour * 24
  , startDate = new Date()
  , face = document.getElementById('lazy');

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
var requestAnimationFrame = (function() {
  return window.requestAnimationFrame       || 
         window.webkitRequestAnimationFrame || 
         window.mozRequestAnimationFrame    || 
         window.oRequestAnimationFrame      || 
         window.msRequestAnimationFrame     || 
         function( callback ){
           window.setTimeout(callback, 1000 / 60);
         };
}());

tick();

function tick() {

  var now = new Date()
    , elapsed = now - startDate
    , parts = [];

  parts[0] = '' + Math.floor( elapsed / one_hour );
  parts[1] = '' + Math.floor( (elapsed % one_hour) / one_minute );
  parts[2] = '' + Math.floor( ( (elapsed % one_hour) % one_minute ) / one_second );

  parts[0] = (parts[0].length == 1) ? '0' + parts[0] : parts[0];
  parts[1] = (parts[1].length == 1) ? '0' + parts[1] : parts[1];
  parts[2] = (parts[2].length == 1) ? '0' + parts[2] : parts[2];

  face.innerText = parts.join(':');
  
  requestAnimationFrame(tick);
  
}
});