import { Button, Modal, ModalBody } from 'reactstrap';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';
import './SettingsModal.css';

function SettingsModal() {
	const { toggle, modal, logOutUser } = useContext(CurrentUserContext);

	return (
		<div>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalBody className="ModalBody">
					<div className="LogOut">
						<Button onClick={logOutUser}>Log Out</Button>
					</div>
					<div className="YourLikes">
						<Button>Your Likes</Button>
					</div>
					<div>
						<Button onClick={toggle}>Cancel</Button>
					</div>
				</ModalBody>
			</Modal>
		</div>
	);
}

export default SettingsModal;
