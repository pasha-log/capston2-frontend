const timeSincePosted = (dateString) => {
	var date = new Date(dateString);
	var today = new Date();
	let weeksSince = Math.floor((today - date) / (1000 * 60 * 60 * 24 * 7));
	if (weeksSince === 0) {
		let daysSince = Math.floor((today - date) / (1000 * 60 * 60 * 24));
		if (daysSince === 0) {
			let hoursSince = Math.floor((today - date) / (1000 * 60 * 60));
			if (hoursSince === 0) {
				let minutesSince = Math.floor((today - date) / (1000 * 60));
				if (minutesSince === 0) {
					let secondsSince = Math.floor((today - date) / 1000);
					return `${secondsSince}s`;
				} else {
					return `${minutesSince}m`;
				}
			} else {
				return `${hoursSince}h`;
			}
		} else {
			return `${daysSince}d`;
		}
	} else {
		return `${weeksSince}w`;
	}
};

export default timeSincePosted;
