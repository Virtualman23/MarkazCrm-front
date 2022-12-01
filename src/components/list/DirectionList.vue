<template>
    <el-row justify="space-between">
        <p>Yo'nalishlar ro'yixati</p>
        <el-button class="d-center" @click="newAdd" type="primary">
            <el-icon><CirclePlusFilled /></el-icon>
            Yangi yo'nalish
        </el-button>
    </el-row>
    
    <el-divider/>

    <el-table :data="directions">
        <el-table-column   prop="title" label="Yo'nalish nomi"/>
        <el-table-column prop="status" label="Status holati"/>
        <el-table-column label="Yaratilgan vaqti">
            <template #default="scope">
                {{cAt(scope.row.createdAt)}}
            </template>
        </el-table-column>
        <el-table-column prop="updatedAt" label="Yangilangan vaqti">
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
        :title="`${toggleBtn?'Yangi yo`nalish':'Yo`nalishni tahrirlash'}`">
        <el-form 
            :model="newDirection"
            label-position="top">
            <el-form-item label="Yo'nalish nomi">
                <el-input v-model="newDirection.title" />
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
            newDirection: {},
            toggle: false,
        };
    },
    computed: {
        directions() {
            return this.$store.getters.directions;
        }
    },
    mounted() {
        this.$store.dispatch('i',0)
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
            this.$store.dispatch("delDirection",id)
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
            this.newDirection = {};
            this.toggleBtn = true
            this.toggle = false
        },
        save(){
            this.$store.dispatch("saveDirection", this.newDirection);
            this.$message({
                message: "Yo`nalish yangilandi",
                type: "success"
            });
            this.newDirection = {};
            this.toggleBtn = true
            this.toggle = false
        },   
        edit(_id){
            this.$store.dispatch('getDirection',_id)
            .then(res => {
                if (res.status === 200) {
                    this.newDirection = res.data
                    this.toggleBtn = false
                    this.toggle = true
                }
            })
        },
        add() {
            this.$store.dispatch("addDirection", this.newDirection);
            this.$message({
                message: "Yo`nalish qo`shildi",
                type: "success"
            });
            this.newDirection = {};
            this.toggle = false;
        },
        newAdd(){
            this.toggle = true
            this.toggleBtn = true
            this.newDirection = {};
        },
    },
}
</script>

<style lang="scss">

</style>