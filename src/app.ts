import { CBAuth } from "./common/token/CBAuth";

const cbAuth = new CBAuth();

async function TestToken(): Promise<void> {
    try {
        const response = await cbAuth.token();
        const { token, expires } = response;

        // Convert expires from milliseconds to Date object
        const expiresDate = new Date(expires);
        const now = new Date();

        // Log token and expires time
        console.log(`Token: ${token}`);
        console.log(`Current time: ${now.toLocaleString()}, Expires at: ${expiresDate.toLocaleString()}`);
    } catch (error) {
        console.error("Error calling Token endpoint:", error);
        throw error; // Re-throw the error to propagate it up
    }
}

async function executeTestTokenPeriodically(): Promise<void> {
    let index = 1;

    // Initial token check
    await TestToken();

    // Schedule execution every 10 seconds
    setInterval(async () => {
        index++;
        console.log(`Test Token ${index}`);

        try {
            await TestToken();
        } catch (error) {
            console.error("Failed to refresh token:", error);
        }
    }, 1000); // 1 seconds
}

// Initiate the periodic token refresh
executeTestTokenPeriodically();

// Keep the process running until manually terminated
process.stdin.resume();

// Handle termination signals
const handleTermination = () => {
    console.log('Terminating...');
    process.exit();
};

process.on('SIGINT', handleTermination); // Ctrl + C
process.on('SIGTERM', handleTermination); // Termination signal
