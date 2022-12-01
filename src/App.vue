<template>
  <el-config-provider :locale="locale">
    <el-container class="vh">
      <el-aside width="230px">
        <NavBar/>
      </el-aside>
      <el-container>
        <!-- <el-header height="136px">
          <header-item/>
        </el-header> -->
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </el-config-provider>
  
</template>

<script>
import NavBar from './components/NavBar.vue'
import { ElConfigProvider } from 'element-plus'
// import HeaderItem from './components/HeaderItem.vue'
import uzUz from 'element-plus/dist/locale/uz-uz.mjs'

export default{
  data() {
    return {
      locale: uzUz,
    }
  },
  components: {NavBar, ElConfigProvider },
  mounted(){
    this.$store.dispatch('allPupils')
    this.$store.dispatch('allDirections')
    this.$store.dispatch('allGroups')
    this.$store.dispatch('allWorkers')
    this.$store.dispatch('allSpendings')
    this.$store.dispatch('allPayments')
  }
}

</script>

<style lang="scss">

@import '@/styles/app.scss';

</style>
