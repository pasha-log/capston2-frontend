import { useState } from 'react';
import Cropper from 'react-easy-crop';
import '../assets/ImageCropDialog.css';
import getCroppedImg from '../utils/cropImage';
import { Button, Container } from 'reactstrap';
// import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import CurrentUserContext from '../../../context/CurrentUserContext';

const ImageCropDialog = ({ imageUrl, cropInit, zoomInit, setCroppedImageFor }) => {
	// const navigate = useNavigate();
	const { toggleDiscardModal } = useContext(CurrentUserContext);
	if (zoomInit == null) {
		zoomInit = 1;
	}
	if (cropInit == null) {
		cropInit = { x: 0, y: 0 };
	}

	const [ zoom, setZoom ] = useState(zoomInit);
	const [ crop, setCrop ] = useState(cropInit);
	const aspect = 1 / 1;
	const [ croppedAreaPixels, setCroppedAreaPixels ] = useState(null);

	const onCropChange = (crop) => {
		setCrop(crop);
	};

	const onZoomChange = (zoom) => {
		setZoom(zoom);
	};

	const onCropComplete = (croppedArea, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels);
	};

	const onCrop = async () => {
		const croppedImageUrl = await getCroppedImg(imageUrl, croppedAreaPixels);
		setCroppedImageFor(crop, zoom, aspect, croppedImageUrl);
	};

	return (
		<Container fluid className="ImageCropContainer">
			<div className="CropDiv">
				<div className="ShareControls">
					<div className="CropHeader">
						<div className="CropGoBackButtonDiv">
							{/* <Button className="GoBack" onClick={() => navigate(-1)}> */}
							<Button className="GoBack" onClick={() => toggleDiscardModal()}>
								<span id="GoBack" className="material-symbols-outlined">
									arrow_back
								</span>
							</Button>
						</div>
						<div>
							<h1 className="NewCaptionPostLabel">Crop</h1>
						</div>
						<div className="CropNextButtonDiv">
							<Button onClick={onCrop} className="CropNextButton" type="submit">
								Next
							</Button>
						</div>
					</div>
				</div>
				<div className="CropContainer">
					<Cropper
						image={imageUrl}
						zoom={zoom}
						crop={crop}
						aspect={1 / 1}
						onCropChange={onCropChange}
						onZoomChange={onZoomChange}
						onCropComplete={onCropComplete}
					/>
				</div>
				<div className="ControlsUpperArea">
					<input
						type="range"
						min={1}
						max={3}
						step={0.1}
						value={zoom}
						onInput={(e) => {
							onZoomChange(e.target.value);
						}}
						className="Slider"
					/>
				</div>
			</div>
		</Container>
	);
};

export default ImageCropDialog;
