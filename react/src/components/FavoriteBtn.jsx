import { useState } from 'react';

const FavoriteBtn = () => {
	const [isFavorite, setIsFavorite] = useState(false);

	const handleFavorite = () => {
		setIsFavorite((prev) => !prev);
	};

	return (
		<button onClick={handleFavorite}>
			{isFavorite ? (
				<img src="/heart-filled.svg" alt="heart-filled" />
			) : (
				<img src="/heart.svg" alt="heart" />
			)}
		</button>
	);
};
export default FavoriteBtn;
