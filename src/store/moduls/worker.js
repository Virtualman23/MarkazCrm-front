const worker = {
    state:() =>({
        workers:[],
        worker:{}
    }),
    getters:{
        workers(state){
            return state.workers
        },
        worker(state){
            return state.worker
        },
    },
    mutations:{
        workers(state,payload){
            state.workers = payload
        },
        worker(state,payload){
            state.worker = payload
        },
        addWorker(state,payload){
            state.workers.unshift(payload)
        },
        saveWorker(state,payload){
            state.workers = state.workers.map(worker => {
                if(worker._id === payload._id){
                    return payload
                }
                return worker
            })
        },
        delWorker(state,payload){
            state.workers = state.workers.filter(worker => {
                if(worker._id === payload){
                    return false
                }
                return worker
            })
        },
    },
    actions:{
        saveWorker(context,payload){
            context.dispatch('postAxios',{
                url:`worker/save/${payload._id}`,
                data: payload
            })
            .then(res =>{
                if (res.status === 200) {
                    context.commit('saveWorker',payload)
                }
            })
        },
        delWorker(context,payload){
            context.dispatch('deleteAxios',`worker/delete/${payload}`)
            .then(res =>{
                if (res.status === 200) {
                    context.commit('delWorker',payload)
                }
            })
        },
        getWorker(context,payload){
            return context.dispatch('getAxios',`worker/edit/${payload}`)
        },
        allWorkers(context){
            context.dispatch('getAxios','worker')
            .then(res =>{
                if (res.status === 200) {
                    context.commit('workers',res.data)
                }
            })
        },
        addWorker(context,payload){
            context.dispatch('postAxios',{
                url:'worker/create',
                data: payload
            })
            .then(res =>{
                if (res.status === 200) {
                    context.commit('addWorker',res.data)
                }
            })
        },
    }
}

export default worker