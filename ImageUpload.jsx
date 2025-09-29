import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import axios from 'axios';

const ImageUpload = ({ 
  onUploadSuccess, 
  onUploadError, 
  uploadType = 'general',
  maxSize = 5 * 1024 * 1024, // 5MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  className = '',
  children
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    setError('');
    
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors.some(e => e.code === 'file-too-large')) {
        setError('Arquivo muito grande. Tamanho máximo: 5MB');
      } else if (rejection.errors.some(e => e.code === 'file-invalid-type')) {
        setError('Tipo de arquivo não suportado. Use: JPG, PNG, GIF ou WebP');
      } else {
        setError('Erro ao processar o arquivo');
      }
      return;
    }

    const file = acceptedFiles[0];
    if (!file) return;

    // Criar preview
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    // Upload do arquivo
    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/upload/${uploadType}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setUploadedFile(response.data);
      onUploadSuccess?.(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao fazer upload da imagem';
      setError(errorMessage);
      onUploadError?.(errorMessage);
      setPreview(null);
    } finally {
      setUploading(false);
    }
  }, [uploadType, onUploadSuccess, onUploadError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize,
    multiple: false,
  });

  const removeFile = () => {
    setUploadedFile(null);
    setPreview(null);
    setError('');
  };

  const getUploadTypeLabel = () => {
    const labels = {
      'team-shield': 'Escudo da Equipe',
      'competition-banner': 'Banner da Competição',
      'sponsor-logo': 'Logo do Patrocinador',
      'athlete-photo': 'Foto do Atleta',
      'general': 'Imagem'
    };
    return labels[uploadType] || 'Imagem';
  };

  if (uploadedFile) {
    return (
      <Card className={`w-full ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {getUploadTypeLabel()} enviada com sucesso!
                </p>
                <p className="text-xs text-gray-500">
                  {uploadedFile.url}
                </p>
              </div>
              {preview && (
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="h-12 w-12 object-cover rounded-md"
                />
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
              ${isDragActive 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
              }
              ${uploading ? 'pointer-events-none opacity-50' : ''}
            `}
          >
            <input {...getInputProps()} />
            
            {preview ? (
              <div className="space-y-4">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="mx-auto max-h-48 rounded-lg object-contain"
                />
                <p className="text-sm text-gray-600">
                  {uploading ? 'Enviando...' : 'Clique para alterar ou arraste uma nova imagem'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className={`mx-auto h-12 w-12 ${uploading ? 'animate-pulse' : 'text-gray-400'}`} />
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    {uploading ? 'Enviando...' : `Enviar ${getUploadTypeLabel()}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    {isDragActive 
                      ? 'Solte a imagem aqui...' 
                      : 'Arraste e solte uma imagem aqui, ou clique para selecionar'
                    }
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Formatos aceitos: JPG, PNG, GIF, WebP (máx. 5MB)
                  </p>
                </div>
              </div>
            )}
            
            {children}
          </div>
          
          {uploading && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageUpload;
