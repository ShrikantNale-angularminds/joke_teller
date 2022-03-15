import React, { Component } from "react";
import axios from "axios";
import JokeTellerForm from "./JokeTellerForm";

export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            languages: {},
            info: {},
        };
    }

    componentDidMount() {
        axios
            .get(`https://v2.jokeapi.dev/languages`)
            .then((res) => this.setState({ languages: res.data }));

        axios
            .get(`https://v2.jokeapi.dev/info`)
            .then((res) => this.setState({ info: res.data }));
        // this.getData();
    }

    /* async getData() {
          axios.get(`https://v2.jokeapi.dev/languages`)
              .then(res => this.setState({ languages: res.data }))
  
          axios.get(`https://v2.jokeapi.dev/info`)
              .then(res => this.setState({ info: res.data }))
      } */

    //   componentWillUnmount() {
    //     return false;
    //   }

    render() {
        return (

            <JokeTellerForm
                jokesInfo={this.state.info.jokes}
                languages={this.state.languages}
            />
        );
    }
}

export default Home;
