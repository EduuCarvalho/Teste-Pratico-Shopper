import {Router} from 'express';
import { priceValidation } from '../controller/price-controller.js';
import { priceVerification } from '../middleware/price-middleware.js';

const priceRouter = Router();

priceRouter
    .get('/priceValidation',priceVerification,priceValidation)
    .put('/updatePrice')

export default priceRouter;