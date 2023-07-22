import { Button, Modal, ModalBody } from 'reactstrap';
import { useContext } from 'react';
import CurrentUserContext from '../context/CurrentUserContext';
import '../assets/SettingsModal.css';

function SettingsModal() {
	const { toggleSettingsModal, settingsModal, logOutUser } = useContext(CurrentUserContext);

	return (
		<div>
			<Modal isOpen={settingsModal} toggle={toggleSettingsModal} centered={true} size={'sm'}>
				<ModalBody className="ModalBody">
					<div className="LogOut">
						<Button onClick={logOutUser}>Log Out</Button>
					</div>
					<div className="YourLikes">
						<Button>Your Likes</Button>
					</div>
					<div>
						<Button onClick={toggleSettingsModal}>Cancel</Button>
					</div>
				</ModalBody>
			</Modal>
		</div>
	);
}

export default SettingsModal;
