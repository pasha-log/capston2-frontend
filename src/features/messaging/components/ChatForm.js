import '../assets/ChatForm.css';
import { Input, Button, Form } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';

const ChatForm = ({ sendMessage, selectedConversation }) => {
	const { control, handleSubmit, reset, formState: { isDirty, isValid }, watch } = useForm({
		mode: 'onChange',
		defaultValues: {
			message: ''
		}
	});

	const onSubmit = async (data) => {
		sendMessage(selectedConversation.recipients.map((r) => r.username), data.message);
		reset();
		console.log('ChatSent');
	};

	return (
		<div className="ChatFormContainer">
			<Form className="ChatContainer" onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="message"
					control={control}
					render={({ field }) => (
						<Input className="ChatMessage" type="text" placeholder="Message..." {...field} />
					)}
				/>
				<Button disabled={!isDirty || !isValid || watch('message') === ''} className="SendChat">
					Send
				</Button>
			</Form>
		</div>
	);
};

export default ChatForm;
