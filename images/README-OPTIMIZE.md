Image optimization utility

This project includes a small Node script to generate optimized versions of your images.

1) Install dependencies:
   npm install

2) Run the script:
   npm run optimize-images

What it does:
- Generates resized JPEGs at 400px and 800px widths (quality 80) in `images/optimized`
- Generates an optimized WebP for each original image in `images/optimized`

Notes:
- The script requires `sharp` which will be installed by `npm install`.
- It won't overwrite your originals — optimized images are placed in `images/optimized`.
- After generating optimized images you can update `<img>` tags to use the WebP / resized images (e.g., `<picture>` or `srcset`) for faster loads.