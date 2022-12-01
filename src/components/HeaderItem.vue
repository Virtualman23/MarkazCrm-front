<template>
<div class="header">
    <div class="header__title">
    <div class="header__name">Welcome, Alexa A.</div>
    <div class="header__date">Tue, 07 June 2022</div>
    </div>
    <div class="header__search">
    <el-icon size="24px"><Search/></el-icon>
    <el-input></el-input>
    </div>
    <div class="header__avatar"><img src="@/assets/icons/Avatar-1.svg" alt="avatar"></div>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

.header{
padding: 32px 20px;
display: flex;
gap: 20px;
&__title{
    max-width: 250px;
}
&__name{
    font-weight: medium;
    font-size: 24px;
    padding-bottom: 12px;
    color: #3E435D;
}
&__date{
    font-size: 16px;
    font-weight: light;
    color: #A7A7A7;
}
&__search{
    border-radius: 8px;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 14px 20px;
    margin-left: auto;
    gap: 16px;
}
&__input{
    border: unset;
    height: 24px;
    width: 100%;
}
}


</style>