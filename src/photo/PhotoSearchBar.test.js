import React from 'react';
import { shallow } from 'enzyme';
import '../setupTests';
import { PhotoSearchBar } from './PhotoSearchBar';

describe('Photo Search Bar', () => {
    it('should render correctly with no props', () => {
        const component = shallow(<PhotoSearchBar />);

        expect(component).toMatchSnapshot();
    });
});