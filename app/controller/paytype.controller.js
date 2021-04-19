const db = require('../config/db.config.js');
const env = require('../config/env')
const config = require('../config/config.js');

const PayType = db.paytype;

const Op = db.Sequelize.Op;
var sprintf = require('sprintf-js').sprintf;
const { paytype } = require('../config/db.config.js');

exports.list = async(req, res) => {
	try{
		var sql = sprintf("SELECT * FROM tbpaytypes WHERE name like '%s%s%s' AND is_deleted=0 ORDER BY name",
									'%', req.body.key, '%' );		
		console.log(sql);
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
	PayType.create({
		name: req.body.name,
			price:req.body.price,
			remarks: req.body.remarks,			
			is_date:req.body.is_date,
			from_date:req.body.from_date,
			to_date:req.body.to_date,
			is_use:req.body.is_use,
	}).then(paytype => {
		res.status(200).send({
			code:200,
			msg:"PayType created successfully!",
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
	PayType.update({
			name: req.body.name,
			price:req.body.price,
			remarks: req.body.remarks,			
			is_date:req.body.is_date,
			from_date:req.body.from_date,
			to_date:req.body.to_date,
			is_use:req.body.is_use,
		},
		{
			where: {id:req.body.id}
		}).then(paytype => {
			res.status(200).send({
				code:200,
				msg:"PayType updated successfully!",
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
	PayType.update({		
		is_deleted:1,
	},
	{
		where: {id:req.body.id}
	}).then(paytype => {
		res.status(200).send({
			code:200,
			msg:"PayType deleted successfully!",
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