module.exports = (sequelize, Sequelize) => {
	const Category = sequelize.define('tbcategories', {
		name: {
			type: Sequelize.STRING(20)
		},
		sub_heading: {
			type: Sequelize.STRING(20)
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

	return Category;
}
