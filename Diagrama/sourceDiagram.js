var contSchemaDiagram  = 0;
var useDiagramNow      = 0;
var draggableElemnts   = [];
var collectionDiagrams = [];
var flagInitDiagram    = true;
var changeDiagram      = false;
var nameSchema		   = "";
var saveDiagramUseNowFlag = false;
var canvas = null;


document.addEventListener("DOMContentLoaded",function () {

    $("DiagramDraggableContent").scrollTop(0).scrollLeft(0);
    $(".propertiesOutput").click(function () {
        let propertie = $(this).val();
        if(typeof propertiesRelated[propertie] !== 'undefined'){
            let checkedPropertiesRelated = propertiesRelated[propertie];
            $.each($("input[name='propertiesRelated']"), function(){
                if(in_array($(this).val(), checkedPropertiesRelated) != -1){
                    $(this).prop("disabled", false);
                }
            });
        }
    });
});

canvas = new draw2d.Canvas("gfx_holder");
function newBlock() {
    console.log("LOG -- ", "GENERANDO NUEVO BLOQUE");

    if(typeof canvas === 'undefined' || canvas == null ){
        alert("Aun no creas un diagrama");
    }else{
        let typeElement = $("#typeElement").val();
        let color;
        let type;

        if(typeElement == 2){
            color = '#4368CA';
            type  =  'ellipse';
        }else if(typeElement == 3){
            color = '#2f498d';
            type  =  'ellipse';
        }else{
            color = '#1a9bf5';
            type  =  'rectangle';
        }

        let dialogBlock = $("#dialogBlock");
        let numberBlock = $("#numberBlock");

        if(dialogBlock.val() != "" || numberBlock.val() != ""){

            var table = new draw2d.shape.layout.VerticalLayout();
            table.add(new draw2d.shape.basic.Label({text:numberBlock.val()+"-"+dialogBlock.val(),bold:true, stroke:4, resizeable:true}));
            canvas.add(table);



            canvas.add(c);

            // setDraggableItem(dialogBlock.val(), type, numberBlock.val());
            dialogBlock.val("");
            numberBlock.val("");
        }else{
            alert("Tiene que ingresar contenido para el bloque");
        }
    }
    // resetCheckboxProperties();
}

