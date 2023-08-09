import { Button, Modal, ModalBody } from 'reactstrap';
import { useContext } from 'react';
import CurrentUserContext from '../../../context/CurrentUserContext';
import '../assets/UserPostSettingsModal.css';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';

function UserPostSettingsModal() {
	const { toggleUserPostSettingsModal, userPostSettingsModal, setUserPostSettingsModal, innerPostHTML, storedValue, unfollow, deletePost } = useContext(
		CurrentUserContext
	);
	const navigate = useNavigate();

	const handlePostDeletion = () => {
		deletePost(innerPostHTML);
		setUserPostSettingsModal(!userPostSettingsModal);
		navigate(`/${innerPostHTML?.postUsername}`);
	}

	return ReactDOM.createPortal(
		<div>
			<Modal isOpen={userPostSettingsModal} toggle={toggleUserPostSettingsModal} centered={true} size={'sm'}>
				<ModalBody className="ModalBody">
					{innerPostHTML?.postUsername === storedValue?.username ? 
						(
						<>
							<div className='DeleteDiv'>
								<Button className="DeletePost" style={{ color: 'red' }} onClick={() => handlePostDeletion()}>
									Delete
								</Button>
							</div>
							<div className='EditDiv'>
								<Button className="Edit">Edit</Button>
							</div>
						</>
						) 
						: 
						(
						<>
							<div className='UnfollowPostDiv'>
								<Button className="UnfollowPostUser" style={{ color: 'red' }} onClick={() => unfollow(storedValue?.username, innerPostHTML?.postUsername)}>
									Unfollow
								</Button>
							</div>
							<div className='GoToPostDiv'>
								<Button className="GoToPost">Go to post</Button>
							</div>
						</>
						) 
					}
					<div>
						<Button className='CancelSettingsButton' onClick={() => setUserPostSettingsModal(!userPostSettingsModal)}>Cancel</Button>
					</div>
				</ModalBody>
			</Modal>
		</div>,
		document.body
	);
}

export default UserPostSettingsModal;
