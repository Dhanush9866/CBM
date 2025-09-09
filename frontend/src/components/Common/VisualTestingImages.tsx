import { useEffect, useState } from 'react';
import { imageService, CloudinaryImage } from '@/services/imageService';
import LoadingAnimation from '@/components/Common/LoadingAnimation';

export default function VisualTestingImages() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const visualTestingImages = await imageService.getVisualTestingImages();
        setImages(visualTestingImages);
        console.log('Visual Testing Images loaded:', visualTestingImages);
      } catch (error) {
        console.error('Error fetching Visual Testing images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-8 flex flex-col items-center">
        <LoadingAnimation size="sm" text="" />
        <p className="text-muted-foreground mt-4">Loading Visual Testing images...</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No Visual Testing images available</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">Visual Testing Images from Cloudinary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div key={image.public_id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={image.url}
              alt={`Visual Testing ${index + 1}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold mb-2">Image {index + 1}</h3>
              <p className="text-sm text-gray-600">
                Size: {image.width} × {image.height}
              </p>
              <p className="text-sm text-gray-600">
                Format: {image.format.toUpperCase()}
              </p>
              <p className="text-sm text-gray-600">
                Created: {new Date(image.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
