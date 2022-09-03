window.addEventListener( 'load', () => {  

    const form = document.querySelector("#add-new-form");
    const input = document.querySelector("#add-new-text");
    const clearAll = document.querySelector(".clear-all");
    list = document.querySelector("#tasks");
    tasks = JSON.parse( localStorage.getItem( "jsm-todo-list" ) ) || [];

    form.addEventListener( 'submit', (e) => {
        e.preventDefault();

        const inputValue = input.value;

        if( !inputValue ) {
            alert("Please fill out the task");
            return;
        }

        const task = {
            content: inputValue,
            done: false,
            createdAt: new Date().getTime()
        };

        tasks.push(task);
        localStorage.setItem( "jsm-todo-list", JSON.stringify( tasks ) );

        buildList();
        input.value = "";

    } );

    clearAll.addEventListener( 'click', () => {
        if( confirm( "Warning! Do you want to clear entire task list?" ) ) {
            localStorage.removeItem("jsm-todo-list");
            location.reload();
        }
    } );

    buildList();

} );

function createList( element ) {

    // task container
    const content = document.createElement('div');
    content.classList.add('content');

    // container text
    const contentText = document.createElement('div');
    contentText.classList.add('content__text');

    const chkBox = document.createElement("input");
    chkBox.type = "checkbox";
    chkBox.classList.add('content__text__chkbox');
    chkBox.checked = element.done;

    const taskInput = document.createElement('input');
    taskInput.type='text';
    taskInput.classList.add('content__text__text');
    taskInput.value = element.content;
    taskInput.title = "Create at: " + new Date(element.createdAt);
    taskInput.setAttribute('readonly', 'readonly');

    // append container text children
    contentText.appendChild(chkBox);
    contentText.appendChild(taskInput);

    // create container action
    const contentAction = document.createElement('div');
    contentAction.classList.add('content__action');

    const editBtn = document.createElement('input');
    editBtn.type='button';
    editBtn.classList.add('content__action__edit');
    editBtn.value = 'edit';

    const deleteBtn = document.createElement('input');
    deleteBtn.type='button';
    deleteBtn.classList.add('content__action__delete');
    deleteBtn.value = 'delete';

    // append container action children
    contentAction.appendChild(editBtn);
    contentAction.appendChild(deleteBtn);

    // append task container children
    content.appendChild(contentText);
    content.appendChild(contentAction);

    list.appendChild(content);

    editBtn.addEventListener( 'click', e => {
        if( e.target.value.toLowerCase() == "edit" ) {
            taskInput.removeAttribute("readonly");
            taskInput.focus();
            e.target.value = "save";
        } else {
            element.content = taskInput.value;
            localStorage.setItem( "jsm-todo-list", JSON.stringify( tasks ) );
            buildList();
            taskInput.setAttribute( "readonly", "readonly" );
            e.target.value = "edit";
        }
    } );

    deleteBtn.addEventListener( 'click', e => {
        if( confirm( "Do you really want to delete this task?" ) ) {
            tasks.pop(element);
            localStorage.setItem( "jsm-todo-list", JSON.stringify( tasks ) );
            buildList();
        }
    } );

    chkBox.addEventListener( 'change', () => {
        if( element.done ) {
            element.done = false;
        } else {
            element.done = true;
        }
        localStorage.setItem( "jsm-todo-list", JSON.stringify( tasks ) );
        buildList();
    } );

}

function buildList() {
    list.innerHTML = "";
    tasks.forEach(element => {
        createList( element );
    });
}
