import React from 'react';

export default class Input extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			currentValue:""
		}
	}
	inputChange(e){
		this.setState({
			currentValue:e.target.value
		});
	}
	componentDidUpdate(prevProps,prevState){
		this.props.selectValue(this.state.currentValue);			
	}
	shouldComponentUpdate(nextProps,nextState){
		return this.state.currentValue !== nextState.currentValue ;	
	}
	render(){
		return (
			<input type="text" className="input col" value={this.state.currentValue} onChange={e => this.inputChange(e)}/>  
		);
	}
}

