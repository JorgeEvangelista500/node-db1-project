const Accounts = require('./accounts-model')

module.exports = {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId
}

async function checkAccountPayload(req, res, next){
  if (!req.body){
    res.status(400).json({message: "name and budget are required"})

  } else if (req.body.name.trim().length < 3 || req.body.name.trim().length > 100){
    res.status(400).json({ message: "name of account must be between 3 and 100" })

  } else if (req.body.budget < 0 || req.body.budget > 100){
    res.status(400).json({ message: "budget of account is too large or too small"})

  } else if (parseInt(req.body.budget)){
    res.status(400).json({ message: " budget of account must be a number"})
  } else {
    next();
  }
}
async function checkAccountNameUnique(req, res, next) {
    const accounts = await Accounts.getAll();
    const checkName = accounts.filter(accounts =>
      accounts.name === req.body.name)
    if(checkName > 0) {
      res.status(400).json({ message: "that name is taken"})
    } else {
      next()
    }
}

async function checkAccountId(req, res, next){
    const id = req.params.id
    const results = await Accounts.getById(id)
    if(results == null) {
      res.status(404).json({message:"account not found"})
    } else {
      next()
    }   
}
