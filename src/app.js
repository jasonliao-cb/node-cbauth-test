"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CBAuth_1 = require("./common/token/CBAuth");
const cbAuth = new CBAuth_1.CBAuth();
function TestToken() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield cbAuth.token();
            const { token, expires } = response;
            // Convert expires from milliseconds to Date object
            const expiresDate = new Date(expires);
            const now = new Date();
            // Log token and expires time
            console.log(`Token: ${token}`);
            console.log(`Current time: ${now.toLocaleString()}, Expires at: ${expiresDate.toLocaleString()}`);
        }
        catch (error) {
            console.error("Error calling Token endpoint:", error);
            throw error; // Re-throw the error to propagate it up
        }
    });
}
function executeTestTokenPeriodically() {
    return __awaiter(this, void 0, void 0, function* () {
        let index = 1;
        // Initial token check
        yield TestToken();
        // Schedule execution every 10 seconds
        setInterval(() => __awaiter(this, void 0, void 0, function* () {
            index++;
            console.log(`Test Token ${index}`);
            try {
                yield TestToken();
            }
            catch (error) {
                console.error("Failed to refresh token:", error);
            }
        }), 1000); // 1 seconds
    });
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
