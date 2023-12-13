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
export function changeStatusByCode(statusCode){
    if(statusCode==1001){
        return 'ACTIVE'
       }else if(statusCode==1004){
        return 'LOCKED'
       }else if(statusCode==1005){
        return "UNLOCKED"
       }else if(statusCode==1003){
        return "DISABLE"
       }else
       {
        return ''
       }
}
export function changeStatusByDescription(statusDesc){
    if(statusDesc=='ACTIVE'){
        return 10001
    }else if(statusDesc=='LOCKED'){
        return 10004
    }else if(statusDesc=='UNLOCKED'){
        return 10005
    }else if(statusDesc=='DISABLE'){
        return 10006
    }else{
        return ''
    }
}