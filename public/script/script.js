

document.getElementById("form").onsubmit = function() {
    clearErrors();

    // checks if the form is valid for submission.
    let isValid = true;
    // regex patterns
    const emailPattern = /@/;
    const dotPattern = /\./;
    // retrieves the value in each id.
    let firstName = document.getElementById('fname').value;
    let lastName = document.getElementById('lname').value;
    let position = document.getElementById('position').value;
    let number = document.getElementById('number').value;
    let email = document.getElementById('email').value; 
    let group = document.getElementById('group').value;
    // checks if firstName is empty and displays an error if it is.
    if(firstName == "") {
        let errSpan = document.getElementById('err-fname');
        errSpan.style.color = "red";
        errSpan.style.marginTop = "1rem";
        errSpan.style.display = "inline"; 
        isValid = false;  
    }
    // checks if lastName is empty and displays an error if it is.
    if(lastName == "") {
        let errSpan = document.getElementById('err-lname');
        errSpan.style.color = "red";
        errSpan.style.marginTop = "1rem";
        errSpan.style.display = "inline"; 
        isValid = false;  
    }
    // checks if position is empty and displays an error if it is.
    if(position == "") {
        let errSpan = document.getElementById('err-position');
        errSpan.style.color = "red";
        errSpan.style.marginTop = "1rem";
        errSpan.style.display = "inline"; 
        isValid = false;  
    }
    // checks if number is empty or negative and displays an error if it is.
    if(number == "" || number < 0) {
        let errSpan = document.getElementById('err-number');
        errSpan.style.color = "red";
        errSpan.style.marginTop = "1rem";
        errSpan.style.display = "inline"; 
        isValid = false;  
    }
    // checks if email is empty or lacks @ and dot symbol and displays an error if it is.
    if(email === "" && !emailPattern.test(email) || !dotPattern.test(email)) {
      
            let errSpan = document.getElementById('err-email');
            errSpan.style.color = "red";
            errSpan.style.marginTop = "1rem";
            errSpan.style.display = "inline";
        
        
        isValid = false; 
    }

    const validGroups = ["A", "B", "C", "D"];
    // checks if the entered information matches the required informations.
    if (!validGroups.includes(group.toUpperCase())) {
        let errSpan = document.getElementById('err-group');
        errSpan.style.color = "red";
        errSpan.style.marginTop = "1rem";
        errSpan.style.display = "inline"; 
        isValid = false;  
    }

    return isValid;
}
// clears the previous errors from the fields.
function clearErrors() {
    let errors = document.getElementsByClassName("err");
 
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
 
}
