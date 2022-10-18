import React from 'react';

function MemeItem({ imgUrl, caption = '' }) {
	return (
		<div className='meme'>
			<img className='meme-img' src={imgUrl} />
			<p className='meme-caption'>{caption}</p>
		</div>
	);
}

export default MemeItem;
