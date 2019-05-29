import React, {Component} from 'react';
const moment = require('moment');
const momentDurationFormatSetup = require('moment-duration-format');
momentDurationFormatSetup(moment);

const SVGCircle = ({radius}) => (
  <svg className="countdown-svg">
    <path fill="none" stroke="#333" strokeWidth="4" d={describeArc(50, 50, 48, 0, radius)} />
  </svg>
);

class CountDownComponent extends Component {
  constructor(props) {
    super(props);
    this.timeTillDate = props.match.params.untilTimestamp ? props.match.params.untilTimestamp : moment();
    this.timeFormat = 'MM DD YYYY, h:mm a';
    this.state = {
      days: undefined,
      hours: undefined,
      minutes: undefined,
      seconds: undefined,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const then = moment(parseInt(this.timeTillDate));
      const now = moment();
      const countdown = then.diff(now);
      const timeLeft = moment
        .duration(countdown, 'milliseconds')
        .format('d[d]h:mm:ss', {trim: false})
        .split('d');
      const days = timeLeft[0];
      const hours = timeLeft[1].split(':')[0];
      const minutes = timeLeft[1].split(':')[1];
      const seconds = timeLeft[1].split(':')[2];

      this.setState({days, hours, minutes, seconds});
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    const {days, hours, minutes, seconds} = this.state;
    const daysRadius = mapNumber(days, 0, 366, 0, 360);
    const hoursRadius = mapNumber(hours, 0, 24, 0, 360);
    const minutesRadius = mapNumber(minutes, 0, 60, 0, 360);
    const secondsRadius = mapNumber(seconds, 0, 60, 0, 360);

    if (!seconds) {
      return null;
    }

    return (
      <div>
        <h1>Countdown until {moment(parseInt(this.timeTillDate)).format(this.timeFormat)}</h1>
        <div className="countdown-wrapper">
          {days && (
            <div className="countdown-item">
              <SVGCircle radius={daysRadius} />
              {days}
              <span>days</span>
            </div>
          )}
          {hours && (
            <div className="countdown-item">
              <SVGCircle radius={hoursRadius} />
              {hours}
              <span>hours</span>
            </div>
          )}
          {minutes && (
            <div className="countdown-item">
              <SVGCircle radius={minutesRadius} />
              {minutes}
              <span>minutes</span>
            </div>
          )}
          {seconds && (
            <div className="countdown-item">
              <SVGCircle radius={secondsRadius} />
              {seconds}
              <span>seconds</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

// From stackoverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (x, y, radius, startAngle, endAngle) => {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  var d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');

  return d;
};

// Stackoverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const mapNumber = (number, in_min, in_max, out_min, out_max) => {
  return ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

export default CountDownComponent;
