<script lang="ts">
	import { formatDate } from '$lib';
	import { base } from '$app/paths';

	export let title: string;
	export let date: number;
	const link = title.replace(/\s+/g, '-').toLowerCase();
	const cleanDate = formatDate(date);
</script>

<div
	class="flex w-full font-body items-center justify-between p-3 gap-4 bg-white shadow-card mb-1 mx-auto"
>
	<a href="{base}/blog/{link}" class="w-full">
		<div class="flex w-full justify-between items-center">
			<p class="text-left font-bold">{title}</p>
			<p>{cleanDate}</p>
		</div>
	</a>
</div>
