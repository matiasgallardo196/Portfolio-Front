#!/bin/bash

# Script de despliegue para AWS S3
# Uso: ./deploy.sh [bucket-name]

BUCKET_NAME=${1:-"tu-dominio.com"}

echo "🚀 Iniciando despliegue a AWS S3..."

# Construir el proyecto
echo "📦 Construyendo el proyecto..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error en la construcción del proyecto"
    exit 1
fi

# Verificar que existe la carpeta out
if [ ! -d "out" ]; then
    echo "❌ No se encontró la carpeta 'out'"
    exit 1
fi

# Sincronizar con S3
echo "☁️ Sincronizando con S3 bucket: $BUCKET_NAME"
aws s3 sync out/ s3://$BUCKET_NAME --delete

if [ $? -ne 0 ]; then
    echo "❌ Error al sincronizar con S3"
    exit 1
fi

# Invalidar caché de CloudFront (si existe)
echo "🔄 Invalidando caché de CloudFront..."
DISTRIBUTION_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?Aliases.Items[?contains(@, '$BUCKET_NAME')]].Id" --output text)

if [ ! -z "$DISTRIBUTION_ID" ] && [ "$DISTRIBUTION_ID" != "None" ]; then
    aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
    echo "✅ Caché de CloudFront invalidado"
else
    echo "⚠️ No se encontró distribución de CloudFront para $BUCKET_NAME"
fi

echo "✅ Despliegue completado exitosamente!"
echo "🌐 Tu sitio está disponible en: https://$BUCKET_NAME" 