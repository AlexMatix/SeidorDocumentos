var colorLine      = new draw2d.util.Color("#787473");
var lineDecoration = new draw2d.decoration.connection.DiamondDecorator();
var writer         = new draw2d.io.json.Writer();
var writerPng      = new draw2d.io.png.Writer();
var reader         = new draw2d.io.json.Reader();
var jsonSourceDiagramUseNow = "";
var collectionSourceDiagram = [];
var imageDiagram = null;
var canvas       = null;
var router       = null;
var saveUseDiagram = true;
var changeDiagramFlag  = false;


function newDiagram(name) {

    if(name == "" || typeof name === 'undefined'){
        alert("Debes elegir un nombre");
        return false;
    }
    if(saveUseDiagram){
        if(validateCanvas()){
            canvas = new draw2d.Canvas("gfx_holder");
            initDiagram();
            setEventSelect();
        }else{
            canvas.clear();
        }
        addDiagramCollection(name);
        saveUseDiagram = false;
    }else{
        alert("Debes de guardar el diagrama actual antes de crear uno nuevo")
    }
}

function initDiagram() {
    router = new draw2d.layout.connection.CircuitConnectionRouter();
    router.abortRoutingOnFirstVertexNode = false;
    setDecorationLine();

    canvas.on("figure:add", function (emitter, event) {
        console.log("Figura add");
        if(changeDiagramFlag){
            restaureItemTable(event.figure);
        }
    });

}


function newBlock() {
    console.log("LOG -- ", "GENERANDO NUEVO BLOQUE");

    if(validateCanvas()){
        alert("Aun no crear un diargama");
        return;
    }

    let typeElement = $("#typeElement").val();
    let dialogBlock = $("#dialogBlock");
    let numberBlock = $("#numberBlock");
    console.log("Type element --> ", typeElement);

    if((dialogBlock.val() != "" && numberBlock.val() != "") || typeElement > 1){
        item = newItem(numberBlock.val(), dialogBlock.val(),typeElement);
        addItemDiagram(numberBlock.val(), dialogBlock.val(), typeElement,item);
        dialogBlock.val("");
        numberBlock.val("");
    }else{
        alert("Tiene que ingresar contenido para el bloque");
    }

    // resetCheckboxProperties();
}

function newItem(number, dialog, typeElemen) {
    let item = null;

    if(typeElemen == 1){
        draw2d.shape.basic.Circle
        item = new draw2d.shape.layout.VerticalLayout();
        setPortsBlock(item);
        canvas.add(item, 100,100);
        addGridRow(item,number, dialog);
    }else{
        let width;
        let height;
        let color;

        if(typeElemen == 2){
            width   = 70;
            height  = 70;
            color   = new draw2d.util.Color('#34aad7');
        }else{
            width   = 50;
            height  = 50;
            color   = new draw2d.util.Color('#1067df');
        }

        item = new draw2d.shape.basic.Circle(
            {
                color    : color,
                bgColor  : color,
                stroke   : 1,
                width    : width,
                height   : height,
                x        : 20,
                y        : 20
            }
        );
        setPortsBlock(item);
        canvas.add(item, 100,100);
    }
    return item;
}

function addGridRow(table, number, dialog, propertiesInput, propertiesOutput) {
    let input;
    let output;

    if(typeof propertiesInput === 'undefined' && typeof propertiesOutput === 'undefined'){
        input   = getPropertiesInput();
        output  = getPropertiesOutput();
    }else{
        input  = propertiesInput;
        output = propertiesOutput;
    }

    table.add(
        new draw2d.shape.basic.Label(
            {
                text   : number + "-" + dialog,
                bold   : true,
                stroke : 4,
                x      : 20,
                y      : 20,
                resizeable : true
            }));

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

function saveSourceDiagram() {
    if(validateCanvas()){
        alert("Aun no creas un diagrama");
        return;
    }
    writer.marshal(canvas, function(json){
        jsonSourceDiagramUseNow = JSON.stringify(json,null,2);
    });

    if(typeof collectionSourceDiagram[useDiagramNow] === 'undefined'){
        if(jsonSourceDiagramUseNow == "[]"){
            alert("No se puede almacenar un diagrama vacio");
            return;
        }else{
            collectionSourceDiagram.push(
                {
                    json   : jsonSourceDiagramUseNow,
                    name   : nameSchema
                }
            );
        }

    }else{
        collectionSourceDiagram[useDiagramNow].image = imageDiagram;
        collectionSourceDiagram[useDiagramNow].json = jsonSourceDiagramUseNow;
    }
    saveUseDiagram = true;
}


function changeDiagram(number) {

    if(typeof collectionSourceDiagram[number] === 'undefined'){
        console.log("No existe el diagrama");
        return;
    }

    canvas.clear();
    changeDiagramFlag = true;
    nameSchema    = collectionSourceDiagram[number].name;
    useDiagramNow = number;
    reader.unmarshal(canvas, collectionSourceDiagram[number].json);
    changeDiagramFlag = false;
}

function restaureItemTable(item) {
    if(item.cssClass == "draw2d_shape_basic_Circle"){
        return;
    }
    let dataItem = getDataItem(item.id);
    if(typeof dataItem !== 'undefined'){
        addGridRow(item, dataItem.number, dataItem.dialog,dataItem.propertiesInput,dataItem.propertiesOutput);
    }
}

function getSourceDiagram() {
    return JSON.stringify(collectionSourceDiagram,null,2);
}

function getDataDiagram() {
    return JSON.stringify(collectionDiagam,null,2);
}

function getImageDiagram() {
    writerPng.marshal(canvas, function(png){
        imageDiagram =  png;
    });
    return imageDiagram;
}



