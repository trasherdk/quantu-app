const preprocess = require('svelte-preprocess');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess()
};

module.exports = config;
