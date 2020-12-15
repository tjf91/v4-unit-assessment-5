
const initialState={
    username:'',
    pic:''
}

const UPDATE_USER='UPDATE_USER'
const LOGOUT='LOGOUT'

export function logout(){
    return{
        type:LOGOUT,
    }
}
export function updateUser(user){
    
    return{
        type:UPDATE_USER,
        payload:user
    }
}


export default function reducer(state=initialState,action){
    switch (action.type) {
        case UPDATE_USER:
            return{...state,username:action.payload.username,pic:action.payload.pic}         
        case LOGOUT:
            return initialState           
    
        default:
            return state
    }
}