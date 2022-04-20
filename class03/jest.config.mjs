const defaultConfig = {
	coverageDir: "coverage",
	coverageProvider: "v8",
	coverageReports: ["text", "lcov"/*Para mostrar no html*/],
	coverageThreshold: {global: {branch: 100, functions: 100, lines: 100, statements: 100}},
	maxWorkers: "50%"/*Para não usar a máquina inteira para rodar testes*/,
	// Porque Jest não está 100% estável para ECMAScript Module
	watchPathIgnorePatterns: ["/node_modules/"],
	// Para transformar o ECMAScript Module para files js da forma antiga
	TransformIgnorePatterns: ["/node_modules/"]
}

export default {
	projects: [{
			...defaultConfig,
			testEnvironment: "node", // Api do node
			displayName: "backend", // Suíte para Backend
			collectCoverageFrom: ["server/","!server/index.js"],
			TransformIgnorePatterns: [
				...defaultConfig.TransformIgnorePatterns,"public"],
			testMath: ["**/tests/**/server/**/*.test.js"]
		},
		{
			...defaultConfig, // Copiar todas as configurações
			testEnvironment: "jsdom", // Api do browser (window)
			displayName: "frontend", // Suíte para Frontend
			collectCoverageFrom: ["public/"],
			TransformIgnorePatterns: [
				...defaultConfig.TransformIgnorePatterns,"server"],
			testMath: ["**/tests/**/public/**/*.test.js"]
		}
	]
};
