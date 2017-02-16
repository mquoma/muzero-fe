module.exports = {
  path: 'director',
  getComponent (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/VacationDirector').default);
    });
  }
};

