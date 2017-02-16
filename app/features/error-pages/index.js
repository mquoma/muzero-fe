/**
 * Created by aboatswain on 05/25/2016.
 */
module.exports = {
  path: 'error/unauthorized',
  getComponent (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/UnauthorizedError').default);
    });
  }
};
