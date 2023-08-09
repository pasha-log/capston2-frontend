import '../assets/SearchBar.css';
import { Input, Form, FormGroup } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

const SearchBar = ({ getSearchTerm, isInExplorePage }) => {
	const { reset } = useForm();

	const onSubmit = (data) => {
		getSearchTerm(data);
		reset();
	};

	const [ searchTerm, setSearchTerm ] = useState('');
	useEffect(
		() => {
			const subscription = () => {
				onSubmit(searchTerm);
			};
			subscription();
		},
		[ searchTerm ]
	);

	return (
		<div style={{ marginTop: `${isInExplorePage && '5rem'}` }} className="SearchBarContainer">
			<Form>
				<FormGroup row>
					<div className="input-group">
						<Input
							value={searchTerm}
							onChange={(e) => {
								setSearchTerm(e.target.value);
							}}
							className="SearchInput"
							placeholder="Search..."
						/>
					</div>
				</FormGroup>
			</Form>
		</div>
	);
};

export default SearchBar;
