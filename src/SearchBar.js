import './SearchBar.css';
import { Input, Button, Form, FormGroup, Col } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';

const SearchBar = ({ getSearchTerm }) => {
	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			searchTerm: ''
		}
	});

	const onSubmit = (data) => {
		getSearchTerm(data);
		reset();
	};

	return (
		<div className="SearchBarContainer">
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormGroup row>
					<Col
						md={{
							offset: 3,
							size: 6
						}}
						sm="12"
					>
						<div className="input-group">
							<Controller
								name="searchTerm"
								control={control}
								render={({ field }) => (
									<Input className="SearchInput" placeholder="Search..." {...field} />
								)}
							/>
							<Button className="Search" type="submit" size="lg">
								Search
							</Button>
						</div>
					</Col>
				</FormGroup>
			</Form>
		</div>
	);
};

export default SearchBar;
