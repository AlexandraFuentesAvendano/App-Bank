//
//this fn should receive as argument the id and the array of accounts
//you need to loop through the array 
//if the id received as arg　is equal to the index of the array 
//you return the name



const users = [
    {id: 1, name:"yasuhito"},
    {id: 2, name:"diogo"}, 
    {id: 3, name:"bart"}
]

export function getUsername(id, arrayAccount) {
    for (let i = 0; i < arrayAccount.length; i ++) {
        console.log(arrayAccount[i])
        //if the id r   eceived as param = to arrayaccount id 
        if(id === arrayAccount[i].id){
            console.log("found", arrayAccount[i].username)
            return arrayAccount[i].username;
        }
        //return name
        
    }
}

