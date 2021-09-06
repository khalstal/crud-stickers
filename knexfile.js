// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/khals-web-store'    
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/test-khals-web-store'    
  },
};
