<template lang="html">
    <div id="weather">
        <h1>{{country}} {{city}}</h1>

    </div>
</template>

<script>
import { fetchWeather, getLocation } from '@/services/fetch';

export default {
    name: 'weather',
    data (){
        return {
            country: '',
            city: '',
            currentWeather: {},
            weatherList: '',
            loading: true,
        }
    },
    mounted (){
        getLocation()
        .then((res) => {
            console.log(res);
            this.country = res.regeocode.addressComponent.country;
            this.city = res.regeocode.addressComponent.province;

            // this.getWeather(this.city);
        })
        .catch((err) => {
            console.log(err);
        })
    },
    methods: {
        async getWeather(city){
            try {
                const res = await fetchWeather(city);
                console.log(res);
            } catch (e) {
                console.log(e);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#weather{
    position:fixed;
    top:14px;
    right:20px;
    z-index:100;
    h1,h2{
        color:#FFF;margin:0;
    }
    h1{font-size: 16px;}
}
</style>
