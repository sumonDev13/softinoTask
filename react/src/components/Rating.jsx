const Rating = ({ totalRating, reviewCount }) => {
	const fullStars = Math.floor(totalRating);
	const halfStar = totalRating % 1 >= 0.5;
	const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

	return (
		<div className="rating flex gap-4 items-center">
			<div className="flex">
				{Array(fullStars)
					.fill()
					.map((_, index) => (
						<img key={`full-${index}`} src="/images/star-fill.png" alt="full star" />
					))}
				{halfStar && <img src="images/star-half-fill.png" alt="half star" />}
				{Array(emptyStars)
					.fill()
					.map((_, index) => (
						<img key={`empty-${index}`} src="images/star.png" alt="empty star" />
					))}
			</div>
			<div className="text-sm text-[#8091A7]">({reviewCount} Reviews)</div>
		</div>
	);
};

export default Rating;
