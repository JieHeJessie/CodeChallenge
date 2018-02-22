import React, { Component } from 'react';
import ResultList from './components/ResultList';
import SavedPropList from './components/SavedPropList';
import mockData from './mockdata.json';

import {Row, Col,Button} from 'reactstrap';


class App extends Component {

  constructor(props) {
        super(props);
        this.results = mockData.results;
        this.saved = mockData.saved;
        this.state = {
          showAddButton: 'none',
            
        }
        this.getResultsData=this.getResultsData.bind(this);
    }

  getResultsData() {
        return this.results.map((data, index) => (
            <div>heheh</div>
        ));
    }


    addProperty(id) {
      console.log('test1');
        this.saved.push(this.results.find(item => item.id === id));
        this.results = this.results.filter(function(item) {
            return item.id !== id;
        });
    }

    removeProperty(id) {
        this.results.push(this.saved.find(item => item.id === id));
        this.saved = this.saved.filter(function(item) {
            return item.id !== id;
        });
    }


  render() {

    return (
      <div >
            <h1 className="title">CODE CHALLENGE</h1>
            <Row className="app">
                <Col xl="4" style={{border: '2px dashed #e1e1e1'}} >
                     
                    {
                        this.results.map((d,i)=>{
                            return(
                              <div style={{border: '2px dashed #e1e1e1'}} onMouseOver={() => this.setState({showAddButton: d.id})}>
                                <ResultList key={i} data={d} />
                                {this.state.showAddButton === d.id ? (<Button color="primary" style={{borderRadius: '20px'}} onClick={() => this.addProperty(d.id)}>add Property</Button>) : null}
                              </div>
                                
                            )
                        })
                    }
                      
                </Col>
                
                <Col xl="4" style={{border: '2px dashed #e1e1e1' , marginLeft: 150}}>
                    {
                        this.saved.map((d,i)=>{
                            return(
                              <div style={{border: '2px dashed #e1e1e1'}}>
                                <ResultList key={i} data={d} />
                                <Button color="primary" style={{borderRadius: '20px'}} onClick={() => this.removeProperty(this.d.id)}>Remove Property</Button>
                              </div>
                                
                            )
                        })
                    }
                </Col>               
            </Row>

      </div>
    );
  }
}

export default App;
