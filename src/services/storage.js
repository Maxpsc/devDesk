console.log(chrome.storage);

export function getStorage(key,callback){
    chrome.storage.sync.get(key,function(res){
        callback(res);
    });
};

export function setStorage(items,callback){
    chrome.storage.sync.set(items,function(){
        callback();
    });
}
