const spending = {
    state:() =>({
        spendings:[],
        spending:{}
    }),
    getters:{
        spendings(state){
            return state.spendings
        },
        spending(state){
            return state.spending
        },
    },
    mutations:{
        spendings(state,payload){
            state.spendings = payload
        },
        spending(state,payload){
            state.spending = payload
        },
        addSpending(state,payload){
            state.spendings.unshift(payload)
        },
        saveSpending(state,payload){
            state.spendings = state.spendings.map(spending => {
                if(spending._id === payload._id){
                    return payload
                }
                return spending
            })
        },
        delSpending(state,payload){
            state.spendings = state.spendings.filter(spending => {
                if(spending._id === payload){
                    return false
                }
                return spending
            })
        },
    },
    actions:{
        saveSpending(context,payload){
            context.dispatch('postAxios',{
                url:`spending/save/${payload._id}`,
                data: payload
            })
            .then(res =>{
                if (res.status === 200) {
                    context.commit('saveSpending',payload)
                }
            })
        },
        delSpending(context,payload){
            context.dispatch('deleteAxios',`spending/delete/${payload}`)
            .then(res =>{
                console.log(res.data);
                context.commit('delSpending',payload)
            })
        },
        getSpending(context,payload){
            return context.dispatch('getAxios',`spending/edit/${payload}`)
        },
        allSpendings(context){
            context.dispatch('getAxios','spending')
            .then(res =>{
                if (res.status === 200) {
                    context.commit('spendings',res.data)
                }
            })
        },
        addSpending(context,payload){
            context.dispatch('postAxios',{
                url:'spending/create',
                data: payload
            })
            .then(res =>{
                if (res.status === 200) {
                    context.commit('addSpending',res.data)
                }
            })
        },
    }
}

export default spending