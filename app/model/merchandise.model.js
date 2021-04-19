module.exports = (sequelize, Sequelize) => {
	const Merchandise = sequelize.define('tbcategories', {
		name: {
			type: Sequelize.STRING(20)
		},
		specification: {
			type: Sequelize.STRING(20)
		},
		primecost: {
			type: Sequelize.DECIMAL(10,2)
		},
		sellcost: {
			type: Sequelize.DECIMAL(10,2)
		},
		store_id: {
			type: Sequelize.INTEGER(5)
		},
		relay_id: {
			type: Sequelize.INTEGER(5)
		},
		image:{
			type: Sequelize.TEXT,            
		},        
		integral:{
			type: Sequelize.STRING(30),            
		},
		classification:{
			type: Sequelize.STRING(30),            
		},        
		
		remarks: {
			type: Sequelize.STRING(200)
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

	return Merchandise;
}
