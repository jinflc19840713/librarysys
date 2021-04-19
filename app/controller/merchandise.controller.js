const db = require('../config/db.config.js');
const env = require('../config/env')
const config = require('../config/config.js');

const Merchandise = db.merchandise;

const Op = db.Sequelize.Op;
var sprintf = require('sprintf-js').sprintf;
const { categories } = require('../config/db.config.js');

exports.list = async(req, res) => {
	try{
		var sql = sprintf("SELECT * FROM tbmerchandises WHERE name like '%s%s%s' AND is_deleted=0 ORDER BY name",
									'%', req.body.key, '%');		
		var count_sql = sprintf("SELECT COUNT(*) AS cnt FROM (%s) AS NUMVIEW", sql); 		
		let num_Result = await db.sequelize.query(count_sql);		
		var total_size = num_Result[0][0]['cnt'];		
		
		sql += sprintf(" LIMIT %d, %d", req.body.offset, req.body.pagesize);
		let o_Result = await db.sequelize.query(sql);		
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
	Merchandise.create({
		name: req.body.name,
		specification:req.body.specification,
		primecost:req.body.primecost,
		sellcost:req.body.sellcost,
		store_id:req.body.store_id,
		relay_serial:req.body.relay_serial,
		integral:req.body.integral,
		classfication: req.body.classfication,
		remarks: req.body.remarks,			
		is_use:req.body.is_use,
	}).then(merchandise => {
		res.status(200).send({
		code:200,
		msg:"Merchandise created successfully!",
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
	Merchandise.update({
			name: req.body.name,
			specification:req.body.specification,
			primecost:req.body.primecost,
			sellcost:req.body.sellcost,
			store_id:req.body.store_id,
			relay_serial:req.body.relay_serial,
			integral:req.body.integral,
			classfication: req.body.classfication,
			remarks: req.body.remarks,			
			is_use:req.body.is_use,
		},
		{
			where: {id:req.body.id}
		}).then(merchandise => {
			res.status(200).send({
				code:200,
				msg:"Merchandise updated successfully!",
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
	Merchandise.update({		
		is_deleted:1,
	},
	{
		where: {id:req.body.id}
	}).then(merchandise => {
		res.status(200).send({
			code:200,
			msg:"Merchandise deleted successfully!",
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