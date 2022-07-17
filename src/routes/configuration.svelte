<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { ResponseServer } from '$lib/types';

	const id = $page.url.searchParams.get('id');
	export let server: ResponseServer;

	onMount(async () => {
		const res = await fetch(`http://localhost:10000/server?id=${id}`);
		server = await res.json();
	});

	function cancel() {
		goto('http://localhost:3000');
	}

	function save() {
		fetch(`http://localhost:10000/server?id=${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(server)
		})
			.then(() => {
				goto('http://localhost:3000');
			})
			.catch((err) => {
				console.error(err);
			});
	}
</script>

{#if server !== undefined}
	<form class="content" on:submit|preventDefault={save}>
		<h1>Edit Server Settings</h1>
		<p>ID</p>
		<p>{server.id}</p>
		<label
			>Name
			<input type="text" bind:value={server.name} /></label
		>
		<label
			>Directory
			<input type="text" bind:value={server.directory} /></label
		>
		<label
			>Jar File
			<input type="text" bind:value={server.jar_file} /></label
		>
		<label
			>Run Memory
			<input type="text" bind:value={server.run_memory} /></label
		>
		<label
			>Start Memory
			<input type="text" bind:value={server.start_memory} /></label
		>
		<label
			>Java Args
			<input type="text" bind:value={server.java_args} /></label
		>
		<button on:click={cancel}>Cancel</button>
		<button type="submit">Save</button>
	</form>
{:else}
	<h1>Loading</h1>
{/if}
