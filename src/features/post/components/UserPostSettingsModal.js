import { Button, Modal, ModalBody } from 'reactstrap';
import { useContext } from 'react';
import CurrentUserContext from '../../../context/CurrentUserContext';
import '../assets/UserPostSettingsModal.css';
import { useNavigate } from 'react-router-dom';

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

	return (
		<div>
			<Modal isOpen={userPostSettingsModal} toggle={toggleUserPostSettingsModal} centered={true} size={'sm'}>
				<ModalBody className="ModalBody">
					{innerPostHTML?.postUsername === storedValue?.username ? 
						(
						<>
							<div className="DeletePost">
								<Button style={{ color: 'red' }} onClick={() => handlePostDeletion()}>
									Delete
								</Button>
							</div>
							<div className="Edit">
								<Button>Edit</Button>
							</div>
						</>
						) 
						: 
						(
						<>
							<div className="UnfollowPostUser">
								<Button style={{ color: 'red' }} onClick={() => unfollow(storedValue?.username, innerPostHTML?.postUsername)}>
									Unfollow
								</Button>
							</div>
							<div className="GoToPost">
								<Button>Go to post</Button>
							</div>
						</>
						) 
					}
					<div>
						<Button onClick={() => setUserPostSettingsModal(!userPostSettingsModal)}>Cancel</Button>
					</div>
				</ModalBody>
			</Modal>
		</div>
	);
}

export default UserPostSettingsModal;
