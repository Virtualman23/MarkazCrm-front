<template>
    <el-row justify="space-between">
        <p>Chiqimlar ro'yixati</p>
        <el-button class="d-center" @click="newAdd" type="primary">
            <el-icon><CirclePlusFilled /></el-icon>
            Yana chiqim
        </el-button>
    </el-row>
    
    <el-divider/>

    <el-table :data="spendings">
        <el-table-column prop="summa" label="Chiqim summasi" width="200">
            <template #default="scope">
                {{scope.row.summa.toLocaleString()}} so'm
            </template>
        </el-table-column>
        <el-table-column prop="comment" label="Izoh"/>
        <el-table-column label="Yaratilgan vaqti" width="170">
            <template #default="scope">
                {{cAt(scope.row.createdAt)}}
            </template>
        </el-table-column>
        <el-table-column label="Yangilangan vaqti" width="170">
            <template #default="scope">
                {{uAt(scope.row.updatedAt)}}
            </template>
        </el-table-column>
        <el-table-column align="right" width="150">
            <template #default="scope">
                <el-button type="warning" @click="edit(scope.row._id)">
                    <el-icon size="20"><EditPen/></el-icon>
                </el-button>
                <el-popconfirm 
                    title="...qaroringiz qatiymi?"
                    cancel-button-text="Eee yo'q"
                    cancel-button-type="success"
                    confirm-button-text="Voy xaa"
                    confirm-button-type="danger"
                    width="200"
                    @confirm="del(scope.row._id)"
                    @cancel="cancil()">
                    <template #reference>
                        <el-button type="danger">
                            <el-icon size="20"><Delete/></el-icon>
                        </el-button>
                    </template>
                </el-popconfirm>
                
            </template>
        </el-table-column>
    </el-table>   
    <el-dialog 
        width="600" 
        v-model="toggle" 
        :title="`${toggleBtn?'Yana chiqm':'Chiqimni o`zgartirish'}`">
        <el-form 
            :model="newSpending"
            label-position="top">
            <el-form-item label="Chiqim summasi">
                <el-input-number
                    controls-position="right"
                    v-model="newSpending.summa" />
            </el-form-item>
            <el-form-item label="izoh">
                <el-input v-model="newSpending.comment" />
            </el-form-item>
            <el-button 
                v-show="toggleBtn"
                class="d-center"
                @click="add"
                type="success" plain>
                <el-icon><Select /></el-icon>
                Kiritish
            </el-button>
            <el-button 
                @click="save"
                class="d-center"
                v-show="!toggleBtn"
                type="success" plain>
                <el-icon><Select/></el-icon>
                Saqlash
            </el-button>
            <el-button @click="cancil"
                class="d-center"
                type="warning" plain>
                <el-icon><CloseBold /></el-icon>
                Bekor qilish
            </el-button>
        </el-form>
    </el-dialog>
</template>

<script>

export default {
    data() {
        return {
            toggleBtn:true,
            newSpending: {},
            toggle: false,
        };
    },
    computed: {
        spendings() {
            return this.$store.getters.spendings;
        }
    },
    mounted() {
        this.$store.dispatch('i',4)
    },
    methods: {
        cAt(data){
            let hour = new Date(data)
            return `${hour.getDate(data)}.${hour.getMonth(data)+1}.${hour.getFullYear(data)} ${hour.getHours(data)}:${hour.getMinutes(data)}`
        },
        uAt(data){
            let hour = new Date(data)
            return `${hour.getDate(data)}.${hour.getMonth(data)+1}.${hour.getFullYear(data)} ${hour.getHours(data)}:${hour.getMinutes(data)}`
        },
        del(id){
            this.$store.dispatch("delSpending",id)
            this.$message({
                message: "Yo'nalish o'chirildi",
                type: "success"
            })
        },
        cancil(){
            this.$message({
                message: "Bekor qilindi",
                type: "success"
            });
            this.newSpending = {};
            this.toggleBtn = true
            this.toggle = false
        },
        save(){
            this.$store.dispatch("saveSpending", this.newSpending);
            this.$message({
                message: "Yo`nalish yangilandi",
                type: "success"
            });
            this.newSpending = {};
            this.toggleBtn = true
            this.toggle = false
        },   
        edit(_id){
            this.$store.dispatch('getSpending',_id)
            .then(res => {
                if (res.status === 200) {
                    this.newSpending = res.data
                    this.toggleBtn = false
                    this.toggle = true
                }
            })
        },
        add() {
            this.$store.dispatch("addSpending", this.newSpending);
            this.$message({
                message: "Yo`nalish qo`shildi",
                type: "success"
            });
            this.newSpending = {};
            this.toggle = false;
        },
        newAdd(){
            this.toggle = true
            this.toggleBtn = true
            this.newSpending = {};
        },
    },
}
</script>

<style lang="scss">

</style>