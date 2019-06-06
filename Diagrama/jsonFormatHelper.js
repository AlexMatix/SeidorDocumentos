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
