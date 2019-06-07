var contSchemaDiagram  = 0;
var useDiagramNow      = 0;
var draggableElemnts   = [];
var collectionDiagrams = [];
var flagInitDiagram    = true;
var changeDiagram      = false;
var nameSchema		   = "";
var saveDiagramUseNowFlag = false;
var DiagramContent;
var propertiesRelated = {
    contaminantes_atmosfericos : ['IE','II','RETC'],
    contaminantes_agua : ['IE','II','CE','CI','RETC'],
    emision_suelo : ['RECT'],
    residuos_peligroso	: ['REU','REC','CoP','Tra','Inc','O','DF','RETC', 'IE','II','CE','CI'],
    residuos_urbanos : ['REU','REC','CoP','Tra','Inc','O','RETC','RS','IE','II','CE','CI'],
};

function AddEdges() {
    let Edge1      = $("#Edge1");
    let Edge2      = $("#Edge2");
    let ColorArrow = $("#colorArrow").val();
    let typeArrow  = $("#typeArrow").val();
    let edge;
    if(ColorArrow == "" || typeof ColorArrow === 'undefined'){
        ColorArrow = 'B4B1B0';
    }
    if(Edge1.val() == "" || Edge2.val() == "" ){
        return;
    }
    if(typeArrow == '1'){
        edge =  {
            data :
                {
                    source    : Edge1.val(),
                    target    : Edge2.val(),
                    faveColor : '#' + ColorArrow,
                    strength  : 90
                }
        }
    }else{
        edge =  {
            data :
                {
                    source    : Edge1.val(),
                    target    : Edge2.val(),
                    faveColor : '#' + ColorArrow,
                    strength  : 90
                },
            classes: 'questionable'
        }
    }
    DiagramContent.add(edge);
    Edge1.val("");
    Edge2.val("");
}

function exportImaggeDiagram() {

    if (typeof DiagramContent === 'undefined') {
        alert("Aun no se genera ningun diagrama");
        return;
    }
    let jpg64 = DiagramContent.jpg();
    document.querySelector('#viewImageDiagra').setAttribute('src', jpg64);
}

function setPropertiesBlock() {
    let idItem = $("#selectedElement").val();

    if(idItem == ""){
        alert("Debes seleccionar un bloque para asignarlos");
        return;
    }

    let propertiesInput  = getPropertiesInput();
    let propertiesOutput = getPropertiesOutput();
    let propertiesRelated= getPropertiesRelated();

    if(propertiesInput.length == 0 && propertiesOutput.length == 0 && propertiesRelated.length == 0) {
        alert("Debes seleccionar al menos una propiedad");
        return;
    }

    for(indexElement in draggableElemnts[useDiagramNow][nameSchema]){
        if(draggableElemnts[useDiagramNow][nameSchema][indexElement].id  == idItem){
            draggableElemnts[useDiagramNow][nameSchema][indexElement].propertiesOutput   = propertiesOutput;
            draggableElemnts[useDiagramNow][nameSchema][indexElement].propertiesInput    = propertiesInput;
            draggableElemnts[useDiagramNow][nameSchema][indexElement].propertiesRelated  = propertiesRelated;
            break;
        }
    }
    resetCheckboxProperties();
}

function setViewPropertiesBlock(nodeId) {
    let propertiesInput   = [];
    let propertiesOutput  = [];
    let propertiesRelated = [];

    for (indexElement in draggableElemnts[useDiagramNow][nameSchema]) {
        if (draggableElemnts[useDiagramNow][nameSchema][indexElement].id == nodeId) {
            propertiesInput = draggableElemnts[useDiagramNow][nameSchema][indexElement].propertiesInput;
            propertiesOutput = draggableElemnts[useDiagramNow][nameSchema][indexElement].propertiesOutput;
            propertiesRelated = draggableElemnts[useDiagramNow][nameSchema][indexElement].propertiesRelated;
            break;
        }
    }

    resetCheckboxProperties();
    setPropertiesInput(propertiesInput);
    setPropertiesOutput(propertiesOutput);
    setPropertiesRelated(propertiesRelated);
}

function setPropertiesInput(propertiesInput) {
    if(propertiesInput.length > 0){
        $.each($("input[name='propertiesInput']"), function(){
            if(in_array($(this).val(), propertiesInput) != -1){
                this.checked = true;
            }
        });
    }
}

function setPropertiesOutput(propertiesOutput) {
    if(propertiesOutput.length > 0){
        $.each($("input[name='propertiesOutput']"), function(){
            if(in_array($(this).val(), propertiesOutput) != -1){
                this.checked = true;
            }
        });
    }
}

function setPropertiesRelated(propertiesRelated) {
    if(propertiesRelated.length >0){
        $.each($("input[name='propertiesRelated']"), function(){
            if(in_array($(this).val(), propertiesRelated) != -1){
                this.checked = true;
            }
        });
    }
}

function getPropertiesInput() {
    let propertiesInput = [];
    $.each($("input[name='propertiesInput']:checked"), function(){
        propertiesInput.push($(this).val());
    });
    console.log("LOG -- propertiesInput" , propertiesInput);
    return propertiesInput;
}

function getPropertiesOutput() {
    let propertiesOutput = [];
    $.each($("input[name='propertiesOutput']:checked"), function(){
        propertiesOutput.push($(this).val());
    });
    console.log("LOG -- propertiesOutput" , propertiesOutput);
    return propertiesOutput;
}

function getPropertiesRelated() {
    let propertiesRelated = [];
    $.each($("input[name='propertiesRelated']:checked"), function(){
        propertiesRelated.push($(this).val());
    });
    console.log("LOG -- propertiesOutput" , propertiesRelated);
    return propertiesRelated;
}

function resetCheckboxProperties() {
    $('input[type=checkbox]').each(function()
    {
        this.checked = false;
    });

    $("input[name='propertiesRelated']").each(function()
    {
        $(this).prop("disabled", true);
    });
}

function deleteDraggable(){

    for (indexElement in draggableElemnts[useDiagramNow][nameSchema]){
        if(typeof draggableElemnts[useDiagramNow][nameSchema][indexElement].id !== 'undefined'){
            let node = DiagramContent.$('#' + draggableElemnts[useDiagramNow][nameSchema][indexElement].id);
            DiagramContent.remove(node);
            break;
        }
    }
    draggableElemnts = [];
}

function deleteOneItem(){

    let idItem = $("#selectedElement").val();

    if(idItem == ""){
        alert("Tiene que seleccionar un elemento");
        return;
    }

    let node = DiagramContent.$('#' + idItem);
    DiagramContent.remove(node);

    for(indexElement in draggableElemnts[useDiagramNow][nameSchema]) {
        if(draggableElemnts[useDiagramNow][nameSchema][indexElement].id == idItem){
            console.log("LOG --", 'item deleted - ', draggableElemnts[useDiagramNow][nameSchema][indexElement]);
            draggableElemnts[useDiagramNow][nameSchema].splice(indexElement,1);
            break;
        }
    }
}

function setDraggableItem(dialog, type, cont){
    let infoDraggable = {
        type   : type,
        id     : type+cont,
        x      : 0,
        y      : 0,
        dialog : dialog,
        propertiesInput  : getPropertiesInput(),
        propertiesOutput : getPropertiesOutput(),
        propertiesRelated: getPropertiesRelated()
    };
    if(typeof draggableElemnts[useDiagramNow][nameSchema] !== 'undefined'){
        draggableElemnts[useDiagramNow][nameSchema].push(infoDraggable);
    }
}

function getIdElement(Element) {
    let object = zk.Widget.$(jq('$'+Element));
    return object.uuid;
}

function initDiagram(){
    nameSchema = $("#nameDiagramSchema").val();


    if( nameSchema == ""){
        alert("Debes elegir un nombre");
        return;
    }
    if(saveDiagramUseNowFlag || contSchemaDiagram == 0){
        DiagramContent = cytoscape(getJsonDiagram());
        setOnlisttenerDiagram();
        addDiagramSelect(contSchemaDiagram, nameSchema);
        alert("Nuevo diagrama - "+$("#nameDiagramSchema").val());
        $("#nameDiagramSchema").val("");

        contSchemaDiagram++;
        saveDiagramUseNowFlag = false;
        draggableElemnts.push(
            {
                [nameSchema]    : [],
                'nameDiagram' : nameSchema
            }
        );

    }else{
        alert("Aun no guardas el diagrama en uso");
    }
}

function saveDiagramUseNow() {
    if(verifyEdgesNodes()){
        if(typeof collectionDiagrams[useDiagramNow] === 'undefined'){
            console.log("Guardando nuevo diagrama");
            collectionDiagrams.push(getJsonElementsDiagramUse());
        }else{
            console.log("Sobre escribiendo diagrama");
            collectionDiagrams[useDiagramNow] = getJsonElementsDiagramUse();
        }
        alert("Diagrama guardado");
        saveDiagramUseNowFlag = true;
    }else{
        alert("Todos los nodos deben de estar conectados para poder ser guardado");
    }

    //TODO Update JSON to save
    $("#" + getIdElement('info_diagrama')).val("");
    $("#" + getIdElement('data_json')).val("");

    $("#" + getIdElement('info_diagrama')).val(JSON.stringify(collectionDiagrams));
    $("#" + getIdElement('data_json')).val(JSON.stringify(draggableElemnts));
}

function verifyEdgesNodes() {
    return true;
    let edges;
    let flag = true;
    for (indexElement in draggableElemnts){
        edges = DiagramContent.edges('[source = "'+draggableElemnts[indexElement].id+'"]');
        console.log("DATO --> ", edges);
        if(edges.length == 0){
            flag = false;
            break;
        }
    }
    return flag;
}

function getJsonElementsDiagramUse() {
    let JsonDiagram = DiagramContent.json();
    return JSON.stringify(JsonDiagram.elements);
}

function getJsonDiagram(Elements) {
    if(typeof Elements === 'undefined'){
        Elements =
            {
                nodes: [],
                edges: []
            };
    }else{
        Elements = JSON.parse(Elements);
    }

    let contentId  =  getIdElement('DiagramDraggableContent');
    return {
        container: document.getElementById(contentId),

        layout: {
            name: "grid",
            padding: 10
        },

        style: cytoscape.stylesheet()
            .selector('node')
            .css({
                'shape': 'data(faveShape)',
                'width': 'mapData(weight, 50, 90, 30, 70)',
                'content': 'data(name)',
                'text-valign': 'center',
                'text-outline-width': 2,
                'text-outline-color': 'data(faveColor)',
                'background-color': 'data(faveColor)',
                'color': '#fff'
            })
            .selector(':selected')
            .css({
                'border-width': 3,
                'border-color': '#333'
            })
            .selector('edge')
            .css({
                'curve-style': 'bezier',
                'opacity': 0.666,
                'width': 'mapData(strength, 70, 100, 2, 6)',
                'target-arrow-shape': 'triangle',
                'source-arrow-shape': 'circle',
                'line-color': 'data(faveColor)',
                'source-arrow-color': 'data(faveColor)',
                'target-arrow-color': 'data(faveColor)'
            })
            .selector('edge.questionable')
            .css({
                'line-style': 'dotted',
                'target-arrow-shape': 'diamond'
            })
            .selector('.faded')
            .css({
                'opacity': 0.25,
                'text-opacity': 0
            }),

        elements: Elements,
        ready: function(){
            window.contentId = this;
        }
    };
}

function addDiagramSelect(value, text) {
    $('#DiagramSelected').append($('<option>', {
        value: value,
        text : value+"-"+text
    }));
    changeDiagram = true;
    $('#DiagramSelected option[value='+ value +']').prop('selected', 'selected').change();
    useDiagramNow = value;
    changeDiagram = false;

    if(flagInitDiagram){
        $("#DiagramSelected option[value='initDiagram']").remove();
        $('#DiagramSelected').on( "change", function () {
            if(!changeDiagram){
                console.log("LOG--", "CHANGE DIAGRAM Number --> ",useDiagramNow);
                let JsonDiagram = DiagramContent.json();
                let changeUseDiagram = parseInt($(this).val(), 10);
                let name  = $(this).text().trim().split("-");
                nameSchema = name[1];
                console.log("Change why --> ", collectionDiagrams[changeUseDiagram], );
                DiagramContent = cytoscape(getJsonDiagram(collectionDiagrams[changeUseDiagram]));
                useDiagramNow  = changeUseDiagram;
                setOnlisttenerDiagram();
            }

        });
        $(".propertiesOutput").click(function () {
            let propertie = $(this).val();
            console.log("CAMBIO VALOR", propertie, "OBJECT", propertiesRelated[propertie]);
            if(typeof propertiesRelated[propertie] !== 'undefined'){
                let checkedPropertiesRelated = propertiesRelated[propertie];
                $.each($("input[name='propertiesRelated']"), function(){
                    if(in_array($(this).val(), checkedPropertiesRelated) != -1){
                        $(this).prop("disabled", false);
                    }
                });
            }
        });
        flagInitDiagram = false;
    }
}

function setOnlisttenerDiagram() {

    DiagramContent.on('tap', function(event){
        let evtTarget = event.target;
        console.log("LOG -- ON FULL ", evtTarget);
        if( evtTarget === DiagramContent ){
            resetCheckboxProperties();
            $("#Edge1").val("");
            $("#Edge2").val("");
        }
    });

    DiagramContent.on('tap', 'node', function(evt){
        let node = evt.target;
        console.log( 'LOG -- ','Callback',' tapped ', node);
        let Edge1 = $("#Edge1");
        let Edge2 = $("#Edge2");

        $("#selectedElement").val(node.id());

        if(Edge1.val() == "" && Edge2.val() == ""){
            Edge1.val(node.id());
        }else if(Edge1.val() != "" && Edge2.val() == ""){
            Edge2.val(node.id());
        }else if(Edge1.val() == "" && Edge2.val() != ""){
            Edge1.val(node.id());
        }else {
            Edge1.val("");
            Edge2.val("");
        }
        setViewPropertiesBlock(node.id());
    });
}

function in_array(needle, haystack){
    for (var i=0, len=haystack.length;i<len;i++) {
        if (haystack[i] == needle) return i;
    }
    return -1;
}
