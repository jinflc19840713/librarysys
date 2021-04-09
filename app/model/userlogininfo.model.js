module.exports = (sequelize, Sequelize) => {
	const UserLoginInfo = sequelize.define('userlogininfos', {
        LoginAt: Sequelize.TIME,
        LogoutAt: Sequelize.TIME,
	});

	return UserLoginInfo;
}
