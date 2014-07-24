(function(){
  var ref$, div, a, CC;
  ref$ = React.DOM, div = ref$.div, a = ref$.a;
  CC == null && (CC = {
    config: {
      width: 200,
      height: 200
    },
    List: React.createClass({
      displayName: 'List',
      getInitialState: function(){
        return {
          x: 200,
          y: 200,
          width: CC.config.width,
          height: CC.config.height,
          words: [0]
        };
      },
      leftClicked: function(e){
        e.preventDefault();
        this.state.words.unshift(0);
        this.setState({
          x: this.state.x - CC.config.width,
          width: this.state.width + CC.config.width,
          words: this.state.words
        });
        return console.log(this.state.words);
      },
      rightClicked: function(e){
        e.preventDefault();
        this.state.words.push(0);
        this.setState({
          width: this.state.width + CC.config.width,
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
        }, a({
          className: 'hit left',
          style: {
            width: CC.config.width / 2,
            height: CC.config.height
          },
          href: '#',
          onClick: this.leftClicked
        }), a({
          className: 'hit right',
          style: {
            width: CC.config.width / 2,
            height: CC.config.height
          },
          href: '#',
          onClick: this.rightClicked
        }));
      }
    })
  });
  React.renderComponent(CC.List(), document.getElementById('container'));
}).call(this);
