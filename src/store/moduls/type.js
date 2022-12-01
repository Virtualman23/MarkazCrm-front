
const type = {
    state: () =>({
        types:['']
    }),
    getters:{
        types(state){
            return state.types
        }
    }
}

export default type