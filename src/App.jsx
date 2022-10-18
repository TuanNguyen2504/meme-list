import React from 'react';
import './App.css';
import loadingIcon from './assets/spinner.svg';
import MemeItem from './components/MemeItem';

const API_URL = 'https://api.imgflip.com/get_memes';

function App() {
	const [memes, setMemes] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		if (!loading) return;
		let isSubscribe = true;

		(async function getMemes() {
			try {
				const apiRes = await fetch(API_URL);
				if (apiRes.status === 200) {
					const dataJSON = await apiRes.json();
					if (dataJSON?.data?.memes && isSubscribe) {
						setTimeout(() => {
							setMemes(dataJSON.data.memes || []);
							setLoading(false);
						}, 500);
					}
				}
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		})();

		return () => (isSubscribe = false);
	}, [loading]);

	return (
		<div className='App'>
			<h1 className='title'>18120634 BTCN03 - Meme list</h1>

			<div className='load-btn-wrapper' onClick={() => setLoading(true)}>
				<button className={`load-btn ${loading ? 'loading' : ''}`}>
					{loading ? 'Loading ...' : 'Load Meme'}
				</button>
			</div>

			{loading ? (
				<div className='loading-icon'>
					<img src={loadingIcon} />
				</div>
			) : (
				<div className='meme-grid'>
					{memes.map((meme, index) => (
						<MemeItem
							key={`${meme.name}${index}`}
							imgUrl={meme.url}
							caption={meme.name}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export default App;
