<script lang="ts">
	import SvelteTable from 'svelte-table';
	import type { ResponseServer } from '$lib/types';

	let rows: ResponseServer[] = [];
	const columns = [
		{
			key: 'id',
			title: 'ID',
			value: (v: ResponseServer): number => v.id,
			sortable: true,
			filterOptions: (rows: ResponseServer[]) => {
				// generate groupings of 0-10, 10-20 etc...
				let nums: { [key: number]: { name: string; value: number } } = {};
				rows.forEach((row) => {
					let num = Math.floor(row.id / 10);
					if (nums[num] === undefined)
						nums[num] = { name: `${num * 10} to ${(num + 1) * 10}`, value: num };
				});
				// fix order
				//   nums = Object.entries(nums)
				//     .sort()
				//     .reduce((o, [k, v]) => ((o[k] = v), o), {});
				return Object.values(nums);
			},
			filterValue: (v: ResponseServer): number => Math.floor(v.id / 10),
			headerClass: 'text-left'
		},
		{
			key: 'name',
			title: 'Name',
			value: (v: ResponseServer): string => v.name,
			sortable: true
		},
		{
			key: 'directory',
			title: 'Directory',
			value: (v: ResponseServer): string => v.directory,
			sortable: true
		},
		{
			key: 'jar_file',
			title: 'Jar File',
			value: (v: ResponseServer): string => v.jar_file,
			sortable: true
		},
		{
			key: 'run_memory',
			title: 'Run Memory',
			value: (v: ResponseServer): string => v.run_memory,
			sortable: true
		},
		{
			key: 'start_memory',
			title: 'Start Memory',
			value: (v: ResponseServer): string => v.start_memory,
			sortable: true
		},
		{
			key: 'java_args',
			title: 'Java Args',
			value: (v: ResponseServer): string => v.java_args,
			sortable: true
		},
		{
			key: 'status',
			title: 'Status',
			value: (v: ResponseServer): string => (v.status === 1 ? 'Stopped' : 'Running'),
			sortable: true
		},
		{
			key: 'configuration',
			title: 'Configuration',
			value: (v: ResponseServer): string => {
				return `<a href="/configuration/?id=${v.id}">Configure</a>`;
			}
		}
	];

	fetch('http://localhost:10000/servers')
		.then((res) => res.json())
		.catch((err) => {
			console.error(err);
		})
		.then((res) => {
			rows = res as ResponseServer[];
		})
		.catch((err) => {
			console.error(err);
		});
</script>

<SvelteTable {columns} {rows} />
