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
  status:
    OUT:     0x00
    OVERLAP: 0x01
    IN:      0x03
  mixin:
    componentDidMount: !->
      Hittable.list.push this
    componentWillUnmount: !->
      Hittable.list := Hittable.list.filter (isnt this), this
    #componentWillUpdate: !(props, state) ->
      # do the collision tests here
      # changing the state will affect the new state

CC ?= do
  List: React.createClass do
    displayName: \List
    mixins: [Draggable.mixin, Hittable.mixin]
    getInitialState: ->
      x: 200
      y: 200
      width:  config.width
      height: config.height
      words: [0]
    leftClicked: (e) ->
      e.preventDefault!
      @state.words.unshift 0
      @setState do
        x: @state.x - config.width
        width: @state.width + config.width
        words: @state.words
      console.log @state.words
    rightClicked: (e) ->
      e.preventDefault!
      @state.words.push 0
      @setState do
        width: @state.width + config.width
        words: @state.words
      console.log @state.words
    render: ->
      div do
        className: 'cube-list'
        style:
          left:   @state.x
          top:    @state.y
          width:  @state.width
          height: @state.height
        /*
        * a do
            className: 'hit left'
            style:
              width:  config.width / 2
              height: config.height
            href: '#'
            #onClick: @leftClicked
        * a do
            className: 'hit right'
            style:
              width:  config.width / 2
              height: config.height
            href: '#'
            #onClick: @rightClicked
        */

React.renderComponent CC.List!, config.root

