<script lang="ts">
	export let content: string;
	console.log(`content`, content);
</script>

{#if content}
	<div class="h-full flex flex-col px-10 gap-6">
		<div class="blog post flex flex-col gap-4 shrink h-full overflow-scroll">
			{@html content}
		</div>
	</div>
{/if}
