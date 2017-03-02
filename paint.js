/* Asociamos función canvasApp a carga de página */
window.addEventListener('load', canvasApp, false);

function setSize(size) {
    document.getElementById("size_pincel").value = size;
    document.getElementById("size").innerHTML = size;
}


function canvasApp() {
    /* Inicializamos el canvas */
    var theCanvas = document.getElementById('canvas');
    var context = theCanvas.getContext('2d');

    /* Inicializamos el valor del color y tamaño del pincel*/
    var colorChosen = document.getElementById("color_chosen");
    var size = 7;
    setSize(size);

    /* Tomamos los botones de colores por su id */
    var redButton = document.getElementById("Red");
    var greenButton = document.getElementById("Green");
    var blueButton = document.getElementById("Blue");
    var blackButton = document.getElementById("Black");
    var whiteButton = document.getElementById("White");
    /* Asociamos función colorPressed a pulsación de botón */
    redButton.addEventListener('click', colorPressed, false);
    greenButton.addEventListener('click', colorPressed, false);
    blueButton.addEventListener('click', colorPressed, false);
    blackButton.addEventListener('click', colorPressed, false);
    whiteButton.addEventListener('click', colorPressed, false);

    function colorPressed(e) {
        var color_button_selected = e.target;
        var color_id = color_button_selected.getAttribute('id');
        colorChosen.innerHTML = color_id;
    }

    /* Botón de reseteo */
    var resetButton = document.getElementById("reset_image");
    resetButton.addEventListener('click', resetPressed, false);

    /* Asociamos función colorPressed a pulsación de botón */
    function resetPressed(e) {
        theCanvas.width = theCanvas.width; // Borramos canvas
        drawScreen();
    }

    // For the mouse_moved event handler.
    var begin_drawing = false;

    drawScreen();

    function drawScreen() {
        theCanvas.addEventListener('mousedown', mouse_pressed_down, false);
        theCanvas.addEventListener('mousemove', mouse_moved, false);
        theCanvas.addEventListener('mouseup', mouse_released, false);
    }

    function mouse_pressed_down(ev) {
        begin_drawing = true;
        context.fillStyle = colorChosen.innerHTML;
    }

    function mouse_released(ev) {
        begin_drawing = false;
    }

    function mouse_moved(ev) {
        var x, y;
        // Get the mouse position in the canvas
        // ev.page[X|Y] gives the mouse position on the web page, but we need
        // the position on canvas, so we have to change the reference system.
        x = ev.pageX - 10;
        y = ev.pageY - 120;

        if (begin_drawing) {
            context.beginPath();
            context.arc(x, y, size, (Math.PI / 180) * 0, (Math.PI / 180) * 360, false);
            context.fill();
            context.closePath();
        }
    }

    /* Botón de cambio de tamaño */
    var changeButton = document.getElementById('size_button');
    changeButton.addEventListener('click', SizeButtonPressed, false);

    function SizeButtonPressed(e) {
        var new_size = document.getElementById("size_pincel");
        size = new_size.value;
        if (size < 1) {
            size = 1;
        }
        setSize(size);

        drawScreen();
    }
}
