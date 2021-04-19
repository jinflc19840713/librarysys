module.exports = (sequelize, Sequelize) => {
	const Order = sequelize.define('tborder', {
		ordertime: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		merchandise_id: {
			type: Sequelize.INTEGER(5)
		},
		
		clientname: {
			type: Sequelize.STRING(30)
		},
		clienttype: {
			type: Sequelize.BOOLEAN //0: Old, 1: New
		},
		paytype_id: {
			type: Sequelize.STRING(30)	
		},
		from_date: {
			type: Sequelize.DATE 
		},
		to_date: {
			type: Sequelize.DATE 
		},
		pay_method: {
			type: Sequelize.BOOLEAN, //1: wechat, 0: Alipay
		},
		total_price: {
			type:Sequelize.NUMERIC(10,2),
		},
		remarks: {
			type: Sequelize.TEXT,
		},
		is_use:{
			type: Sequelize.BOOLEAN ,
			defaultValue: '0'
		},
		is_deleted:{
			type: Sequelize.BOOLEAN ,
			defaultValue: '0'
		},
	});

	return Order;
}
