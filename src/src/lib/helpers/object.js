module.exports.get = function (object, path, defaultValue) {
  if (!path) {
    return object
  }

  const keys = typeof path === 'string' ? path.split('.') : path

  const findFn = function (obj, index) {
    const find = obj[keys[index]] !== undefined ? obj[keys[index]] : defaultValue
    if (index !== keys.length - 1 && typeof find === 'object' && find !== null) {
      return findFn(find, index + 1)
    }

    return find
  }

  return findFn(object, 0)
}

module.exports.set = function (object, path, value) {
  if (!path) {
    return
  }

  const keys = typeof path === 'string' ? path.split('.') : path

  const findAndSetFn = function (obj, index) {
    if (index !== keys.length - 1) {
      if (obj[keys[index]] === undefined && index < keys.length - 1) {
        obj[keys[index]] = {}
      }
      findAndSetFn(obj[keys[index]], index + 1)
    } else {
      obj[keys[index]] = value
    }
  }

  findAndSetFn(object, 0)
}

module.exports.byKey = (array, keyName, valueName) => {
  const result = {}
  array.forEach(item => {
    result[item[keyName]] = valueName ? item[valueName] : item
  })

  return result
}
