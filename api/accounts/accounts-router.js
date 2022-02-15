
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
    Accounts.getById(req.params.id)
      .then(account =>{
        res.status(200).json(account)
      })
})

router.post('/', (req, res, next) => {
    Accounts.create(req.body)
      .then(newAccount => {
        res.status(201).json(newAccount)
      })
})

router.put('/:id', (req, res, next) => {
    Accounts.updateById(req.params.id, req.body)
      .then(updatedAccount => {
        res.status(200).json(updatedAccount)
      })
});

router.delete('/:id', (req, res, next) => {
    Accounts.deleteById(req.params.id)
      .then(deleted => {
        res.status(200).json(deleted)
      })
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
