module.exports = {
  path: 'booking',
  getComponent (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Vacation/Vacation').default);
    });
  }
};
