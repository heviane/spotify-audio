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
	projects: [
		// Suíte para Frontend
		{
			...defaultConfig, // Para copiar todas as configurações
			testEnvironment: "jsdom", // Para a api do browser
			displayName: "frontend",
			collectCoverageFrom: ["public/"],
			TransformIgnorePatterns: [...defaultConfig.TransformIgnorePatterns,
				"server/"/*Ignorar pq é backend*/],
			testMath: ["**/tests/**/public/**/*.test.js"]
		},
		// Suíte para Backend
		{
			...defaultConfig, // Para copiar todas as configurações
			testEnvironment: "node", // Para a api do node
			displayName: "backend",
			collectCoverageFrom: ["server/","!server/index.js"/*Infraestrutura*/],
			TransformIgnorePatterns: [...defaultConfig.TransformIgnorePatterns,
				"public/"/*Ignorar pq é frontend*/],
			testMath: ["**/tests/**/server/**/*.test.js"]
		}
	]
};
