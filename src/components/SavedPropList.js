import React from 'react';
import {Container} from 'reactstrap';

class SavedPropList extends React.Component{
    
    constructor(props){
        super(props)
        
    }
    
    render(){
        return(
            <Container>
                <div style={{borderBottom: '2px solid #e1e1e1', backgroundColor: this.props.data.agency.brandingColors.primary, textAlign: 'center', borderRadius: '5px 5px 0px 0px'}}>
                    <span style={{color: '#fff'}}>ID: {this.props.data.id}</span>
                    <img src={this.props.data.agency.logo} style={{width: 60,  display: 'float', float: 'left', borderRadius: '5px 0px 0px 0px'}}/>
                </div>
                <div style={{borderBottom: '2px solid #e1e1e1', textAlign: 'center'}}>
                    <img src={this.props.data.mainImage} style={{width: '100%', height: '100%'}}/>
                </div>
                <div style={{textAlign: 'center'}}>
                    <span>price: {this.props.data.price}</span> 
                </div>

             </Container>
        )
    }
}

export default SavedPropList