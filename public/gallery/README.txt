GALLERY PHOTOS FOLDER
=====================

This folder contains subfolders for organizing your gallery photos by category.

CREATED SUBFOLDERS:
✅ education/          - Education program photos
✅ healthcare/         - Healthcare initiative photos  
✅ women-empowerment/  - Women empowerment photos
✅ digital-literacy/   - Digital literacy program photos
✅ environmental/      - Environmental conservation photos
✅ community/          - Community development photos
✅ volunteer/          - Volunteer activity photos
✅ partnership/        - Partnership meeting photos
✅ events/            - Event and celebration photos

HOW TO ADD PHOTOS:
1. Add your photos to the appropriate subfolder
2. Update the galleryImages array in src/pages/Gallery.tsx with your photo details
3. Photos will automatically appear in the gallery grid

PHOTO REQUIREMENTS:
- Supported formats: JPG, JPEG, PNG, WebP
- Recommended size: 800x600 pixels or larger
- File size: Keep under 500KB for fast loading
- Naming: Use descriptive names like "classroom-workshop-2024.jpg"

EXAMPLE PHOTO ENTRY:
```javascript
{
  id: 1,
  src: "/gallery/education/classroom-workshop-2024.jpg",
  alt: "Students participating in classroom workshop",
  title: "Education Workshop 2024",
  description: "Students learning new skills in our education program",
  category: "education"
}
```

The gallery page will automatically filter photos by category and allow searching by title or description. 