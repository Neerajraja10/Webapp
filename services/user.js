const dbFuncs = require('../models/database_server');

const helper = require('../config/config');

const newUser = async (req, res) => {
    let check = true;
    if(!req.body.first_name) {
        check = false;
    } else if(!req.body.last_name) {
        check = false;
    }else if(!req.body.username || !helper.validateEmail(req.body.username)) {
        check = false;
    }

    else if(!req.body.password) {
        check = false;
    }

    if(!check) {
        return res.status(400).json({
            message: "Bad request"
        });
    }

    let fName = req.body.first_name;
    let lName = req.body.last_name;
    let uName = req.body.username;
    let pass = await helper.createPassHash(req.body.password);

    let result = await dbFuncs.getDataCreds(uName);
    if (result) {
        return res.status(400).json({
            message: "Bad request"
        });
    }

    let data = await dbFuncs.addUser(fName, lName, uName, pass);

    let finalResult = {
        id:data.id,
        username: data.username,
        first_name:data.first_name,
        last_name:data.last_name,
        account_created:data.account_created,
        account_updated:data.account_updated
    }
    return res.status(201).json(finalResult); 

}

const updateUser = async (req, res) => {
    let check = true;
    if(!req.params.id) {
        check = false;
    }

    if(!req.body.first_name) {
        check = false;
    }

    if(!req.body.last_name) {
        check = false;
    }

    if(!req.body.password) {
        check = false;
    }

    if(Object.keys(req.body).length !== 3) {
        check = false;
    }

    if(!check) {
        return res.status(400).json({
            message: "Bad request"
        });
    }

    let id = req.params.id;
    let fName = req.body.first_name;
    let lName = req.body.last_name;
    let pass = await helper.createPassHash(req.body.password);

    await dbFuncs.updateUserData(fName, lName, pass, id)
    return res.status(204).send(); 

   
}

const getUser = async (req, res) => {
    check = true;
    if(!req.params.id) {
        check = false;
    }

    if (Object.keys(req.body).length){
        check = false;
    }

    if(!check) {
        return res.status(400).json({
            message: "Bad request"
        });
    }

    let result = await dbFuncs.getData(req.params.id);
    if (!result) {
        return res.status(404).json({
          message: "Bad Request"});
    }
    let finalResult = {
        id:result.id,
        username: result.username,
        first_name:result.first_name,
        last_name:result.last_name,
        account_created:result.account_created,
        account_updated:result.account_updated
    }

    return res.status(200).json(finalResult); 

   
}
module.exports = {
    newUser,
    getUser,
    updateUser
  
}