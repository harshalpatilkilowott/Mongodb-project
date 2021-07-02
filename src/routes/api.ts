import { Router, Request, Response } from "express";
import adminAuthorized from "../middleware/adminAuthorized";
import * as sample from "../controllers/sample";

//user imports
import * as createUserController from '../controllers/user/createUser';
import * as userDetailsController from '../controllers/user/userDetails';
import * as updateUserController from '../controllers/user/updateUser';
import * as deleteUserController from '../controllers/user/deleteUser';
import * as totalTransactionsController from '../controllers/purchase/totalTrasactions';

const router: Router = Router();

router.get('/sample', sample.getApi);

// routes
router.post('/user/create',createUserController.createUser);
router.get('/user/:id',userDetailsController.userDetails);
router.patch('/user/:id',updateUserController.updateUser);
router.delete('/user/:id',deleteUserController.deleteUser);
router.get('/totalTrasactions/:userId',totalTransactionsController.totalTransactions);

export default router;