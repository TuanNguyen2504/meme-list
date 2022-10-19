import React from 'react';

function MemeItem({ imgUrl, caption = '' }) {
	return (
		<div className='meme'>
			<img className='meme-img' src={imgUrl} />
		</div>
	);
}

export default MemeItem;
