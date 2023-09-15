import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	console.log(`params`, params);
	try {
		const post = await import(`../../../text/${params.title}.md`);

		const { title, date } = post.metadata;
		const content = post.default;
		return {
			content,
			title,
			date
		};
	} catch (error) {
		return {
			content: '',
			title: 'Not found',
			date: ''
		};
	}
};
