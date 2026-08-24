# KRONOS 28 – Sistema de Verificación con Evidencia Criptográfica

Plataforma para registrar y verificar folios (documentos, productos, activos) usando blockchain Polygon Amoy.

## Características
- Registro inmutable de folios mediante hash `keccak256`.
- Verificación pública sin costo (solo lectura).
- Dashboard accesible con formulario semántico y soporte para tecla Enter.
- API REST para integración con sistemas externos.
- Roles M1 (validación), M14 (suspensión), M15 (revocación), M28 (pausa).

## Tecnologías
- **Frontend:** Next.js 14 + Tailwind CSS + ethers.js
- **Blockchain:** Polygon Amoy (contrato `0x83dD...3445`)
- **Backend:** API Routes en Vercel

## Despliegue rápido
1. Clona el repo.
2. Instala dependencias: `npm install`
3. Configura `.env.local` con `AMOY_RPC_URL`.
4. Ejecuta en local: `npm run dev`
5. Despliega en Vercel: `vercel --prod`

## Limitaciones
- No es un PSC autorizado NOM‑151 ni emite sellos de tiempo RFC 3161.
- No sustituye FIEL del SAT.
- Es evidencia técnica complementaria, no prueba legal plena por sí mismo.

## Contacto
[Tu correo] – [Tu wallet M28]
