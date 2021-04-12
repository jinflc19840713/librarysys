const db = require('../config/db.config.js');
const env = require('../config/env')
const config = require('../config/config.js');

const Authorities = db.authorities;

const Op = db.Sequelize.Op;
var sprintf = require('sprintf-js').sprintf;
const { authorities } = require('../config/db.config.js');

exports.list = async(req, res) => {
	try{
		var sql = sprintf("SELECT * FROM tbauthorities WHERE name like '%s%s%s' AND is_deleted=0 ORDER BY name LIMIT %d,%d",
									'%', req.body.key, '%', req.body.offset, req.body.pagesize );
		console.log("getAuthoitiesList: %s", sql);
		let o_Result = await db.sequelize.query(sql)
		res.status(200).json({
			code: 0,
			msg: "Get Authorites List Success",
			data: o_Result[0]
		})				
	}catch(err){
		res.status(500).json({
			code: 1,
			msg: "No result"
		})
	}
}

exports.create = (req, res) => {
	Authorities.create({
		name: req.body.name,
		remark: req.body.remark,
        bs_LM_power:req.body.bs_LM_power,
        bs_AM_power:req.body.bs_AM_power,
        bs_MM_power:req.body.bs_MM_power,
        eq_PP_power:req.body.eq_PP_power,
        eq_WT_power:req.body.eq_WT_power,
        eq_CAM_power:req.body.eq_CAM_power,
		is_use:req.body.is_use,
	}).then(authority => {
		res.status(200).send({
			code:200,
			msg:"Authority created successfully!",
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

exports.update = async(req, res) => {	
	Authorities.update({
		name: req.body.name,
		remark: req.body.remark,
        bs_LM_power:req.body.bs_LM_power,
        bs_AM_power:req.body.bs_AM_power,
        bs_MM_power:req.body.bs_MM_power,
        eq_PP_power:req.body.eq_PP_power,
        eq_WT_power:req.body.eq_WT_power,
        eq_CAM_power:req.body.eq_CAM_power,
		is_use:req.body.is_use,
		},
		{
			where: {id:req.body.id}
		}).then(authoritiy => {
			res.status(200).send({
				code:200,
				msg:"Authority updated successfully!",
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
exports.delete = async(req, res) => {	
	Authorities.update({		
		is_deleted:1,
	},
	{
		where: {id:req.body.id}
	}).then(authority => {
		res.status(200).send({
			code:200,
			msg:"Authorities deleted successfully!",
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