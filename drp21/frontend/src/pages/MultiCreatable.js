import './MultiCreatable.css';
import React from 'react';
import CreatableSelect from 'react-select/creatable';

export default class CreatableMulti extends React.Component {

    constructor(props) {
        super(props);
    }

    handleChange = (newValue, actionMeta) => {
      console.group('Value Changed');
      console.log(newValue);
      console.log(`action: ${actionMeta.action}`);
      console.groupEnd();
    };

    render() {
      return (
        <CreatableSelect
          isMulti
          onChange={this.handleChange}
          options={this.props.options}
          styles={this.props.customStyles}
        />
      );
    }
  }