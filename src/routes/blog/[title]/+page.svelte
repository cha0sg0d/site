<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<article>
	<h1>{data.title}</h1>
	{#if data.date}
		<p>Published: {data.date}</p>
	{/if}
	<svelte:component this={data.content} />
</article>
