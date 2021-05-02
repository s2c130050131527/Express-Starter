import { Router } from 'express';
import enableWs from '@small-tech/express-ws';

import { INDEX_NAME } from '~/env';
import crudOperations from '~/crud-operations';
import authentication from '~/authentication';
import appPermissions from '~/appPermissions';
import { ensureAuthenticated } from './passport';

const router = Router();
enableWs(router);

router.get('/', (req, res) => {
  res.send(`app-root, ${INDEX_NAME} mode`);
});

router.use(crudOperations.prefix, crudOperations);
router.use(authentication.prefix, authentication);
router.use(appPermissions.prefix, ensureAuthenticated, appPermissions);

export default router;
