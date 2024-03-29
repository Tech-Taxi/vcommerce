const Tour = require('../models/product')

class APIFeatures {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }

  search() {
    if (this.queryString.search) {
      this.query = Tour.find({
        $or: [
          { title: { $regex: this.queryString.search, $options: "i" } },
          { desc: { $regex: this.queryString.search, $options: "i" } },
          { brand: { $regex: this.queryString.search, $options: "i" } },
        ]
      }); console.log(this.queryString.search)
    }
    return this;
  }

  filter() {
    let queryObj = { ...this.queryString }
    const excludedFields = ['limit', 'sort', 'fields', 'page', 'search']
    excludedFields.forEach((i) => delete queryObj[i])
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`,
    )
    queryObj = JSON.parse(queryStr)
    this.query = this.query.find(queryObj)
    return this
  }

  sort() {
    if (this.queryString.sort) {
      const sortCriteria = this.queryString.sort.split(',').join(' ')
      this.query = this.query.sort(sortCriteria)
    } else this.query = this.query.sort('-createdAt')
    return this
  }

  fields() {
    if (this.queryString.fields) {
      const limitCriteria = this.queryString.fields.split(',').join(' ')
      this.query = this.query.select(limitCriteria)
    } else this.query = this.query.select('-__v')
    return this
  }

  paginate() {
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 100
    const skip = (page - 1) * limit
    this.query = this.query.skip(skip).limit(limit)
    return this
  }
}
module.exports = APIFeatures
