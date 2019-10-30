import React, { Component } from 'react';

 export default class SelectControls extends Component {
    handleChange = (e, type, value) => {
        e.preventDefault();
        this.props.onUserInput(type, value);
    };
    handleTextChange = (e) => {
        this.handleChange( e, 'search', e.target.value);
    };
    handleCountChange = (e) => {
        this.handleChange(e, 'sort', e.target.value);
    };

    render() {
        return (
            <div className="col-md-10">
                <input type="text" placeholder="Search by name" 
                    value={this.props.filterText}
                    onChange={this.handleTextChange} />
                <span> Items per page: </span>
                <select id="sort" value={this.props.order } 
                    onChange={this.handleCountChange} >
                    <option value="7">7</option>
                    <option value="12">12</option>
                </select>
            </div>
        );
    }
  }