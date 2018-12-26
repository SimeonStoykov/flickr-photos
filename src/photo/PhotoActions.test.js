import * as actionsAndTypes from './PhotoActions';

describe('Photo Actions', () => {
    it('should create an action fetchPhotosBegin', () => {
        const expectedAction = {
            type: actionsAndTypes.FETCH_PHOTOS_BEGIN
        };
        expect(actionsAndTypes.fetchPhotosBegin()).toEqual(expectedAction);
    });
});