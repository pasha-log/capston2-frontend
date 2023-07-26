import { Button, Modal, ModalBody } from 'reactstrap';
import { useContext } from 'react';
import CurrentUserContext from '../../../context/CurrentUserContext';
import '../assets/DiscardModal.css';
import ReactDOM from 'react-dom';

function DiscardModal({
	imageCropPhase,
	setImageCropPhase,
	setFileUploadPhase,
	s3Response,
	setCaptionPhase,
	captionPhase,
	deleteS3File
}) {
	const { toggleDiscardModal, discardModal } = useContext(CurrentUserContext);

	const handleDiscard = async () => {
		if (imageCropPhase === true) {
			setImageCropPhase(false);
			setFileUploadPhase(true);
		} else if (captionPhase === true) {
			const { imageKey } = s3Response;
			await deleteS3File(imageKey);
			setCaptionPhase(false);
			setImageCropPhase(true);
		}
		toggleDiscardModal();
	};

	return ReactDOM.createPortal(
		// <div>
		<Modal
			isOpen={discardModal}
			toggle={toggleDiscardModal}
			centered={true}
			size={'sm'}
			backdrop="static"
			keyboard={false}
		>
			<ModalBody className="ModalBody">
				<div className="DiscardWarning">
					Discard post?
					<p>If you leave, your edits won't be saved.</p>
				</div>
				<div className="Discard">
					<Button className="DiscardButton" onClick={() => handleDiscard()}>
						Discard
					</Button>
				</div>
				<div className="DiscardCancel">
					<Button onClick={toggleDiscardModal}>Cancel</Button>
				</div>
			</ModalBody>
		</Modal>,
		// </div>,
		document.body
	);
}

export default DiscardModal;
