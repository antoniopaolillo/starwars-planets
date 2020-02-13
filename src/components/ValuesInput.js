import React, { useContext, useState } from 'react';
import storeContext from '../context';

const completeColumns = [
  '',
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function arrayOfColumns(filters) {
  if (filters.length > 0) {
    const arrayOfUsedColumns = filters.map((filter) => filter.column);
    const arrayOfColumnsToUse = completeColumns.filter(
      (colum) => !arrayOfUsedColumns.includes(colum),
    );
    return arrayOfColumnsToUse;
  }
  return completeColumns;
}

function generateColumnOptions(filters) {
  return arrayOfColumns(filters).map((each) => (
    <option key={each} value={each}>
      {each}
    </option>
  ));
}

function updateStore({
  column, comparison, value, filters, setValue, setColumn, setValuesFilter,
}) {
  const numericValues = { column, comparison, value };
  const newFilters = [...filters, { column, comparison, value }];
  if (column === '' || comparison === '' || value === '') {
    return null;
  }
  setValue('');
  setColumn('');
  return setValuesFilter({ numericValues, filters: newFilters });
}

function generateValuesInput(state) {
  return (
    <div>
      <label htmlFor="column">
        <select onChange={(e) => state.setColumn(e.target.value)} data-testid="column" id="column">
          {generateColumnOptions(state.filters)}
        </select>
      </label>
      <select
        onChange={(e) => state.setComparison(e.target.value)}
        data-testid="comparison"
        id="comparison"
      >
        <option value="bigger than">bigger than</option>
        <option value="less than">less than</option>
        <option value="equal to">equal to</option>
      </select>
      <input
        value={state.value}
        onChange={(e) => state.setValue(e.target.value)}
        data-testid="comparisonValue"
        id="comparisonValue"
        type="number"
        placeholder="Valor"
      />
      <button type="button" onClick={() => updateStore(state)}>
        Adicionar filtro
      </button>
    </div>
  );
}

function ValuesInput() {
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('bigger than');
  const [value, setValue] = useState('');
  const {
    setValuesFilter,
    valuesFilter: { filters },
  } = useContext(storeContext);

  const state = {
    column,
    setColumn,
    comparison,
    setComparison,
    value,
    setValue,
    setValuesFilter,
    filters,
  };

  if (filters.length === 5) {
    return 'All filters are being used';
  }
  return (
    <div>
      Choose the column to filter:
      <div>{generateValuesInput(state)}</div>
    </div>
  );
}

export default ValuesInput;
