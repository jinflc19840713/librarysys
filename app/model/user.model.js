module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('tbuser', {
		name: {
			type: Sequelize.STRING(20)
		},
		username: {
			type: Sequelize.STRING(20),
			allowNull: false,			
		},
		password: {
			type: Sequelize.STRING(50)
		},
		image:{
			type: Sequelize.TEXT
		},
		phone: {
			type: Sequelize.STRING(20)
		},
		authority_id:{
			type: Sequelize.INTEGER
		},
		create_date:{
			type: Sequelize.DATE
		},
		update_date:{
			type: Sequelize.DATE
		},
		is_admin:{
			type: Sequelize.BOOLEAN //if true, it is administrator, otherwise, member.
		},
		remarks: {
			type: Sequelize.STRING(200)
		},
		is_use:{
			type: Sequelize.BOOLEAN 
		},
		is_deleted:{
			type: Sequelize.BOOLEAN 
		},
	},
	{
		indexes: [
			{
				unigue:true,
				fields: ['username']
			}
		]
	});

	return User;
}
