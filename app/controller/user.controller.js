const db = require('../config/db.config.js');
const env = require('../config/env')
const config = require('../config/config.js');

const User = db.user;

const Op = db.Sequelize.Op;

const md5 = require('md5')
var jwt = require('jsonwebtoken');
//var bcrypt = require('bcryptjs');
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
	User.update({
		password: md5(req.body.password),
		update_date: new Date(),				
	},
	{
		where: {id:req.body.id}
	}).then(user => {
		res.status(200).send({
			code:200,
			msg:"User password updated successfully!",
			//data:user
		});
	}).catch(err => {
		res.status(500).send({
			code:500,
			msg: "Failed errer",
			error: err
		});
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

	User.update({
		image: req.body.image,
		update_date: new Date(),				
	},
	{
		where: {id:req.body.id}
	}).then(user => {
		res.status(200).send({
			code:200,
			msg:"User photo updated successfully!",
			//data:user
		});
	}).catch(err => {
		res.status(500).send({
			code:500,
			msg: "Failed errer",
			error: err
		});
	})	
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
}

exports.getUserList = async(req, res) => {
	try{
		var sql = sprintf("SELECT * FROM vw_userlist WHERE name like '%s%s%s' AND is_deleted=0 ORDER BY name LIMIT %d,%d",
									'%', req.body.key, '%', req.body.offset, req.body.pagesize );
		console.log("getUserList: %s", sql);
		let o_Result = await db.sequelize.query(sql)
		res.status(200).json({
			code: 0,
			msg: "Get User List Success",
			data: o_Result[0]
		})				
	}catch(err){
		res.status(500).json({
			code: 1,
			msg: "No result"
		})
	}
}

exports.getAdminList = async(req, res) => {
	try{
		var sql = sprintf("SELECT * FROM vw_adminlist WHERE name like '%s%s%s' AND is_deleted=0 ORDER BY name LIMIT %d,%d",
									'%', req.body.key, '%', req.body.offset, req.body.pagesize );
		console.log("getAdminList: %s", sql);
		let o_Result = await db.sequelize.query(sql)
		res.status(200).json({
			code: 0,
			msg: "Get Admin List Success",
			data: o_Result[0]
		})				
	}catch(err){
		res.status(500).json({
			code: 1,
			msg: "No result"
		})
	}
}

exports.updateUserInfo = async(req, res) => {
	console.log("User Controller/Update User Information...")	
	User.update({
		name: req.body.name,
		username: req.body.username,		
		phone: req.body.phone,		
		authority_id: req.body.authorizty,		
		is_use:req.body.is_use,
		},
		{
			where: {id:req.body.id}
		}).then(user => {
			res.status(200).send({
				code:200,
				msg:"User updated successfully!",
				//data:user
			});
		}).catch(err => {
			res.status(500).send({
				code:500,
				msg: "Failed err",
				error: err
			});
	});	
}
exports.deleteUserInfo = async(req, res) => {
	console.log("User Controller/Update User Information...")
	User.update({		
		is_deleted:1,
	},
	{
		where: {id:req.body.id}
	}).then(user => {
		res.status(200).send({
			code:200,
			msg:"User deleted successfully!",
			//data:user
		});
	}).catch(err => {
		res.status(500).send({
			code:500,
			msg: "Failed err",
			error: err
		});
	});	
}