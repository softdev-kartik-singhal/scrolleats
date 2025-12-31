const express = require("express")
const foodPartnerModel = require("../models/foodPartner.model");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



async function registerUser(req, res) {

    const { fullName, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "user already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName: fullName,
        email: email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id,

    }, process.env.JWT_SECRET)
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",  // Only secure in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });


    res.status(201).json({
        message: "user registered successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })

}

async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email
    });

    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" })
    }

    const token = jwt.sign({
        id: user._id,

    }, process.env.JWT_SECRET)
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });


    res.status(200).json({
        message: "user logged in successsfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}

async function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "user Logged out successfully"
    });
}


async function registerFoodPartner(req, res) {
    const { name, email, password, phone, address, contactName } = req.body;

    const isAccountAlreadyExists = await foodPartnerModel.findOne({ email });

    if (isAccountAlreadyExists) {
        return res.status(400).json({
            message: "Food Partner Already Exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const foodPartner = await foodPartnerModel.create({
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone,
        address: address,
        contactName: contactName
    })

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET,
        { expiresIn: "7d" }
    )

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });


    res.status(201).json({
        message: "food partner registered successfully",
        foodPartner: {
            id: foodPartner._id,
            name: foodPartner.name,
            email: foodPartner.email,
            contactName: foodPartner.contactName,
            phone: foodPartner.phone,
            address: foodPartner.address
        }
    })
}

async function loginFoodPartner(req, res) {
    const { email, password } = req.body;

    const foodPartner = await foodPartnerModel.findOne({ email });

    if (!foodPartner) {
        return res.status(400).json({ message: "Invalid username or password" })
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid username or password" })
    }

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });


    res.status(200).json({
        message: "Food Partner logged in successsfully",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    })
}

async function logoutFoodPartner(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "Food Partner Logged out successfully"
    });
}

module.exports = { registerUser, loginUser, logoutUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner };