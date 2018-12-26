import React from 'react';
import { shallow } from 'enzyme';
import '../setupTests';
import Loading from './Loading';

describe('Loading', () => {
    let component;

    beforeEach(() => {
        component = shallow(<Loading />);
    });

    it('should render loading correctly', () => {
        expect(component).toMatchSnapshot();
    });

    it('should contain div with class loading', () => {
        expect(component.find('div.loading')).toBeDefined();
    });

    it('should contain image', () => {
        expect(component.find('img')).toBeDefined();
    });

    it('should contain image with alt attribute', () => {
        expect(component.find('img').prop('alt')).toBeDefined();
    });

    it('should contain div with the text Loading...', () => {
        expect(component.find('div.loading > div').text()).toEqual('Loading...');
    });
});