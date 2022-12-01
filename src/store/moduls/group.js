const group = {
    state:() =>({
        groups:[],
        group:{}
    }),
    getters:{
        groups(state){
            return state.groups
        },
        group(state){
            return state.group
        },
    },
    mutations:{
        groups(state,payload){
            state.groups = payload
        },
        group(state,payload){
            state.group = payload
        },
        addGroup(state,payload){
            state.groups.unshift(payload)
        },
        saveGroup(state,payload){
            state.groups = state.groups.map(group => {
                if(group._id === payload._id){
                    return payload
                }
                return group
            })
        },
        delGroup(state,payload){
            state.groups = state.groups.filter(group => {
                if(group._id === payload){
                    return false
                }
                return group
            })
        },
    },
    actions:{
        saveGroup(context,payload){
            context.dispatch('postAxios',{
                url:`group/save/${payload._id}`,
                data: payload
            })
            .then(res =>{
                if (res.status === 200) {
                    context.commit('saveGroup',res.data)
                }
            })
        },
        delGroup(context,payload){
            context.dispatch('deleteAxios',`group/delete/${payload}`)
            .then(res =>{
                if (res.status === 200) {
                    context.commit('delGroup',payload)
                }
            })
        },
        getGroup(context,payload){
            return context.dispatch('getAxios',`group/edit/${payload}`)
        },
        allGroups(context){
            context.dispatch('getAxios','group')
            .then(res =>{
                if (res.status === 200) {
                    context.commit('groups',res.data)
                }
            })
        },
        addGroup(context,payload){
            context.dispatch('postAxios',{
                url:'group/create',
                data: payload
            })
            .then(res =>{
                if (res.status === 200) {
                    context.commit('addGroup',res.data)
                }
            })
        },
    }
}

export default group