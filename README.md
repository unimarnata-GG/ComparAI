🤖 COMPARAI: Simulador Inteligente de Financiamento
Bem-vindo ao COMPARAI, um projeto que utiliza o poder da Inteligência Artificial (IA) e dados da API do Banco Central (BC) para oferecer simulações de financiamento mais precisas e informadas, permitindo uma comparação inteligente entre cenários financeiros.
Este projeto é um resultado das aulas de Projetos da [Nome da Sua Faculdade/Curso], desenvolvido em colaboração e parceria estratégica com a empresa AVIVATEC, com o objetivo de explorar a aplicação de soluções de IA em desafios de negócios reais.

✨ Recursos
Simulação Inteligente: Utiliza modelos de IA desenvolvidos em Python (ex: Machine Learning) para analisar o perfil de crédito do usuário e fornecer projeções de taxas e parcelas otimizadas, focando na comparação de diferentes propostas.
Integração com o Banco Central: Consome a API do Banco Central (BC) para obter dados atualizados sobre taxas de juros (como a Selic) e indicadores econômicos relevantes para a simulação.
Interface Amigável: Uma interface web moderna e responsiva, construída com HTML, CSS e JavaScript.
Cálculo Detalhado: Realiza cálculos de parcelas usando sistemas como o Sistema de Amortização Constante (SAC) ou a Tabela Price.

🛠️ Tecnologias Utilizadas
O projeto é construído sobre a seguinte pilha de tecnologias:
Backend & IA
Python: Linguagem principal para o desenvolvimento da lógica de negócios, integração com a API do BC e treinamento/execução dos modelos de IA.
Bibliotecas de IA/Dados (Python): (Ex: Pandas, NumPy, DateTime, TensorFlow/PyTorch, matplotlib.
)
Framework Web (Python): (Flask) Integração Externa: API do Banco Central do Brasil (BCB).
Frontend
HTML5: Estrutura da aplicação web.
CSS3: Estilização (pode incluir frameworks como Bootstrap ou Tailwind se usados).
JavaScript: Lógica de interação do usuário, validação de formulários e requisições assíncronas (via fetch ou Axios) para o Backend.

⚙️ Configuração e Instalação
Siga os passos abaixo para configurar e rodar o projeto localmente:
1. Pré-requisitos
Certifique-se de ter o Python (versão 3.x) e o pip instalados em sua máquina.
2. Clonar o Repositório
Bash
git clone https://github.com/SEU_USUARIO/COMPARAI.git
cd COMPARAI

3. Configurar o Ambiente Python
Crie e ative um ambiente virtual (recomendado):
Bash
python -m venv venv
source venv/bin/activate  # No Linux/macOS
# ou venv\Scripts\activate  # No Windows

4. Instalar Dependências
Instale todas as bibliotecas Python necessárias:
Bash
pip install -r requirements.txt

5. Configurar Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto e defina quaisquer variáveis de ambiente necessárias (ex: chaves de API, configurações do BCB, etc.).
6. Executar o Backend
Inicie o servidor Python (adapte o comando conforme o framework usado, e.g., Flask/Django):
Bash
python app.py  # Exemplo para Flask
# ou python manage.py runserver # Exemplo para Django

O Backend estará ativo (geralmente em http://127.0.0.1:5000/).
7. Acessar o Frontend
Abra o arquivo index.html em seu navegador ou, se o backend estiver servindo o frontend, acesse o endereço do servidor (e.g., http://127.0.0.1:5000/).

🤝 Colaboração
Projeto Acadêmico
Este trabalho foi desenvolvido como parte de um projeto de aprendizado em parceria com a AVIVATEC na disciplina de Projetos da Unimar no curso de INTELIGÊNCIA ARTIFICIAL.
Contribuição Externa
Contribuições de terceiros são sempre bem-vindas! Se você tiver sugestões de melhorias, relatórios de bugs ou quiser adicionar novos recursos:
Faça um fork do projeto.
Crie uma branch para sua funcionalidade (git checkout -b feature/NovaSimulacao).
Faça commit de suas alterações (git commit -m 'Adiciona novo recurso X').
Faça push para o branch (git push origin feature/NovaSimulacao).
Abra um Pull Request.
