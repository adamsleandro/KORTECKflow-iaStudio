import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize the Google Gen AI client with User-Agent telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for AI Training and Quiz Generation
  app.post("/api/gemini/generate-training-quiz", async (req, res) => {
    try {
      const { courseTitle, lessonTitle, sector, level, youtubeUrl } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          error: "A chave API do Gemini (GEMINI_API_KEY) não está configurada nas variáveis de ambiente."
        });
      }

      const prompt = `Você é um Engenheiro de Aplicação e Especialista em DHO (Desenvolvimento Humano Organizacional) na KORTECK, uma empresa líder do setor de Comunicação Visual (fabricação de fachadas ACM, letreiros LED, Neon Flex, soldagem TIG/MIG, cortes CNC Router e Laser).

Sua tarefa é gerar uma aula aprimorada e uma pergunta técnica altamente pertinente para o teste com base nas seguintes entradas:
- Setor: ${sector || "comunicação visual"}
- Nível de Dificuldade: ${level || "Intermediário"}
- Título do Curso: ${courseTitle || "Treinamento Técnico"}
- Título/Tópico da Aula Atual: ${lessonTitle || "Operações de Fábrica"}
${youtubeUrl ? `- Link do YouTube / Referência do Vídeo: ${youtubeUrl}` : ""}

Gere dados técnicos reais e de alta precisão do setor. Por exemplo, cite ligas metálicas (como Aço Inox 304), espessuras de materiais, tensões elétricas (12V/24V, fontes chaveadas), tipos de fresas (V-Groove 90°/135°), parâmetros de laser, gases auxiliares (N2 ou O2), ou Wash Primer para superfícies galvânicas, conforme o tema.

Format de Saída Exigido: Retorne um objeto JSON contendo:
1. "lessonTitle": Um título aprimorado e profissional para a aula.
2. "quizQuestion": Uma pergunta refinada de múltipla escolha que teste o conhecimento crítico sobre o tópico da aula e as práticas de chão de fábrica.
3. "options": Exatamente 4 opções ordenadas (A, B, C, D) de respostas.
4. "correctIndex": O índice correto (0 para A, 1 para B, 2 para C, 3 para D).
5. "explanation": Uma explicação técnica brilhante e aprofundada (em Português do Brasil) de por que essa opção é a correta, garantindo o aprendizado de qualidade do operador.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "Você é o instrutor mestre de Comunicação Visual e MES da KORTECK. Responda exclusivamente em formato JSON válido estruturado de acordo com o esquema definido.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              lessonTitle: {
                type: Type.STRING,
                description: "Título refinado da lição ou treinamento técnico"
              },
              quizQuestion: {
                type: Type.STRING,
                description: "Pergunta elaborada de múltipla escolha"
              },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Lista contendo exatamente 4 alternativas"
              },
              correctIndex: {
                type: Type.INTEGER,
                description: "Índice correspondente à resposta correta (0, 1, 2 ou 3)"
              },
              explanation: {
                type: Type.STRING,
                description: "Explicação técnica detalhada em Português do Brasil"
              }
            },
            required: ["lessonTitle", "quizQuestion", "options", "correctIndex", "explanation"]
          }
        }
      });

      const responseText = response.text || "{}";
      const quizData = JSON.parse(responseText.trim());

      return res.json(quizData);
    } catch (error: any) {
      console.error("Erro na geração técnica IA:", error);
      return res.status(500).json({
        error: "Falha ao gerar o treinamento técnico dinâmico por IA.",
        details: error.message || error
      });
    }
  });

  // Serve static assets or use Vite in development mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production delivery out of bundled static assets in dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[KORTECK Server] Escutando na porta HTTP ${PORT}`);
  });
}

startServer();
