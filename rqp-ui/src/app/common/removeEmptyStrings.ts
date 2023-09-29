export function removeEmptyStrings(body){
    let bodyTemp=JSON.stringify(body,function(key,value){
        return value === ""?null:value
    })
    return JSON.parse(bodyTemp)
}

export function removeEmptyStringsForNotNull(body){
    let bodyTemp=JSON.stringify(body,function(key,value){
        return value === ""?"":value
    })
    return JSON.parse(bodyTemp)
}

export function removeEmptyStringsToEmptyJSON(body){
    let bodyTemp=JSON.stringify(body,function(key,value){
        return value === ""?{}:value
    })
    return JSON.parse(bodyTemp)
}