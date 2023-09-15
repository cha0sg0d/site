import { base } from '$app/paths';

export const load = async ({ fetch }) => {
	console.log(`QHEEEE`);
	const response = await fetch(`${base}/api/posts`);
	const posts = await response.json();
	console.log(`posts`, posts);
	return {
		posts
	};
};
