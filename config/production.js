module.exports = {
    
    title: 'WARGEN (production)',
    port: 6080,
    connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres123@localhost:5432/wargenDB',
    secretKey: '123'

};