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
    mixin: {
      componentDidMount: function(){
        this.onHit = this.props.onHit || function(obj){
          throw Error('unimplemented');
        };
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
    HitArea: React.createClass({
      displayName: 'HitArea',
      mixins: [Hittable.mixin],
      getDefaultProps: function(){
        return {
          width: config.width,
          height: config.height
        };
      },
      render: function(){
        return div({
          className: this.props.className,
          style: {
            width: this.props.width,
            height: this.props.height
          }
        });
      }
    }),
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
      onLeftHit: function(e){
        throw Error('unimplemented');
      },
      onRightHit: function(e){
        throw Error('unimplemented');
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
        }, CC.HitArea({
          className: 'hit left',
          width: config.width / 2,
          height: config.height,
          onHit: this.onLeftHit
        }), CC.HitArea({
          className: 'hit right',
          width: config.width / 2,
          height: config.height,
          onHit: this.onRightHit
        }));
      }
    })
  });
  React.renderComponent(CC.List(), config.root);
}).call(this);
