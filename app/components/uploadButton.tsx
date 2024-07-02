"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone, FileRejection } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload, File, X, FileText, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";

export const Modal: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const router = useRouter();

    const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
        if (acceptedFiles && acceptedFiles[0]) {
            setFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 1,
        multiple: false
    });

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isUploading) {
            interval = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= 90) {
                        clearInterval(interval);
                        return prevProgress;
                    }
                    return prevProgress + 10;
                });
            }, 500);
        }
        return () => clearInterval(interval);
    }, [isUploading]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!file) return;

        setIsUploading(true);
        setProgress(0);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setProgress(100);
                setTimeout(() => {
                    setIsOpen(false);
                    router.push(`/files/${file.name.split('.')[0]}`);
                }, 500);
            } else {
                console.error('File upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const removeFile = () => {
        setFile(null);
        setProgress(0);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Upload and Start Chat
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Card>
                        <CardContent className="p-6">
                            <div
                                {...getRootProps()}
                                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                                    isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'
                                }`}
                            >
                                <input {...getInputProps()} />
                                {file ? (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <File className="h-6 w-6 text-blue-500" />
                                            <span className="text-sm">{file.name}</span>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={removeFile}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Upload className="h-12 w-12 mx-auto text-gray-400" />
                                        <p className="text-sm text-gray-600">
                                            Drag & drop a file here, or click to select
                                        </p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                    {isUploading && (
                        <div className="space-y-2">
                            <Progress value={progress} className="w-full" />
                            <p className="text-sm text-center">{progress}% - {progress === 100 ? 'Processing complete!' : 'Processing...'}</p>
                        </div>
                    )}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={!file || isUploading}
                    >
                        {isUploading ? 'Processing...' : 'Upload'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

const FileUploadModal: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-xl">
            <h1 className="text-3xl font-bold mb-6 text-center">AI Chatbot Assistant</h1>
            
            <Card className="mb-8 shadow-lg">
                <CardHeader>
                    <CardTitle>Welcome to our AI-powered Chat Assistant</CardTitle>
                    <CardDescription>Upload your files and start chatting with our AI</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">Our AI chatbot can analyze your documents and answer questions based on their content. Simply upload your file and start asking questions!</p>
                    <Modal />
                </CardContent>
            </Card>
            
            <div className="text-center text-sm text-gray-500">
                <p>Supported file types: .txt, .pdf, .doc, .docx</p>
                <p>Maximum file size: 10MB</p>
            </div>
        </div>
    )
};

export default FileUploadModal;