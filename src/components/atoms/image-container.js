import React from 'react';

export const ImageContainer = ({ path, alt }) => {
	const imageBackground = process.env.PUBLIC_URL + path;
	return (
		<div className="container__image">
			<img src={imageBackground} alt={alt} />
		</div>
	);
};
