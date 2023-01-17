import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComps = makeAnimated();

export default function MultiSelect(props) {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComps}
      isMulti
      options={props.options}
      styles={props.styles}
      onChange={props.onChange}

    />
  );
}