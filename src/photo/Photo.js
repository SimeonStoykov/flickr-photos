import React from 'react';

const Photo = ({ data }) => {
    const linkToOriginalPhoto = `https://www.flickr.com/photos/${data.owner}/${data.id}`;
    const linkToAuthorPage = `https://www.flickr.com/people/${data.owner}/`;

    const shownTitle = data.title.length > 20 ? data.title.substr(0, 20) + '...' : data.title;
    const fullDescription = data.description && data.description._content && data.description._content.trim();
    let shownDescription = '';

    if (fullDescription) {
        shownDescription = fullDescription.length > 40 ? fullDescription.substr(0, 40) + '...' : fullDescription;
    }

    let allTags = [];
    data.tags && (allTags = data.tags.split(' '));
    let shownTagsAsText = allTags.length > 5 ? allTags.slice(0, 5).join(', ') + '...' : [...allTags].join(', ');

    return (
        <div className="photos-list--card">
            <img src={data.src} alt="" className="photo-list--card--image" />
            <a href={linkToOriginalPhoto} target="_blank" rel="noopener noreferrer" title={data.title}>{shownTitle}</a>
            <span> by </span>
            <a href={linkToAuthorPage} target="_blank" rel="noopener noreferrer">{data.ownername}</a>
            {shownDescription && <p className="photo-list--card--description" title={fullDescription}>{`Description: ${shownDescription}`}</p>}
            {shownTagsAsText.length > 0 && <div title={allTags.join(', ')}>Tags: {shownTagsAsText}</div>}
        </div>
    );
}

export default Photo;
