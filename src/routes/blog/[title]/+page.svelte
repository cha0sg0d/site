<script>
	import { page } from '$app/stores';
	import BlogPost from '$components/BlogPost.svelte';

	const title = $page.params.title;
</script>

{#if title}
	<div class="h-full flex flex-col px-10 gap-6">
		<div class="blog post flex flex-col gap-4 shrink h-full overflow-scroll">
			<BlogPost {title} />
		</div>
	</div>
{/if}
