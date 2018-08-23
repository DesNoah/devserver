module.exports = {
  moment: (timestamp, separater) => {
    const date = new Date(timestamp),
      Y = date.getFullYear(),
      M = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
      D = date.getDate(),
      h = date.getHours(),
      m = date.getMinutes(),
      s = date.getSeconds(),
      separator = separater || '-'
    return [Y, separator, M, separator, D, ' ', h, ':', m, ':', s].join('');
  }
}