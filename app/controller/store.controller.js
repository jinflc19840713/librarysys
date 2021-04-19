const db = require('../config/db.config.js');
const env = require('../config/env')
const config = require('../config/config.js');

const Store = db.store;

const Op = db.Sequelize.Op;
var sprintf = require('sprintf-js').sprintf;
const { store } = require('../config/db.config.js');

exports.list = async(req, res) => {
	try{
		var sql = sprintf("SELECT * FROM tbstores WHERE name like '%s%s%s' AND is_deleted=0 ORDER BY name ",
									'%', req.body.key, '%' );		
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
	Store.create({
		name: req.body.name,
		remarks: req.body.remark,
        phone:req.body.phone,
        admin_id:req.body.admin_id,
        address:req.body.address,
        seat_number:req.body.seat_number,
        is_use:req.body.is_use,
	}).then(store => {
		res.status(200).send({
			code:200,
			msg:"Store created successfully!",
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
	Store.update({
			name: req.body.name,
			remarks: req.body.remarks,
			phone:req.body.phone,
			admin_id:req.body.admin_id,
			address:req.body.address,
			seat_number:req.body.seat_number,
			is_use:req.body.is_use,
		},
		{
			where: {id:req.body.id}
		}).then(store => {
			res.status(200).send({
				code:200,
				msg:"Store updated successfully!",
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
	Store.update({		
		is_deleted:1,
	},
	{
		where: {id:req.body.id}
	}).then(store => {
		res.status(200).send({
			code:200,
			msg:"Store deleted successfully!",
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