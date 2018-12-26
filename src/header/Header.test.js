import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';
import '../setupTests';
import history from '../app/history';

const HOME_PATH = '/';

describe('Header', () => {
    beforeAll(() => {
        Object.defineProperty(window.location, 'reload', {
            configurable: true,
        });
        window.location.reload = jest.fn();
    });

    it('should render header correctly with no props', () => {
        const component = shallow(<Header />);
        expect(component).toMatchSnapshot();
    });

    it('should render header correctly with given currentPath', () => {
        const component = shallow(<Header currentPath={HOME_PATH} />);
        expect(component).toMatchSnapshot();
    });

    it('should call loadHomePage on title click when the current path is the home path', () => {
        const component = shallow(<Header currentPath={HOME_PATH} />);
        component.find('h1.header--title').simulate('click');
        expect(window.location.reload).toHaveBeenCalled();
    });

    it('should call history push on title click when the current path is different than the home path', () => {
        const currentPath = '/other';
        history.push = jest.fn();
        const component = shallow(<Header currentPath={currentPath} history={history} />);
        component.find('h1.header--title').simulate('click');
        expect(history.push).toHaveBeenCalledTimes(1);
    });
});