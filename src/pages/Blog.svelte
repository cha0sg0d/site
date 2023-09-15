<script lang="ts">
	import BlogLink from '$components/BlogLink.svelte';
	import type { PageData } from '../routes/blog/$types';

	export let data: PageData;
	console.log(`DATA`, data);
</script>

<div class="px-10 pb-10">
	{#if data.posts}
		{#each data.posts as { meta }}
			<BlogLink title={meta.title} date={meta.date} />
		{/each}
	{/if}
</div>
