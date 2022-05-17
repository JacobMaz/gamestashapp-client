
export const sessionToken =(data)=>{
    if(data.status === 'success'){
        return {
            type: 'SUCCESS',
            payload: data
        }   
    }
}