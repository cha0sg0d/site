<script lang="ts">
	export let title: string;
	export let date: string;
	const link = title.replace(/\s+/g, '-').toLowerCase();
</script>

<div
	class="flex w-full font-body items-center justify-between p-3 gap-4 bg-white shadow-card mb-1 mx-auto"
>
	<a href="/blog/{link}" class="w-full">
		<div class="flex w-full justify-between items-center">
			<p class="text-left font-bold">{title}</p>
			<p>{date}</p>
		</div>
	</a>
</div>
