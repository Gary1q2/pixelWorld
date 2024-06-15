//import * as React from "react";
//import * as ReactDOM from "react-dom";
import Counter from "./Pixel";

const App: React.FC = () => {
    return (
        <div>
            <h1>Counterrr</h1>
            <Counter />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));