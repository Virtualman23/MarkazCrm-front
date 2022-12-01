<template>
    <el-row justify="space-between">
        <p>Guruxlar ro'yixati</p>
        <el-button class="d-center" @click="newAdd" type="primary">
            <el-icon><CirclePlusFilled /></el-icon>
            Yangi gurux
        </el-button>
    </el-row>
    
    <el-divider/>

    <el-table :data="payments">
        <el-table-column type="expand">
            <template #default="props">
                <el-table style="width: 90%; margin: auto;" :data="props.row.historysumma" :border="true">
                    <el-table-column label="Summa" prop="summa" />
                    <el-table-column label="To'lov sanasi">
                        <template #default="scope">
                            {{data(scope.row.data)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="Turi" prop="typepayment" />
                    <el-table-column label="Comment" prop="comment" />
                    <el-table-column align="right" width="150">
                        <template #default="scope">
                            <el-popconfirm 
                                title="...qaroringiz qatiymi?"
                                cancel-button-text="Eee yo'q"
                                cancel-button-type="success"
                                confirm-button-text="Voy xaa"
                                confirm-button-type="danger"
                                width="200"
                                @confirm="delHistory(scope.$index, props.row._id)"
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
            </template>
        </el-table-column>
        <el-table-column prop="pupil.name" label="O'quvchi"/>
        <el-table-column prop="group.title" label="Guruxi"/>
        <el-table-column label="To'lov summasi">
            <template #default="scope">
                {{scope.row.historysumma.at(-1).summa}} so'm
            </template>
        </el-table-column>
        <el-table-column label="To'lov turi">
            <template #default="scope">
                {{scope.row.historysumma.at(-1).typepayment}}
            </template>
        </el-table-column>
        <el-table-column label="Izoh">
            <template #default="scope">
                {{scope.row.historysumma.at(-1).comment}}
            </template>
        </el-table-column>
        <el-table-column label="To'lov sanasi">
            <template #default="scope">
                {{data(scope.row.historysumma.at(-1).data)}}
            </template>
        </el-table-column>
        <el-table-column align="right" width="150">
            <template #default="scope">
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
            :model="newPayment"
            ref="ValidateForm"
            label-position="left"
            label-width="auto">
            <el-form-item :rules="[{ required: true, message: 'maydonni to`ldiring' },]" prop="group" label="Guruxi">
                <el-select v-model="newPayment.group" placeholder="Guruxni tanlang">
                    <el-option v-for="item,i of groups"
                        :key="i" :label="item.title" :value="item._id"/>
                </el-select>
            </el-form-item>
            <el-form-item 
                :rules="[
                    { required: true, message: 'maydonni to`ldiring' },
                ]"
                prop="pupil"
                label="O'quvchi">
                <el-select v-model="newPayment.pupil" placeholder="O'quvchini tanlang">
                    <el-option v-for="item,i of pupils"
                        :key="i" :label="item.name" :value="item._id"/>
                </el-select>
            </el-form-item>
            <el-form-item 
                :rules="[
                    { required: true, message: 'maydonni to`ldiring' },
                ]"
                prop="summa"
                label="To'lo'v summasi">
                <el-input-number controls-position="right" v-model="newPayment.summa" />
            </el-form-item>
            <el-form-item
                :rules="[
                    { required: true, message: 'maydonni to`ldiring' },
                ]"
                prop="data"
                label="To'lo'v sanasi">
                <el-date-picker
                    v-model="newPayment.data"
                    type="date"
                    placeholder="Sanani tanlang"
                />
            </el-form-item>
            <el-form-item
            :rules="[
                    { required: true, message: 'maydonni to`ldiring' },
                ]"
                prop="typepayment"
                label="To'lo'v turi">
                <el-select v-model="newPayment.typepayment"
                    placeholder="Tanlang">
                    <el-option value="plastik" label="Plastik"/>
                    <el-option value="naqt" label="Naqt"/>
                    <el-option value="click" label="Click"/> 
                </el-select>
            </el-form-item>
            <el-form-item
                :rules="[
                    { required: true, message: 'maydonni to`ldiring' },
                ]"
                prop="comment"
                label="Izoh">
                <el-input v-model="newPayment.comment"/>
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
            newPayment: {
                direction:'',
                worker:''
            },
            toggle: false,
        };
    },
    computed: {
        payments() {
            return this.$store.getters.payments;
        },
        groups(){
            return this.$store.getters.groups
        },
        pupils(){
            return this.$store.getters.pupils.filter(pupil => pupil.group._id == this.newPayment.group)
        }
    },
    mounted() {
        this.$store.dispatch('i',5)
    },
    methods: {
        data(data){
            let hour = new Date(data)
            return `${hour.getDate(data)}.${hour.getMonth(data)+1}.${hour.getFullYear(data)}`
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
        del(id){
            this.$store.dispatch("delPayment",id)
            this.$message({
                message: "Gurux o'chirildi",
                type: "success"
            })
        },
        delHistory(index, _id){
            this.$store.dispatch("delHistory",{index, _id})
            this.$message({
                message: "Gurux o'chirildi",
                type: "success"
            })
        },
        cancil(){
            this.$message({
                message: "Bekor qilindi",
                type: "success"
            });
            this.newPayment = {};
            this.toggleBtn = true
            this.toggle = false
        },
        save(){
            this.$store.dispatch("savePayment", this.newPayment);
            this.$message({
                message: "Yo`nalish yangilandi",
                type: "success"
            });
            // this.$store.dispatch('allPayments')
            this.newPayment = {};
            this.toggleBtn = true
            this.toggle = false
        },
        edit(_id){
            this.$store.dispatch('getPayment',_id)
            .then(res => {
                if (res.status === 200) {
                    this.newPayment = res.data
                    this.toggleBtn = false
                    this.toggle = true
                }
            })
        },
        add() {
            this.$store.dispatch("addPayment", this.newPayment);
            this.$message({
                message: "Yo`nalish qo`shildi",
                type: "success"
            });
            this.toggle = false;
        },
        newAdd(){
            this.toggle = true
            this.toggleBtn = true
            this.newPayment = {};
            this.$refs['ValidateForm'].resetFields()
        },
    },
}
</script>

<style lang="scss">

</style>