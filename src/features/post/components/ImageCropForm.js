import { useState } from 'react';
import '../assets/ImageCropForm.css';
import ImageCropDialog from './ImageCropDialog';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import CurrentUserContext from '../../../context/CurrentUserContext';

const ImageCropForm = () => {
	const { nprogress, upload, fileUpload, setS3Response, setImageCropPhase, setCaptionPhase } = useContext(
		CurrentUserContext
	);
	// const { state } = useLocation();
	// const { id, imageUrl } = state;
	const { id, imageUrl } = fileUpload;
	const initData = {
		id: id,
		imageUrl: imageUrl,
		croppedImageUrl: null
	};

	// const navigate = useNavigate();

	const dataURLtoFile = (dataurl, filename) => {
		const arr = dataurl.split(',');
		const mime = arr[0].match(/:(.*?);/)[1];
		const bstr = atob(arr[1]);
		let n = bstr.length;
		const u8arr = new Uint8Array(n);

		while (n--) u8arr[n] = bstr.charCodeAt(n);
		return new File([ u8arr ], filename, { type: mime });
	};

	const [ image, setImage ] = useState(initData);

	const resetImage = (id) => {
		setCroppedImageFor(id);
	};

	const setCroppedImageFor = async (crop, zoom, aspect, croppedImageUrl) => {
		nprogress.start();
		let newImage;
		const newImg = { ...image, croppedImageUrl, crop, zoom, aspect };

		newImage = newImg;
		setImage(newImage);

		newImage = dataURLtoFile(newImage.croppedImageUrl, image.id);
		const response = await upload(newImage);
		// navigate('/caption', { state: { imageUrl: response.result.Location, imageKey: response.result.Key } });
		setS3Response({ imageUrl: response.result.Location, imageKey: response.result.Key });
		setImageCropPhase(false);
		setCaptionPhase(true);
		nprogress.done();
	};

	return (
		<div className="ImageCropFormContainer">
			<ImageCropDialog
				id={image.id}
				imageUrl={image.imageUrl}
				cropInit={image.crop}
				zoomInit={image.zoom}
				aspectInit={image.aspect}
				setCroppedImageFor={setCroppedImageFor}
				resetImage={resetImage}
			/>
		</div>
	);
};

export default ImageCropForm;
