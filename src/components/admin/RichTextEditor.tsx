import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Typography from '@tiptap/extension-typography';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Quote,
  Code,
  Image as ImageIcon,
  Link as LinkIcon,
  Unlink,
  Undo,
  Redo,
  Type,
  Minus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import MediaPicker from './MediaPicker';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
}

export default function RichTextEditor({
  content,
  onChange,
  onImageUpload,
}: RichTextEditorProps) {
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Placeholder.configure({
        placeholder: 'Start writing your article here...',
      }),
      Typography,
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[500px] w-full focus:outline-none',
      },
    },
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return <div className="p-4 border rounded-lg">Loading editor...</div>;
  }

  const handleImageInsert = (image: { image_url: string, alt_text?: string }) => {
    editor.chain().focus().setImage({ 
      src: image.image_url,
      alt: image.alt_text || '' 
    }).run();
  };

  const handleAddLink = () => {
    if (linkUrl) {
      if (editor.state.selection.empty && linkText) {
        editor.chain().focus().insertContent(`<a href="${linkUrl}">${linkText}</a>`).run();
      } else {
        editor.chain().focus().setLink({ href: linkUrl }).run();
      }
      setLinkUrl('');
      setLinkText('');
      setShowLinkDialog(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Toolbar */}
      <div className="border border-gray-200 rounded-md bg-gray-50 p-2 flex flex-wrap gap-1.5 mb-3">
        <Button
          size="sm"
          variant={editor.isActive('bold') ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          <Bold className="w-4 h-4" />
        </Button>

        <Button
          size="sm"
          variant={editor.isActive('italic') ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        >
          <Italic className="w-4 h-4" />
        </Button>

        <Button
          size="sm"
          variant={editor.isActive('strike') ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="w-4 h-4" />
        </Button>

        <div className="w-px bg-gray-300"></div>

        <Button
          size="sm"
          variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Heading1 className="w-4 h-4" />
        </Button>

        <Button
          size="sm"
          variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 className="w-4 h-4" />
        </Button>

        <Button
          size="sm"
          variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 className="w-4 h-4" />
        </Button>

        <Button
          size="sm"
          variant={editor.isActive('heading', { level: 4 }) ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        >
          <Heading4 className="w-4 h-4" />
        </Button>

        <div className="w-px bg-gray-300"></div>

        <Button
          size="sm"
          variant={editor.isActive('bulletList') ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="w-4 h-4" />
        </Button>

        <Button
          size="sm"
          variant={editor.isActive('orderedList') ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>

        <Button
          size="sm"
          variant={editor.isActive('blockquote') ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="w-4 h-4" />
        </Button>

        <Button
          size="sm"
          variant={editor.isActive('codeBlock') ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <Code className="w-4 h-4" />
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus className="w-4 h-4" />
        </Button>

        <div className="w-px bg-gray-300"></div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsMediaPickerOpen(true)}
        >
          <ImageIcon className="w-4 h-4" />
        </Button>

        <Button
          size="sm"
          variant={editor.isActive('link') ? 'default' : 'outline'}
          onClick={() => {
            if (editor.isActive('link')) {
              editor.chain().focus().unsetLink().run();
            } else {
              const previousUrl = editor.getAttributes('link').href;
              setLinkUrl(previousUrl || '');
              setLinkText('');
              setShowLinkDialog(true);
            }
          }}
          title={editor.isActive('link') ? 'Remove Link' : 'Add Link'}
        >
          {editor.isActive('link') ? <Unlink className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
        </Button>

        <div className="w-px bg-gray-300"></div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo className="w-4 h-4" />
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo className="w-4 h-4" />
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          <Type className="w-4 h-4" />
        </Button>
      </div>

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="border-b bg-gray-100 p-3 flex gap-2">
          {!editor.state.selection.empty ? (
            <span className="text-xs text-gray-500 self-center px-2">Linking selected text</span>
          ) : (
            <input
              type="text"
              placeholder="Link text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              className="flex-1 px-2 py-1 border rounded text-sm placeholder:text-gray-400 placeholder:italic"
            />
          )}
          <input
            type="text"
            placeholder="https://example.com"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="flex-1 px-2 py-1 border rounded text-sm placeholder:text-gray-400 placeholder:italic"
          />
          <Button
            size="sm"
            onClick={handleAddLink}
            disabled={!linkUrl || (editor.state.selection.empty && !linkText)}
          >
            Save Link
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowLinkDialog(false)}
          >
            Cancel
          </Button>
        </div>
      )}

      {/* Editor Content */}
      <div className="w-full">
        <EditorContent editor={editor} />
      </div>

      <MediaPicker 
        open={isMediaPickerOpen} 
        onOpenChange={setIsMediaPickerOpen} 
        onSelect={handleImageInsert} 
      />
    </div>
  );
}
