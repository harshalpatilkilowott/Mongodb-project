import { Router } from "express";
import * as swaggerUI from "swagger-ui-express"
import * as YAML from "yamljs";

const router: Router = Router();

const swaggerDocument = YAML.load( './swagger.yaml');

router.use('/', swaggerUI.serve);

router.get('/', swaggerUI.serveFiles(swaggerDocument));
router.get('/', swaggerUI.setup(swaggerDocument, {customSiteTitle: "Easyweb Docs"}));

export default router;
