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
        return false;
    }

    collectionDiagam.push({
        [name]        : [],
        'nameDiagram' : 
    });
    contSchemaDiagram++;
}

function newBlock() {
    console.log("LOG -- ", "GENERANDO NUEVO BLOQUE");

    if(typeof canvas === 'undefined' || canvas == null ){
        alert("Aun no creas un diagrama");
    }else{
        let propertiesInput   = getPropertiesInput();
        let propertiesOutput  = getPropertiesOutput();
        let propertiesRelated = getPropertiesRelated();

        let typeElement = $("#typeElement").val();
        let dialogBlock = $("#dialogBlock");
        let numberBlock = $("#numberBlock");
        console.log("Type element --> ", typeElement);

        if(typeElement == 1){
            if(propertiesInput.length == 0 ||
                propertiesOutput.length == 0 ||
                propertiesRelated.length == 0)
            {
                alert("Tienes que asignar propiedades al bloque");
                return;
            }
        }


        if(dialogBlock.val() != "" || numberBlock.val() != ""){
            newItem(numberBlock.val(), dialogBlock.val(),typeElement);
            setDraggableItem(dialogBlock.val(), type, numberBlock.val());
            dialogBlock.val("");
            numberBlock.val("");
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
    }
    canvas.add(item);
    setPortsBlock(item);
}



