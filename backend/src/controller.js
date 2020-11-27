const controller = {
    findAll: (collection, _, res) => {
      collection
        .find()
        .toArray()
        .then((error, results) => { 
            if (error) return res.send(error)
            res.status(200).send({results})
        }).catch(err => res.send(err))
    },
    findOne: (collection, req, res) => { 
       collection.findOne(req.body)
        .then((error, results) => {
            if (error) return res.send(error)
            return res.status(200).send(results.data)
        }).catch(err => res.send(err))
    },
    insertOne: (collection, req, res) => {
      collection
        .insertOne(req.body)
          .then(() =>  res.status(200).send(`item successfully inserted`))
          .catch(err =>  res.send(`Failed to insert item: ${err}`))
    }, 
    deleteAll: (collection, _, res) => { 
      if (process.env.ENV !== "DEVELOPPEMENT") { return res.send('action not permitted')}
      collection.deleteMany() 
      res.status(200).send('collection successfully dropped')
    }
}
module.exports = controller

