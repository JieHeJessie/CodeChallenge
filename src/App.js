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
        this.state = {
            showAddButton: 'none',
            showRemoveButton: 'none',
            saved : mockData.saved
        }
    }

    removeProperty(id) {
        const saved = this.state.saved.filter(s => s.id !== id);
        this.setState({ saved });
    }

    addProperty(id){
        if(!this.state.saved.find(item => item.id === id)){
            const newSaved = this.state.saved.slice();
            newSaved.push(this.results.find(item => item.id === id));
            this.setState({ saved : newSaved });
        }
    }

    getButton(id){

        if(this.state.showAddButton === id){
            const savedList = this.state.saved;
            if(savedList.find(item => item.id === id)){
                return (<Button className="disable" disabled>Saved</Button>);
            }else{
                return (<Button onClick={() => this.addProperty(id)}>Add Property</Button>);
            }
        }else{
            return null;
        }
    }

    render() {
        return (
            <div >   
                <h1 className="title"><img src={reaLogo} className="rea-logo"/> CODE CHALLENGE</h1>
                <Row className="app">
                    <Col xl="4" lg="4" md="12" className="result" id='results'>
                        <h3>Results</h3>
                        <div className=" dashed-box">
                            {this.results.map((data,index) => {
                                return(
                                    <div className="box" id={"box" + data.id} 
                                        onMouseOver={() => this.setState({showAddButton: data.id})}
                                        onMouseLeave = {() => this.setState({showAddButton: null})}>
                                        <ResultList key={index} data={data}/>
                                        <div className="btn-style">
                                            {this.getButton(data.id)}
                                        </div>
                                    </div>)
                            })}
                        </div>
                    </Col>

                    <Col xl="4" lg="4" md="12" className="save" id="saved">
                        <h3>Saved Properties</h3>
                        <div className=" dashed-box">
                            {this.state.saved.map((data,index) => {
                                return(
                                        <div className="box" id={"box" + data.id} 
                                        onMouseOver={() => this.setState({showRemoveButton: data.id})}
                                        onMouseLeave = {() => this.setState({showRemoveButton: null})}>
                                            <SavedPropList key={index} data={data}/>
                                            <div className="btn-style">
                                                {this.state.showRemoveButton === data.id ? 
                                                    (<Button onClick={
                                                        () => this.removeProperty(data.id)}>Remove Property
                                                    </Button>) : null}
                                            </div>
                                        </div>)
                            })}
                        </div>
                    </Col>               
                </Row>
            </div>
        );
    }
}

export default App;
