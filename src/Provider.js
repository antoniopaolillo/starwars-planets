/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import storeContext from './context';
import finalData from './components/FilterService';

function Provider({ children }) {
  const initialValue = {
    data: [],
    isFetching: true,
    sucess: false,
  };

  const [valuesFilter, setValuesFilter] = useState({ numericValues: {}, filters: [] });
  const [nameFilter, setNameFilter] = useState('');
  const [initialData, setInitialData] = useState(initialValue);
  const [filteredData, setFilteredData] = useState();

  function starWarsAPI() {
    fetch('https://swapi.co/api/planets/')
      .then((data) => data.json())
      .then((response) => setInitialData({ data: response, isFetching: false, sucess: true }))
      .catch((error) => alert(error));
  }

  useEffect(() => {
    setFilteredData(finalData(initialData.data.results, valuesFilter.filters, nameFilter));
  }, [nameFilter, valuesFilter]);

  const context = {
    initialData,
    starWarsAPI,
    nameFilter,
    setNameFilter,
    valuesFilter,
    setValuesFilter,
    filteredData,
  };
  return <storeContext.Provider value={context}>{children}</storeContext.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
