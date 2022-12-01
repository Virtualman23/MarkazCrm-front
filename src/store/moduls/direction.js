const direction = {
    state:() =>({
        directions:[],
        direction:{}
    }),
    getters:{
        directions(state){
            return state.directions
        },
        direction(state){
            return state.direction
        },
    },
    mutations:{
        directions(state,payload){
            state.directions = payload
        },
        direction(state,payload){
            state.direction = payload
        },
        addDirection(state,payload){
            state.directions.unshift(payload)
        },
        saveDirection(state,payload){
            state.directions = state.directions.map(direction => {
                if(direction._id === payload._id){
                    return payload
                }
                return direction
            })
        },
        delDirection(state,payload){
            state.directions = state.directions.filter(direction => {
                if(direction._id === payload){
                    return false
                }
                return direction
            })
        },
    },
    actions:{
        saveDirection(context,payload){
            context.dispatch('postAxios',{
                url:`direction/save/${payload._id}`,
                data: payload
            })
            .then(res =>{
                if (res.status === 200) {
                    context.commit('saveDirection',payload)
                }
            })
        },
        delDirection(context,payload){
            context.dispatch('deleteAxios',`direction/delete/${payload}`)
            .then(res =>{
                console.log(res.data);
                context.commit('delDirection',payload)
            })
        },
        getDirection(context,payload){
            return context.dispatch('getAxios',`direction/edit/${payload}`)
        },
        allDirections(context){
            context.dispatch('getAxios','direction')
            .then(res =>{
                if (res.status === 200) {
                    context.commit('directions',res.data)
                }
            })
        },
        addDirection(context,payload){
            context.dispatch('postAxios',{
                url:'direction/create',
                data: payload
            })
            .then(res =>{
                if (res.status === 200) {
                    context.commit('addDirection',res.data)
                }
            })
        },
    }
}

export default direction