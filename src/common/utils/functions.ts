
export const matchRoles =(allowRoles, userRoles)=>{

    if(!allowRoles || !userRoles){
        return false;
    }
    const allowRolesLength = allowRoles.length;
    for (let i = 0; i < allowRolesLength; i++) {
        const allowRole = allowRoles[i];
        if(userRoles.includes(allowRole)){
            return true;
        }
    }
    return false;

}
