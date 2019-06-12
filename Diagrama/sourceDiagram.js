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
var pathOutput = "/egovstyles/js/diagram/icons/salidas/";
var pathInput = "/egovstyles/js/diagram/icons/entradas/";
var test;

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

    setDecorationLine();

    canvas.on("figure:add", function (emitter, event) {
        console.log("Figura add");
        if(changeDiagramFlag){
            restaureItemTable(event.figure);
        }
    });

    canvas.on("select", function(emitter, event){
        console.log("Figura seleccionada --> ", event.figure.id);
        setViewPropertiesBlock(event.figure.id);
    });

    canvas.on("unselect", function(emitter, event){
        console.log("Figura Unseleccionada --> ", event.figure.id);
        resetCheckboxProperties();
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

    if(dialogBlock.val() != ""){
        item = newItem(numberBlock.val(), dialogBlock.val(),typeElement);
        addItemDiagram(numberBlock.val(), dialogBlock.val(), typeElement,item);
        dialogBlock.val("");
        numberBlock.val("");
    }else{
        alert("Tiene que ingresar contenido para el bloque");
    }

}

function newItem(number, dialog, typeElemen) {
    let item = null;

    if(typeElemen == 1){
        draw2d.shape.basic.Circle
        item = new draw2d.shape.layout.TableLayout();

        canvas.add(item, 10,10);
        setPortsBlock(item);
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
        item.add(new draw2d.shape.basic.Label({text:dialog,stroke : 0,}), new draw2d.layout.locator.CenterLocator());
        setPortsBlock(item);
        canvas.add(item, 100,100);
    }
    return item;
}

function addGridRow(container, number, dialog, propertiesInput, propertiesOutput) {
    let input;
    let output;

    if(typeof propertiesInput === 'undefined' && typeof propertiesOutput === 'undefined'){
        console.log("Pido las propiedades");
        input   = getPropertiesInput();
        output  = getPropertiesOutput();
    }else{
        input  = propertiesInput;
        output = propertiesOutput;
    }

    let label = new draw2d.shape.basic.Label(
        {
            text   : number,
            stroke : 0,
            x      : 20,
            y      : 20,
            resizeable : true
        });

    let  label1 = new draw2d.shape.basic.Label(
        {
            text   : dialog,
            bold   : true,
            stroke : 0,
            x      : 20,
            y      : 20,
            resizeable : true
        });


    if(input.length > 0) {
        let iconInput = new draw2d.shape.layout.HorizontalLayout()
            .setStroke(0)
            .setBackgroundColor("#f7f7f7");

        let imgInput = null;

        for (let i = 0; i < input.length; i++) {
            let path  = pathInput + iconsProperties.input[input[i]];
            console.log("PAHT --> ", path);
            imgInput = new draw2d.shape.basic.Image({path:path, width:20,height:20, resizeable:false});
            iconInput.add(imgInput);
        }
        container.addRow(iconInput);
    }
    container.addRow(label);
    container.addRow(label1);

    if(output.length > 0){
        let iconOutput = new draw2d.shape.layout.HorizontalLayout()
            .setStroke(0)
            .setBackgroundColor("#f7f7f7");

        let imgOutput = null;

        for (let i = 0; i < output.length; i++) {
            let path  = pathOutput + iconsProperties.output[output[i]];
            console.log("PAHT --> ", path);
            imgOutput = new draw2d.shape.basic.Image({path:path, width:20,height:20, resizeable:false});
            iconOutput.add(imgOutput);
        }
        container.addRow(iconOutput);
    }

    container.setCellAlign(1,0, "center");
}

function setPortsBlock(itemTable) {

    itemTable.createPort("input",new draw2d.layout.locator.InputPortLocator());

    itemTable.createPort("output",new draw2d.layout.locator.OutputPortLocator());
}

function saveSourceDiagram() {
    if(validateCanvas()){
        alert("Aun no creas un diagrama");
        return;
    }
    writer.marshal(canvas, function(json){
        jsonSourceDiagramUseNow = JSON.stringify(json);
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
    return JSON.stringify(collectionSourceDiagram);
}

function getDataDiagram() {
    return JSON.stringify(collectionDiagam);
}

function getImageDiagram() {
    writerPng.marshal(canvas, function(png){
        imageDiagram =  png;
    });
    return imageDiagram;
}

function loadDiagram(json_diagram, json_data) {
    if(json_diagram == "" || typeof json_diagram === 'undefined'){
        console.log("LOG -- Sin json");
        return;
    }
    json_diagram = replacer(json_diagram);
    json_data    = replacer(json_data);
    collectionSourceDiagram =  $.parseJSON(json_diagram);
    collectionDiagam =  $.parseJSON(json_data);
    contSchemaDiagram = collectionDiagam.length + 1;
    canvas = new draw2d.Canvas("gfx_holder");
    initDiagram();
    setEventSelect();
    changeDiagram(0);
}

function replacer(json) {
    json = json.toString();
    json = json.replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");
    json = json.replace(/[\u0000-\u0019]+/g,"");
    return json;
}

let json = "[{\"json\":\"[{\\\"type\\\":\\\"draw2d.shape.layout.TableLayout\\\",\\\"id\\\":\\\"0810401d-777d-f29b-4d64-c73eeceb266a\\\",\\\"x\\\":10,\\\"y\\\":10,\\\"width\\\":30.34375,\\\"height\\\":44,\\\"alpha\\\":1,\\\"angle\\\":0,\\\"userData\\\":{},\\\"cssClass\\\":\\\"draw2d_shape_layout_TableLayout\\\",\\\"ports\\\":[{\\\"type\\\":\\\"draw2d.InputPort\\\",\\\"id\\\":\\\"cca21b0c-a8a6-c53f-6b8d-92e15eeb953c\\\",\\\"width\\\":10,\\\"height\\\":10,\\\"alpha\\\":1,\\\"angle\\\":0,\\\"userData\\\":{},\\\"cssClass\\\":\\\"draw2d_InputPort\\\",\\\"bgColor\\\":\\\"#4F6870\\\",\\\"color\\\":\\\"#1B1B1B\\\",\\\"stroke\\\":1,\\\"dasharray\\\":null,\\\"maxFanOut\\\":9007199254740991,\\\"name\\\":null,\\\"port\\\":\\\"draw2d.InputPort\\\",\\\"locator\\\":\\\"draw2d.layout.locator.InputPortLocator\\\"},{\\\"type\\\":\\\"draw2d.OutputPort\\\",\\\"id\\\":\\\"545d7165-1757-d155-4037-3921cba6a3db\\\",\\\"width\\\":10,\\\"height\\\":10,\\\"alpha\\\":1,\\\"angle\\\":0,\\\"userData\\\":{},\\\"cssClass\\\":\\\"draw2d_OutputPort\\\",\\\"bgColor\\\":\\\"#4F6870\\\",\\\"color\\\":\\\"#1B1B1B\\\",\\\"stroke\\\":1,\\\"dasharray\\\":null,\\\"maxFanOut\\\":9007199254740991,\\\"name\\\":null,\\\"port\\\":\\\"draw2d.OutputPort\\\",\\\"locator\\\":\\\"draw2d.layout.locator.OutputPortLocator\\\"}],\\\"bgColor\\\":\\\"none\\\",\\\"color\\\":\\\"#1B1B1B\\\",\\\"stroke\\\":1,\\\"radius\\\":0,\\\"dasharray\\\":null},{\\\"type\\\":\\\"draw2d.shape.layout.TableLayout\\\",\\\"id\\\":\\\"e0d2708d-9c73-ccce-4932-19088a41aae5\\\",\\\"x\\\":149,\\\"y\\\":48,\\\"width\\\":30.34375,\\\"height\\\":44,\\\"alpha\\\":1,\\\"angle\\\":0,\\\"userData\\\":{},\\\"cssClass\\\":\\\"draw2d_shape_layout_TableLayout\\\",\\\"ports\\\":[{\\\"type\\\":\\\"draw2d.InputPort\\\",\\\"id\\\":\\\"35e514de-9b0e-2d1e-1e93-dc1d1bf22345\\\",\\\"width\\\":10,\\\"height\\\":10,\\\"alpha\\\":1,\\\"angle\\\":0,\\\"userData\\\":{},\\\"cssClass\\\":\\\"draw2d_InputPort\\\",\\\"bgColor\\\":\\\"#4F6870\\\",\\\"color\\\":\\\"#1B1B1B\\\",\\\"stroke\\\":1,\\\"dasharray\\\":null,\\\"maxFanOut\\\":9007199254740991,\\\"name\\\":null,\\\"port\\\":\\\"draw2d.InputPort\\\",\\\"locator\\\":\\\"draw2d.layout.locator.InputPortLocator\\\"},{\\\"type\\\":\\\"draw2d.OutputPort\\\",\\\"id\\\":\\\"2523efcb-306b-79fc-594d-d21f1d02a512\\\",\\\"width\\\":10,\\\"height\\\":10,\\\"alpha\\\":1,\\\"angle\\\":0,\\\"userData\\\":{},\\\"cssClass\\\":\\\"draw2d_OutputPort\\\",\\\"bgColor\\\":\\\"#4F6870\\\",\\\"color\\\":\\\"#1B1B1B\\\",\\\"stroke\\\":1,\\\"dasharray\\\":null,\\\"maxFanOut\\\":9007199254740991,\\\"name\\\":null,\\\"port\\\":\\\"draw2d.OutputPort\\\",\\\"locator\\\":\\\"draw2d.layout.locator.OutputPortLocator\\\"}],\\\"bgColor\\\":\\\"none\\\",\\\"color\\\":\\\"#1B1B1B\\\",\\\"stroke\\\":1,\\\"radius\\\":0,\\\"dasharray\\\":null},{\\\"type\\\":\\\"draw2d.Connection\\\",\\\"id\\\":\\\"36a7a409-fee3-9749-fa56-bf9ec946d7ba\\\",\\\"alpha\\\":1,\\\"angle\\\":0,\\\"userData\\\":{},\\\"cssClass\\\":\\\"draw2d_Connection\\\",\\\"stroke\\\":2,\\\"color\\\":\\\"#787473\\\",\\\"outlineStroke\\\":1,\\\"outlineColor\\\":\\\"#FFFAF5\\\",\\\"policy\\\":\\\"draw2d.policy.line.LineSelectionFeedbackPolicy\\\",\\\"vertex\\\":[{\\\"x\\\":40.34375,\\\"y\\\":32},{\\\"x\\\":94.671875,\\\"y\\\":32},{\\\"x\\\":94.671875,\\\"y\\\":70},{\\\"x\\\":149,\\\"y\\\":70}],\\\"router\\\":\\\"draw2d.layout.connection.CircuitConnectionRouter\\\",\\\"radius\\\":3,\\\"source\\\":{\\\"node\\\":\\\"0810401d-777d-f29b-4d64-c73eeceb266a\\\",\\\"port\\\":null,\\\"decoration\\\":\\\"draw2d.decoration.connection.BarDecorator\\\"},\\\"target\\\":{\\\"node\\\":\\\"e0d2708d-9c73-ccce-4932-19088a41aae5\\\",\\\"port\\\":null,\\\"decoration\\\":\\\"draw2d.decoration.connection.DiamondDecorator\\\"}}]\",\"name\":\"asd\"}]";
let json_data = "[{\"nameDiagram\":\"asd\",\"numberDiagram\":1,\"asd\":[{\"id\":\"0810401d-777d-f29b-4d64-c73eeceb266a\",\"type\":\"1\",\"number\":\"1\",\"dialog\":\"asd\",\"propertiesInput\":[],\"propertiesOutput\":[],\"propertiesRelated\":[]},{\"id\":\"e0d2708d-9c73-ccce-4932-19088a41aae5\",\"type\":\"1\",\"number\":\"2\",\"dialog\":\"asd\",\"propertiesInput\":[],\"propertiesOutput\":[],\"propertiesRelated\":[]}]}]";