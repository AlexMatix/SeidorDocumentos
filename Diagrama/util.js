var propertiesRelated = {
    contaminantes_atmosfericos : ['IE','II','RETC'],
    contaminantes_agua : ['IE','II','CE','CI','RETC'],
    emision_suelo : ['RECT'],
    residuos_peligroso	: ['REU','REC','CoP','Tra','Inc','O','DF','RETC', 'IE','II','CE','CI'],
    residuos_urbanos : ['REU','REC','CoP','Tra','Inc','O','RETC','RS','IE','II','CE','CI'],
};

var iconsProperties = {
    input : {
        Insumos : 'insumos.png',
        Consumo_Combustible : 'con_combustible.png',
        Uso_agua : 'uso_agua.png',

    },
    output : {
        contaminantes_atmosfericos : 'c_atmosfera.png',
        emision_atmosfera  : 'emision_atmosfera.png',
        contaminantes_agua : 'g_con_agua.png',
        emision_suelo      : 'emision_suelo.png',
        residuos_peligroso : 'residuos_peligrosos.png',
        residuos_urbanos   : 'residuos_urbanos.png',
        aprovechamiento_energia : 'aprov_energia.png',
        eventos   : 'eventos.png',
        subproductos   : 'subproducto.png'
    }
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

function setDecorationLine() {
    if(validateCanvas()){
        return;
    }
    var createConnection=function(sourcePort, targetPort){
        var con = new draw2d.Connection({
            outlineColor:"#fffaf5",
            outlineStroke:1,
            router: router,
            stroke:2,
            color : colorLine,
        });
        con.setRouter(new draw2d.layout.connection.ManhattanConnectionRouter());
        con.setSourceDecorator(new draw2d.decoration.connection.BarDecorator());
        con.setTargetDecorator(lineDecoration);

        return con;
    };


    canvas.installEditPolicy(  new draw2d.policy.connection.DragConnectionCreatePolicy({
        createConnection: createConnection
    }));

}

function validateCanvas() {
    let flag = false;
    if(typeof canvas === 'undefined' || canvas == null ){
        flag = true;
    }
    return flag;
}

function setEventSelect() {
    $('#deleteItem').click(function () {
        if(validateCanvas()){
            alert('No hay elementos para eliminar');
            return;
        }
        let node = canvas.getPrimarySelection();
        deleteItem(node);
        canvas.getCommandStack().execute(new draw2d.command.CommandDelete(node));
    });

    $('#colorArrow').on('change', function () {
        if(!validateCanvas()){
            colorLine = new draw2d.util.Color("#" + $(this).val());
            setDecorationLine();
        }

    });

    $('#typeArrow').on('change', function () {
        if(!validateCanvas()){
            if($(this).val() == 1){
                lineDecoration = new draw2d.decoration.connection.DiamondDecorator();
            }else{
                lineDecoration = new draw2d.decoration.connection.ArrowDecorator();
            }
            setDecorationLine();
        }
    });

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
}

