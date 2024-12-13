const path= require('path');
const express = require('express');
const infoRouter = express.Router();

const controllersDirectoryPath = path.join(process.cwd(), './controllers');
const InfoController = require(path.join(controllersDirectoryPath, './InfoController'));

const theInfoController = new InfoController();

// GET methods
// we connect all the options for 'normal' routing with /about, /help pages
infoRouter.get('/about', theInfoController.getAbout);
infoRouter.get('/help', theInfoController.getHelp);

module.exports = infoRouter;