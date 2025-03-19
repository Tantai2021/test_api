const UserRoutes = require('./User');
const Router = (app) => {
    app.use('/api/users', UserRoutes);
};
module.exports = Router