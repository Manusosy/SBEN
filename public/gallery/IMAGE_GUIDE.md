# Gallery Image Guide - SBEN Website

## Supported Image Formats

The gallery supports ALL common image formats:
- ✅ **JPG** / **JPEG** (most common)
- ✅ **PNG** (with transparency)
- ✅ **GIF** (animated or static)
- ✅ **WEBP** (modern, optimized format)
- ✅ **SVG** (vector graphics)

**Case-insensitive:** `.jpg`, `.JPG`, `.Jpg` are all supported!

## How to Add Images

### Step 1: Organize by Category

Add your images to the appropriate subfolder in `public/gallery/`:

```
public/gallery/
├── education/          ← Education program photos
├── healthcare/         ← Healthcare initiative photos
├── women-empowerment/  ← Women empowerment photos
├── digital-literacy/   ← Digital literacy photos
├── environmental/      ← Environmental conservation photos
├── community/          ← Community development photos
├── volunteer/          ← Volunteer activities photos
├── partnership/        ← Partnership events photos
└── events/            ← General events photos
```

### Step 2: Update Gallery.tsx

After adding images to folders, update `src/pages/Gallery.tsx`:

1. Open `src/pages/Gallery.tsx`
2. Find the `getCategoryImages` function (around line 53)
3. Add your image paths to the appropriate category array

**Example:**
```typescript
education: [
  "/gallery/education/school-visit-2025.jpg",      // ✅ JPG
  "/gallery/education/classroom.png",              // ✅ PNG
  "/gallery/education/students.jpeg",              // ✅ JPEG
  "/gallery/education/learning.webp",              // ✅ WEBP
],
```

### Step 3: Path Format

**Correct path format:**
```
/gallery/[category]/[filename].[extension]
```

**Examples:**
- `/gallery/education/photo.jpg` ✅
- `/gallery/healthcare/clinic.png` ✅
- `/gallery/women-empowerment/workshop.jpeg` ✅

**Common mistakes:**
- `gallery/photo.jpg` ❌ (missing leading slash)
- `public/gallery/photo.jpg` ❌ (don't include 'public')
- `./gallery/photo.jpg` ❌ (no relative paths)

## Image Best Practices

### File Naming
- ✅ Use descriptive names: `school-visit-march-2025.jpg`
- ✅ Use hyphens or underscores: `women_workshop.jpg`
- ❌ Avoid spaces: `my photo.jpg` (use `my-photo.jpg`)
- ❌ Avoid special characters: `photo@2025.jpg`

### File Size
- **Recommended:** Under 500 KB per image
- **Maximum:** 2 MB per image
- **Why:** Faster loading, better user experience

### Image Dimensions
- **Recommended:** 800x800px to 1200x1200px
- **Aspect Ratio:** Square (1:1) works best in the grid
- **Format:** JPG for photos, PNG for graphics with transparency

### Optimization Tips
1. **Compress images** before uploading
   - Use tools like TinyPNG, ImageOptim, or Squoosh
   - Aim for 70-85% quality

2. **Resize large images**
   - Don't upload 4000x4000px images
   - Resize to 1200x1200px maximum

3. **Convert to modern formats**
   - WEBP offers better compression than JPG
   - But JPG/PNG are more universally supported

## Current Gallery Structure

### Images per Category (as of Oct 2025)

| Category | Images | Location |
|----------|--------|----------|
| Education | 5 | `public/gallery/education/` |
| Healthcare | 2 | `public/gallery/` (root) |
| Women Empowerment | 5 | `public/gallery/women-empowerment/` |
| Digital Literacy | 2 | `public/gallery/digital-literacy/` |
| Environmental | 4 | `public/gallery/environmental/` |
| Community | 11 | `public/gallery/` (root) |
| Volunteer | 0 | `public/gallery/volunteer/` |
| Partnership | 0 | `public/gallery/partnership/` |
| Events | 0 | `public/gallery/events/` |

## Error Handling

The gallery includes automatic error handling:
- ✅ Broken images show placeholder
- ✅ Console warnings for failed loads
- ✅ Graceful degradation

## Testing Your Images

After adding images:

1. **Local testing:**
   ```bash
   npm run dev
   ```
   Visit http://localhost:8081/gallery

2. **Check all formats:**
   - Filter by category
   - Verify images load correctly
   - Test modal/lightbox view

3. **Build test:**
   ```bash
   npm run build
   ```
   Ensure no errors

## Troubleshooting

### Image not showing?
1. ✅ Check file path is correct
2. ✅ Verify file exists in `public/gallery/`
3. ✅ Check file extension matches
4. ✅ Look for typos in filename
5. ✅ Clear browser cache

### Image broken?
1. ✅ Check file is not corrupted
2. ✅ Verify file format is supported
3. ✅ Re-upload the file
4. ✅ Check browser console for errors

### Wrong category?
1. ✅ Move file to correct subfolder
2. ✅ Update path in `Gallery.tsx`
3. ✅ Rebuild the site

## Quick Reference

### Adding a New Image

1. **Upload to folder:**
   ```
   public/gallery/education/new-photo.jpg
   ```

2. **Update Gallery.tsx:**
   ```typescript
   education: [
     "/gallery/education/new-photo.jpg",
     // ... existing photos
   ],
   ```

3. **Test:**
   ```bash
   npm run dev
   ```

4. **Commit:**
   ```bash
   git add .
   git commit -m "Add new education photo"
   git push
   ```

## Automation (Future Enhancement)

Currently, images must be manually added to `Gallery.tsx`. 

**Future improvement:** Automatic image scanning at build time to eliminate manual updates.

## Support

For issues or questions:
- Email: info@shinebridgeempowermentnetwork.org
- Developer: KNK Digital

---

**Last Updated:** October 6, 2025

