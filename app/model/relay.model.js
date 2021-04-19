module.exports = (sequelize, Sequelize) => {
	const Relay = sequelize.define('tbrelay', {
		name: {
			type: Sequelize.STRING(20)
		},
		mac_address: {
			type: Sequelize.STRING(30)
		},
		channels: {
			type: Sequelize.INTEGER(2)
		},
		brand: {
			type: Sequelize.STRING(30)
		},
		model: {
			type: Sequelize.STRING(30)
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

	return Relay;
}
