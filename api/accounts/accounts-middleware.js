const Accounts = require('./accounts-model')
const db = require('../../data/db-config')

module.exports = {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId
}

 function checkAccountPayload(req, res, next){
  if (req.body.name === undefined || req.body.budget === undefined){
    res.status(400).json({message: "name and budget are required"})

  } else if (req.body.name.trim().length < 3 || req.body.name.trim().length > 100){
    res.status(400).json({ message: "name of account must be between 3 and 100" })

  } else if (req.body.budget < 0 || req.body.budget > 1000000){
    res.status(400).json({ message: "budget of account is too large or too small"})

  } else if (typeof req.body.budget !== 'number'){
    res.status(400).json({ message: " budget of account must be a number"})
  } else {
    next();
  }
}
async function checkAccountNameUnique(req, res, next) {
    const existing = await db('accounts')
      .where('name', req.body.name.trim())
      .first()
    if(existing) {
      res.status(400).json({ message: 'that name is taken'})
    } else {
      next()
    }
}

async function checkAccountId(req, res, next){
    const results = await Accounts.getById(req.params.id)
    if(results == null) {
      res.status(404).json({message:"account not found"})
    } else {
      req.account = results
      next()
    }   
}


// async function checkAccountNameUnique(req, res, next) {
//   const accounts = await Accounts.getAll();
//   const checkName = accounts.filter(accounts =>
//     accounts.name.trim() === req.body.name.trim())
//   if(checkName === 0) {
//     next()
//   } else {
//     res.status(400).json({ message: "that name is taken"})
//   }
// }