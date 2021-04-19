const db = require('../config/db.config.js');
const env = require('../config/env')
const config = require('../config/config.js');

const Relay = db.relay;

const Op = db.Sequelize.Op;
var sprintf = require('sprintf-js').sprintf;
const { patchpanel } = require('../config/db.config.js');

exports.list = async(req, res) => {
	try{
		var sql = sprintf("SELECT * FROM tbpatchpanel WHERE name like '%s%s%s' AND is_deleted=0 ORDER BY name",
									'%', req.body.key, '%');		
		var count_sql = sprintf("SELECT COUNT(*) AS cnt FROM (%s) AS NUMVIEW", sql);
		let num_Result = await db.sequelize.query(count_sql);		
		var total_size = num_Result[0][0]['cnt'];		
		sql += sprintf(" LIMIT %d, %d", req.body.offset, req.body.pagesize);
		let o_Result = await db.sequelize.query(sql)
		res.status(200).json({
			code: 0,
			total_size: total_size,
			data: o_Result[0],
		})	
	}catch(err){
		res.status(500).json({
			code: 1,
			msg: "No result"
		})
	}
}

exports.create = (req, res) => {
	PatchPanel.create({
		name: req.body.name,
		relay_id:req.body.relay_id,
		channels:req.body.channels,
		is_switch:req.body.is_switch,
		remarks: req.body.remarks,			
		is_use:req.body.is_use
	}).then(patchpanel => {
		res.status(200).send({
		code:200,
		msg:"PatchPanel created successfully!",
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
	PatchPanel.update({
			name: req.body.name,
			relay_id:req.body.relay_id,
			channels:req.body.channels,
			is_switch:req.body.is_switch,
			remarks: req.body.remarks,			
			is_use:req.body.is_use
		},
		{
			where: {id:req.body.id}
		}).then(patchpanel => {
			res.status(200).send({
				code:200,
				msg:"Relay updated successfully!",
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
	PatchPanel.update({		
		is_deleted:1,
	},
	{
		where: {id:req.body.id}
	}).then(relay => {
		res.status(200).send({
			code:200,
			msg:"PatchPanel deleted successfully!",
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