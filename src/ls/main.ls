{div, a} = React.DOM

config = do
  root: document.getElementById \container
  width:  200
  height: 200

Draggable = do
  mixin:
    componentDidMount: !->
      $ @getDOMNode! .on \mousedown @onMouseDown
    componentWillUnmount: !->
      $ @getDOMNode! .off \mousedown @onMouseDown
    onMouseDown: !(e) ->
      @comp = do
        x: @state.x
        y: @state.y
      @mouse = do
        x: e.pageX
        y: e.pageY
      # register listeners at topmost element
      $ window
        .on \mousemove @onMouseMove
        .on \mouseup   @onMouseUp
      $ @getDOMNode! .off \mousedown @onMouseDown
    onMouseUp: !(e) ->
      $ window
        .off \mousemove @onMouseMove
        .off \mouseup   @onMouseUp
      $ @getDOMNode! .on \mousedown @onMouseDown
    onMouseMove: !(e) ->
      @setState do
        x: @comp.x + e.pageX - @mouse.x
        y: @comp.y + e.pageY - @mouse.y

Hittable = do
  list: []
  mixin:
    componentDidMount: !->
      @onHit = @props.onHit or !(obj) -> ...
      Hittable.list.push this
    componentWillUnmount: !->
      Hittable.list := Hittable.list.filter (isnt this), this
    #componentWillUpdate: !(props, state) ->
      # do the collision tests here
      # changing the state will affect the new state

CC ?= do
  HitArea: React.createClass do
    displayName: \HitArea
    mixins: [Hittable.mixin]
    getDefaultProps: ->
      width:  config.width
      height: config.height
    render: ->
      div do
        # transfer className manually,
        # so width and height will not be exposed
        className: @props.className
        style:
          width:  @props.width
          height: @props.height
  List: React.createClass do
    displayName: \List
    mixins: [Draggable.mixin, Hittable.mixin]
    getInitialState: ->
      x: 200
      y: 200
      width:  config.width
      height: config.height
      words: [0]
    onLeftHit: (e) ->
      ...
    onRightHit: (e) ->
      ...
    render: ->
      div do
        className: 'cube-list'
        style:
          left:   @state.x
          top:    @state.y
          width:  @state.width
          height: @state.height
        * CC.HitArea do
            className: 'hit left'
            width:  config.width / 2
            height: config.height
            onHit: @onLeftHit
        * CC.HitArea do
            className: 'hit right'
            width:  config.width / 2
            height: config.height
            onHit: @onRightHit

React.renderComponent CC.List!, config.root

