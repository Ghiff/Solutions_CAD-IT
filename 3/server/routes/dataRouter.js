const express = require('express');
const data = require('../models/dataModels');


var dataRouter = express.Router();
dataRouter.use(express.json());

dataRouter.route('/')

    .post((req, res, next)=>{

        data.create(req.body)
        .then((results)=>{

            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(results);
        })
        .catch((err)=>{

            res.statusCode = 500;
            res.end('Internal Server Error');
            console.log(err);
        })
    })

    .delete((req, res, next) =>{
        data.remove()
            .then((response)=>{
                res.statusCode = 200;
                res.end('all data deleted');
            })
            .catch((err)=>{
                console.log(err);
                res.statusCode = 500;
                res.end('Internal Server Error');                
            })
    });

dataRouter.route('/latest')
    .get((req, res,next)=>{

        // data.find({}).sort({createdAt :-1})
        data.aggregate([
            {
                $match: { $or : [{roomId : "1"},{roomId : "2"},{roomId : "3"},{roomId : "4"},{roomId : "5"}]}
            },
            {
                $sort: {
                    createdAt : -1
                }
            },
            { 
                $group: { 
                    _id: '$roomId',
                    temperature: { $last: '$payload.temperature' }, 
                    humidity: { $last:'$payload.humidity' },
                    createdAt : {$last : '$createdAt'}
                }
            },
            {
                $project: {
                    roomId: '$roomId',
                    temperature : 1,
                    humidity : 1,
                    createdAt : 1
                }
            }
        ])
            .then((result)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(result);
            })
            .catch((err)=>{
                res.statusCode = 500;
                res.end('Internal Server Error');
                console.log(err);
            })
    })

module.exports = dataRouter;