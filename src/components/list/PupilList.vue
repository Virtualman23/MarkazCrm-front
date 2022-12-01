<template>
    <el-row justify="space-between">
        <p>O'quvchilar ro'yixati</p>
        <el-button class="d-center" @click="newAdd" type="primary">
            <el-icon><CirclePlusFilled /></el-icon>
            Yangi o'quvchi
        </el-button>
    </el-row>
    
    <el-divider/>

    <el-table :data="pupils">
        <el-table-column   prop="name" label="O'quvchi ismi"/>
        <el-table-column prop="group.title" label="Gurux nomi"/>
        <el-table-column prop="phone" label="Tel raqami"/>
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
        :title="`${toggleBtn?'Yangi o`quvchi':'O`quvchini tahrirlash'}`">
        <el-form 
            :model="newPupil"
            label-position="top">
            <el-form-item label="Ismi">
                <el-input v-model="newPupil.name" />
            </el-form-item>
            <el-form-item label="Gurux nomi">
                <el-select v-model="newPupil.group" 
                placeholder="Guruxni tanlang">
                    <el-option v-for="item,i of groups"
                        :key="i" :label="item.title" :value="item._id"/>
                </el-select>
            </el-form-item>
            <el-form-item label="Tel raqami">
                <el-input v-model="newPupil.phone" placeholder="+998901234567" v-maska="`+###(##)###-##-##`"/>
            </el-form-item>
            <el-button 
                v-show="toggleBtn"
                class="d-center"
                type="success" plain
                @click="add">
                <el-icon><Select /></el-icon>
                Kiritish
            </el-button>
            <el-button 
                class="d-center"
                @click="save"
                type="success" plain
                v-show="!toggleBtn">
                <el-icon><Select/></el-icon>
                Saqlash
            </el-button>
            <el-button 
                @click="cancil"
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
            newPupil: {
            },
            toggle: false,
        };
    },
    computed: {
        pupils() {
            return this.$store.getters.pupils;
        },
        groups(){
            return this.$store.getters.groups
        }
    },
    mounted() {
        this.$store.dispatch('i',3)
    },
    methods: {
        del(id){
            this.$store.dispatch("delPupil",id)
            this.$message({
                message: "O'quvchi o'chirildi",
                type: "success"
            })
        },
        cancil(){
            this.$message({
                message: "Bekor qilindi",
                type: "success"
            });
            this.newPupil = {};
            this.toggleBtn = true
            this.toggle = false
        },
        save(){
            this.$store.dispatch("savePupil", this.newPupil);
            this.$message({
                message: "O'quvchi yangilandi",
                type: "success"
            });
            this.newPupil = {};
            this.toggleBtn = true
            this.toggle = false
        },
        edit(_id){
            this.$store.dispatch('getPupil',_id)
            .then(res => {
                if (res.status === 200) {
                    this.newPupil = res.data
                    this.toggleBtn = false
                    this.toggle = true
                }
            })
        },
        add() {
            this.$store.dispatch("addPupil", this.newPupil);
            this.$message({
                message: "O'quvchi qo`shildi",
                type: "success"
            });
            this.newPupil = {};
            this.toggle = false;
        },
        newAdd(){
            this.toggle = true
            this.toggleBtn = true
            this.newPupil = {};
        },
    },
}
</script>

<style lang="scss">

</style>