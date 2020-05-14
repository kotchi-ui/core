module.exports = {
	presets: ["@babel/preset-env"],
	env: {
		test: {
			plugins: [
				"@babel/plugin-proposal-object-rest-spread",
				["@babel/plugin-proposal-decorators", { legacy: true }],
				["@babel/plugin-proposal-class-properties", { loose: true }],
				// ["js-logger", { format: { separator: "/", project: false } }],
			],
		},
	},
};
