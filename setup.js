// setup.js
const fs = require('fs');
const path = require('path');

// Configuración
const PROJECT_NAME = 'kronos28';
const CONTRACT_ADDRESS = '0x83dD000C8D2E6eF0125cEe28b6e070a7A41d3445';
const AMOY_RPC = 'https://rpc-amoy.polygon.technology/';

// Crear directorio raíz
if (!fs.existsSync(PROJECT_NAME)) {
  fs.mkdirSync(PROJECT_NAME);
}
process.chdir(PROJECT_NAME);

console.log(`📁 Creando proyecto en ./${PROJECT_NAME}`);

// ============================================================
// 1. ARCHIVOS DE CONFIGURACIÓN (raíz)
// ============================================================

// package.json
fs.writeFileSync('package.json', JSON.stringify({
  name: 'kronos28',
  version: '2.8.4',
  private: true,
  scripts: {
    dev: 'next dev',
    build: 'next build',
    start: 'next start',
    lint: 'next lint'
  },
  dependencies: {
    'next': '14.2.5',
    'react': '^18.3.1',
    'react-dom': '^18.3.1',
    'ethers': '^6.13.1',
    'tailwindcss': '^3.4.1',
    'postcss': '^8.4.31',
    'autoprefixer': '^10.4.16'
  },
  devDependencies: {
    '@types/node': '^20.11.24',
    '@types/react': '^18.2.61',
    '@types/react-dom': '^18.2.19',
    'typescript': '^5.3.3'
  }
}, null, 2));

// next.config.js
fs.writeFileSync('next.config.js', `
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
};

module.exports = nextConfig;
`);

// tailwind.config.js
fs.writeFileSync('tailwind.config.js', `
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: { extend: {} },
  plugins: [],
};
`);

// postcss.config.js
fs.writeFileSync('postcss.config.js', `
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`);

// tsconfig.json
fs.writeFileSync('tsconfig.json', `
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`);

// .env.example
fs.writeFileSync('.env.example', `
# Blockchain (Amoy)
NEXT_PUBLIC_AMOY_RPC_URL=${AMOY_RPC}
NEXT_PUBLIC_CONTRACT_ADDRESS=${CONTRACT_ADDRESS}

# Solo para scripts (NUNCA subas tu private key real)
PRIVATE_KEY_VALIDATOR=tu_private_key_solo_para_pruebas
`);

// .gitignore
fs.writeFileSync('.gitignore', `
node_modules/
.pnp/
.pnp.js
.env
.env.local
.env.*.local
.next/
out/
build/
dist/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store
.vscode/
.idea/
`);

// README.md
fs.writeFileSync('README.md', `
# KRONOS 28 – Sistema de Verificación con Evidencia Criptográfica

Plataforma para registrar y verificar folios (documentos, productos, activos) usando blockchain Polygon Amoy.

## Características
- Registro inmutable de folios mediante hash \`keccak256\`.
- Verificación pública sin costo (solo lectura).
- Dashboard accesible (formulario semántico, Enter, aria-invalid).
- API REST para integración externa.
- Roles M1 (validación), M14 (suspensión), M15 (revocación), M28 (pausa).

## Tecnologías
- **Frontend:** Next.js 14 + Tailwind CSS + ethers.js
- **Blockchain:** Polygon Amoy (contrato \`${CONTRACT_ADDRESS}\`)
- **Backend:** API Routes en Vercel

## Despliegue rápido
1. Clona el repo.
2. Instala: \`npm install\`
3. Configura \`.env.local\` con \`AMOY_RPC_URL\`.
4. Local: \`npm run dev\`
5. Vercel: \`vercel --prod\`

## Limitaciones
- No es un PSC autorizado NOM‑151 ni emite sellos de tiempo RFC 3161.
- No sustituye FIEL del SAT.
- Es evidencia técnica complementaria.

## Contacto
[Tu correo] – [Tu wallet M28]
`);

// ============================================================
// 2. CARPETA `app/` Y SUS ARCHIVOS
// ============================================================

fs.mkdirSync('app', { recursive: true });

// app/layout.tsx
fs.writeFileSync('app/layout.tsx', `
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KRONOS 28 – Sistema de Verificación',
  description: 'Registro y verificación de folios con blockchain',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-[#0b0e14] text-white min-h-screen flex flex-col">
        {children}
        <footer className="max-w-7xl mx-auto px-4 py-6 text-center text-[10px] text-gray-500 border-t border-[#1f2937] w-full">
          <p>
            ⚠️ Este sistema proporciona evidencia técnica de registro basada en blockchain. 
            No constituye sello oficial NOM‑151 ni FIEL con validez ante el SAT. 
            Consulte a su asesor legal.
          </p>
        </footer>
      </body>
    </html>
  );
}
`);

// app/globals.css
fs.writeFileSync('app/globals.css', `
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background: #0b0e14;
  color: #e8edf5;
}
`);

// app/page.tsx (landing)
fs.writeFileSync('app/page.tsx', `
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="relative z-10 max-w-3xl w-full text-center">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-300 bg-clip-text text-transparent mb-4">
          KRONOS 28
        </h1>
        <p className="text-xl text-gray-300 mb-8">Sistema de Verificación con Evidencia Criptográfica</p>
        <div className="bg-[#111] border border-[#d4af37]/20 rounded-3xl p-8 max-w-md mx-auto">
          <p className="text-2xl font-bold text-gold-400 mb-4">Acceso al Dashboard</p>
          <Link
            href="/dashboard"
            className="block w-full bg-[#d4af37] hover:bg-[#b8962e] text-black font-bold py-3 px-6 rounded-xl transition"
          >
            Verificar Folio
          </Link>
        </div>
        <p className="text-xs text-gray-500 mt-8 border-t border-gray-800 pt-4">
          Contrato: <span className="font-mono text-amber-600">${CONTRACT_ADDRESS}</span>
        </p>
      </div>
    </main>
  );
}
`);

// app/dashboard/page.tsx
fs.writeFileSync('app/dashboard/page.tsx', `
'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';

export default function DashboardPage() {
  const [folio, setFolio] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<null | { usado: boolean; suspendido: boolean; mensaje: string; valido: boolean }>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!folio.trim()) return setError('Ingresa un folio válido');
    setLoading(true);
    setError('');
    setResultado(null);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

      const hash = ethers.keccak256(ethers.toUtf8Bytes(folio.trim().toUpperCase()));
      const [usado, suspendido] = await contract.folioEstado(hash);

      let mensaje = '';
      let valido = false;
      if (usado && !suspendido) {
        mensaje = '✅ AUTÉNTICO · VERDE';
        valido = true;
      } else if (usado && suspendido) {
        mensaje = '🚫 SUSPENDIDO · Investigación activa';
      } else {
        mensaje = '❌ FALSO · No registrado';
      }

      setResultado({ usado, suspendido, mensaje, valido });
    } catch (err: any) {
      setError('Error al conectar con blockchain: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 p-4 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-[#141a24] border border-[#2a3344] rounded-3xl p-6 md:p-8 shadow-2xl">
        <h1 className="text-2xl font-semibold bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent border-b border-[#26303f] pb-4">
          🏛️ KRONOS 28 · MANSIONES
        </h1>

        {/* DISCLAIMER PERMANENTE */}
        <div className="mt-4 p-3 bg-[#1a1f2b] border border-[#d4af37]/20 rounded-xl text-[11px] text-gray-400 leading-relaxed">
          <p className="font-semibold text-[#d4af37] text-xs">⚠️ Aviso importante</p>
          <p>
            Este sistema proporciona <span className="text-gray-300">evidencia técnica de registro</span> y autenticidad basada en blockchain (Polygon Amoy). 
            No constituye un sello de tiempo oficial <span className="text-gray-300">NOM‑151‑SCFI‑2016</span> ni una
            <span className="text-gray-300"> firma electrónica avanzada (FIEL)</span> con validez ante el SAT. 
            Consulte a su asesor legal para determinar el valor probatorio en su jurisdicción.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Ej: K28-MNS-7741"
            value={folio}
            onChange={(e) => setFolio(e.target.value.toUpperCase())}
            aria-invalid={!!error}
            aria-describedby={error ? "folio-error" : undefined}
            className="flex-1 bg-[#1c2533] border border-[#2b364b] rounded-xl px-4 py-3 text-white placeholder-[#5b6b84] focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition"
          >
            {loading ? 'VERIFICANDO...' : 'VALIDAR'}
          </button>
        </form>

        {error && (
          <div id="folio-error" className="mt-2 text-red-400 text-sm" role="alert">
            {error}
          </div>
        )}

        {resultado && (
          <div className={\`mt-4 p-4 rounded-xl text-center font-bold text-lg \${resultado.valido ? 'bg-green-900/40 border border-green-500 text-green-300' : 'bg-red-900/40 border border-red-500 text-red-300'}\`}>
            {resultado.mensaje}
          </div>
        )}

        {resultado && (
          <div className="mt-4 bg-[#10171f] p-4 rounded-xl text-sm text-gray-300 grid grid-cols-2 gap-2">
            <span>📌 Usado: {resultado.usado ? 'SÍ' : 'NO'}</span>
            <span>⛔ Suspendido: {resultado.suspendido ? 'SÍ' : 'NO'}</span>
            <span className="col-span-2 font-mono text-[10px] text-gray-500 break-all">
              Hash: {ethers.keccak256(ethers.toUtf8Bytes(folio || '...'))}
            </span>
          </div>
        )}
      </div>
    </main>
  );
}
`);

// ============================================================
// 3. CARPETA `app/api/verify/`
// ============================================================

fs.mkdirSync('app/api/verify', { recursive: true });
fs.writeFileSync('app/api/verify/route.ts', `
import { NextResponse } from 'next/server';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const folio = searchParams.get('folio');

  if (!folio) {
    return NextResponse.json({ error: 'Falta el parámetro "folio"' }, { status: 400 });
  }

  try {
    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_AMOY_RPC_URL);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    const hash = ethers.keccak256(ethers.toUtf8Bytes(folio.trim().toUpperCase()));
    const [usado, suspendido] = await contract.folioEstado(hash);

    let estatus = 'no_registrado';
    if (usado && !suspendido) estatus = 'autentico';
    else if (suspendido) estatus = 'suspendido';

    // Evidencia técnica (sin sello oficial)
    const evidencia = {
      tipo: 'evidencia_tecnica',
      hash,
      timestamp_bloque: (await provider.getBlock('latest'))?.timestamp,
      red: 'Polygon Amoy',
      contrato: CONTRACT_ADDRESS,
    };

    return NextResponse.json({ folio, hash, estatus, usado, suspendido, evidencia });
  } catch (error: any) {
    return NextResponse.json({ error: 'Error al verificar', details: error.message }, { status: 500 });
  }
}
`);

// ============================================================
// 4. CARPETA `lib/`
// ============================================================

fs.mkdirSync('lib');
fs.writeFileSync('lib/contract.ts', `
export const CONTRACT_ADDRESS = '${CONTRACT_ADDRESS}';

export const CONTRACT_ABI = [
  'function folioEstado(bytes32 hash) public view returns (bool usado, bool suspendido)',
  'function validarFolio(bytes32 hash) public',
  'function suspenderFolio(bytes32 hash) public',
  'function asignarMansion(uint256 mansionId, address wallet) public',
] as const;
`);

// ============================================================
// 5. CARPETA `contracts/`
// ============================================================

fs.mkdirSync('contracts');
fs.writeFileSync('contracts/Sovereign28.sol', `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Sovereign28 {
    mapping(bytes32 => bool) public folioUsado;
    mapping(bytes32 => bool) public folioSuspendido;
    mapping(address => bool) public esMansion;
    address public primus;

    event FolioValidado(bytes32 indexed hash, address validador, uint256 timestamp);
    event FolioSuspendido(bytes32 indexed hash, address moderador);
    event FolioReactivado(bytes32 indexed hash, address moderador);
    event FolioRevocado(bytes32 indexed hash, address revocador);
    event MansionAsignada(uint256 mansionId, address wallet);

    modifier soloMansion(uint256 mansionId) {
        require(esMansion[msg.sender], "No autorizado para esta mansion");
        _;
    }

    modifier soloPrimus() {
        require(msg.sender == primus, "Solo Primus puede ejecutar");
        _;
    }

    constructor() {
        primus = msg.sender;
        esMansion[msg.sender] = true;
    }

    function asignarMansion(uint256 mansionId, address wallet) external soloPrimus {
        require(wallet != address(0), "Wallet invalida");
        esMansion[wallet] = true;
        emit MansionAsignada(mansionId, wallet);
    }

    function validarFolio(bytes32 hash) external soloMansion(1) {
        require(!folioUsado[hash], "Folio ya usado");
        folioUsado[hash] = true;
        folioSuspendido[hash] = false;
        emit FolioValidado(hash, msg.sender, block.timestamp);
    }

    function suspenderFolio(bytes32 hash) external soloMansion(14) {
        require(folioUsado[hash], "Folio no registrado");
        folioSuspendido[hash] = true;
        emit FolioSuspendido(hash, msg.sender);
    }

    function reactivarFolio(bytes32 hash) external soloMansion(13) {
        require(folioUsado[hash], "Folio no registrado");
        folioSuspendido[hash] = false;
        emit FolioReactivado(hash, msg.sender);
    }

    function revocarFolio(bytes32 hash) external soloMansion(15) {
        require(folioUsado[hash], "Folio no registrado");
        delete folioUsado[hash];
        delete folioSuspendido[hash];
        emit FolioRevocado(hash, msg.sender);
    }

    function folioEstado(bytes32 hash) external view returns (bool usado, bool suspendido) {
        return (folioUsado[hash], folioSuspendido[hash]);
    }
}
`);

// ============================================================
// 6. CARPETA `scripts/`
// ============================================================

fs.mkdirSync('scripts');
fs.writeFileSync('scripts/generar-folios.js', `
const { ethers } = require('ethers');

function generarFolio() {
  const num = Math.floor(1000 + Math.random() * 9000);
  const checksum = (num * 7) % 9;
  return \`K28-MNS-\${num}\${checksum}\`;
}

for (let i = 0; i < 10; i++) {
  const folio = generarFolio();
  const hash = ethers.keccak256(ethers.toUtf8Bytes(folio));
  console.log(\`\${folio} -> \${hash}\`);
}
`);

fs.writeFileSync('scripts/registrar-batch.js', `
const hre = require('hardhat');
const fs = require('fs');

const CONTRACT_ADDRESS = '${CONTRACT_ADDRESS}';

async function main() {
  const signer = (await hre.ethers.getSigners())[0];
  const contract = new hre.ethers.Contract(
    CONTRACT_ADDRESS,
    ['function validarFolio(bytes32 hash) public'],
    signer
  );

  const data = fs.readFileSync('folios.csv', 'utf8');
  const lines = data.split('\\n').slice(1).filter(l => l.trim() !== '');

  for (const line of lines) {
    const folio = line.split(',')[0].trim().toUpperCase();
    const hash = hre.ethers.keccak256(hre.ethers.toUtf8Bytes(folio));
    console.log(\`Registrando \${folio}...\`);
    const tx = await contract.validarFolio(hash);
    await tx.wait();
    console.log(\`✅ \${folio} -> \${tx.hash}\`);
  }
}

main().catch(console.error);
`);

// ============================================================
// 7. FINAL – MENSAJE
// ============================================================

console.log('\n✅ Proyecto creado exitosamente en ./' + PROJECT_NAME);
console.log('\n📋 Siguientes pasos:');
console.log('1. cd ' + PROJECT_NAME);
console.log('2. npm install');
console.log('3. npm run dev');
console.log('4. Abre http://localhost:3000');
console.log('\n📂 Estructura creada:');
console.log('   - app/ (dashboard + API)');
console.log('   - contracts/ (Sovereign28.sol)');
console.log('   - scripts/ (generar y batch)');
console.log('   - lib/ (ABI del contrato)');
console.log('   - README.md, .env.example, .gitignore');
console.log('\n🔗 Contrato: ' + CONTRACT_ADDRESS);
console.log('⚠️ Recuerda configurar .env.local con tu RPC y private key para scripts.\n');
