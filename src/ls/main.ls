{div, a} = React.DOM

CC ?= do
  config:
    width:  200
    height: 200
  List: React.createClass do
    displayName: \List
    getInitialState: ->
      x: 200
      y: 200
      width:  CC.config.width
      height: CC.config.height
      words: [0]
    leftClicked: (e) ->
      e.preventDefault!
      @state.words.unshift 0
      @setState do
        x: @state.x - CC.config.width
        width: @state.width + CC.config.width
        words: @state.words
      console.log @state.words
    rightClicked: (e) ->
      e.preventDefault!
      @state.words.push 0
      @setState do
        width: @state.width + CC.config.width
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
        * a do
            className: 'hit left'
            style:
              width:  CC.config.width / 2
              height: CC.config.height
            href: '#'
            onClick: @leftClicked
        * a do
            className: 'hit right'
            style:
              width:  CC.config.width / 2
              height: CC.config.height
            href: '#'
            onClick: @rightClicked

React.renderComponent CC.List!, document.getElementById \container

