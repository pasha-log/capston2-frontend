import Skeleton from 'react-loading-skeleton';
import '../../features/profile/assets/Profile.css';

const CardSkeleton = ({ cards }) => {
	return Array(cards).fill(0).map((_, i) => (
		<div className="CardSkeleton" key={i}>
			<Skeleton height={280} width={280} />
		</div>
	));
};

export default CardSkeleton;
