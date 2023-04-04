import { useState } from 'react';
import './static/ImageCropForm.css';
import ImageCropDialog from './ImageCropDialog';
import { useLocation } from 'react-router-dom';

const ImageCropForm = () => {
	const { state } = useLocation();
	const { id, imageUrl } = state;
	const initData = {
		id: id,
		imageUrl: imageUrl,
		croppedImageUrl: null
	};
	// const initData = [
	// 	{
	// 		id: id,
	// 		imageUrl: imageUrl,
	// 		croppedImageUrl: null
	// 	}
	// ];
	const [ image, setImage ] = useState(initData);
	const [ selectedImg, setSelectedImg ] = useState(null);
	const onCancel = () => {
		setSelectedImg(null);
	};

	const resetImage = (id) => {
		setCroppedImageFor(id);
	};

	const setCroppedImageFor = (crop, zoom, aspect, croppedImageUrl) => {
		let newImage = [ ...image ];
		// const imageIndex = image.findIndex((x) => x.id === id);
		// const image = image[imageIndex];
		const newImg = { ...image, croppedImageUrl, crop, zoom, aspect };
		// newImage[imageIndex] = newImg;
		newImage = newImg;
		setImage(newImage);
		setSelectedImg(null);
	};
	return (
		<div>
			{selectedImg ? (
				<ImageCropDialog
					id={image.id}
					imageUrl={image.imageUrl}
					cropInit={image.crop}
					zoomInit={image.zoom}
					aspectInit={image.aspect}
					onCancel={onCancel}
					setCroppedImageFor={setCroppedImageFor}
					resetImage={resetImage}
				/>
			) : // <ImageCropDialog
			// 	id={selectedImg.id}
			// 	imageUrl={selectedImg.imageUrl}
			// 	cropInit={selectedImg.crop}
			// 	zoomInit={selectedImg.zoom}
			// 	aspectInit={selectedImg.aspect}
			// 	onCancel={onCancel}
			// 	setCroppedImageFor={setCroppedImageFor}
			// />
			null}
			{/* {image.map((pic) => ( */}
			<div className="ImageCard" key={image.id}>
				<img
					src={image.croppedImageUrl ? image.croppedImageUrl : image.imageUrl}
					alt=""
					onClick={() => setSelectedImg(image)}
				/>
			</div>
			{/* ))} */}
		</div>
	);
};

export default ImageCropForm;
