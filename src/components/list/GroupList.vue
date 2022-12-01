<template>
    <el-row justify="space-between">
        <p>Guruxlar ro'yixati</p>
        <el-button class="d-center" @click="newAdd" type="primary">
            <el-icon><CirclePlusFilled /></el-icon>
            Yangi gurux
        </el-button>
    </el-row>
    
    <el-divider/>
    <el-table :data="groups">
        <el-table-column prop="title" label="Gurux nomi"/>
        <el-table-column label="Yo'nalishi">
            <template #default="scope">
                {{scope.row.direction.title}} 
            </template>
        </el-table-column>
        <el-table-column prop="woker.name" label="O'qituvchi">
            <template #default="scope">
                {{scope.row.worker.name}} 
            </template>
        </el-table-column>
        <el-table-column label="Kurs narxi">
            <template #default="scope">
                {{scope.row.price.toLocaleString()}} so'm
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
        :title="`${toggleBtn?'Yangi gurux':'Guruxni tahrirlash'}`">
        <el-form 
            :model="newGroup"
            ref="ValidateForm"
            label-position="top">
            <el-form-item :rules="[{ required: true, message: 'maydonni to`ldiring' },]" prop="title" label="Gurux nomi">
                <el-input v-model="newGroup.title" />
            </el-form-item>
            <el-form-item :rules="[{ required: true, message: 'maydonni to`ldiring' },]" prop="direction" label="Yo'nalish">
                <el-select v-model="newGroup.direction" placeholder="Yo'nalishni tanlang">
                    <el-option v-for="item,i of directions"
                        :key="i" :label="item.title" :value="item._id"/>
                </el-select>
            </el-form-item>
            <el-form-item :rules="[{ required: true, message: 'maydonni to`ldiring' },]" prop="worker" label="O'qituvchi">
                <el-select v-model="newGroup.worker" placeholder="O'qituvchinini tanlang">
                    <el-option v-for="item,i of workers"
                        :key="i" :label="item.name" :value="item._id"/>
                </el-select>
            </el-form-item>
            <el-form-item :rules="[{ required: true, message: 'maydonni to`ldiring' },]" prop="price" label="Kurs narxi">
                <el-input-number controls-position="right" v-model="newGroup.price" />
            </el-form-item>
            <el-button 
                v-show="toggleBtn"
                class="d-center"
                type="success" plain
                @click="submitForm('ValidateForm', true)">
                <el-icon><Select /></el-icon>
                Kiritish
            </el-button>
            <el-button 
                class="d-center"
                @click="submitForm('ValidateForm', false)"
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
            newGroup: {
                direction:'',
                worker:''
            },
            toggle: false,
        };
    },
    computed: {
        groups() {
            return this.$store.getters.groups;
        },
        directions(){
            return this.$store.getters.directions
        },
        workers(){
            return this.$store.getters.workers.filter(worker => {
                if(worker.who !== 0) return false
                return worker
            })
        }
    },
    mounted() {
        this.$store.dispatch('i',2)
    },
    methods: {
        del(id){
            this.$store.dispatch("delGroup",id)
            this.$message({
                message: "Gurux o'chirildi",
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
            this.newGroup = {};
            this.toggleBtn = true
            this.toggle = false
        },
        save(){
            this.$store.dispatch("saveGroup", this.newGroup);
            this.$message({
                message: "Yo`nalish yangilandi",
                type: "success"
            });
            // this.$store.dispatch('allGroups')
            this.newGroup = {};
            this.toggleBtn = true
            this.toggle = false
        },
        edit(_id){
            this.$store.dispatch('getGroup',_id)
            .then(res => {
                if (res.status === 200) {
                    this.newGroup = res.data
                    this.toggleBtn = false
                    this.toggle = true
                }
            })
        },
        add() {
            this.$store.dispatch("addGroup", this.newGroup);
            this.$message({
                message: "Yo`nalish qo`shildi",
                type: "success"
            });
            this.toggle = false;
        },
        newAdd(){
            this.toggle = true
            this.toggleBtn = true
            this.$refs['ValidateForm'].resetFields()
            this.newGroup = {};
        },
    },
}
</script>

<style lang="scss">

</style>