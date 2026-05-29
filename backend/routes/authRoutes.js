const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/register", (req, res) => { 

    console.log(req.body);

    const { name, email, password } = req.body;

    const sql = `
        INSERT INTO users(name, email, password, role)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name, email, password, "user"],
        (err, result) => {

            if(err){

                console.log("MYSQL ERROR:", err);
                res.send("Registration Failed");
            }
            else {
                res.send("User Registered Successfully");
            }

        }
    );

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
                res.send("Login Successful");
            }

            else{
                res.send("Invalid Email or Password");
            }

        }
    );

});

router.post("/booking", (req, res) => {

    const {
        customerName,
        customerEmail,
        property,
        checkin,
        checkout,
        guests
    } = req.body;

    const sql = `
        INSERT INTO bookings
        (
            customer_name,
            customer_email,
            property_name,
            checkin_date,
            checkout_date,
            guests
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            customerName,
            customerEmail,
            property,
            checkin,
            checkout,
            guests
        ],
        (err, result) => {

            if(err){
                console.log(err);
                res.send("Booking Failed");
            } else {
                res.send("Booking Successful");
            }

        }
    );

});

module.exports = router;