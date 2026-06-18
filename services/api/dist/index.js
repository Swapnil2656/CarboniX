"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const carbon_routes_1 = __importDefault(require("./modules/carbon/carbon.routes"));
const reference_routes_1 = __importDefault(require("./modules/reference/reference.routes"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.get('/api/v1/health', (req, res) => {
    res.json({ message: 'CarboniX API is running!' });
});
app.use('/api/v1/carbon', carbon_routes_1.default);
app.use('/api/v1/reference', reference_routes_1.default);
app.use('/api/v1/auth', auth_routes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
