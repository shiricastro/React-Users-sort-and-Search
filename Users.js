import React from 'react';
import axios from 'axios';
import Select from './Select';
import Input from './Input';
import Card from './Card';

export default class Users extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			data:[],
			currentSelect:"",
			selectValue:"",
			currentSort:"",
			options:[{name:"Id",val:"id"},{name:"Name",val:"first_name"},{name:"Last",val:"last_name"},
			{name:"Email",val:"email"},{name:"Gender",val:"gender"}],
		}
	}
	currentSelect(currentSelect){
		this.setState({currentSelect});
	}
	currentSort(currentSort){
		this.setState({currentSort});
		this.props.history.push('/users?sortBy=' +currentSort+'');
	}
	selectValue(selectValue){
		this.setState({selectValue});
	}
	componentDidMount(){
		var url = this.props.location.search.slice(8);
		axios.get('http://localhost:4500/data').then(response =>{
			const dataVal = response.data;
			this.setState({
				data:dataVal,
				currentSort:url
			});
		})
	}
	shouldComponentUpdate(nextProps,nextState){
	return this.state.currentSelect !== nextState.currentSelect  ||
		   nextState.selectValue !== this.state.selectValue ||
		   nextState.data.length !== this.state.data.length ||
		   nextState.currentSort !== this.state.currentSort;		
	}
	filterData(){
		const {data, currentSelect, selectValue, currentSort} = this.state;  
		if (!currentSelect && !selectValue && !currentSort|| currentSelect && !selectValue && !currentSort){
			return data;
		}
		if(currentSelect && selectValue && !currentSort){
			return this.filterByKey(data);	
		}
		if(!currentSelect && !selectValue && currentSort || currentSelect && !selectValue && currentSort){
			return this.sortData(data);		
		}
		return this.sortData(this.filterByKey(data));		
	}
	filterByKey(data){
		const {currentSelect, selectValue} = this.state; 
		return data.filter(x => x[currentSelect].toString().toLowerCase().indexOf(selectValue.toLowerCase()) !== -1);	
	}	
	sortData(data){
		const {currentSort} = this.state; 
		if(currentSort== "id"){
			return data.sort(function(a, b){return a.id - b.id});
		}else{
		    data.sort(function(a, b){
    			const x = a[currentSort].toLowerCase();
    			const y = b[currentSort].toLowerCase();
    			if (x < y) {return -1;}
    			if (x > y) {return 1;}
    			return 0;
			});
			return data;		
		}		
	}
	render(){
		return (<div className="users container">
					<div className="search row">
						<label className="col-2">Search By:</label>
						<Select data={this.state.options} currentSelect={currentSelect => this.currentSelect(currentSelect)}/>
						<Input selectValue={selectValue => this.selectValue(selectValue)}/>
					</div>
					<div className="sort row">
						<label className="col-2">Sort By:</label>
						<Select data={this.state.options} value={this.state.currentSort} currentSelect={currentSort => this.currentSort(currentSort)}/>
					</div>
					<div className="row cards">
						{this.filterData().map((x,idx)=> (<Card key={idx} data={x}/>))}
					</div>
				</div>
		);
	}
}