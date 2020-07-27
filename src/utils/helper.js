import _ from 'lodash'
import moment from 'moment'

/**
 * Returns an array of date of the specified count
 * @param {*} count
 */
export function getInitTime (count) {
  const dates = Array(count).fill(null)
  for (let index = 0; index < count; index++) {
    const now = moment()
    now.subtract('seconds', index * 10)
    const start = (count - index) - 1
    dates.splice(start, 1, now.format('mm:ss'))
  }
  return dates
}

export function addIfNotExist (arr, value) {
  if (Array.isArray(value)) {
    value.map((value, index) => {
      if (!arr.includes(value)) {
        arr.push(value)
      }
    })
  } else {
    if (!arr.includes(value)) {
      arr.push(value)
      return arr
    }
  }
  return arr
}

export function replaceLastPopFirst (arr, value) {
  _.reverse(arr)
  arr.splice(0, 0, value)
  arr.pop()
  return _.reverse(arr)
}

export function defaultChartOption (metricName) {
  return {
    responsive: true,
    legend: {
      labels: {
        fontColor: 'rgba(255, 255, 255, 0.973)',
      },
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            zeroLineColor: 'rgba(161, 161, 161, 0.973)',
            color: 'rgba(161, 161, 161, 0.973)',
            lineWidth: 1,
          },
          ticks: {
            fontColor: 'white',
            position: 'right',
          },
          scaleLabel: {
            display: true,
            fontColor: 'white',
            fontStyle: 'bold',
            labelString: 'Seconds',
          },
        },
      ],
      yAxes: [{
        display: true,
        position: 'right',
        gridLines: {
          color: 'rgba(161, 161, 161, 0.973)',
          lineWidth: 1,
        },
        ticks: {
          fontColor: 'white',
          maxTicksLimit: 6,
          beginAtZero: true,
        },
        scaleLabel: {
          display: true,
          fontStyle: 'bold',
          fontColor: 'white',
          labelString: metricName.charAt(0).toUpperCase() + metricName.slice(1),
        },
      },
      ],
    },
  }
}

export function getObjectFromArray (arr, label) {
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index]
    if (typeof element.label === 'undefined') continue
    if (element.label === label) return element
  }
  return false
}

export function defaultDataSetConfig (count, color) {
  const data = Array(count).fill(null)
  const lineColor = color
  return {
    fill: false,
    backgroundColor: color,
    borderColor: lineColor,
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(17, 99, 156,0.4)',
    pointBackgroundColor: 'rgb(17, 99, 156)',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(17, 99, 156,1)',
    pointHoverBorderColor: 'rgba(17, 99, 156,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    data: data,
    pointHitRadius: 10,
  }
}
