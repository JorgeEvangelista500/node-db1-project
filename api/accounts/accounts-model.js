

const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
  
}

const getById = id => {
  return db('accounts').where( 'id', id ).first()
}

const create = async account => {
  const [id] = await db('accounts').insert(account)
  return getById(id)
}

const updateById = (id, account) => {
  db('accounts').where({ id:id }).update(account).then(account)
  return getById(id)
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
