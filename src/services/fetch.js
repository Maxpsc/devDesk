import axios from 'axios';
//APIs' key
const ampKEY = '4a2ceec83069700759abb42da7725322';
const xinzhiKEY = 'khmeqyvpglkro02y';

export function getLocation(){
    let promise = new Promise(function(resolve,reject){
        //可加options作为第三个参数
        navigator.geolocation.getCurrentPosition(function(pos){
            let { longitude, latitude } = pos.coords;
            //获得经纬度后查询城市信息
            axios.get(`http://restapi.amap.com/v3/geocode/regeo?key=${ampKEY}&location=${longitude},${latitude}&poitype=&radius=1000&extensions=base&batch=false&roadlevel=0`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
        },function(err){
            reject(err);
        });
    });
    return promise;
};
export function fetchWeather(city){
    return new Promise(function(resolve,reject){
        axios.get(`https://api.seniverse.com/v3/weather/daily.json?key=${xinzhiKEY}&location=${city}&language=zh-Hans&unit=c&start=0&days=5`)
        .then((res) => {
            resolve(res.data);
        })
        .catch((err) => {
            reject(err);
        });
    });
};

//获得bootcdn.json
export function getCDNList(){
    return new Promise(function(resolve,reject){
        axios.get('https://api.bootcdn.cn/libraries.min.json')
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            reject(err);
        });
    });
};
