import express from 'express';
import mongoose from 'mongoose';

import { getImage } from '../services/image';
import { ValidationError } from '../errors';

const routes = express.Router();

routes.get('/:imageid', (req, res, next) => {
    // TODO Do we need some sort of authentication here? 
    if (!mongoose.Types.ObjectId.isValid(req.params.imageid)) {
        next(ValidationError.INVALID_OBJECT_ID); 
        return;
    }
    const imageId = mongoose.Types.ObjectId(req.params.imageid);
    getImage(imageId)
    .then((image) => {
        res.set('Content-Type', image.mimetype);
        res.send(image.buffer);
    })
    .catch(next)
})

export default routes;