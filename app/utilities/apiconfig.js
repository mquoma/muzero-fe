let config = {
  
  sb: {
    baseUrl: 'http://localhost:3000'
  }
};

export const apiconfig = () =>
  (process.env.NODE_ENV === 'test' ? config['test'] : config[__APIENV__]);
