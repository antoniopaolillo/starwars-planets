/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import storeContext from '../context';
import './table.css';

function arrayOfTags(data) {
  return Object.entries(data[0])
    .map((tag) => tag[0])
    .filter((name) => name !== 'residents');
}

function generateTableBody(data, tags) {
  return data.map((planet) => (
    <tr key={planet.diameter}>
      {tags.map((tag) => (
        <td data-testid="tableTD" key={tag}>{planet[tag]}</td>
      ))}
    </tr>
  ));
}

function generateTable(data) {
  if (data.length > 0) {
    const tags = arrayOfTags(data);
    return (
      <table>
        <thead>
          <tr>
            {tags.map((tag) => (
              <th data-testid="tableTH" key={`${tag}1`}>{tag}</th>
            ))}
          </tr>
        </thead>
        <tbody>{generateTableBody(data, tags)}</tbody>
      </table>
    );
  }
  return <p>Planet not found</p>;
}

function Table() {
  const { initialData, filteredData, starWarsAPI } = useContext(storeContext);

  useEffect(() => {
    starWarsAPI();
  }, []);

  if (initialData.isFetching) {
    return <p>LOADING...</p>;
  }
  if (filteredData) {
    return generateTable(filteredData);
  }
  return generateTable(initialData.data.results);
}

export default Table;
