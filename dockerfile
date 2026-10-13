# IMAGEM BASE: servidor nginx em Linux Alpine
FROM nginx:alpine

# Copiar os arquivos do projeto para o diretório padrão do Nginx
COPY . /usr/share/nginx/html

# Expor a porta 80 para acesso externo
EXPOSE 80
