import * as fs from "node:fs";
import * as path from "node:path";
import { rspack } from "@rspack/core";
import rspackConfig from "./rspack.config-docs.js";

console.log("creating doc");

fs.rmSync(path.join(process.cwd(), "docs"), {
	force: true,
	recursive: true,
});

const compiler = rspack(rspackConfig);

compiler.run((err, stats) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	console.log(
		stats.toString({
			colors: true,
			children: false,
			modules: false,
			version: false,
			chunks: false,
			warnings: false,
		}),
	);
});
