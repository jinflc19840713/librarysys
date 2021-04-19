module.exports = (sequelize, Sequelize) => {
	const Store = sequelize.define('tbstores', {
		name: {
			type: Sequelize.STRING(20)
		},
		remarks: {
			type: Sequelize.STRING(200)
		},
		phone: {
			type: Sequelize.STRING(50)
		},
		admin_id:{
			type: Sequelize.INTEGER(10),
            defaultValue: '0'
		},
        address:{ 
			type: Sequelize.STRING(100)            
		},
		seat_numbers:{ 
			type: Sequelize.INTEGER(5),
            defaultValue: '0'
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

	return Store;
}
