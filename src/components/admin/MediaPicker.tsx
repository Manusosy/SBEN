import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import MediaLibraryContent, { GalleryImage } from './MediaLibraryContent';

interface MediaPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (image: GalleryImage) => void;
}

export default function MediaPicker({ open, onOpenChange, onSelect }: MediaPickerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[85vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-6 border-b border-gray-100 bg-white">
          <DialogTitle className="text-xl font-bold">Select Media</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <MediaLibraryContent 
            selectable={true} 
            onSelect={(image) => {
              onSelect(image);
              onOpenChange(false);
            }} 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
