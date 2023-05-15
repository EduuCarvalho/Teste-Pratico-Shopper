import {Router} from 'express';
import { priceValidation, updatePrice } from '../controller/price-controller.js';
import { priceVerification } from '../middleware/price-middleware.js';

const priceRouter = Router();

priceRouter
    .get('/priceValidation',priceVerification,priceValidation)
    .put('/updatePrice',updatePrice)

export default priceRouter;