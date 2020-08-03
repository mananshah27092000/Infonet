import React,{useReducer, createContext} from 'react';

const intialState = null;

const store = createContext(intialState)
const {Provider} = store

//Step for reducer
const reducer = (state,action)=>{
    if(action.type ==="USER"){
        return action.payload
    }else if(action.type === "CLEAR"){
        return null
    }
    if(action.type === "UPDATE"){
        return {
            ...state,
            followers : action.payload.followers,
            following : action.payload.following
        }
    }
    return state
}

const StateProvider = ({children})=>{ 
    
    // subscribe
    const [state,dispatch] = useReducer(reducer,intialState)
    
    return (<Provider value = {{state,dispatch}}> {children} </Provider>)
}


export {store,StateProvider}