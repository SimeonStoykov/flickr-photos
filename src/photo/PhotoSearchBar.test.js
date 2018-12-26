import React from 'react';
import { shallow } from 'enzyme';
import '../setupTests';
import { PhotoSearchBar } from './PhotoSearchBar';

describe('Photo Search Bar', () => {
    let component;
    const mockSetSearchInputValueFn = jest.fn();
    const mockSearchPhotos = jest.fn();
    const mockSetSearchTerm = jest.fn();
    const mockSetCurrentPage = jest.fn();
    const mockFetchPhotos = jest.fn();

    beforeEach(() => {
        component = shallow(<PhotoSearchBar  searchInputValue="" fetchPhotos={mockFetchPhotos} setSearchTerm={mockSetSearchTerm} setCurrentPage={mockSetCurrentPage} setSearchInputValue={mockSetSearchInputValueFn} fetchPhotos={mockFetchPhotos} />)
    });

    it('should render search bar correctly', () => {
        expect(component).toMatchSnapshot();
    });

    it('should call setSearchInputValue on input value change', () => {
        component.find('input[type="text"]').simulate('change', { target: { value: 'cats' } });
        expect(mockSetSearchInputValueFn).toHaveBeenCalled();
    });

    it('should not call searchPhotos on search button click without filling search input value', () => {
        component.find('button').simulate('click');
        expect(mockSearchPhotos).not.toHaveBeenCalled();
    });

    it('should call setSearchTerm on search button click after filling search input', () => {
        component.find('input[type="text"]').simulate('change', { target: { value: 'cats' } });
        component.find('button').simulate('click');
        expect(mockSetSearchTerm).toHaveBeenCalled();
    });

    it('should call searhPhotos on search button click after filling search input', () => {
        component.find('input[type="text"]').simulate('change', { target: { value: 'cats' } });
        component.find('button').simulate('click');
        expect(mockFetchPhotos).toHaveBeenCalled();
    });
});