async function registerUser() {

    let name =
    document.getElementById("name").value;

    let email =
    document.getElementById("email").value;

    let phone =
    document.getElementById("phone").value;

    let password =
    document.getElementById("password").value;

    let confirmPassword =
    document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {

        alert("Passwords do not match");

        return false;
    }

    const response = await fetch(
        "http://localhost:5000/register",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                password: password
            })
        }
    );

    const data = await response.text();

    alert(data);

    return false;
}

async function bookPropertyForm() {

    let customerName =
    document.getElementById("customerName").value;

    let customerEmail =
    document.getElementById("customerEmail").value;

    let phone =
    document.getElementById("phone").value;

    let property =
    document.getElementById("property").value;

    let checkin =
    document.getElementById("checkin").value;

    let checkout =
    document.getElementById("checkout").value;

    let guests =
    document.getElementById("guests").value;

    const response = await fetch(
        "http://localhost:5000/booking",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                customerName,
                customerEmail,
                phone,
                property,
                checkin,
                checkout,
                guests
            })
        }
    );

   const data = await response.json();

   alert(data.message);

    if(data.message === "Login Successful"){

    if(data.role === "admin"){

        window.location.href =
        "admin-dashboard.html";

    }
    else{

        window.location.href =
        "index.html";

    }

}

return false;
}

async function loginUser() {

    let email =
    document.getElementById("loginEmail").value;

    let password =
    document.getElementById("loginPassword").value;

    if (email === "" || password === "") {

        alert("Please fill all fields");

        return false;
    }

    const response = await fetch(
        "http://localhost:5000/login",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                password: password
            })
        }
    );

    const data = await response.json();

    alert(data.message);

    if(data.message === "Login Successful"){

        if(data.role === "admin"){

            window.location.href =
            "admin-dashboard.html";

        }
        else{

            window.location.href =
            "index.html";

        }

    }

    return false;
}

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

}

function searchProperties() {

    let input =
    document.getElementById("search").value.toLowerCase();

    let cards =
    document.querySelectorAll(".card");

    cards.forEach((card) => {

        let text =
        card.innerText.toLowerCase();

        if (text.includes(input)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";
        }

    });
}