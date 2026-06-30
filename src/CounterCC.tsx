import { Component } from "react"

interface CounterState {
    count: number
}

export class Counter extends Component<{}, CounterState> {
    state: CounterState = {
        count: 0,
    }

    derName = () => this.setState({ count: this.state.count + 1 })

    render() {
        return (
            <div>
                <button onClick={this.derName}>
                    Count : {this.state.count}
                </button>
            </div>
        )
    }
}