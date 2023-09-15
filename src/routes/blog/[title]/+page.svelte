<script>
	export let data;
</script>

<article>
	<h1>{data.title}</h1>
	{#if data.date}
		<p>Published: {data.date}</p>
	{/if}
	<svelte:component this={data.content} />
</article>
