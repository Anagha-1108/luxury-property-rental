const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/register", (req, res) => {

    console.log(req.body);

    const { name, email,phone, password } = req.body;

    const checkSql =
    "SELECT * FROM users WHERE email = ?";

    db.query(checkSql, [email], (err, result) => {

        if(err){
            console.log(err);
            return res.send("Registration Failed");
        }

        if(result.length > 0){
            return res.send("User Already Registered");
        }

        if(email.endsWith("@luxuryrentals.com")){

    return res.send(
        "This email is reserved for admins"
    );

}

        const insertSql = `
            INSERT INTO users(name, email,phone, password, role)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(
            insertSql,
            [name, email, phone, password, "user"],
            (err, result) => {

                if(err){
                    console.log("MYSQL ERROR:",err);
                    res.send("Registration Failed");
                }
                else{
                    res.send("User Registered Successfully");
                }

            }
        );

    });

});

router.get("/properties", (req, res) => {

    const sql = `
        SELECT * FROM properties
    `;

    db.query(sql, (err, result) => {

        if(err){
            console.log(err);
            res.send("Failed to Fetch Properties");
        } else {
            res.json(result);
        }

    });

});

router.put("/update-property/:id", (req, res) => {

    const id = req.params.id;

    const {
        title,
        location,
        price
    } = req.body;

    const sql = `
        UPDATE properties
        SET
            title = ?,
            location = ?,
            price = ?
        WHERE property_id = ?
    `;

    db.query(
        sql,
        [title, location, price, id],
        (err, result) => {

            if(err){
                console.log(err);
                res.send("Update Failed");
            } else {
                res.send("Property Updated Successfully");
            }

        }
    );

});

router.delete("/delete-property/:id", (req, res) => {

    const id = req.params.id;

    const sql = `
        DELETE FROM properties
        WHERE property_id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if(err){
            console.log(err);
            res.send("Delete Failed");
        } else {
            res.send("Property Deleted Successfully");
        }

    });

});

router.post("/add-property", (req, res) => {

    const {
        title,
        location,
        price,
        description,
        image,
        amenities,
        latitude,
        longitude,
        contact_number
    } = req.body;

    const sql = `
        INSERT INTO properties
        (
            title,
            location,
            price,
            description,
            image,
            amenities,
            latitude,
            longitude,
            contact_number
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            title,
            location,
            price,
            description,
            image,
            amenities,
            latitude,
            longitude,
            contact_number
        ],
        (err, result) => {

            if(err){
                console.log(err);
                res.send("Property Add Failed");
            } else {
                res.send("Property Added Successfully");
            }

        }
    );

});

router.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql = `
        SELECT * FROM users
        WHERE email = ? AND password = ?
    `;

    db.query(
        sql,
        [email, password],
        (err, result) => {

            if(err){
                console.log(err);
                res.send("Login Failed");
            }

            else if(result.length > 0){

            res.json({
            message: "Login Successful",
            role: result[0].role
            });

        }

            else{

            res.json({
            message: "Invalid Email or Password"
            });

        }

        }
    );

});

router.post("/booking", (req, res) => {

    const {
        customerName,
        customerEmail,
        phone,
        property,
        checkin,
        checkout,
        guests
    } = req.body;

    const checkBookingSql = `
        SELECT *
        FROM bookings
        WHERE customer_email = ?
        AND checkin_date <= ?
        AND checkout_date >= ?
    `;

    db.query(
        checkBookingSql,
        [
            customerEmail,
            checkout,
            checkin
        ],
        (err, result) => {

            if(err){
                console.log(err);
                return res.send("Booking Failed");
            }

            if(result.length > 0){
                return res.send(
                    "You already have a booking during these dates"
                );
            }

            const sql = `
                INSERT INTO bookings
                (
                    customer_name,
                    customer_email,
                    phone,
                    property_name,
                    checkin_date,
                    checkout_date,
                    guests
                )
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            db.query(
                sql,
                [
                    customerName,
                    customerEmail,
                    phone,
                    property,
                    checkin,
                    checkout,
                    guests
                ],
                (err, result) => {

                    if(err){
                        console.log(err);
                        res.send("Booking Failed");
                    }
                    else{
                        res.send("Booking Successful");
                    }

                }
            );

        }
    );

});

router.get("/all-users", (req, res) => {

    const sql = `
        SELECT name, email, phone
        FROM users
        WHERE role='user'
    `;

    db.query(sql, (err, result) => {

        if(err){
            console.log(err);
            return res.send("Failed");
        }

        res.json(result);

    });

});

router.get("/all-bookings", (req, res) => {

    const sql = `
        SELECT
        customer_name,
        customer_email,
        property_name,
        checkin_date,
        checkout_date,
        guests
        FROM bookings
    `;

    db.query(sql, (err, result) => {

        if(err){
            console.log(err);
            return res.send("Failed");
        }

        res.json(result);

    });

});


router.post("/admin-login",(req,res)=>{

    const {email,password}=req.body;
    if(!email.endsWith("@luxuryrental.com")){

    return res.json({
        message:
        "Only Luxury Rental Admin Emails Allowed"
    });

}

    const sql=
    "SELECT * FROM admins WHERE email=? AND password=?";

    db.query(sql,[email,password],(err,result)=>{

        if(err){

    res.json({
        message: "Login Failed"
    });

}
       else if(result.length > 0){

    res.json({
        message: "Admin Login Successful"
    });

}
else{

    res.json({
        message: "Invalid Admin Credentials"
    });

}

    });

});

router.post("/admin-register",(req,res)=>{

    const {email,password} = req.body;
    if(!email.endsWith("@luxuryrental.com")){

    return res.json({
        message:
        "Only Official Luxury Rental Admin Accounts Allowed"
    });

}

    const checkSql =
    "SELECT * FROM admins WHERE email=?";

    db.query(
    checkSql,
    [email],
    (err,result)=>{

        if(result.length > 0){

            return res.json({
                message:
                "Admin Already Registered"
            });

        }

        const insertSql =
        "INSERT INTO admins(email,password) VALUES(?,?)";

        db.query(
        insertSql,
        [email,password],
        (err,result)=>{

            if(err){

                return res.json({
                    message:
                    "Registration Failed"
                });

            }

            res.json({
                message:
                "Admin Registered Successfully"
            });

        });

    });

});

module.exports = router;