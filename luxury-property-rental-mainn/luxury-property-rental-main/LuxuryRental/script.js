function registerUser(){

    let name =
    document.getElementById("name").value;

    let email =
    document.getElementById("email").value;

    let password =
    document.getElementById("password").value;

    let confirmPassword =
    document.getElementById("confirmPassword").value;

    if(password !== confirmPassword){

        alert("Passwords do not match");

        return false;
    }

    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);

    alert("Registration Successful");

    return false;
}
function bookPropertyForm(){

    let property =
    document.getElementById("property").value;

    alert(
        "Booking Confirmed!\n\nProperty: " +
        property +
        "\nStatus: Pending Approval"
    );

    return false;
}
function loginUser(){

    let email =
    document.getElementById("loginEmail").value;

    let password =
    document.getElementById("loginPassword").value;

    if(email === "" || password === ""){

        alert("Please fill all fields");

        return false;
    }

    alert("Login Successful");

    return false;
}
