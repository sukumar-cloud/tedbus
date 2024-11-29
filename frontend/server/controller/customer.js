const Customer = require('../models/customer');

exports.addnewcustomer = async (req, res) => {
    try {
        const { name, email, googleId, profilepicture } = req.body;
        // console.log(name,email,googleId,profilepicture)
        let exisitingcustomer = await Customer.findOne({ email: email }).lean().exec();
        if (exisitingcustomer) {
            res.send(exisitingcustomer)
        } else {
            const customer = new Customer({
                name, email, googleId, profilepicture
            });
            const newCustomer = await customer.save()
            res.status(201).json(newCustomer);
        }
    } catch (error) {
        console.error('error adding customer', error);
        res.status(500).json({ error: "internal server error" });
    }
}