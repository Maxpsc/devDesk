export function getStorage(key,callback){
    if(chrome.storage){
        chrome.storage.sync.get(key,function(res){
            callback(res);
        });
    }
};

export function setStorage(items,callback){
    if(chrome.storage){
        chrome.storage.sync.set(items,function(res){
            callback(res);
        });
    }
}
