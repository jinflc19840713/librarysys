module.exports = (sequelize, Sequelize) => {
	const PatchPanel = sequelize.define('tbpatchpanel', {
		name: {
			type: Sequelize.STRING(20)
		},
		relay_id: {
			type: Sequelize.INTEGER(5)
		},
		channels: {
			type: Sequelize.INTEGER(2)
		},
		is_switch:{
			type: Sequelize.BOOLEAN ,
			defaultValue: '0'
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

	return PatchPanel;
}
