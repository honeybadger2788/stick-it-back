const db = require ('../database/models/index');
const { Op } = require("sequelize");

module.exports = {
    notesList :  (req,res) => {
        db.Note.findAll()
        .then(data=>{
            for (let i = 0; i < data.length; i++) {
                data[i].setDataValue('endopoint','notes/'+data[i].id)
            }
            let respuesta = {
                meta:{
                    status: 200,
                    total: data.length,
                    url: '/notes'
                },
                data: data
            }
            res.json(respuesta)
        })
        .catch(e=>{
            res.json({status:500})
            console.log(e)
        })
    },
    createNote: (req,res) => {
        db.Note.create({
            ...req.body
        })   
        .then(data=>{
            data.setDataValue('endopoint','notes/'+data.id)
            let respuesta = {
                meta:{
                    status: 200,
                    msg: "nota creada con exito",
                    url: '/notes/'+data.id
                },
                data: data
            }
            res.json(respuesta)
        })
        .catch(e=>{
            res.json({status:500})
            console.log(e)
        })
    },
    getNote: (req,res) => {
        db.Note.findByPk(req.params.idNote)
        .then(data=>{
            data.setDataValue('endopoint','notes/'+data.id)
            let respuesta = {
                meta:{
                    status: 200,
                    total: data.length,
                    url: '/notes/'+data.id
                },
                data: data
            }
            res.json(respuesta)
        })
        .catch(e=>{
            res.json({status:500})
            console.log(e)
        })
    },
    deleteNote: (req,res) => {
        db.Note.destroy({
            where:{
                id: req.params.idNote
            }
        })
        .then(data=>{
            let respuesta = {}
            if (data == 1){
                respuesta = {
                    meta:{
                        status: 200,
                        msg: "nota eliminada con exito",
                    },
                }
            } else {
                respuesta = {
                    meta:{
                        status: 500,
                        msg: "algo salió mal",
                    },
                }
            }
            res.json(respuesta)
        })
    },
    updateNote: (req,res) => {
        db.Note.update({
            title: req.body.title,
            text: req.body.text
        },
        {
            where: {
                id: req.params.idNote
            }
        })
        .then(data=>{
            let respuesta = {}
            if (data == 1){
                respuesta = {
                    meta:{
                        status: 200,
                        msg: "nota editada con exito",
                    },
                }
            } else {
                respuesta = {
                    meta:{
                        status: 500,
                        msg: "algo salió mal",
                    },
                }
            }
            res.json(respuesta)
        })
    },
    search: (req,res) => {
        db.Note.findAll({
            where: {
                [Op.or]: {
                    title: {
                        [Op.like]: '%'+req.query.search+'%',
                    },
                    text: {
                        [Op.like]: '%'+req.query.search+'%',
                    }
                }                
            }
        })
        .then(data=>{
            for (let i = 0; i < data.length; i++) {
                data[i].setDataValue('endopoint','notes/'+data[i].id)
            }
            let respuesta = {
                meta:{
                    status: 200,
                    total: data.length,
                    search: req.query.search,
                    url: '/notes'
                },
                data: data
            }
            res.json(respuesta)
        })
        .catch(e=>{
            res.json({status:500})
            console.log(e)
        })            
    }
}