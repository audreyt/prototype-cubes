Timer = React.createClass do
  displayName: \Timer
  getInitialState: ->
    secondsElapsed: 0
  tick: !->
    @setState secondsElapsed: @state.secondsElapsed + 1
  componentDidMount: !->
    @interval = setInterval @tick, 1000
  componentWillUnmount: !->
    clearInterval @interval
  render: ->
    React.DOM.div null, 'Seconds Elapsed: ', @state.secondsElapsed

React.renderComponent Timer!, document.getElementById \container

