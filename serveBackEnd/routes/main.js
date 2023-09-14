/*
This file consists of different route per specific page. These routes will be utilized as a rest
api to connect mongo with fron-end react
*/

//necessary imports of epress modules and libraires including other custom made files
import express  from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

//Initilization of express router modules to gain access to router
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//routing paths here.
router.get(['^/$', '^/index(.html)?$'], (req, res) => {
  const viewPath = join(__dirname, '..', 'view', 'index.html');
  res.sendFile(viewPath);
});

export default router;
