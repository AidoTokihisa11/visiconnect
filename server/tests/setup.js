// Variables d'environnement mock\u00e9es pour les tests.
// Doit \u00eatre charg\u00e9 avant l'import de src/config/env.js.
process.env.NODE_ENV = 'test';
process.env.PORT = '0';
process.env.ALLOWED_ORIGINS = 'http://localhost:5173';
process.env.CLERK_SECRET_KEY = 'sk_test_dummy_secret_key_for_unit_tests';
process.env.LIVEKIT_API_KEY = 'APItest';
process.env.LIVEKIT_API_SECRET = 'secrettestsecrettestsecrettestsecret123456';
process.env.LOG_LEVEL = 'fatal';
