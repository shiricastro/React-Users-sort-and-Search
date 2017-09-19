import React from 'react';

export default class Select extends React.Component{
	constructor(props){
		super(props);
		this.state ={			
			selectedOption:""
		}
	}
	currentSelect(e){		
		this.setState({
			selectedOption:e.target.value
		});
	}
	shouldComponentUpdate(nextProps,nextState){
		return this.state.selectedOption !== nextState.selectedOption ;	
	}
	componentDidUpdate(prevProps,prevState){
		this.props.currentSelect(this.state.selectedOption);

	}
	componentWillReceiveProps(nextProps){
		this.setState({
			selectedOption:nextProps.value || this.state.selectedOption
		});	

	}
	render(){
		return (
  			<select className="select col-3 " value={this.state.selectedOption} onChange={e => this.currentSelect(e)}>
  			   <option value=""></option> 
  				{this.props.data.map((x,idx)=>(<option key={idx} value={x.val} >{x.name}</option>))}
  			</select>
		);
	}
}

