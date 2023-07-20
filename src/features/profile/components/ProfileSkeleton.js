import Skeleton from 'react-loading-skeleton';
import '../assets/Profile.css';
import useMediaQuery from '../../../hooks/useMediaQuery';

const ProfileSkeleton = ({ cards }) => {
	const isAboveSmallScreens = useMediaQuery('(min-width: 768px)');
	// return (
	// 	<div className="ProfileSkeletonGrid">
	// 		{/* {!isAboveSmallScreens ? (
	// 			<div className="ProfileHeaderSkeleton">
	// 				<div className="ProfileLeftCol">
	// 					<Skeleton circle width={123} height={123} />
	// 				</div>
	// 				<div className="ProfileRightCol">
	// 					<Skeleton count={3} width={230} height={30} style={{ marginBottom: '2rem' }} />
	// 				</div>
	// 			</div>
	// 		) : (
	// 			<div className="ProfileHeaderSkeleton">
	// 				<div className="ProfileLeftCol">
	// 					<Skeleton circle width={150} height={150} />
	// 				</div>
	// 				<div className="ProfileRightCol">
	// 					<Skeleton count={3} width={500} height={30} style={{ marginBottom: '2rem' }} />
	// 				</div>
	// 			</div>
	// 		)} */}
	// 		{Array(cards).fill(0).map((_, i) => (
	// 			<div className="ProfileSkeleton" key={i}>
	// 				{isAboveSmallScreens ? (
	// 					<Skeleton height={280} width={280} />
	// 				) : (
	// 					<Skeleton height={400} width={400} />
	// 				)}
	// 			</div>
	// 		))}
	// 	</div>
	// );
	return Array(cards).fill(0).map((_, i) => (
		<div className="ProfileSkeleton" key={i}>
			{isAboveSmallScreens ? <Skeleton height={280} width={280} /> : <Skeleton height={400} width={400} />}
		</div>
	));
};

export default ProfileSkeleton;
