<script lang="ts">
	import { marked } from 'marked';
	import { onMount } from 'svelte';

	export let title: string;
	let html: string;
	let fetchError = false;

	async function loadMarkdown(titleName: string) {
		if (!titleName) throw new Error('name not defined');
		const res = new URL(`../text/${titleName}.md`, import.meta.url).href;
		if (res.includes('undefined')) throw new Error('post not found');
		const response = await fetch(res);
		if (response.status !== 200) throw new Error(`fetch failed`);
		return await response.text();
	}
	onMount(async () => {
		try {
			const markdown = await loadMarkdown(title);
			html = marked(markdown);
		} catch (error) {
			fetchError = true;
		}
	});
</script>

{#if fetchError}
	<h2>Post not found</h2>
{/if}
{#if html}
	<!-- svelte-expect-error html -->
	{@html html}
{/if}
