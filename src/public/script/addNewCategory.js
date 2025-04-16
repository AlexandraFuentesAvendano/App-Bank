// initialize the new category form including add event listener to the form
$(() => {
    initializeForm();
  });
  
  const initializeForm = () => {
    const categoryForm = $("#addButton");
  
    // when submit event happens
    categoryForm.on("click", putCategoryName);
  };

  // send request with the category name from input, to the server
  const putCategoryName = async (event) => {
      event.preventDefault();
      //get input selector
      const categoryName = $("#newCategory");

      //make a object
      let categoryData = {
      newCategory: categoryName.val()
      }

      //make a JSON data
      const jsonData = JSON.stringify(categoryData);

      //send a data to server
      try {
        const response = await fetch("http://localhost:3000/categories" , {
            method: "POST",
            body: jsonData,
            headers: {
                "Content-Type": "application/json"
            }
          });
          //get a response from server
          const responseData = await response.json();
          console.log("response", responseData);
      } catch(error){
        console.log("error", error);
      }    
  // with the new category created responded from server, append to the category select
  const item = $(`
  <option value="newCategory">${categoryName.val()}</option>
  `);
  const category = $("#category");
  category.append(item);
  
};