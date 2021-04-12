module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('tbusers', {
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
		is_admin:{
			type: Sequelize.BOOLEAN, //if true, it is administrator, otherwise, member.
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
				fields: ['username']
			}
		]
	});

	return User;
}
