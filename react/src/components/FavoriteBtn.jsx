import { useState } from 'react';

const FavoriteBtn = () => {
	const [isFav, setIsFev] = useState(false);

	const handleFav = () => {
		setIsFev((prev) => !prev);
	};

	return (
		<button onClick={handleFav}>
			{isFav ? (
				<img src="/heart-filled.svg" alt="heart-filled" />
			) : (
				<img src="/heart.svg" alt="heart" />
			)}
		</button>
	);
};
export default FavoriteBtn;
