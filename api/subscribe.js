module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido. Use POST.' });
  }

  try {
    const { email } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'E-mail inválido ou ausente.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    
    // Validar regex básico de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ error: 'Por favor, insira um e-mail válido.' });
    }

    // URL do Google Apps Script do usuário
    // O usuário pode definir isso como uma variável de ambiente no painel da Vercel (Recomendado para segurança)
    const googleScriptUrl = process.env.GOOGLE_SHEETS_API_URL;

    if (!googleScriptUrl) {
      return res.status(503).json({ 
        error: 'Configuração pendente: A URL do Google Sheets não foi configurada nas variáveis de ambiente da Vercel (GOOGLE_SHEETS_API_URL).' 
      });
    }

    // Data de consentimento (LGPD) e Hash do IP para prevenção de spam
    const timestamp = new Date().toISOString();
    const ipHash = req.headers['x-forwarded-for'] 
      ? require('crypto').createHash('sha256').update(req.headers['x-forwarded-for']).digest('hex')
      : 'unknown';

    // Enviar dados para o Google Sheets de forma segura (Backend-to-Backend)
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: trimmedEmail,
        timestamp: timestamp,
        ipHash: ipHash,
        source: 'Landing Page Hero'
      })
    });

    const result = await response.json().catch(() => ({ success: true }));

    return res.status(200).json({ 
      success: true, 
      message: 'Inscrição realizada com sucesso! Seus dados foram salvos no Google Sheets.' 
    });

  } catch (error) {
    console.error('Erro na API de inscrição para Google Sheets:', error);
    return res.status(500).json({ 
      error: `Erro ao processar a inscrição: ${error.message}` 
    });
  }
};
