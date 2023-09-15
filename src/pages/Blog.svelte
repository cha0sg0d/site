<script lang="ts">
	import BlogLink from '$components/BlogLink.svelte';
	import { posts } from '$text/blog';

	const postsByDate = posts.sort((a, b) => b.date - a.date);
</script>

<div class="px-10 pb-10">
	{#each postsByDate as { title, date }}
		<BlogLink {title} {date} />
	{/each}
</div>
