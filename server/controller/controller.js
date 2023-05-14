var Userdb = require('../model/model')

// Create and Save New User 
exports.create = (req, res) => {
    // Validate request
    if(!req.body){
        res.status(400).send({ message: "Content cannot be empty!"})
        return
    }
// New user
    const user = new Userdb ({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    // Save User
    user
    .save(user)
    .then(data => {
        // res.send(data)
        res.redirect('/add-user')
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred while creating user!"})
    })
}

// retrieve and return User(s) 
exports.find = (req, res) => {
    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message: "User not found!"})
            }else{
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving user!. Please try again"})
        })
    }else{
        Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err =>{
            res.status(500).send({message: err.message || "Error occurred while retrieving information!"})
        })
    }
    
}

// Update User by user.id 
exports.update = (req, res) => {
    if(!req.body) {
        return res.send(400).send({message: "Data to update cannot be empyt! "})
    }else{
        const id = req.params.id
        Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({message: `Cannot update user with ${id}, Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update user!"})
        })
    }
}

// Delete User with userid
exports.delete = (req, res) => {
    const id = req.params.id
    Userdb.findByIdAndDelete(id)
    .then(data =>{
        if(!data){
            res.status(404).send({ message: `Cannot delete user with ${id}, Maybe ID is wrong!`})
        }else{
            res.send({ message: "ID deleted successfully!"})
        }
    })
    .catch (err => {
        res.status(500).send({ message: "Could not delete User with ID= " +id})
    })
}