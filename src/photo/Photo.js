import React from 'react';
import { config } from '../config';

const MAX_TITLE_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 40;
const MAX_TAGS_COUNT = 5;

const Photo = ({ data }) => {
    const linkToOriginalPhoto = `${config.flickrURL}/photos/${data.owner}/${data.id}`;
    const linkToAuthorPage = `${config.flickrURL}/people/${data.owner}`;

    const shownTitle = data.title.length > MAX_TITLE_LENGTH ? data.title.substr(0, MAX_TITLE_LENGTH) + '...' : data.title;
    const fullDescription = data.description && data.description._content && data.description._content.trim();
    let shownDescription = '';

    if (fullDescription) {
        shownDescription = fullDescription.length > MAX_DESCRIPTION_LENGTH ? fullDescription.substr(0, MAX_DESCRIPTION_LENGTH) + '...' : fullDescription;
    }

    let allTags = [];
    data.tags && (allTags = data.tags.split(' '));
    let shownTagsAsText = allTags.length > MAX_TAGS_COUNT ? allTags.slice(0, MAX_TAGS_COUNT).join(', ') + '...' : [...allTags].join(', ');

    return (
        <div className="photos-list--card">
            <a href={linkToOriginalPhoto} target="_blank" rel="noopener noreferrer" title={data.title}>
                <img src={data.src} alt="" className="photo-list--card--image" />
            </a>
            <a href={linkToOriginalPhoto} target="_blank" rel="noopener noreferrer" title={data.title}>
                {shownTitle}
            </a>
            <span> by </span>
            <a href={linkToAuthorPage} target="_blank" rel="noopener noreferrer">{data.ownername}</a>
            {
                shownDescription &&
                <p className="photo-list--card--description" title={fullDescription}>
                    {`Description: ${shownDescription}`}
                </p>
            }
            {shownTagsAsText.length > 0 && <div title={allTags.join(', ')}>Tags: {shownTagsAsText}</div>}
        </div>
    );
}

export default Photo;
