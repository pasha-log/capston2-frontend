import { Modal, ModalBody } from 'reactstrap';
import ReactDOM from 'react-dom';
import { useContext } from 'react';
import CurrentUserContext from '../../../context/CurrentUserContext';
import FileUploadForm from './FileUploadForm';
import ImageCropForm from './ImageCropForm';
import CaptionForm from './CaptionForm';

const AddNewPost = ({ fileUploadPhase, imageCropPhase, captionPhase }) => {
	const { toggleUploadModal, uploadModal } = useContext(CurrentUserContext);
	return ReactDOM.createPortal(
		<Modal isOpen={uploadModal} toggle={toggleUploadModal} centered={true} size={captionPhase ? 'lg' : 'md'}>
			<ModalBody className="ModalBody ">
				{fileUploadPhase && <FileUploadForm />}
				{imageCropPhase && <ImageCropForm />}
				{captionPhase && <CaptionForm />}
			</ModalBody>
		</Modal>,
		document.getElementById('modal')
	);
};

export default AddNewPost;
