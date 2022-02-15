
const res = require('express/lib/response')
const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
  
}

const getById = id => {
  return db('accounts').where({ id: id }).first()
}

const create = account => {
  return db('accounts').insert(account).then(account)
  
}

const updateById = (id, account) => {
  return db('accounts').where({ id:id }).update(account).then(account)
}

const deleteById = id => {
  const results = getById(id);
  return db('accounts').where({ id: id}).del().then(results)
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
