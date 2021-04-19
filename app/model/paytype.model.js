module.exports = (sequelize, Sequelize) => {
	const PayType = sequelize.define('tbpaytype', {
		name: {
			type: Sequelize.STRING(20)
		},
		remarks: {
			type: Sequelize.STRING(200)
		},
		price: {
			type: Sequelize.DECIMAL(10,2)
		},
		is_date:{
			type: Sequelize.BOOLEAN,
            defaultValue: '0'
		},
        fromdate:{ 
			type: Sequelize.DATE            
		},
		todate:{ 
			type: Sequelize.DATE,
		},        
		is_use:{
			type: Sequelize.BOOLEAN ,
			defaultValue: '0'
		},
		is_deleted:{
			type: Sequelize.BOOLEAN ,
			defaultValue: '0'
		},
	},
	{
		indexes: [
			{
				unigue:true,
				fields: ['name']
			}
		]
	});

	return PayType;
}
