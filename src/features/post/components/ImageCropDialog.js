import { useState } from 'react';
import Cropper from 'react-easy-crop';
import '../assets/ImageCropDialog.css';
import getCroppedImg from '../utils/cropImage';
import { Button, Col, Row, Container } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const ImageCropDialog = ({ imageUrl, cropInit, zoomInit, setCroppedImageFor }) => {
	const navigate = useNavigate();
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
		<Container fluid>
			<div className="CropDiv">
				<div className="ShareControls">
					<Row>
						<Col>
							<Button className="GoBack" onClick={() => navigate(-1)}>
								<span id="GoBack" className="material-symbols-outlined">
									arrow_back
								</span>
							</Button>
						</Col>
						<Col>
							<h1 className="NewCaptionPostLabel">Crop</h1>
						</Col>
						<Col>
							<Button onClick={onCrop} className="PostButton" type="submit" size="sm">
								Next
							</Button>
						</Col>
					</Row>
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
