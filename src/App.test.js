import React from 'react';
import {
  render, waitForDomChange, cleanup, fireEvent,
} from '@testing-library/react';
import App from './App';
import Provider from './Provider';

describe('initial page should have a header and should been loading table', () => {
  afterEach(cleanup);
  it('initial header should have 4 inputs, 3 texts and a button', () => {
    const { getByText, getByTestId } = render(
      <Provider>
        <App />
      </Provider>,
    );
    expect(getByText(/Filters active:/i)).toBeInTheDocument();
    expect(getByText(/No filter/i)).toBeInTheDocument();
    expect(getByText(/Choose the column to filter:/i)).toBeInTheDocument();
    expect(getByTestId('column')).toBeInTheDocument();
    expect(getByTestId('comparison')).toBeInTheDocument();
    expect(getByTestId('comparisonValue')).toBeInTheDocument();
    expect(getByText(/Adicionar filtro/i)).toBeInTheDocument();
    expect(getByText(/Adicionar filtro/i).tagName).toBe('BUTTON');
    expect(getByTestId('nameInput')).toBeInTheDocument();
  });

  it('expect text "LOAGIND..." to be in the page', () => {
    const { getByText } = render(
      <Provider>
        <App />
      </Provider>,
    );
    expect(getByText(/LOADING.../i)).toBeInTheDocument();
  });
});

describe('after load table...', () => {
  afterEach(cleanup);
  it('it should have 130 td tagNames and 13 th tagNames', async () => {
    const { queryAllByTestId } = render(
      <Provider>
        <App />
      </Provider>,
    );
    await waitForDomChange();
    expect(queryAllByTestId('tableTD').length).toBe(130);
    expect(queryAllByTestId('tableTH').length).toBe(13);
  });

  it('it should have some planets names', async () => {
    const { getByText } = render(
      <Provider>
        <App />
      </Provider>,
    );
    await waitForDomChange();
    expect(getByText(/Alderaan/i)).toBeInTheDocument();
    expect(getByText(/Bespin/i)).toBeInTheDocument();
    expect(getByText(/Geonosis/i)).toBeInTheDocument();
  });
});

describe('change inputs should change table component...', () => {
  afterEach(cleanup);
  it('change textInput value to "Al" should return one planet called Alderaan', async () => {
    const {
      getByTestId, queryAllByTestId, getByText, queryByText,
    } = render(
      <Provider>
        <App />
      </Provider>,
    );
    await waitForDomChange();
    fireEvent.change(getByTestId('nameInput'), { target: { value: 'Al' } });
    expect(queryByText(/Bespin/i)).not.toBeInTheDocument();
    expect(getByText(/Alderaan/i)).toBeInTheDocument();
    expect(queryAllByTestId('tableTD').length).toBe(13);
    expect(queryAllByTestId('tableTH').length).toBe(13);
  });

  it('change textInput value to "nothing" should return only text "Planet not found"', async () => {
    const {
      getByTestId, queryAllByTestId, queryByText,
    } = render(
      <Provider>
        <App />
      </Provider>,
    );
    await waitForDomChange();
    fireEvent.change(getByTestId('nameInput'), { target: { value: 'nothing' } });
    expect(queryByText(/Bespin/i)).not.toBeInTheDocument();
    expect(queryByText(/Alderaan/i)).not.toBeInTheDocument();
    expect(queryByText(/Planet not found/i)).toBeInTheDocument();
    expect(queryAllByTestId('tableTD').length).toBe(0);
    expect(queryAllByTestId('tableTH').length).toBe(0);
  });

  it('change valuesInput value to "population bigger than 1000" should return 7 planets', async () => {
    const {
      getByTestId, queryAllByTestId, queryByText, getByText,
    } = render(
      <Provider>
        <App />
      </Provider>,
    );
    await waitForDomChange();

    fireEvent.change(getByTestId('column'), { target: { value: 'population' } });
    fireEvent.change(getByTestId('comparison'), { target: { value: 'bigger than' } });
    fireEvent.change(getByTestId('comparisonValue'), { target: { value: '1000' } });
    fireEvent.click(getByText(/Adicionar filtro/i));

    expect(queryByText(/Alderaan/i)).toBeInTheDocument();
    expect(queryByText(/Hoth/i)).not.toBeInTheDocument();
    expect(queryByText(/Planet not found/i)).not.toBeInTheDocument();
    expect(queryByText(/population bigger than 1000/i)).toBeInTheDocument();
    expect(queryByText(/X/i)).toBeInTheDocument();

    expect(queryAllByTestId('tableTD').length).toBe(91);
    expect(queryAllByTestId('tableTH').length).toBe(13);
  });

  it('change valuesInput value to "rotation_period  bigger than  30" should only return text "Planet not found"', async () => {
    const {
      getByTestId, queryAllByTestId, queryByText, getByText,
    } = render(
      <Provider>
        <App />
      </Provider>,
    );
    await waitForDomChange();

    fireEvent.change(getByTestId('column'), { target: { value: 'rotation_period' } });
    fireEvent.change(getByTestId('comparison'), { target: { value: 'bigger than' } });
    fireEvent.change(getByTestId('comparisonValue'), { target: { value: '30' } });
    fireEvent.click(getByText(/Adicionar filtro/i));

    expect(queryByText(/Alderaan/i)).not.toBeInTheDocument();
    expect(queryByText(/Hoth/i)).not.toBeInTheDocument();
    expect(queryByText(/Planet not found/i)).toBeInTheDocument();
    expect(queryByText(/rotation_period bigger than 30/i)).toBeInTheDocument();
    expect(queryByText(/X/i)).toBeInTheDocument();

    expect(queryAllByTestId('tableTD').length).toBe(0);
    expect(queryAllByTestId('tableTH').length).toBe(0);
  });

  it('change valuesInput value to "population  bigger than  1000" and textInput to "Kamino" should only return planet called "Kamino"', async () => {
    const {
      getByTestId, queryAllByTestId, queryByText, getByText,
    } = render(
      <Provider>
        <App />
      </Provider>,
    );
    await waitForDomChange();

    fireEvent.change(getByTestId('nameInput'), { target: { value: 'Kamino' } });
    fireEvent.change(getByTestId('column'), { target: { value: 'population' } });
    fireEvent.change(getByTestId('comparison'), { target: { value: 'bigger than' } });
    fireEvent.change(getByTestId('comparisonValue'), { target: { value: '1000' } });
    fireEvent.click(getByText(/Adicionar filtro/i));

    expect(queryByText(/Planet not found/i)).not.toBeInTheDocument();
    expect(queryByText(/Alderaan/i)).not.toBeInTheDocument();
    expect(queryByText(/Kamino/i)).toBeInTheDocument();
    expect(queryByText(/population bigger than 1000/i)).toBeInTheDocument();
    expect(queryByText(/X/i)).toBeInTheDocument();

    expect(queryAllByTestId('tableTD').length).toBe(13);
    expect(queryAllByTestId('tableTH').length).toBe(13);
  });
  it('change valuesInput value to "population  bigger than  " should no change the document', async () => {
    const {
      getByTestId, queryAllByTestId, getByText,
    } = render(
      <Provider>
        <App />
      </Provider>,
    );
    await waitForDomChange();
    fireEvent.change(getByTestId('column'), { target: { value: 'population' } });
    fireEvent.change(getByTestId('comparison'), { target: { value: 'bigger than' } });
    fireEvent.click(getByText(/Adicionar filtro/i));

    expect(getByText(/Alderaan/i)).toBeInTheDocument();
    expect(getByText(/Bespin/i)).toBeInTheDocument();
    expect(getByText(/Geonosis/i)).toBeInTheDocument();
    expect(queryAllByTestId('tableTD').length).toBe(130);
    expect(queryAllByTestId('tableTH').length).toBe(13);
  });

  it('after add 5 filters, text "All filters are being used" should be in the document', async () => {
    const {
      getByTestId, queryAllByTestId, queryByTestId, queryByText, queryAllByText,
    } = render(
      <Provider>
        <App />
      </Provider>,
    );
    await waitForDomChange();
    fireEvent.change(getByTestId('column'), { target: { value: 'rotation_period' } });
    fireEvent.change(getByTestId('comparison'), { target: { value: 'bigger than' } });
    fireEvent.change(getByTestId('comparisonValue'), { target: { value: '18' } });
    fireEvent.click(queryByText(/Adicionar filtro/i));
    fireEvent.change(getByTestId('column'), { target: { value: 'population' } });
    fireEvent.change(getByTestId('comparison'), { target: { value: 'less than' } });
    fireEvent.change(getByTestId('comparisonValue'), { target: { value: '10000000' } });
    fireEvent.click(queryByText(/Adicionar filtro/i));
    fireEvent.change(getByTestId('column'), { target: { value: 'orbital_period' } });
    fireEvent.change(getByTestId('comparison'), { target: { value: 'bigger than' } });
    fireEvent.change(getByTestId('comparisonValue'), { target: { value: '4800' } });
    fireEvent.click(queryByText(/Adicionar filtro/i));
    fireEvent.change(getByTestId('column'), { target: { value: 'diameter' } });
    fireEvent.change(getByTestId('comparison'), { target: { value: 'bigger than' } });
    fireEvent.change(getByTestId('comparisonValue'), { target: { value: '10000' } });
    fireEvent.click(queryByText(/Adicionar filtro/i));
    fireEvent.change(getByTestId('column'), { target: { value: 'surface_water' } });
    fireEvent.change(getByTestId('comparison'), { target: { value: 'equal to' } });
    fireEvent.change(getByTestId('comparisonValue'), { target: { value: '8' } });
    fireEvent.click(queryByText(/Adicionar filtro/i));

    expect(queryByText(/rotation_period bigger than 18/i)).toBeInTheDocument();
    expect(queryByText(/population less than 10000000/i)).toBeInTheDocument();
    expect(queryByText(/orbital_period bigger than 4800/i)).toBeInTheDocument();
    expect(queryByText(/diameter bigger than 10000/i)).toBeInTheDocument();
    expect(queryByText(/surface_water equal to 8/i)).toBeInTheDocument();
    expect(queryAllByText(/X/).length).toBe(5);
    expect(queryByText('All filters are being used')).toBeInTheDocument();
    expect(queryByTestId('column')).not.toBeInTheDocument();
    expect(queryByTestId('comparison')).not.toBeInTheDocument();
    expect(queryByTestId('comparisonValue')).not.toBeInTheDocument();
    expect(queryByText(/Adicionar filtro/i)).not.toBeInTheDocument();
    expect(queryByText(/Bespin/i)).not.toBeInTheDocument();
    expect(queryByText(/Yavin IV/i)).toBeInTheDocument();
    expect(queryAllByTestId('tableTD').length).toBe(13);
    expect(queryAllByTestId('tableTH').length).toBe(13);
  });

  it('after set a filter, on click in button "X", the respective filter shoud be removed', async () => {
    const {
      getByTestId, queryAllByTestId, queryByText, getByText,
    } = render(
      <Provider>
        <App />
      </Provider>,
    );
    await waitForDomChange();

    fireEvent.change(getByTestId('column'), { target: { value: 'population' } });
    fireEvent.change(getByTestId('comparison'), { target: { value: 'bigger than' } });
    fireEvent.change(getByTestId('comparisonValue'), { target: { value: '1000' } });
    fireEvent.click(getByText(/Adicionar filtro/i));

    expect(queryByText(/population bigger than 1000/i)).toBeInTheDocument();
    expect(queryByText(/X/i)).toBeInTheDocument();
    expect(queryAllByTestId('tableTD').length).toBe(91);
    expect(queryAllByTestId('tableTH').length).toBe(13);

    fireEvent.click(queryByText(/X/i));

    expect(queryByText(/population bigger than 1000/i)).not.toBeInTheDocument();
    expect(queryAllByTestId('tableTD').length).toBe(130);
    expect(queryAllByTestId('tableTH').length).toBe(13);
  });
});
