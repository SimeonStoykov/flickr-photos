import React from 'react';
import { shallow } from 'enzyme';
import '../setupTests';
import { PhotoSearchBar } from './PhotoSearchBar';

describe('Photo Search Bar', () => {
    let component;
    const mockSetSearchInputValueFn = jest.fn();

    beforeEach(() => {
        component = shallow(<PhotoSearchBar setSearchInputValue={mockSetSearchInputValueFn} />)
    });

    it('should render search bar correctly', () => {
        expect(component).toMatchSnapshot();
    });

    it('should call setSearchInputValue on input value change', () => {
        component.find('input[type="text"]').simulate('change', { target: { value: 'cats' } });
        expect(mockSetSearchInputValueFn).toHaveBeenCalled();
    });
});