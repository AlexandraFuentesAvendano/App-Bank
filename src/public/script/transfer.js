// In init execute code
$(() => {
    //Function to fill the data from the users in the selector
    fillDataIntoAccountSelect()
    //Function that onChange the radio buttons hide or show the interface
    onChangeRadioButton()
})

const onChangeRadioButton = () =>{
    //hiding initially the tranfer input
    $('#textFrom').hide()
    $('#accountToDiv').hide()

    //generates a function on change that is used to hide the different code dinamically
    $('input[type=radio][name=transactionType]').on('change', function (){
        if(this.value == 'Transfer'){
            $('#textFrom').show()
            $('#accountToDiv').show()
        }else{
            $('#textFrom').hide()
            $('#accountToDiv').hide()
        }
    })
}

const fillDataIntoAccountSelect = async() => {
    $('#accountTo').empty()
    //get the list of accounts
    await getAccounts()
    .then((response) =>
    {
        //foreach element in the response we create a new row in the selector with the id and the username
        response.forEach(element => {
            $('#accountTo').append(`<option value='${element.id}'>${element.username}</option>`)
        });
    })
}

// function that receives the data from the api and return a json with the accounts
const getAccounts = async () => {
    const response = await fetch("http://localhost:3000/accounts")
    if (!response.ok) {
        throw new Error("something gone wrong while getting accounts")
    }
    return response.json()
}