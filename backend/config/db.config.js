const mongoose = require('mongoose');
const logger = require('../logger/api.logger');

const connect = () => {

    const url = process.env.MONGO_URI;
    logger.info('process.env.MONGO_URI :::' + process.env.MONGO_URI);

    mongoose.connect(url);

    mongoose.connection.once('open', async () => {
        logger.info('Database connected');
    });
      
    mongoose.connection.on('error', (err) => {
        logger.error('Error connecting to database  ', err);
    });
}

const disconnect = () => {
    
    if (!mongoose.connection) {
        logger.info('Database not connected')
        return;
    }
    
    mongoose.disconnect();

    mongoose.once('close', async () => {
        logger.info('Database disconnected');
    });

};

module.exports = {
    connect,
    disconnect
}