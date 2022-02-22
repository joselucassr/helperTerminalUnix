# Ajudante para o terminal Unix

A ideia é entregar uma plataforma para consulta rápida e intuitiva, com uma busca por comandos utilizando tags.

O público alvo é composto por pessoas iniciantes, ou intermediárias, no uso de um terminal unix. Por esse motivo, a linguagem utilizada deve ser a mais simples possível, sem perder o significado original.

## Documentação

Acesse para ver como adicionar e editar páginas de comandos, tags de busca e links externos: [Docs Notion](https://joselucassr.notion.site/Docs-0de792b8bd714324b5fece23e64426c1)

## Comandos disponíveis

- `comando &` : Executa o comando em segundo plano.

- `apropos 'palavras-chave'` : Corresponde a comandos com palavras-chave em suas páginas de manual.
- `bg` : Retoma os processos que estão suspensos.
- `cat arquivo` : Exibe um arquivo.
- `cat arquivo1 arquivo2 > arquivo3` : Concatena arquivo1 e arquivo2 em arquivo3.
- `cd` : Muda para o diretório inicial.
- `cd ..` : Muda para o diretório pai.
- `cd diretório` : Muda para o diretório nomeado.
- `cd ~` : Muda para o diretório inicial.
- `chmod [options] [objeto de sistema]` : Altera os direitos de acesso para o objeto de sistema (arquivo ou diretório), nomeado.
- `cp arquivo1 arquivo2` : Copia arquivo1 e o chama de arquivo2.
- `ctrl C` : Elimina o trabalho em execução em primeiro plano.
- `ctrl Z` : Suspende o trabalho em execução em primeiro plano.
- `echo "mensagem"` : Escreve uma mensagem no terminal.
- `fg %index` : Retoma o processo suspenso em primeiro plano, baseado no index.
- `find caminho [expressão de busca]` : Realiza uma busca baseado nos parâmetros escritos.
- `grep 'palavras-chave' arquivo` : Procura por palavras-chave no arquivo.
- `head arquivo` : Exibe as primeiras linhas de um arquivo.
- `history` : Mostra o histórico de comandos usados no terminal.
- `jobs` : Lista processos suspensos e em segundo plano.
- `kill index` : Encerra o processo de número igual ao index, globalmente.
- `kill %index` : Encerra o processo em segundo plano, baseado no index.
- `less arquivo` : Exibe um arquivo, uma página por vez.
- `ls` : Lista arquivos e diretórios.
- `ls -a` : Lista todos os arquivos e diretórios.
- `ls -l` : Lista direitos de acesso para os arquivos e diretórios.
- `ls -lag` : Lista direitos de acesso para todos os arquivos e diretórios.
- `comando > arquivo` : Redireciona a saída padrão para um arquivo.
- `comando >> arquivo` : Anexa a saída padrão a um arquivo.
- `comando < arquivo` : Pega o arquivo como fonte de entrada para o comando.
- `man comando` : Lê a página do manual online do comando informado.
- `mkdir` : Cria um diretório.
- `mv arquivo1 arquivo2` : Move ou renomeia arquivo1 para arquivo2.
- `comando1 | comando2` : Canaliza a saída do comando1 para a entrada do comando2.
- `ps` : Lista processos atuais.
- `ps -aux` : Lista todos processos atuais.
- `pwd` : Mostra o caminho do diretório atual.
- `rm arquivo` : Remove um arquivo.
- `rmdir diretório` : Remove um diretório.
- `sleep tempo` : Faz o terminal aguardar o tempo informado.
- `sort arquivo` : Ordena uma sequência de linhas em ordem crescente, por padrão.
- `tail arquivo` : Exibe as últimas linhas de um arquivo.
- `touch arquivo` : Cria um arquivo.
- `wc arquivo` : Conta o número de linhas / palavras / caracteres no arquivo.
- `whatis comando` : Breve descrição do comando informado.
- `who` : Gera uma lista contendo informações sobre cada usuário que está ativo no sistema.
