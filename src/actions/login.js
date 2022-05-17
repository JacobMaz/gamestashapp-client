
export const login =(data)=>{
    if(data.status === 'success'){
        return {
            type: 'LOGIN'
        }   
    }
}