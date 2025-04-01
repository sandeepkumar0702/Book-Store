import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import { SearchContext } from '../context/SearchProvider';
import BookContainer from '../components/BookContainer/BookContainer';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);

describe('BookContainer Component', () => {
    let store;
    let setSortQueryMock;

    beforeEach(() => {
        store = mockStore({
            bookList: {
                bookList: [{ id: 1, title: 'Book 1' }, { id: 2, title: 'Book 2' }],
            },
        });

        setSortQueryMock = jest.fn();
    });

    const renderComponent = () =>
        render(
            <MemoryRouter> {/* Wrap the component with MemoryRouter */}
                <Provider store={store}>
                    <SearchContext.Provider value={{ setSortQuery: setSortQueryMock }}>
                        <BookContainer />
                    </SearchContext.Provider>
                </Provider>
            </MemoryRouter>
        );

    test('renders correctly with book count', () => {
        renderComponent();
        expect(screen.getByText('Books')).toBeInTheDocument();
        expect(screen.getByText('(2 items)')).toBeInTheDocument();
    });

    test('renders sorting dropdown with default text', () => {
        renderComponent();
        expect(screen.getByText('Sort by relevance')).toBeInTheDocument();
    });

    test('triggers sorting function on selection', () => {
        renderComponent();
        const dropdownButton = screen.getByText('Sort by relevance');
        fireEvent.click(dropdownButton);
        
        const highToLowOption = screen.getByText('Price: High to Low');
        fireEvent.click(highToLowOption);
        
        expect(setSortQueryMock).toHaveBeenCalledWith('highToLow');
    });

    test('updates sort label correctly', async () => {
      renderComponent();
  
      fireEvent.click(screen.getByText('Sort by relevance')); 
      fireEvent.click(screen.getByText('Price: Low to High'));
  
      expect(setSortQueryMock).toHaveBeenCalledWith('lowToHigh');
  
    
  });
});
