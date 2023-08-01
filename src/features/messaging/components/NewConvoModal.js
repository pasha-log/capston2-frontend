import { Modal, ModalBody, Button } from 'reactstrap';
import ReactDOM from 'react-dom';
import { useContext } from 'react';
import CurrentUserContext from '../../../context/CurrentUserContext';
import '../assets/NewConvoModal.css';

const NewConvoModal = ({}) => {
	const { toggleNewConvoModal, newConvoModal } = useContext(CurrentUserContext);

	return ReactDOM.createPortal(
		<Modal className="ChatModal" isOpen={newConvoModal} toggle={toggleNewConvoModal} centered={true} size={'md'}>
			<ModalBody className="ModalBody NewChatBody">
				<div className="NewMessageHeader">
					<div style={{ width: '3rem', height: '3rem' }} />
					<h2 className="HeaderTitle">New Message</h2>
					<span
						onClick={() => toggleNewConvoModal()}
						className="material-symbols-outlined NewConvoModalClose"
						style={{ fontSize: '3rem' }}
					>
						close
					</span>
				</div>
				<div className="ConvoSearch">
					<div className="To">To:</div>
					<div className="SearchConvo">Search...</div>
				</div>
				<div className="ChatSearchResults">
					<p className="NoAccountFound">No account found.</p>
				</div>
				<div className="ChatButton">
					<Button className="StartChatButton">Chat</Button>
				</div>
			</ModalBody>
		</Modal>,
		document.getElementById('modal')
	);
};

export default NewConvoModal;
