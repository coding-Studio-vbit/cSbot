# vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2
_ = require 'lodash'

module.exports = to_human = (secs) ->
  secs = (+secs)

  times = [
    secs / 60 / 60 / 24 / 365
    secs / 60 / 60 / 24 / 30
    secs / 60 / 60 / 24
    secs / 60 / 60
    secs / 60
    secs
  ]

  labels = [
    'year'
    'month'
    'day'
    'hour'
    'minute'
    'second'
  ]

  results = {}

  i = 0

  for label in labels
    results[label] = times[i]
    ++ i

  for label,count of results
    if count >= 1
      if count is 1
        singular = yes
      else
        singular = no
        if count.toString().indexOf('.') > -1
          count = count.toFixed 1
        else
          count = count

      return str = [
        count
        label + (if !singular then 's' else '')
      ].join ' '

  return new Error 'Failed to convert seconds to human format'

###
console.log to_human 3838
console.log to_human '3600'
console.log to_human 12
console.log to_human 1200
console.log to_human 3600*24*100
###

