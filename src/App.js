import React from "react";
import "./App.css";
import { Component, Suspense } from "react";
import Page1 from "./components/Page1";
// part 1 - no code splitting
// import page2 from "./Components/Page2"
// import page3 from "./Components/Page3"
// part 3 - Cleaner code splitting
// import AsyncComponent from "./components/AsyncComponent";
// part 4 - React.lazy
const Page2Lazy = React.lazy(() => import("./components/Page2"));
const Page3Lazy = React.lazy(() => import("./components/Page3"));

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: "page1",
      component: null,
    };
  }

  onRouteChange = (route) => {
    // no code splitting
    this.setState({ route });

    // with code splitting
    // if (route === "page1") {
    //   this.setState({ route: route });
    // } else if (route === "page2") {
    //   import("./components/Page2").then((Page2) =>
    //     this.setState({ route: route, component: Page2.default })
    //   );
    // } else if (route === "page3") {
    //   import("./components/Page3").then((Page3) =>
    //     this.setState({ route: route, component: Page3.default })
    //   );
    // }
  };

  render() {
    // if (this.state.route === "page1") {
    //   return <Page1 onRouteChange={this.onRouteChange} />;
    // } else if (this.state.route === "page2") {
    //   const AsyncPage2 = AsyncComponent(() => import("./components/Page2"));
    //   return <AsyncPage2 onRouteChange={this.onRouteChange} />;
    // } else if (this.state.route === "page3") {
    //   const AsyncPage3 = AsyncComponent(() => import("./components/Page3"));
    //   return <AsyncPage3 onRouteChange={this.onRouteChange} />;
    // }
    // if (this.state.route === "page1") {
    //   return <Page1 onRouteChange={this.onRouteChange} />;
    // } else {
    //   return <this.state.component onRouteChange={this.onRouteChange} />;
    // }

    // part 4 React lazy
    if (this.state.route === "page1") {
      return <Page1 onRouteChange={this.onRouteChange} />;
    } else if (this.state.route === "page2") {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <Page2Lazy onRouteChange={this.onRouteChange} />
        </Suspense>
      );
    } else if (this.state.route === "page3") {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <Page3Lazy onRouteChange={this.onRouteChange} />
        </Suspense>
      );
    }
  }
}

export default App;
