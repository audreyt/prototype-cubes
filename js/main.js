(function(){
  var ref$, div, a, config, Draggable, Hittable, CC;
  ref$ = React.DOM, div = ref$.div, a = ref$.a;
  config = {
    root: document.getElementById('container'),
    width: 200,
    height: 200
  };
  Draggable = {
    mixin: {
      componentDidMount: function(){
        $(this.getDOMNode()).on('mousedown', this.onMouseDown);
      },
      componentWillUnmount: function(){
        $(this.getDOMNode()).off('mousedown', this.onMouseDown);
      },
      onMouseDown: function(e){
        this.comp = {
          x: this.state.x,
          y: this.state.y
        };
        this.mouse = {
          x: e.pageX,
          y: e.pageY
        };
        $(window).on('mousemove', this.onMouseMove).on('mouseup', this.onMouseUp);
        $(this.getDOMNode()).off('mousedown', this.onMouseDown);
      },
      onMouseUp: function(e){
        $(window).off('mousemove', this.onMouseMove).off('mouseup', this.onMouseUp);
        $(this.getDOMNode()).on('mousedown', this.onMouseDown);
      },
      onMouseMove: function(e){
        this.setState({
          x: this.comp.x + e.pageX - this.mouse.x,
          y: this.comp.y + e.pageY - this.mouse.y
        });
      }
    }
  };
  Hittable = {
    list: [],
    status: {
      OUT: 0x00,
      OVERLAP: 0x01,
      IN: 0x03
    },
    mixin: {
      componentDidMount: function(){
        Hittable.list.push(this);
      },
      componentWillUnmount: function(){
        Hittable.list = Hittable.list.filter((function(it){
          return it !== this;
        }), this);
      }
    }
  };
  CC == null && (CC = {
    List: React.createClass({
      displayName: 'List',
      mixins: [Draggable.mixin, Hittable.mixin],
      getInitialState: function(){
        return {
          x: 200,
          y: 200,
          width: config.width,
          height: config.height,
          words: [0]
        };
      },
      leftClicked: function(e){
        e.preventDefault();
        this.state.words.unshift(0);
        this.setState({
          x: this.state.x - config.width,
          width: this.state.width + config.width,
          words: this.state.words
        });
        return console.log(this.state.words);
      },
      rightClicked: function(e){
        e.preventDefault();
        this.state.words.push(0);
        this.setState({
          width: this.state.width + config.width,
          words: this.state.words
        });
        return console.log(this.state.words);
      },
      render: function(){
        return div({
          className: 'cube-list',
          style: {
            left: this.state.x,
            top: this.state.y,
            width: this.state.width,
            height: this.state.height
          }
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
        });
      }
    })
  });
  React.renderComponent(CC.List(), config.root);
}).call(this);
