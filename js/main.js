(function(){
  var Timer;
  Timer = React.createClass({
    displayName: 'Timer',
    getInitialState: function(){
      return {
        secondsElapsed: 0
      };
    },
    tick: function(){
      this.setState({
        secondsElapsed: this.state.secondsElapsed + 1
      });
    },
    componentDidMount: function(){
      this.interval = setInterval(this.tick, 1000);
    },
    componentWillUnmount: function(){
      clearInterval(this.interval);
    },
    render: function(){
      return React.DOM.div(null, 'Seconds Elapsed: ', this.state.secondsElapsed);
    }
  });
  React.renderComponent(Timer(), document.getElementById('container'));
}).call(this);
