const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function(app) {

    const user_controller = require('../controller/user.controller.js');
	const authorities_controller = require('../controller/authorities.controller.js');
	/* auth */
	app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserName], user_controller.signup);	
	app.post('/api/auth/update-password', user_controller.updatepassword);
	app.post('/api/auth/signin', user_controller.signin);
	

	/* user api */
	app.get('/api/user/user-get-photo', [authJwt.verifyToken], user_controller.getUserPhoto);
	app.post('/api/user/user-update-photo', [authJwt.verifyToken], user_controller.updateUserPhoto);
	app.post('/api/user/user-list', [authJwt.verifyToken], user_controller.getUserList);
	app.post('/api/user/admin-list', [authJwt.verifyToken], user_controller.getAdminList);
	app.post('/api/user/user-update', [authJwt.verifyToken], user_controller.updateUserInfo);
	app.post('/api/user/user-delete', [authJwt.verifyToken], user_controller.deleteUserInfo);
	
	
	
	/* authorities user api */
	app.post('/api/authorities/create', [authJwt.verifyToken], authorities_controller.create);
	app.post('/api/authorities/update', [authJwt.verifyToken], authorities_controller.update);
	app.post('/api/authorities/delete', [authJwt.verifyToken], authorities_controller.delete);
	app.post('/api/authorities/list', [authJwt.verifyToken], authorities_controller.list);
	

}
