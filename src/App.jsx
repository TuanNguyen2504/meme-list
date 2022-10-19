import React from 'react';
import './App.css';
import loadingIcon from './assets/spinner.svg';
import MemeItem from './components/MemeItem';

const API_URL = 'https://api.imgflip.com/get_memes';
const selectOptions = [12, 24, 32, 48, 56];

function App() {
	const [memes, setMemes] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [limit, setLimit] = React.useState(12);

	React.useEffect(() => {
		if (!loading) return;
		let isSubscribe = true;

		(async function getMemes() {
			try {
				const apiRes = await fetch(API_URL);
				if (apiRes.status === 200) {
					const dataJSON = await apiRes.json();
					if (dataJSON?.data?.memes && isSubscribe) {
						const memes = dataJSON.data?.memes || [];
						setMemes(memes.sort(() => Math.random() - 0.5).slice(0, limit));
						setLoading(false);
					}
				}
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		})();

		return () => (isSubscribe = false);
	}, [loading, limit]);

	return (
		<div className='App'>
			<h1 className='title'>18120634 BTCN03 - Meme list</h1>

			<div className='load-btn-wrapper'>
				<label htmlFor='limit'>Chọn số lượng meme random:&nbsp;</label>
				<select
					className='limit-select'
					id='limit'
					onChange={e => {
						setLimit(e.target.value);
						setLoading(true);
					}}
				>
					{selectOptions.map(option => (
						<option value={option} key={option}>
							{option}
						</option>
					))}
				</select>
				<button
					className={`load-btn ${loading ? 'loading' : ''}`}
					onClick={() => setLoading(true)}
				>
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
