function findComparisons(data, filter) {
  const { column, comparison, value } = filter;
  switch (comparison) {
    case 'bigger than':
      return data.filter(
        (planet) => planet[column] > Number(value) && planet[column] !== 'unknown',
      );
    case 'less than':
      return data.filter(
        (planet) => planet[column] < Number(value) && planet[column] !== 'unknown',
      );
    case 'equal to':
      return data.filter((planet) => planet[column] === value && planet[column] !== 'unknown');
    default:
      return false;
  }
}

function filterByName(data, nameFilter) {
  if (nameFilter) {
    return data.filter((planet) => planet.name.includes(nameFilter));
  }
  return data;
}

function filterByValues(data, filter, nameFilter) {
  if (filter) {
    const result = findComparisons(data, filter);
    return filterByName(result, nameFilter);
  }
  return filterByName(data, nameFilter);
}

export default function finalData(data, filtersActive, nameFilter) {
  if (filtersActive.length > 0) {
    return filtersActive.reduce((acc, filter, index) => {
      const array = index === 0 ? data : acc;
      return filterByValues(array, filter, nameFilter);
    }, []);
  }
  return filterByName(data, nameFilter);
}
