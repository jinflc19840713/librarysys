const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function(app) {

    const user_controller = require('../controller/user.controller.js');
	const authorities_controller = require('../controller/authorities.controller.js');
	const store_controller = require('../controller/store.controller.js');
	const paytype_controller = require('../controller/paytype.controller.js');
	const merchandise_controller = require('../controller/merchandise.controller.js');
	const categories_controller = require('../controller/categories.controller.js');
	const relay_controller = require('../controller/relay.controller.js');
	const patchpanel_controller = require('../controller/patchpanel.controller.js');
	const order_controller = require('../controller/order.controller.js');
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
	
	/* authorities api */
	app.post('/api/authorities/create', [authJwt.verifyToken], authorities_controller.create);
	app.post('/api/authorities/update', [authJwt.verifyToken], authorities_controller.update);
	app.post('/api/authorities/delete', [authJwt.verifyToken], authorities_controller.delete);
	app.post('/api/authorities/list', [authJwt.verifyToken], authorities_controller.list);

	/* store api */
	app.post('/api/store/create', [authJwt.verifyToken], store_controller.create);
	app.post('/api/store/update', [authJwt.verifyToken], store_controller.update);
	app.post('/api/store/delete', [authJwt.verifyToken], store_controller.delete);
	app.post('/api/store/list', [authJwt.verifyToken], store_controller.list);

	/* paytype api */
	app.post('/api/paytype/create', [authJwt.verifyToken], paytype_controller.create);
	app.post('/api/paytype/update', [authJwt.verifyToken], paytype_controller.update);
	app.post('/api/paytype/delete', [authJwt.verifyToken], paytype_controller.delete);
	app.post('/api/paytype/list', [authJwt.verifyToken], paytype_controller.list);

	/* merchandise api */
	app.post('/api/merchandise/create', [authJwt.verifyToken], merchandise_controller.create);
	app.post('/api/merchandise/update', [authJwt.verifyToken], merchandise_controller.update);
	app.post('/api/merchandise/delete', [authJwt.verifyToken], merchandise_controller.delete);
	app.post('/api/merchandise/list', [authJwt.verifyToken], merchandise_controller.list);

	/* categories api */
	app.post('/api/categories/create', [authJwt.verifyToken], categories_controller.create);
	app.post('/api/categories/update', [authJwt.verifyToken], categories_controller.update);
	app.post('/api/categories/delete', [authJwt.verifyToken], categories_controller.delete);
	app.post('/api/categories/list', [authJwt.verifyToken], categories_controller.list);

	/* relay api */
	app.post('/api/relay/create', [authJwt.verifyToken], relay_controller.create);
	app.post('/api/relay/update', [authJwt.verifyToken], relay_controller.update);
	app.post('/api/relay/delete', [authJwt.verifyToken], relay_controller.delete);
	app.post('/api/relay/list', [authJwt.verifyToken], relay_controller.list);

	/* patchpanel api */
	app.post('/api/patchpanel/create', [authJwt.verifyToken], patchpanel_controller.create);
	app.post('/api/patchpanel/update', [authJwt.verifyToken], patchpanel_controller.update);
	app.post('/api/patchpanel/delete', [authJwt.verifyToken], patchpanel_controller.delete);
	app.post('/api/patchpanel/list', [authJwt.verifyToken], patchpanel_controller.list);

	/* order api */
	app.post('/api/order/create', [authJwt.verifyToken], order_controller.create);
	app.post('/api/order/update', [authJwt.verifyToken], order_controller.update);
	app.post('/api/order/delete', [authJwt.verifyToken], order_controller.delete);
	app.post('/api/order/list', [authJwt.verifyToken], order_controller.list);
}
