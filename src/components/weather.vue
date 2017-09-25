<template lang="html">
    <div id="weather">
        <h1 class="loading-tip" v-show="loading"><i class="el-icon-loading"></i>locating...</h1>
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
            // console.log(res);
            this.loading = false;
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
    top: 0;right:0;
    padding: 14px 20px 14px 20px;
    background: -webkit-radial-gradient(100% 0%, rgba(0,0,0,.4),rgba(0,0,0,.2),rgba(0,0,0,0));
    border-bottom-left-radius: 20px;
    z-index:100;
    h1,h2{
        color:#FFF;margin:0;
    }
    .loading-tip{
        text-align: center;
        font-size: 16px;
        i{
            margin-right: 10px;
        }
    }
    h1{font-size: 16px;}
}
</style>
