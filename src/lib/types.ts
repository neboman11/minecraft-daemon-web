export type RequestServer = {
	name: string;
	directory: string;
	jar_file: string;
	run_memory: string;
	start_memory: string;
	java_args: string;
};

export type ResponseServer = {
	id: number;
	name: string;
	directory: string;
	jar_file: string;
	run_memory: string;
	start_memory: string;
	java_args: string;
	status: number;
};
