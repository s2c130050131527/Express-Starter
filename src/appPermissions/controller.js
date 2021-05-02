import { Router } from 'express';
import { PermissionColl } from './model';

const controller = (() => {
  const router = Router();
  router.get('/', async (req, res) => {
    console.log(req.user);
    const permissionList = await PermissionColl.find().exec();
    res.json({ data: { permissionList } });
  });

  router.post('/', async (req, res) => {
    console.log(req.user);
    console.log(req.body);
    try {
      const permissionList = await PermissionColl.updateOne(
        {},
        {
          permissionList: req.body.permissionList,
        },
      ).exec();
      res.json({ data: permissionList });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
})();

controller.prefix = '/permissions';

export default controller;
