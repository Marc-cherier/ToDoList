// TODO list - 07 - 2022

const app = {

    // labels des boutons
    buttonTasks: [
        "À faire",
        "En cours",
        "Terminé",
        "X"
    ],

    // liste de la tâche / index du bouton
    tasks: [
        ["manger", 1],
        ["dormir", 0],
        ["chanter", 2],
    ],

    init: function () {

        // affichage des tâches
        app.showTasks();

        // validation d'une nouvelle tâche
        const addTaskClick = document.querySelector('.btn-info');
        addTaskClick.addEventListener('click', app.handleTaskList);

        // écouteurs des bouttons
        var toDoTaskClick = document.querySelectorAll('.btn');
        toDoTaskClick.forEach(app.handleClick);

        // écouteurs des bouttons de suppression
        var taskClickDelete = document.querySelectorAll('.btn-danger');
        taskClickDelete.forEach(app.handleClickDelete);

        // écouteurs sur la désignation des tâches
        var taskClickDesignation = document.querySelectorAll('.task');
        taskClickDesignation.forEach(app.handleClickDesignation);

    },

    handleClickDesignation: function (selectedTaskDesignation) {

        selectedTaskDesignation.addEventListener('click', app.handleDesignation)

    },

    handleClickDelete: function (selectedButtonDelete) {

        selectedButtonDelete.addEventListener('click', app.handleTaskDelete);
    },

    handleClick: function (selectedButton) {

        // écouteurs des bouttons
        selectedButton.addEventListener('click', app.handleTaskListToDo);
    },

    handleTaskList: function (e) {

        // récupération de la nouvelle tâche à insérer
        e.preventDefault();
        let task = document.getElementById('myNewTaskInput');
        let taskValue = document.getElementById('myNewTaskInput').value;

        if (taskValue) {

            // Ajout de la nouvelle tâche 'à faire' au tableau des tâches
            var myTask = [taskValue, 0];
            app.tasks.push(myTask);
            task.value = "";

            // Affichage des tâches
            app.init();
        }
    },

    showTasks: function () {

        // conteneur de rendu
        const tasksList = document.querySelector('.task-list');

        // réinitailisation du contenu
        tasksList.innerHTML = "";

        // récupération des tâches
        for (let i = 0; i < app.tasks.length; i++) {

            // progress bar
            let progress = 0;

            // conteneur des tâches
            const newTaskBlock = document.createElement('div');
            newTaskBlock.classList.add('row', 'list-task', 'mt-4');
            tasksList.appendChild(newTaskBlock);

            // nom de la tâche
            const newTaskName = document.createElement('div');
            newTaskName.classList.add('col-6');
            newTaskBlock.appendChild(newTaskName);

            const newTaskNameElement = document.createElement('p');
            newTaskNameElement.classList.add('task');
            newTaskNameElement.id = i;
            newTaskNameElement.innerText = app.tasks[i][0];
            newTaskName.appendChild(newTaskNameElement);

            // conteneur des boutons
            const blockButton = document.createElement('div');
            blockButton.classList.add('col-6', 'buttonBox');
            blockButton.id = i;
            newTaskBlock.appendChild(blockButton);

            // boutton 'à faire'
            const buttonTodo = document.createElement('button');
            buttonTodo.type = "button";
            buttonTodo.classList.add('btn');

            // bouton sélectionné ?
            if (app.tasks[i][1] === 0) {
                buttonTodo.classList.add('btn-primary');

            } else {

                buttonTodo.classList.add('btn-light');

            }

            buttonTodo.innerText = app.buttonTasks[0];

            // boutton 'en cours'
            const buttonProgress = document.createElement('button');
            buttonProgress.type = "button";
            buttonProgress.classList.add('btn');

            // bouton sélectionné ?
            if (app.tasks[i][1] === 1) {

                buttonProgress.classList.add('btn-warning');
                progress = 50;

            } else {

                buttonProgress.classList.add('btn-light');

            }

            buttonProgress.innerText = app.buttonTasks[1];

            // boutton 'terminé'
            const buttonFinish = document.createElement('button');
            buttonFinish.type = "button";
            buttonFinish.classList.add('btn');

            // bouton sélectionné ?
            if (app.tasks[i][1] === 2) {

                buttonFinish.classList.add('btn-success');
                progress = 100;

            } else {

                buttonFinish.classList.add('btn-light');

            }

            buttonFinish.innerText = app.buttonTasks[2];

            // bouton delete
            const buttonDelete = document.createElement('button');
            buttonDelete.classList.add('btn', 'btn-danger');
            buttonDelete.id = i;
            buttonDelete.innerText = app.buttonTasks[3];

            // affichage des bouttons
            blockButton.appendChild(buttonTodo);
            blockButton.appendChild(buttonProgress);
            blockButton.appendChild(buttonFinish);
            blockButton.appendChild(buttonDelete);

            // Séparateur
            const greyDraw = document.createElement('hr');
            tasksList.appendChild(greyDraw);

            const progressTask = document.createElement('div');
            progressTask.classList.add('progress', 'mt-3');
            let progressBar = '<div class="progress-bar progress-bar-striped bg-info" role="progressbar" style="width: ' + progress + '%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>';
            progressTask.innerHTML = progressBar;
            newTaskBlock.appendChild(progressTask);

        }
    },

    handleTaskListToDo: function (selectTask) {

        // récupère l'id de la tâche
        let taskChange = selectTask.currentTarget.parentNode.id;

        // recupère le contenu du bouton
        const myClass = selectTask.currentTarget.innerText;

        // affecte la valeur correspondante à l'action 0: à faire, 1: En cours, 2: terminé
        switch (myClass) {
            case app.buttonTasks[0]:
                target = 0;
                break;
            case app.buttonTasks[1]:
                target = 1;
                break;
            case app.buttonTasks[2]:
                target = 2;
                break;
        }

        // mise à jour du tableau avec la liste des tâches.
        if (app.tasks[taskChange] != undefined) {

            app.tasks[taskChange][1] = target;

        }
        // affichage du tableau
        app.init();
    },

    handleTaskDelete: function (deleteTask) {

        if (window.confirm("Voulez-vous réélement supprimer cette tâche ?")) {

            app.tasks.splice(deleteTask.currentTarget.id, 1);

            // affichage du tableau
            app.init();

        } else {

            return;

        }
    },

    handleDesignation: function (designation) {

        // on efface la string 'tâche'
        const designationName = designation.currentTarget.innerText;
        designation.currentTarget.innerText = "";

        // création de l'input
        const taskModify = document.createElement('input');
        taskModify.placeholder = designationName;
        taskModify.value = designationName;
        taskModify.classList.add('modifyTaskText');
        designation.currentTarget.prepend(taskModify);

        let inputModify = document.querySelector('.modifyTaskText');

        // on met le focus
        inputModify.focus();

        // on surveille le hors-focus
        inputModify.addEventListener('blur', app.outTaskFocus);
        inputModify.addEventListener('keydown', app.outTaskEnter)

    },

    outTaskFocus: function (taskInput) {

        let inputModify = taskInput.currentTarget;

        // récupère le contenu de l'input
        const contentInput = inputModify.value

        // récupère l'id de la tâche sélectionnée
        const taskId = inputModify.parentNode.id;

        // modifie la tâche
        if (contentInput) {

            // affichage la nouvelle valeur
            taskInput.currentTarget.parentNode.innerText = contentInput;

            // mise à jour du tableau
            app.tasks[taskId][0] = contentInput;


        } else {

            // aucune modification, affichage de la valeur initiale
            taskInput.currentTarget.parentNode.innerText = app.tasks[taskId][0];

        }

        console.log(taskInput.currentTarget.parentNode);
    },

    outTaskEnter: function (taskInput) {

        if (taskInput.keyCode === 13) {
            let inputModify = taskInput.currentTarget;

            // récupère le contenu de l'input
            const contentInput = inputModify.value

            // récupère l'id de la tâche sélectionnée
            const taskId = inputModify.parentNode.id;

            // modifie la tâche
            if (contentInput) {

                // affichage la nouvelle valeur
                taskInput.currentTarget.parentNode.innerText = contentInput;

                // mise à jour du tableau
                app.tasks[taskId][0] = contentInput;

            } else {

                // aucune modification, affichage de la valeur initiale
                taskInput.currentTarget.parentNode.innerText = app.tasks[taskId][0];

            }

        }
    }
}

document.addEventListener('DOMContentLoaded', app.init);