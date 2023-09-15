<script lang="ts">
	import BlogLink from '$components/BlogLink.svelte';
	import { fetchMarkdownPosts } from '$lib';
	import { onMount } from 'svelte';

	let posts: Array<{ meta: { title: string; date: string } }>;

	console.log(fetchMarkdownPosts());

	onMount(async () => (posts = await fetchMarkdownPosts()));
</script>

<div class="px-10 pb-10">
	{#if posts}
		{#each posts as { meta }}
			<BlogLink title={meta.title} date={meta.date} />
		{/each}
	{/if}
</div>
