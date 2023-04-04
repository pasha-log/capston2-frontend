const Alert = ({ type, message, formType }) => {
	return (
		<div id={formType} className={`alert alert-${type}`} role="alert">
			<p className="mb-0 small">{message}</p>
		</div>
	);
};

export default Alert;
