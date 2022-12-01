const pupil = {
    state:() =>({
        pupils:[],
        pupil:{}
    }),
    getters:{
        pupils(state){
            return state.pupils
        },
        pupil(state){
            return state.pupil
        },
    },
    mutations:{
        pupils(state,payload){
            state.pupils = payload
        },
        pupil(state,payload){
            state.pupil = payload
        },
        addPupil(state,payload){
            state.pupils.unshift(payload)
        },
        savePupil(state,payload){
            state.pupils = state.pupils.map(pupil => {
                if(pupil._id === payload._id){
                    return payload
                }
                return pupil
            })
        },
        delPupil(state,payload){
            state.pupils = state.pupils.filter(pupil => {
                if(pupil._id === payload){
                    return false
                }
                return pupil
            })
        },
    },
    actions:{
        savePupil(context,payload){
            context.dispatch('postAxios',{
                url:`pupil/save/${payload._id}`,
                data: payload
            })
            .then(res =>{
                if (res.status === 200) {
                    context.commit('savePupil',res.data)
                }
            })
        },
        delPupil(context,payload){
            context.dispatch('deleteAxios',`pupil/delete/${payload}`)
            .then(res =>{
                if (res.status === 200) {
                    context.commit('delPupil',payload)
                }
            })
        },
        getPupil(context,payload){
            return context.dispatch('getAxios',`pupil/edit/${payload}`)
        },
        allPupils(context){
            context.dispatch('getAxios','pupil')
            .then(res =>{
                if (res.status === 200) {
                    context.commit('pupils',res.data)
                }
            })
        },
        addPupil(context,payload){
            context.dispatch('postAxios',{
                url:'pupil/create',
                data: payload
            })
            .then(res =>{
                if (res.status === 200) {
                    context.commit('addPupil',res.data)
                }
            })
        },
    }
}

export default pupil