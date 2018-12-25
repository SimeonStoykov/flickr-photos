import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    fetchPhotos,
    setSearchInputValue,
    setSearchTerm,
    setCurrentPage
} from '../photo/PhotoActions';

export class PhotoSearchBar extends Component {
    constructor() {
        super();
        this.searchPhotos = this.searchPhotos.bind(this);
        this.handleSearchInputValueChange = this.handleSearchInputValueChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleSearchInputValueChange(e) {
        this.props.setSearchInputValue(e.target.value);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter' && this.props.searchInputValue) {
            this.searchPhotos();
        }
    }

    searchPhotos() {
        let { setCurrentPage, setSearchTerm, searchInputValue, fetchPhotos } = this.props;
        const newSearchTerm = searchInputValue.trim();
        setSearchTerm(newSearchTerm);
        setCurrentPage(1);
        fetchPhotos({ currentPage: 1, searchTerm: newSearchTerm });
    }

    render() {
        return (
            <div className="header--search-bar">
                <input type="text" value={this.props.searchInputValue} onChange={this.handleSearchInputValueChange} onKeyPress={this.handleKeyPress} placeholder="Search in title, description and tags..." />
                <button onClick={this.searchPhotos} disabled={!this.props.searchInputValue}></button>
            </div>
        );
    }
}

PhotoSearchBar.propTypes = {
    fetchPhotos: PropTypes.func,
    searchTerm: PropTypes.string,
    setSearchTerm: PropTypes.func,
    setCurrentPage: PropTypes.func,
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
        setSearchTerm: value => dispatch(setSearchTerm(value)),
        setCurrentPage: value => dispatch(setCurrentPage(value))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PhotoSearchBar);
