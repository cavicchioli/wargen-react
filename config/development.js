module.exports = {
    
    title: 'WARGEN (development)',
    port: 3000,
    connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres123@localhost:5432/wargenDB',
    secretKey: '123'
};