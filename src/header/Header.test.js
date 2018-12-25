import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';
import '../setupTests';

describe('Header', () => {
    it('should render correctly with no props', () => {
        const component = shallow(<Header />);

        expect(component).toMatchSnapshot();
    });

    it('should render banner text correctly with given currentPath', () => {
        const currentPath = '/';
        const component = shallow(<Header currentPath={currentPath} />);
        expect(component).toMatchSnapshot();
    });
});