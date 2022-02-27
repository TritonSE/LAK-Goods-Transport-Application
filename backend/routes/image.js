import express from 'express';
import mongoose from 'mongoose';

import { getImage } from '../services/image';
import { INVALID_OBJECT_ID_RECEIVED_MSG } from './errors';

const routes = express.Router();

routes.get('/images/:imageid', (req, res) => {
    // TODO Do we need some sort of authentication here? 
    if (!mongoose.Types.ObjectId.isValid(req.params.imageid)) {
        res.status(400).json({message: INVALID_OBJECT_ID_RECEIVED_MSG});
        return;
    }
    const imageId = mongoose.Types.ObjectId(req.params.imageid);
    getImage(imageId).then((image) => {
        res.set('Content-Type', image.mimetype);
        res.send(image.buffer);
    })
})

export default routes;