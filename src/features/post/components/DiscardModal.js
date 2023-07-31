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
	const {
		toggleDiscardModal,
		discardModal,
		setUploadModal,
		outsideClickUploadForm,
		setOutsideClickUploadForm
	} = useContext(CurrentUserContext);

	const handleDiscardBackButton = async () => {
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

	const handleDiscardOutsideClick = async () => {
		if (captionPhase === true) {
			const { imageKey } = s3Response;
			await deleteS3File(imageKey);
		}
		toggleDiscardModal();
		setUploadModal(false);
		setCaptionPhase(false);
		setImageCropPhase(false);
		setFileUploadPhase(true);
		setOutsideClickUploadForm(false);
	};

	/** We need a function that knows when a click outside of any post creation phase except the initial fileUploadForm. 
	 * When this event happens, it needs to trigger the discard modal to warn the user of loosing their editing work.
	 */

	return ReactDOM.createPortal(
		<Modal isOpen={discardModal} toggle={toggleDiscardModal} centered={true} size={'sm'}>
			<ModalBody className="ModalBody">
				<div className="DiscardWarning">
					Discard post?
					<p>If you leave, your edits won't be saved.</p>
				</div>
				<div className="Discard">
					{outsideClickUploadForm ? (
						<Button className="DiscardButton" onClick={() => handleDiscardOutsideClick()}>
							Discard
						</Button>
					) : (
						<Button className="DiscardButton" onClick={() => handleDiscardBackButton()}>
							Discard
						</Button>
					)}
				</div>
				<div className="DiscardCancel">
					<Button onClick={toggleDiscardModal}>Cancel</Button>
				</div>
			</ModalBody>
		</Modal>,
		document.getElementById('modal')
	);
}

export default DiscardModal;
