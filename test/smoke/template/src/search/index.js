import React from 'react';
import ReactDOM from 'react-dom';
import logo from './images/logo.png';
import './search.less';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Text: null
    };
    this.loadComponent.bind(this);
  }

  loadComponent() {
    import('./text.js').then((Text) => {
      this.setState({
        Text: Text.default
      });
    });
  }

  render() {
    const { Text } = this.state;
    return (
      <div className="search-text">
        {Text ? <Text /> : null}
        搜索文字的内容
        <img src={logo} onClick={this.loadComponent} alt="img" />
      </div>
    );
  }
}

ReactDOM.render(<Search />, document.getElementById('root'));
