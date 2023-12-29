const Notification = ({ message }) => {
	if (message === null) {
		return;
	}

	return (
		<div
			style={{ color: message.error ? "red" : "green" }}
			className="notification"
		>
			{message.content}
		</div>
	);
};

export default Notification;
