const { kv } = require('@vercel/kv');

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

    // Verificar se as variáveis do Vercel KV estão conectadas.
    // Se não estiverem, usamos um fallback temporário gracioso (ex: ambiente local ou aguardando conexão no painel da Vercel)
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      console.warn("AVISO: Vercel KV não está conectado/configurado no painel da Vercel. A inscrição foi simulada com sucesso.");
      
      return res.status(200).json({ 
        success: true, 
        message: 'Inscrição simulada com sucesso! (Aguardando conexão do banco de dados KV no painel da Vercel).' 
      });
    }

    // Salvar no Vercel KV de forma segura e protegida
    // A chave usa um prefixo próprio e o valor guarda o email e a data de consentimento (em conformidade com a LGPD)
    const timestamp = new Date().toISOString();
    const emailKey = `subscriber:${trimmedEmail}`;

    // Evita duplicados e guarda com metadados de consentimento
    const alreadySubscribed = await kv.exists(emailKey);
    if (!alreadySubscribed) {
      await kv.hset(emailKey, {
        email: trimmedEmail,
        subscribedAt: timestamp,
        ipHash: req.headers['x-forwarded-for'] 
          ? require('crypto').createHash('sha256').update(req.headers['x-forwarded-for']).digest('hex')
          : 'unknown'
      });
      // Adicionar à lista geral de inscritos para exportação futura
      await kv.sadd('subscribers_list', trimmedEmail);
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Inscrição realizada com sucesso! Seus dados estão protegidos conosco.' 
    });

  } catch (error) {
    console.error('Erro na API de inscrição:', error);
    return res.status(500).json({ 
      error: `Erro ao processar a inscrição: ${error.message}` 
    });
  }
};
