import { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 1 };

    // Bind handlers so `this` refers to the instance
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }
  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
      
  }

  componentDidMount(): void {
      
  }

  componentWillUnmount(): void {
      
  }

  increment() {
    // Functional form — the class equivalent of prev => prev + 1
    this.setState(prevState => ({ count: prevState.count + 1 }));
  }

  decrement() {
    this.setState(prevState => ({ count: prevState.count - 1 }));
  }

  reset() {
    this.setState({ count: 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.decrement}>−</button>
        <button onClick={this.increment}>+</button>
        <button onClick={this.reset}>Reset</button>
      </div>
    );
  }
}

export default Counter;

