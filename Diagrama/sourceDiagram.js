var canvas = null;
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

canvas = new draw2d.Canvas("gfx_holder");

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
