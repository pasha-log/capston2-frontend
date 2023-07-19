import Skeleton from 'react-loading-skeleton';

const CardSkeleton = ({ cards }) => {
	return Array(cards).fill(0).map((_, i) => (
		<div className="card-skeleton" key={i}>
			<Skeleton height={'100%'} />
		</div>
	));
};

export default CardSkeleton;
