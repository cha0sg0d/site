export const formatDate = (date: number) => {
	return new Date(date).toLocaleString('en-US', {
		day: 'numeric',
		month: 'numeric',
		year: '2-digit'
	});
};

export const fetchMarkdownPosts = async () => {
	const allPostFiles = import.meta.glob('/src/text/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			// @ts-expect-error idk
			const { metadata } = await resolver();
			console.log(`PATH`, path);
			const postPath = path.slice(11, -3);

			return {
				meta: metadata,
				path: postPath
			};
		})
	);

	return allPosts;
};
