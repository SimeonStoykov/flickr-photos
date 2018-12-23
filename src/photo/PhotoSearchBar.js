import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    fetchPhotos,
    setSearchInputValue,
    setSearchTerm
} from '../photo/PhotoActions';

export class PhotoSearchBar extends Component {
    constructor() {
        super();
        this.searchPhotos = this.searchPhotos.bind(this);
        this.handleSearchInputValueChange = this.handleSearchInputValueChange.bind(this);
    }

    handleSearchInputValueChange(e) {
        this.props.setSearchInputValue(e.target.value);
    }

    searchPhotos() {
        let { setSearchTerm, searchInputValue, fetchPhotos } = this.props;
        const newSearchTerm = searchInputValue.trim();
        setSearchTerm(newSearchTerm);
        fetchPhotos({ currentPage: 1, searchTerm: newSearchTerm, loadMorePhotos: false });
    }

    render() {
        return (
            <div>
                <input type="text" value={this.props.searchInputValue} onChange={this.handleSearchInputValueChange} />
                <button onClick={this.searchPhotos} disabled={!this.props.searchInputValue}>Search</button>
            </div>
        );
    }
}

PhotoSearchBar.propTypes = {
    fetchPhotos: PropTypes.func,
    searchTerm: PropTypes.string,
    setSearchTerm: PropTypes.func,
    currentPage: PropTypes.number
};

const mapStateToProps = ({ photosData }) => {
    return {
        searchInputValue: photosData.get('searchInputValue'),
        searchTerm: photosData.get('searchTerm'),
        currentPage: photosData.get('currentPage')
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPhotos: dataUrl => dispatch(fetchPhotos(dataUrl)),
        setSearchInputValue: value => dispatch(setSearchInputValue(value)),
        setSearchTerm: value => dispatch(setSearchTerm(value))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PhotoSearchBar);
