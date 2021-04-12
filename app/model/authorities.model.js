module.exports = (sequelize, Sequelize) => {
	const Authorities = sequelize.define('tbauthorities', {
		name: {
			type: Sequelize.STRING(20)
		},
		remarks: {
			type: Sequelize.STRING(200)
		},
		bs_LM_power:{ //Library Management 0:false, 1: true, (ex:101=>View:true, Add:false, Delete:true)
			type: Sequelize.STRING(3),
            defaultValue: '000'
		},
        bs_AM_power:{ //Administrator Management, view, add or update, delete
			type: Sequelize.STRING(3),
            defaultValue: '000'
		},
		bs_MM_power:{ //Member Management, view, add or update, delete
			type: Sequelize.STRING(3),
            defaultValue: '000'
		},
        eq_PP_power:{ //Patch Panel, view, add or update, delete
			type: Sequelize.STRING(3),
            defaultValue: '000'
		},
        eq_WT_power:{ //Web TemperaturePanel, view, add or update, delete
			type: Sequelize.STRING(3),
            defaultValue: '000'
		},
        eq_CAM_power:{ //Camera, view, add or update, delete
			type: Sequelize.STRING(3),
            defaultValue: '000'
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

	return Authorities;
}
