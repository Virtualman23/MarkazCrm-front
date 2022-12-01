const payment = {
    state:() =>({
        payments:[],
        payment:{}
    }),
    getters:{
        payments(state){
            return state.payments
        },
        payment(state){
            return state.payment
        },
    },
    mutations:{
        payments(state,payload){
            state.payments = payload
        },
        payment(state,payload){
            state.payment = payload
        },
        addPayment(state,payload){
            let flag = true
            state.payments = state.payments.map(payment =>{
                if (payment._id === payload._id) {
                    flag = false
                    return payload
                }
                return payment
            })
            if (flag) {
                state.payments.unshift(payload)
            }
        },
        savePayment(state,payload){
            state.payments = state.payments.map(payment => {
                if(payment._id === payload._id){
                    return payload
                }
                return payment
            })
        },
        delPayment(state,payload){
            state.payments = state.payments.filter(payment => {
                if(payment._id === payload){
                    return false
                }
                return payment
            })
        },
        delHistory(state,payload){
            state.payments = state.payments.map(payment => {
                if(payment._id === payload._id){
                    payment.historysumma.splice(payload.index, 1)
                }
                return payment
            })
        },
    },
    actions:{
        savePayment(context,payload){
            context.dispatch('postAxios',{
                url:`payment/save/${payload._id}`,
                data: payload
            })
            .then(res =>{
                if (res.status === 200) {
                    context.commit('savePayment',res.data)
                }
            })
        },
        delPayment(context,payload){
            context.dispatch('deleteAxios',`payment/delete/${payload}`)
            .then(res =>{
                if (res.status === 200) {
                    context.commit('delPayment',payload)
                }
            })
        },
        delHistory(context,payload){
            context.dispatch('deleteAxios',`payment/del/${payload._id}/${payload.index}`)
            .then(res =>{
                if (res.status === 200) {
                    context.commit('delHistory',payload)
                }
            })
        },
        getPayment(context,payload){
            return context.dispatch('getAxios',`payment/edit/${payload}`)
        },
        allPayments(context){
            context.dispatch('getAxios','payment')
            .then(res =>{
                if (res.status === 200) {
                    context.commit('payments',res.data)
                }
            })
        },
        addPayment(context,payload){
            context.dispatch('postAxios',{
                url:'payment/create',
                data: payload
            })
            .then(res =>{
                if (res.status === 200) {
                    context.commit('addPayment',res.data)
                }
            })
        },
    }
}

export default payment