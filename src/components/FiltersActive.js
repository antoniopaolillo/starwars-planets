import React, { useContext } from 'react';
import storeContext from '../context';

function FiltersActive() {
  const {
    valuesFilter: { filters },
    setValuesFilter,
  } = useContext(storeContext);

  function removeFilter(column) {
    const newFilters = filters.filter((filter) => filter.column !== column);
    return setValuesFilter({ filters: newFilters });
  }

  function showFilters() {
    if (filters.length > 0) {
      return filters.map((filter) => (
        <div key={filter.column}>
          <p>{`${filter.column} ${filter.comparison} ${filter.value}`}</p>
          <button type="button" onClick={() => removeFilter(filter.column)}>
            X
          </button>
        </div>
      ));
    }
    return 'No filter';
  }

  return (
    <div>
      <p>Filters active:</p>
      <div>{showFilters()}</div>
    </div>
  );
}

export default FiltersActive;
