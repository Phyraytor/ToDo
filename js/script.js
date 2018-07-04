


$(document).ready(function(){
	if( localStorage.getItem('listOfTasks') )
	{
	 	$('#listOfTasks').html( localStorage.getItem('listOfTasks') );
	}

	toggleEmptyList();
	//Отправка формы
	$('#form-new-task').on('submit', function(e){

		e.preventDefault(); //Отключаем стандартное поведение кнопки (перезагрузку)

		let taskText = $('#addNewTask').val();
		 	$taskHolder = $('<li class="list-group-item d-flex justify-content-between task-item">')
         	$taskTitle = $('<span class = "task-title">').text(taskText);
        	$taskButtons = $('<div><button type="button" class="btn btn-light gray" data-action = "done-task"> <i class = "fas fa-check"></i> </button> <button type="button" class="btn btn-light gray" data-action = "delete-task"> <i class = "fas fa-times"></i> </button></div>');
        
        if(taskText === '') return;

        $taskHolder.append($taskTitle).append($taskButtons);
        $('#listOfTasks').prepend($taskHolder);

        $('#addNewTask').val('');
        showNatify('new');
        toggleEmptyList();
	});



	$('#listOfTasks').on('click', '[data-action="done-task"]', function(e){

		e.preventDefault();
		$(this).parents('.task-item').find('.task-title').toggleClass('task-title--done');
		showNatify('done');
	});


	$('#listOfTasks').on('click', '[data-action="delete-task"]', function(e){

		e.preventDefault();
		$(this).parents('.task-item').remove();
		showNatify('delete');
		toggleEmptyList();
	});

    function showNatify(type)
    {
    	let $notifyNew = $('<div class="alert alert-warning" role="alert"> Задача добавлена! </div>');

     		$notifyDone = $('<div class="alert alert-success" role="alert"> Задача выполнена! </div>');

    		$notifyDelete = $('<div class="alert alert-danger" role="alert"> Задача удалена! </div>');

    		$notifyError = $('<div class="alert alert-danger" role="alert"> Ошибка! </div>');

    	switch(type)
    	{
    		case 'new': 			
    			$notifyBlock = $notifyNew;
    			break;

     		case 'done':
     			$notifyBlock = $notifyDone;
    			break;

    		case 'delete':
    			$notifyBlock = $notifyDelete;
    			break;
    		default:
    			$notifyBlock = $notifyError;
    			break;
    	}

    	$('#notifyHolder .alert').fadeOut();
    	$notifyBlock.hide();
    	$('#notifyHolder').append($notifyBlock);
    	$notifyBlock.fadeIn();

    	//Пауза 1 сек
    	setTimeout(function(){
    		$notifyBlock.fadeOut();

   			setTimeout(function(){
   				$notifyBlock.remove();
   			}, 1500);
    				
   		}, 1500);
   		getCookie();
    }	


    function toggleEmptyList()
    {
    	if( $('#listOfTasks').children().length > 1)
    	{
    		$('#emptyList').hide();
    	} else {
    		$('#emptyList').show();	
    	}
    }

    function getCookie()
    {
    	let $listOfTasks = $('#listOfTasks').html();
    	localStorage.setItem('listOfTasks', $listOfTasks);
    }
});