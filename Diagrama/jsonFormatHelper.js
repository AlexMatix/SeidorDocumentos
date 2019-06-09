var contSchemaDiagram  = 1;
var useDiagramNow      = 0;
var collectionDiagam   = [];
var nameSchema		   = "";

function addDiagramCollection(name) {
    collectionDiagam.push({
        [name]          : [],
        'nameDiagram'   : name,
        'numberDiagram' : contSchemaDiagram
    });
    nameSchema    = name;
    useDiagramNow = contSchemaDiagram - 1;
    contSchemaDiagram++;
}


function addItemDiagram(number, dialog, type, item){

    if(item.cssClass == "draw2d_shape_basic_Circle"){
        console.log("Este elemento no se almacena");
        return;
    }

    let dataItem = {
        id     : item.id,
        type   : type,
        number : number,
        dialog : dialog,
        propertiesInput   : getPropertiesInput(),
        propertiesOutput  : getPropertiesOutput(),
        propertiesRelated : getPropertiesRelated()
    };

    if(typeof collectionDiagam[useDiagramNow][nameSchema] !== 'undefined'){
        collectionDiagam[useDiagramNow][nameSchema].push(dataItem);
    }else{
        console.log("Error: No se almaceno item");
    }
    resetCheckboxProperties();
}

function deleteItem(item) {
    let indexElement = searchItem(item.id);

    if(indexElement != -1){
        collectionDiagam[useDiagramNow][nameSchema].splice(indexElement,1);
    }
    // for(indexElement in collectionDiagam[useDiagramNow][nameSchema]) {
    //     if(collectionDiagam[useDiagramNow][nameSchema][indexElement].id == item.id){
    //         console.log("LOG --", 'item deleted - ', collectionDiagam[useDiagramNow][nameSchema][indexElement]);
    //         collectionDiagam[useDiagramNow][nameSchema].splice(indexElement,1);
    //         break;
    //     }
    // }
}

function getDataItem(itemId) {
    let indexElement = searchItem(itemId);
    if(indexElement != -1){
        return collectionDiagam[useDiagramNow][nameSchema][indexElement];
    }
}

function searchItem(itemId) {
    let indexItem = -1;
    for(indexElement in collectionDiagam[useDiagramNow][nameSchema]) {
        if(collectionDiagam[useDiagramNow][nameSchema][indexElement].id == itemId){
            indexItem = indexElement;
            break;
        }
    }
    return indexItem;
}
