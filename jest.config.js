module.exports = {
    preset: "ts-jest",
    testEnvoirement: "node",
    verbose: true, //Permette di visualizzare le informazioni
    clearMocks: true,
    setupFilesAfterEnv: ["./src/lib/prisma/client.mock.ts"],
};
