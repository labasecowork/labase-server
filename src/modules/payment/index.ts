// src/modules/payment/payment.routes.ts
import { Router } from "express";

import { createPaymentRoutes } from "./features/create-payment";
// import { securityRoutes }   from "./features/create-security-token";
// import { sessionRoutes }    from "./features/create-session-token";
// import { scriptRoutes }     from "./features/get-checkout-script";
import { visaCbRoutes }     from "./features/visa-callback";
import { resultRoutes }     from "./features/get-payment-result";

const router = Router();

router.use("/create-payment", createPaymentRoutes);    // inicia el flow y devuelve purchaseNumber + sessionToken + scriptUrl
// router.use("/security-token", securityRoutes);         // GET  /payment/security-token
// router.use("/session-token", sessionRoutes);           // POST /payment/session-token
// router.use("/checkout-script", scriptRoutes);          // GET  /payment/checkout-script
router.use("/visa-callback", visaCbRoutes);            // Callback del formulario de Niubiz
router.use("/result", resultRoutes);                   // Consulta de estado
/**
 * MATCHES:
 *  POST   /payment/create-payment             → inicia el flujo y devuelve { purchaseNumber, sessionToken, scriptUrl }
 *  GET    /payment/security-token             → proxy a Niubiz GET /api.security/v1/security
 *  POST   /payment/session-token              → proxy a Niubiz POST /api.ecommerce/v2/.../session/{merchantId}
 *  GET    /payment/checkout-script            → devuelve la URL del JS de checkout
 *  POST   /payment/visa-callback              → recibe transactionToken, valida y guarda en BD
 *  GET    /payment/result/:purchaseNumber     → consulta estado de la transacción
 */


export { router as paymentRoutes };