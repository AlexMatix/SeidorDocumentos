var contSchemaDiagram  = 1;
var useDiagramNow      = 1;
var collectionDiagam   = [];
var collectionDiagrams = [];
var flagInitDiagram    = true;
var changeDiagram      = false;
var nameSchema		   = "";
var saveDiagramUseNowFlag = false;
var canvas = new draw2d.Canvas("gfx_holder");

function initDiagram(name) {

    if(name == "" || typeof name === 'undefined'){
        alert("");
        return false;
    }

    collectionDiagam.push({
        [name]          : [],
        'nameDiagram'   : name,
        'numberDiagram' : contSchemaDiagram
    });

    contSchemaDiagram++;
}

function newBlock() {
    console.log("LOG -- ", "GENERANDO NUEVO BLOQUE");

    if(typeof canvas === 'undefined' || canvas == null ){
        alert("Aun no creas un diagrama");
    }else{

        let typeElement = $("#typeElement").val();
        let dialogBlock = $("#dialogBlock");
        let numberBlock = $("#numberBlock");
        console.log("Type element --> ", typeElement);

        if(dialogBlock.val() != "" || numberBlock.val() != ""){
            newItem(numberBlock.val(), dialogBlock.val(),typeElement);
            // setDraggableItem(dialogBlock.val(), type, numberBlock.val());
            dialogBlock.val("");
            numberBlock.val("");
            resetCheckboxProperties();
        }else{
            alert("Tiene que ingresar contenido para el bloque");
        }
    }
    // resetCheckboxProperties();
}

function setPortsBlock(itemTable) {

    itemTable.addPort(
        new draw2d.InputPort(
            {
                cssClass : "draw2d_InputPort",
                locator  : new draw2d.layout.locator.InputPortLocator()
            }));

    itemTable.addPort(
        new draw2d.OutputPort(
            {
                cssClass : "draw2d_OutputPort",
                locator  : new draw2d.layout.locator.OutputPortLocator()
            }));
}

function newItem(number, dialog, typeElemen) {
    let item = null;

    if(typeElemen == 1){
        draw2d.shape.basic.Circle
        item = new draw2d.shape.layout.VerticalLayout();
        item.add(
            new draw2d.shape.basic.Label(
                {
                    text   : number + "-" + dialog,
                    bold   : true,
                    stroke : 4,
                    x      : 20,
                    y      : 20,
                    resizeable : true
                }));
        canvas.add(item, 100,100);
        addGridRow(item);
    }else{
        item = new draw2d.shape.basic.Circle(
            {
                cssClass : "draw2d_shape_basic_Circle",
                color    : "#1B1B1B",
                stroke   : 1,
                width    : 80,
                height   : 80,
                x        : 20,
                y        : 20
            }
        );
        canvas.add(item, 100,100);
    }

    setPortsBlock(item);
}

function addGridRow(table) {
    let input   = getPropertiesInput();
    let output  = getPropertiesOutput();

    var grid = new draw2d.shape.layout.TableLayout({resizeable:true});
    grid.addRow(new draw2d.shape.basic.Label({text:"Entradas",resizeable:true}), new draw2d.shape.basic.Label({text:"Salidas",resizeable:true}));
    // grid.addRow(new draw2d.shape.basic.Label({text:"Ejemplo1",resizeable:true}), new draw2d.shape.basic.Label({text:"Ejemplo2",resizeable:true}));

    let textInput  = "";
    let textOutput = "";
    let limit = input.length > output.length
                ? input.length
                : output.length;

    for(let i = 0;  i < limit; i++){
        if(typeof input[i] === 'undefined'){
            textInput = " ";
        }else{
            textInput = input[i];
        }

        if(typeof output[i] === 'undefined'){
            textOutput = " ";
        }else{
            textOutput = output[i];
        }

        grid.addRow(new draw2d.shape.basic.Label({text:textInput,resizeable:true}), new draw2d.shape.basic.Label({text:textOutput,resizeable:true}));
    }
    grid.setCellAlign(1,1,"right");
    grid.setCellPadding(0,3,5);

    table.add(grid);
}



