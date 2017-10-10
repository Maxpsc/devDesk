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
//利用fileReader将文件转为二进制字符串
export function setFileReader(file,callback){
    let fileReader = new FileReader();
    fileReader.onload = function(event){
        callback(event);
    };
    fileReader.readAsBinaryString(file);
    //fileReader.readAsDataURL(file);//base64
}
