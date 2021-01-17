
export const forUserReducer = ( users, objPropName, userId, followed ) => {
    return (
        users.map( u => {
            if (u[objPropName] === userId) {
                return {...u, ...followed}
            }
            return u;
        })
    )
}