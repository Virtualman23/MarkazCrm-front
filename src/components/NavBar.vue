<template>
    <div class="aside">
        <img src="@/assets/icons/logo.svg" alt="" class="aside__logo">
        <el-menu class="el-menu-vertical-demo"
            :default-active="`${i}`">
            <router-link v-for="item,i of list" :key="i" :to="item.l">
                <el-menu-item :index="i.toString()">
                    <img class="square" :src="require(`@/assets/icons/icon-${i+1}.svg`)" alt="" >
                    <span>{{item.t}}</span>
                </el-menu-item>
            </router-link>
        </el-menu>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            list:[
                {
                    t:'Yo`nalishlar',
                    l:'/direction'
                },
                {
                    t:'Xodimlar',
                    l:'/worker'
                },
                {
                    t:'Guruxlar',
                    l:'/group'
                },
                {
                    t:'O`quvchilar',
                    l:'/pupil'
                },
                {
                    t:'Chiqimlar',
                    l:'/spending'
                },
                {
                    t:'To`lo`vlar',
                    l:'/payment'
                },
            ]
        }
    },
    computed:{
        i(){
            return this.$store.getters.i
        }
    }
}
</script>

<style lang="scss">

.aside{
    background-color: #fff;
    height: 100%;
    padding-top: 30px;
    padding-bottom: 80px;
    display: flex;
    flex-direction: column;
    &__logo{
        width: 100%;
        padding: 0 24px 35px;
    }
    span{
        font-size: 18px;
    }
    // .square{
    //     width: 24px;
    //     height: 24px;
    // }
    .el-menu-item{
        img{
            margin-right: 20px;
        }
    }
}


</style>