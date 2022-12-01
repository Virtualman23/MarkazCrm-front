<template>
    <el-row justify="space-between">
        <p>Xodimlar ro'yixati</p>
        <el-button class="d-center" @click="newAdd" type="primary">
            <el-icon><CirclePlusFilled /></el-icon>
            Yangi xodim
        </el-button>
    </el-row>
    
    <el-divider/>

    <el-table :data="workers">
        <el-table-column   prop="name" label="Xodim ism" width="400"/>
        <el-table-column prop="phone" label="Tel raqami"/>
        <el-table-column label="Oylik">
            <template #default="scope">
                {{scope.row.salary.toLocaleString()}} so'm
            </template>
        </el-table-column>
        <el-table-column label="Lavozimi">
            <template #default="scope">
                {{who[scope.row.who]}}
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
        :title="`${toggleBtn?'Yangi xodim':'Xodim alumotlarini tahrirlash'}`">
        <el-form 
            :model="newWorker"
            ref="ValidateForm"
            label-position="top">
            <el-form-item :rules="[
                    { required: true, message: 'maydonni to`ldiring' },
                ]"
                prop="name" label="Xodim ismi">
                <el-input v-model="newWorker.name" />
            </el-form-item>
            <el-form-item :rules="[
                    { required: true, message: 'maydonni to`ldiring' },
                ]"
                prop="phone" label="Tel raqami">
                <el-input v-model="newWorker.phone" placeholder="+998901234567" v-maska="`+###(##)###-##-##`"/>
            </el-form-item>
            <el-form-item :rules="[
                    { required: true, message: 'maydonni to`ldiring' },
                ]"
                prop="salary" label="Oylik summasi">
                <el-input-number 
                    :min="100000"  
                    :step="100000"
                    controls-position="right" 
                    v-model="newWorker.salary"
                    placeholder="1000000"/>
            </el-form-item>
            <el-form-item :rules="[
                    { required: true, message: 'maydonni to`ldiring' },
                ]"
                prop="who" label="Lavozimi">
                <el-select v-model="newWorker.who">
                    <el-option
                        v-for="item,i of who"
                        :key="i"
                        :label="item"
                        :value="i"/>
                </el-select>
            </el-form-item>
            
            <el-button 
                @click="submitForm('ValidateForm', true)"
                class="d-center"
                v-show="toggleBtn"
                type="success" plain>
                <el-icon><Select/></el-icon>
                Saqlash
            </el-button>
            <el-button 
                @click="submitForm('ValidateForm', false)"
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
            newWorker: {
                phone:'+998'
            },
            toggle: false,
            who:[
                'dasturchi',
                'marketolog',
                'Administrator'
            ],
        };
    },
    computed: {
        workers() {
            return this.$store.getters.workers;
        }
    },
    methods: {
        del(id){
            this.$store.dispatch("delWorker",id)
            this.$message({
                message: "Xodim o'chirildi",
                type: "success"
            })
        },
        submitForm(formName, add) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (add) {
                        this.add()
                    }else{
                        this.save()
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancil(){
            this.$message({
                message: "Bekor qilindi",
                type: "success"
            });
            this.newWorker = {};
            this.toggleBtn = true
            this.toggle = false
        },
        save(){
            this.$store.dispatch("saveWorker", this.newWorker);
            this.$message({
                message: "Xodim yangilandi",
                type: "success"
            });
            this.newWorker = {};
            this.toggleBtn = true
            this.toggle = false
        },   
        edit(_id){
            this.$store.dispatch('getWorker',_id)
            .then(res => {
                if (res.status === 200) {
                    this.toggle = true
                    this.newWorker = res.data
                    this.toggleBtn = false
                }
            })
        },
        add() {
            this.$store.dispatch("addWorker", this.newWorker);
            this.$message({
                message: "Xodim qo`shildi",
                type: "success"
            });
            this.newWorker = {};
            this.toggle = false;
        },
        newAdd(){
            this.toggle = true
            this.toggleBtn = true
            this.$refs['ValidateForm'].resetFields()
            this.newWorker = {};
        },
    },
    mounted() {
        this.$store.dispatch('i',1)
    },
}
</script>

<style lang="scss">

</style>