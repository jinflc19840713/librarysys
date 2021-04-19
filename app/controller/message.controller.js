const db = require('../config/db.config.js');
const env = require('../config/env')
const config = require('../config/config.js');

const Message = db.message;

const Op = db.Sequelize.Op;
var sprintf = require('sprintf-js').sprintf;
const { message } = require('../config/db.config.js');

exports.list = async(req, res) => {
	try{
		var sql = sprintf("SELECT send_date, IF(received_persion_id=0, 'ALL', tbusers.name) AS target, contents,  \
							IF(send_person_id=%d, 'SENT', 'RECEIVED')	\
							 FROM tbmessages LEFT JOIN tbusers ON tbmessages.received_id=tbusers.id \
							 WHERE is_deleted=0 AND (send_person_id=%d OR receive_person_id) ", 
							 req.userId, req.userId, req.userId);
		if(req.body.key.length != ""){
			var tmp = sprintf(" AND tbusers.name like '%s%s%s'", '%', req.body.key, '%');
			sql += tmp;
		}

		 sql += " ORDER BY name";		

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
		send_date: req.body.name,
		send_persion_id:req.body.price,
		received_persion_id: req.body.remarks,			
		contents:req.body.is_date,			
	}).then(message => {
		res.status(200).send({
			code:200,
			msg:"Message created successfully!",
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
	Message.update({
			send_date: req.body.send_date,
			send_persion_id:req.body.send_persion_id,
			received_persion_id: req.body.received_persion_id,			
			contents:req.body.contents,			
		},
		{
			where: {id:req.body.id}
		}).then(message => {
			res.status(200).send({
				code:200,
				msg:"Message updated successfully!",
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
	Message.update({		
		is_deleted:1,
	},
	{
		where: {id:req.body.id}
	}).then(message => {
		res.status(200).send({
			code:200,
			msg:"Message deleted successfully!",
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
exports.opened = async(req, res) => {	
	Message.update({		
		is_opened:1,
	},
	{
		where: {id:req.body.id}
	}).then(message => {
		res.status(200).send({
			code:200,
			msg:"Message opened successfully!",
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