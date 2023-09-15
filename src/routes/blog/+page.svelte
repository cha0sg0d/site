<script lang="ts">
	import Blog from '$pages/Blog.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<Blog {data} />
