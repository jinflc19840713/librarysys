const db = require('../config/db.config.js');
const env = require('../config/env')
const config = require('../config/config.js');

const Order = db.order;

const Op = db.Sequelize.Op;
var sprintf = require('sprintf-js').sprintf;
const { order } = require('../config/db.config.js');

exports.list = async(req, res) => {
	try{
		var sql = sprintf("SELECT ordertime, merchandise_name, store_name, clientname, clienttype, paytype_id, from_date, to_date, pay_method, remarks  FROM tborders LEFT JOIN \
								(SELECT tbmerchandises.id AS merchandise_id, tbstores.id AS store_id, `tbmerchandises`.`name` AS merchandise_name, tbstores.`name` AS store_name \
										FROM tbmerchandises LEFT JOIN tbstores ON tbmerchandises.`store_id`=tbstores.id) AS merchandise  \
								ON tborders.`merchandise_id`=merchandise.`merchandise_id` \
	 					WHERE clientname like '%s%s%s' AND is_deleted=0 ORDER BY clientname LIMIT %d,%d",
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
	Order.create({
		ordertime: req.body.ordertime,
		merchandise_id:req.body.merchandise_id,
		clientname:req.body.clientname,
		paytype_id:req.body.paytype_id,
		from_date:req.body.from_date,
		to_date:req.body.to_date,
		pay_method:req.body.pay_method,
		total_price:req.body.total_price,
		remarks: req.body.remarks,			
		is_use:req.body.is_use,
	}).then(order => {
		res.status(200).send({
		code:200,
		msg:"Order created successfully!",
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
	Order.update({
			ordertime: req.body.ordertime,
			merchandise_id:req.body.merchandise_id,
			clientname:req.body.clientname,
			paytype_id:req.body.paytype_id,
			from_date:req.body.from_date,
			to_date:req.body.to_date,
			pay_method:req.body.pay_method,
			total_price:req.body.total_price,
			remarks: req.body.remarks,			
			is_use:req.body.is_use,
		},
		{
			where: {id:req.body.id}
		}).then(order => {
			res.status(200).send({
				code:200,
				msg:"Order updated successfully!",
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
	Order.update({		
		is_deleted:1,
	},
	{
		where: {id:req.body.id}
	}).then(order => {
		res.status(200).send({
			code:200,
			msg:"Order deleted successfully!",
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