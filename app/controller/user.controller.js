const db = require('../config/db.config.js');
const env = require('../config/env')
const config = require('../config/config.js');

const User = db.user;

const Op = db.Sequelize.Op;

const md5 = require('md5')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var sprintf = require('sprintf-js').sprintf;


exports.signup = (req, res) => {
	// Save User to Database
	console.log("Processing func -> SignUp " + req);

	User.create({
		name: req.body.name,
		username: req.body.username,
		password: md5(req.body.password),
		phone: req.body.phone,
		image: req.body.image,
		authority_id: req.body.authorizty,
		create_date: new Date(),
		update_date: new Date(),
		is_admin: req.body.is_admin,
		is_use:false,
	}).then(user => {
		res.status(200).send({
			code:200,
			msg:"User registered successfully!",
			//data:user
		});
	}).catch(err => {
		res.status(500).send({
			code:500,
			msg: "Failed err",
			error: err
		});
	})
}

exports.updatepassword = async(req, res) =>{
	console.log("Update-Password");
	var username = req.body.username;
	var password = md5(req.body.password);
	try{
		var query = sprintf("UPDATE tbusers SET password='%s' WHERE username='%s' AND is_use=true",  password, username);
        
        let o_Result = await db.sequelize.query(query);
		console.log("---+", o_Result[0]['changedRows']);
		if(o_Result[0]['changedRows'] == 1) 		
			res.status(200).send({code:0, msg:"Success"});
		else
			res.status(200).send({code:1, msg:"Failed"});
    }catch(err){
        console.log(err);
        res.status(500).send({code:500, msg:"Sql error", error: err})
    } 
}

/* Reset Reset Password Link*/
exports.sendResetPasswordLink = (req, res) => {
	var email = req.body.email;
	User.findOne({
		where:{
			email: email
		}
	}).then(user => {
		if(!user) {
			return res.status(404).send({code:-1, msg: 'User Not Found.'})
		}
		try{
			const sgMail = require('@sendgrid/mail');
			sgMail.setApiKey(env.sg_api_key);
			const msg = {
				to: email,
				from: 'memorize@support.com',
				subject: 'Reset password link',
				text: `Hi ${user.username} \n
				Please click on the following link ${env.url_front}/reset-password to reset your password. \n\n
				If you did not request this, please ignore this email and your password will remain unchanged.\n`,
			};
			sgMail.send(msg);

		}catch(err){
			return res.status(400).send({code:-2, msg:'Email sending error'});
		}
		return res.status(200).send({code:0, msg: "Success"})
	})
}

exports.signin = (req, res) => {
	console.log("Sign-In-%s", req.body.username);
	User.findOne({
		where: {
			username: req.body.username
		}
	}).then(user => {
		if (!user) {
			return res.status(403).send({
				code:403,
				msg: 'User Not Found.'
			});
		}
		if(!user.is_use) {
			return res.status(402).send({
				code:402,
				msg: 'This user is not allowed.'
			});
		}
		if(user.password != md5(req.body.password)) {
			return res.status(401).send({
				auth: false,				
				accessToken: null,
				reason: "Invalid Password!"
			});
		}
		
		var token = jwt.sign({ id: user.id }, config.secret, {
		  	expiresIn: 86400 // expires in 24 hours
		});

		res.status(200).send({
			code:200,
			auth: true,
			accessToken: token,
			id: user.username
		});

	}).catch(err => {
		res.status(500).send({
			code:500,
			msg: "Failed err",
			error: err
		});
	});
}

exports.updateUserPhoto = async(req, res) => {
	console.log("User Controller/Update User Photo...")	
	try{
		var sql = sprintf("UDPATE tbusers SET image='%s' WHERE id=%d", req.body.image, req.userId);
		await db.sequelize.query(sql);
		res.status(200).json({
			code: 0,
			msg: "Update User Photo Success"
		})
	}catch(err){
		res.status(200).json({
			code: 1,
			msg: "Update User Photo Failed",
		})
	}
}

exports.getUserPhoto = async(req, res) => {
	console.log("User Controller/Get user Photo...")	
	var i_UserId = req.userId;
	User.findOne({		
		where: {
			id: req.userId
		}
	}).then(user => {
		res.status(200).send({code:0, data: user.image});
	}).catch(err => {
		res.status(500).send({
			code:500,
			msg: "Failed err",
			error: err
		});
	});
/*
	try{
		var sql = sprintf("SELECT image FROM tbusers WHERE id=%d", req.userId);
		let res = await db.sequelize.query(sql);
		console.log(sql);		
        res.status(200).send({code:0, data: res[0]['image']});
	}catch(err){
		res.status(500).send({code:1, msg:"sql error", error: err});
	}
	*/
}


exports.userContent = (req, res) => {
	User.findOne({
		where: {id: req.userId},
		attributes: ['name', 'username', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).json({
			code: 0,
			msg: "User Content Page",
			data: user
		});
	}).catch(err => {
		res.status(500).json({
			code: 1,
			msg: "Can not access User Page",
			error : err
		});
	})
}

exports.updateUserContent = async(req, res) => {
	console.log("User Controller/Update User Content...")
	
	var username = req.body.username;
	var password = md5(req.body.password);
	var phone = req.body.phone;
	
	try{
		await db.sequelize.query("CALL `testdb`.`Proc_Update_User_Content`(:i_UserId, :i_Email, :i_Username, :i_Password, @o_Result)", {replacements:{i_UserId:req.userId, i_Email:email, i_Username:username, i_Password:password}})
		let o_Result = await db.sequelize.query("SELECT @o_Result;")
		res.status(200).json({
			code: 0,
			msg: "Update User Content Success",
			data: {email:email, username:username}
		})
		// }else{
		// 	res.status(200).json({
		// 		code: 1,
		// 		msg: "Update User Content Failed"
		// 	})
		// }
	}catch(err){
		res.status(500).json({
			code: 1,
			msg: "Update User Content Failed"
		})
	}
}


exports.adminBoard = (req, res) => {
	User.findOne({
		where: {id: req.userId},
		attributes: ['name', 'username', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).json({
			code: 200,
			msg: "Admin Board",
			data: user
		});
	}).catch(err => {
		res.status(500).json({
			code: 500,
			msg: "Can not access Admin Board",
			error: err
		});
	})
}

exports.managementBoard = (req, res) => {
	User.findOne({
		where: {id: req.userId},
		attributes: ['name', 'username', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]  
	}).then(user => {
		res.status(200).json({
			code: 200,
			msg: "Management Board",
			data: user
		});
	}).catch(err => {
		res.status(500).json({
			code: 500,
			msg: "Can not access Management Board",
			error: err
		});
	})
}
