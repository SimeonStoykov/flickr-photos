import React from 'react';

const Photo = ({ data }) => {
    const linkToOriginalPhoto = `https://www.flickr.com/photos/${data.owner}/${data.id}`;
    const linkToAuthorPage = `https://www.flickr.com/people/${data.owner}/`;

    return (
        <div className="photos-list--card">
            <img src={data.src} alt="" />
            {/* <a href={linkToOriginalPhoto} target="_blank" rel="noopener noreferrer">{data.title}</a>
            <span> by </span> 
            <a href={linkToAuthorPage} target="_blank" rel="noopener noreferrer">{data.ownername}</a>
            <p className="photo-list--card--description">{data.description._content && `Description: ${data.description._content}`}</p> */}
        </div>
    );
}

export default Photo;
