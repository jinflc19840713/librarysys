module.exports = (sequelize, Sequelize) => {
	const Message = sequelize.define('tbrelay', {
		send_date: {
			type: Sequelize.DATE
		},
		send_persion_id: {
			type: Sequelize.INTEGER(5) // id, id, id.....
		},
		receive_persion_id: {
			type: Sequelize.STRING(30) // id, id, id.....
		},
		contents: {
			type: Sequelize.TEXT
		},
		is_opened: {
			type:Sequelize.BOOLEAN,
			defaultValue:'0'
		},
		is_deleted:{
			type: Sequelize.BOOLEAN ,
			defaultValue: '0'
		},
	});

	return Message;
}
