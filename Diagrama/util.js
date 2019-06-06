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

function in_array(needle, haystack){
    for (var i=0, len=haystack.length;i<len;i++) {
        if (haystack[i] == needle) return i;
    }
    return -1;
}
