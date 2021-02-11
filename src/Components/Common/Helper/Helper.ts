
export const forUserReducer = ( users: any, objPropName: any, userId: any, followed: any ) => {
    return (
        users.map( (u: any) => {
            if (u[objPropName] === userId) {
                return {...u, ...followed}
            }
            return u;
        })
    )
}
