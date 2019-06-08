var propertiesRelated = {
    contaminantes_atmosfericos : ['IE','II','RETC'],
    contaminantes_agua : ['IE','II','CE','CI','RETC'],
    emision_suelo : ['RECT'],
    residuos_peligroso	: ['REU','REC','CoP','Tra','Inc','O','DF','RETC', 'IE','II','CE','CI'],
    residuos_urbanos : ['REU','REC','CoP','Tra','Inc','O','RETC','RS','IE','II','CE','CI'],
};

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
function in_array(needle, haystack){
    for (var i=0, len=haystack.length;i<len;i++) {
        if (haystack[i] == needle) return i;
    }
    return -1;
}

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


function changeLines(canvas) {
    canvas.getLines().each(function(i,line){
        line.setRouter(new draw2d.layout.connection.CircuitConnectionRouter());
    });
}
