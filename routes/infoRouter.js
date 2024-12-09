const path= require('path');
const express = require('express');
const infoRouter = express.Router();

const controllersDirectoryPath = path.join(process.cwd(), './controllers');
const InfoController = require(path.join(controllersDirectoryPath, './InfoController'));

const theInfoController = new InfoController();

// GET methods
// we connect all the options for 'normal' routing with /, /home and /index
infoRouter.get('/', theInfoController.getAbout);
infoRouter.get('/home', theInfoController.getHelp);

module.exports = homeRouter;