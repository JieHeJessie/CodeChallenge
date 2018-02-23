import React, { Component } from 'react';
import ResultList from './components/ResultList';
import SavedPropList from './components/SavedPropList';
import mockData from './mockdata.json';
import reaLogo from './asset/rea_logo.jpg';

import {Row, Col, Button} from 'reactstrap';


class App extends Component {

    constructor(props) {
        super(props);
        this.results = mockData.results;
        this.saved = mockData.saved;
        this.state = {
            showAddButton: 'none',
            showRemoveButton: 'none',
        }
    }

    removeProperty(id) {
        /*this.results.push(this.saved.find(item => item.id === id));*/
        this.saved = this.saved.filter(function(item) {
            return item.id !== id;
        });
        
    }

    getButton(id){
        if(this.saved.find(item => item.id === id)){
            return (<Button disabled>Saved</Button>);
        }else if(this.state.showAddButton === id){
            return (
                <Button onClick={() => 
                    this.saved.push(
                        this.results.find(item => item.id === id))}>Add Property
                </Button>);
        }else{
            return null;
        }
    }

    render() {
        return (
            <div >
                
                <h1 className="title"><img src={reaLogo} className="rea-logo"/> CODE CHALLENGE</h1>
                <Row className="app">
                    <Col xl="4" lg="4" md="12" className="result">
                        <h3>Results</h3>
                        <div className=" dashed-box">

                            {
                                this.results.map((data,index) => {
                                    return(
                                        <div className="box" onMouseOver={() => this.setState({showAddButton: data.id})}>
                                            <ResultList key={index} data={data}/>
                                            <div className="btn-style">
                                                {this.getButton(data.id)}
                                            </div>
                                        </div>
                                    )
                                }) 
                            }

                        </div>

                    </Col>

                    <Col xl="4" lg="4" md="12" className="save">
                        <h3>Saved Properties</h3>
                        <div className=" dashed-box">

                            {
                                this.saved.map((data,index) => {
                                    return(
                                        <div className="box" onMouseOver={() => this.setState({showRemoveButton: data.id})}>
                                            <SavedPropList key={index} data={data}/>
                                            <div className="btn-style">
                                                {this.state.showRemoveButton === data.id ? (<Button onClick={() => this.removeProperty(data.id)}>Remove Property</Button>) : null}
                                            </div>


                                        </div>

                                    )
                                })
                            }

                        </div>

                    </Col>               
                </Row>

            </div>
        );
    }
}

export default App;
