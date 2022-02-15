
const router = require('express').Router()

const { checkAccountId, checkAccountNameUnique, checkAccountPayload,  } = require('./accounts-middleware.js')

const Accounts = require('./accounts-model')


router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(accounts =>{
      res.status(200).json(accounts)
    })
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.json(req.account)  
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
    Accounts.create({name:req.body.name.trim(), budget:req.body.budget})
      .then(newAccount => {
        res.status(201).json(newAccount)
      })
})

router.put('/:id', checkAccountPayload, checkAccountId, (req, res, next) => {
    Accounts.updateById(req.params.id, req.body)
      .then(updatedAccount => {
        res.status(200).json(updatedAccount)
      })
});

router.delete('/:id', checkAccountId, (req, res, next) => {
    Accounts.deleteById(req.params.id)
      .then(deleted => {
        res.status(200).json(deleted)
      })
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
