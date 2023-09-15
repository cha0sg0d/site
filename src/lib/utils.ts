export const formatDate = (date: number) => {
	return new Date(date).toLocaleString('en-US', {
		day: 'numeric',
		month: 'numeric',
		year: '2-digit'
	});
};
